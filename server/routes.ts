import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";
import ExcelJS from "exceljs";

const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
const activeSessions = new Map<string, { createdAt: number }>();

function validateExternalUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

// Valide un lien interne (chemin relatif uniquement, pas d'URL absolue)
function validateInternalLink(link: string | null | undefined): string | null {
  if (!link) return null;
  if (/^\/[a-zA-Z0-9\-_/]*$/.test(link)) return link;
  return null;
}

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Validation format IP (IPv4 + IPv6 basique)
function isValidIp(ip: string): boolean {
  const clean = ip.replace(/^::ffff:/, "");
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = clean.match(ipv4);
  if (m) return m.slice(1).every(o => parseInt(o) <= 255);
  return /^[0-9a-fA-F:]{2,39}$/.test(clean);
}

// Extrait l'IP client via req.ip (Express résout X-Forwarded-For via trust proxy — non spoofable)
function extractClientIp(req: any): string | null {
  const raw = (req.ip || "").replace(/^::ffff:/, "");
  return raw && isValidIp(raw) ? raw : null;
}

// Rate limiter générique pour les endpoints publics
const publicLimits = new Map<string, { count: number; windowStart: number }>();

function checkPublicRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = publicLimits.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    publicLimits.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count++;
  return entry.count > max;
}

// Sanitisation HTML renforcée (admin content editor)
function stripHtml(content: string): string {
  return content
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/on[a-z]+\s*=/gi, "")
    .trim();
}

const visitSchema = z.object({
  page: z.string().max(500).optional(),
  referrer: z.string().max(2000).nullable().optional()
});

const feedbackSchema = z.object({
  message: z.string().min(5, "Le message doit contenir au moins 5 caractères").max(30000),
  page: z.string().max(500).nullable().optional()
});

const loginSchema = z.object({
  password: z.string().min(1).max(200)
});

function isRateLimited(ip: string): boolean {
  const attempt = loginAttempts.get(ip);
  if (!attempt) return false;
  
  if (Date.now() - attempt.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip);
    return false;
  }
  
  return attempt.count >= MAX_LOGIN_ATTEMPTS;
}

function recordLoginAttempt(ip: string, success: boolean): void {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  
  const attempt = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  attempt.count++;
  attempt.lastAttempt = Date.now();
  loginAttempts.set(ip, attempt);
}

const TOKEN_TTL = 4 * 60 * 60 * 1000; // 4 heures

function generateSecureToken(): string {
  const sessionId = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(`${sessionId}|${timestamp}`)
    .digest("hex");
  return `${sessionId}.${timestamp}.${signature}`;
}

function validateToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [sessionId, timestamp, signature] = parts;
    const expectedSig = createHmac("sha256", SESSION_SECRET)
      .update(`${sessionId}|${timestamp}`)
      .digest();
    const actualSig = Buffer.from(signature, "hex");
    if (actualSig.length !== expectedSig.length) return false;
    if (!timingSafeEqual(actualSig, expectedSig)) return false;

    const session = activeSessions.get(sessionId);
    if (!session) return false;

    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > TOKEN_TTL) {
      activeSessions.delete(sessionId);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Nettoyage périodique des sessions et tentatives expirées
setInterval(() => {
  const now = Date.now();
  activeSessions.forEach((session, id) => {
    if (now - session.createdAt > TOKEN_TTL) activeSessions.delete(id);
  });
  loginAttempts.forEach((attempt, ip) => {
    if (now - attempt.lastAttempt > LOCKOUT_DURATION) loginAttempts.delete(ip);
  });
  publicLimits.forEach((entry, key) => {
    if (now - entry.windowStart > 15 * 60 * 1000) publicLimits.delete(key);
  });
}, 30 * 60 * 1000);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/visit", async (req, res) => {
    try {
      const parsed = visitSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request" });
      }
      
      const { page, referrer } = parsed.data;
      const userAgent = req.headers["user-agent"] || null;
      const ip = extractClientIp(req);

      if (ip && checkPublicRateLimit(`visit:${ip}`, 60, 60 * 1000)) {
        return res.status(429).json({ error: "Too many requests" });
      }

      await storage.recordVisit({
        page: page || "/",
        userAgent,
        ip,
        referrer: referrer || null,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error recording visit:", error);
      res.status(500).json({ error: "Failed to record visit" });
    }
  });

  app.get("/api/guides/popular", async (req, res) => {
    try {
      const popularGuides = await storage.getPopularGuides(4, 5);
      res.json(popularGuides);
    } catch (error) {
      console.error("Error getting popular guides:", error);
      res.status(500).json({ error: "Failed to get popular guides" });
    }
  });

  app.get("/api/visits/total", async (req, res) => {
    try {
      const stats = await storage.getVisitStats();
      res.json({ total: stats.total });
    } catch (error) {
      console.error("Error getting total visits:", error);
      res.status(500).json({ error: "Failed to get total visits" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      // Socket IP uniquement pour le rate limiting — non spoofable via X-Forwarded-For
      const ip = (req.socket?.remoteAddress || req.ip || "unknown").replace(/^::ffff:/, "");

      if (isRateLimited(ip)) {
        return res.status(429).json({ error: "Trop de tentatives. Réessayez dans 15 minutes." });
      }
      
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request" });
      }
      
      const { password } = parsed.data;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminPassword) {
        return res.status(500).json({ error: "Admin password not configured" });
      }

      // Comparaison timing-safe via HMAC pour éviter les attaques temporelles
      const hmacInput = createHmac("sha256", SESSION_SECRET).update(password).digest();
      const hmacExpected = createHmac("sha256", SESSION_SECRET).update(adminPassword).digest();
      const passwordMatch = timingSafeEqual(hmacInput, hmacExpected);

      if (passwordMatch) {
        recordLoginAttempt(ip, true);
        const token = generateSecureToken();
        const sessionId = token.split(".")[0];
        activeSessions.set(sessionId, { createdAt: Date.now() });
        res.cookie("adminToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: TOKEN_TTL,
          path: "/",
        });
        res.json({ success: true });
      } else {
        recordLoginAttempt(ip, false);
        const attempts = loginAttempts.get(ip)?.count ?? 1;
        console.warn(`[AUTH] Tentative échouée depuis ${ip} (${attempts}/${MAX_LOGIN_ATTEMPTS})`);
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (token) {
        const sessionId = token.split(".")[0];
        activeSessions.delete(sessionId);
      }
      res.clearCookie("adminToken", { path: "/" });
      res.json({ success: true });
    } catch (error) {
      res.clearCookie("adminToken", { path: "/" });
      res.json({ success: true });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const stats = await storage.getVisitStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/admin/geo", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const stats = await storage.getVisitStats();
      const ipSet = new Set(stats.recentVisits.map(v => v.ip).filter(Boolean));
      const uniqueIPs = Array.from(ipSet) as string[];
      
      const geoData: Array<{ ip: string; lat: number; lon: number; city: string; country: string; count: number }> = [];
      
      for (const ip of uniqueIPs.slice(0, 20)) {
        if (!isValidIp(ip)) {
          console.warn(`Geo API: IP invalide ignorée: ${ip}`);
          continue;
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        try {
          const response = await fetch(`https://ipapi.co/${ip}/json/`, {
            signal: controller.signal,
          });
          const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
          if (contentLength > 10000) {
            console.error(`Geo API: response too large for IP ${ip}`);
            continue;
          }
          const data = await response.json();
          if (data.latitude && data.longitude) {
            const count = stats.recentVisits.filter(v => v.ip === ip).length;
            geoData.push({
              ip: ip,
              lat: data.latitude,
              lon: data.longitude,
              city: data.city || "Inconnu",
              country: data.country_name || "Inconnu",
              count
            });
          }
        } catch (err) {
          console.error(`Geo API error for IP ${ip}:`, err);
        } finally {
          clearTimeout(timeout);
        }
      }
      
      res.json(geoData);
    } catch (error) {
      console.error("Geo error:", error);
      res.status(500).json({ error: "Failed to get geo data" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const parsed = feedbackSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMessage = parsed.error.errors[0]?.message || "Invalid request";
        return res.status(400).json({ error: errorMessage });
      }
      
      const { message, page } = parsed.data;
      const userAgent = req.headers["user-agent"] || null;
      const ip = extractClientIp(req);

      if (ip && checkPublicRateLimit(`feedback:${ip}`, 5, 10 * 60 * 1000)) {
        return res.status(429).json({ error: "Trop de messages. Réessayez dans 10 minutes." });
      }

      await storage.createFeedback({
        message: message.trim(),
        page: page || null,
        userAgent,
        ip,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Feedback error:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi du feedback" });
    }
  });

  app.get("/api/admin/feedback", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const feedbackList = await storage.listFeedback();
      res.json(feedbackList);
    } catch (error) {
      console.error("Feedback list error:", error);
      res.status(500).json({ error: "Failed to get feedback" });
    }
  });

  app.patch("/api/admin/feedback/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !["nouveau", "lu", "archivé"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const updated = await storage.updateFeedbackStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Feedback update error:", error);
      res.status(500).json({ error: "Failed to update feedback" });
    }
  });

  app.post("/api/suggestions", async (req, res) => {
    try {
      const ip = extractClientIp(req);
      if (ip && checkPublicRateLimit(`suggestion:${ip}`, 3, 10 * 60 * 1000)) {
        return res.status(429).json({ error: "Trop de suggestions. Réessayez dans 10 minutes." });
      }

      const { pseudo, content } = req.body;

      if (!content || typeof content !== "string" || content.trim().length < 10) {
        return res.status(400).json({ error: "La suggestion doit contenir au moins 10 caractères" });
      }
      
      if (content.length > 30000) {
        return res.status(400).json({ error: "La suggestion ne peut pas dépasser 30 000 caractères" });
      }
      
      await storage.createSuggestion({
        pseudo: (pseudo && typeof pseudo === "string" ? pseudo.trim() : "Anonyme") || "Anonyme",
        content: content.trim(),
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Suggestion error:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi de la suggestion" });
    }
  });

  app.get("/api/admin/suggestions", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const suggestionsList = await storage.listSuggestions();
      res.json(suggestionsList);
    } catch (error) {
      console.error("Suggestions list error:", error);
      res.status(500).json({ error: "Failed to get suggestions" });
    }
  });

  app.post("/api/leaderboard", async (req, res) => {
    try {
      const { pseudo, univers, score } = req.body;
      
      if (!pseudo || typeof pseudo !== "string" || pseudo.trim().length < 2 || pseudo.length > 15) {
        return res.status(400).json({ error: "Pseudo invalide (2-15 caractères)" });
      }
      
      if (univers && typeof univers === "string" && univers.length > 30) {
        return res.status(400).json({ error: "Univers trop long (max 30 caractères)" });
      }
      
      if (typeof score !== "number" || score < 0 || score > 1000000) {
        return res.status(400).json({ error: "Score invalide" });
      }
      
      const ip = extractClientIp(req);

      if (ip && checkPublicRateLimit(`leaderboard:${ip}`, 10, 10 * 60 * 1000)) {
        return res.status(429).json({ error: "Trop de tentatives. Réessayez dans 10 minutes." });
      }

      const result = await storage.addLeaderboardEntry({
        pseudo: pseudo.trim(),
        univers: univers?.trim() || "-",
        score,
        ip,
      });
      
      res.json({ 
        success: true, 
        isNew: result.isNew,
        isBetter: result.isBetter,
        previousBest: result.previousBest
      });
    } catch (error) {
      console.error("Leaderboard error:", error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement du score" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const entries = await storage.getPublicLeaderboard(25);
      res.json(entries);
    } catch (error) {
      console.error("Public leaderboard error:", error);
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  app.get("/api/admin/leaderboard", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const entries = await storage.getLeaderboard(100);
      res.json(entries);
    } catch (error) {
      console.error("Leaderboard list error:", error);
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  app.delete("/api/admin/leaderboard/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      await storage.deleteLeaderboardEntry(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Leaderboard delete error:", error);
      res.status(500).json({ error: "Failed to delete leaderboard entry" });
    }
  });

  app.get("/api/content", async (req, res) => {
    try {
      const allContent = await storage.getAllEditableContent();
      const contentMap: Record<string, string> = {};
      for (const item of allContent) {
        contentMap[item.id] = item.content;
      }
      res.json(contentMap);
    } catch (error) {
      console.error("Content fetch error:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/admin/verify", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      res.json({ valid: true });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/admin/content", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id, content } = req.body;
      if (!id || typeof id !== "string" || !content || typeof content !== "string") {
        return res.status(400).json({ error: "Invalid request" });
      }

      if (id.length > 100 || content.length > 10000) {
        return res.status(400).json({ error: "Content too long" });
      }

      const sanitizedContent = stripHtml(content);
      const updated = await storage.upsertEditableContent({ id, content: sanitizedContent });
      res.json(updated);
    } catch (error) {
      console.error("Content save error:", error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  app.post("/api/admin/content/bulk", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { contents } = req.body;
      if (!contents || typeof contents !== "object") {
        return res.status(400).json({ error: "Invalid request" });
      }

      const results: Record<string, string> = {};
      for (const [id, content] of Object.entries(contents)) {
        if (typeof content === "string" && id.length <= 100 && content.length <= 10000) {
          const sanitizedContent = stripHtml(content);
          await storage.upsertEditableContent({ id, content: sanitizedContent });
          results[id] = sanitizedContent;
        }
      }
      res.json({ success: true, saved: Object.keys(results).length });
    } catch (error) {
      console.error("Bulk content save error:", error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  let youtubeCache: { subscribers: number; updatedAt: number } | null = null;
  let discordCache: { members: number; updatedAt: number } | null = null;
  const CACHE_DURATION = 3600000;

  app.get("/api/discord/stats", async (_req, res) => {
    try {
      if (discordCache && Date.now() - discordCache.updatedAt < CACHE_DURATION) {
        return res.json({ members: discordCache.members, cached: true });
      }

      const botToken = process.env.DISCORD_BOT_TOKEN;
      const guildId = process.env.DISCORD_GUILD_ID;
      
      if (!botToken || !guildId) {
        return res.json({ members: 180, cached: false, error: "No credentials" });
      }

      const response = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
        {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        }
      );
      
      if (!response.ok) {
        console.error("Discord API error:", response.status);
        return res.json({ members: discordCache?.members || 180, cached: false });
      }

      const data = await response.json();
      const members = data.approximate_member_count || 180;
      
      discordCache = { members, updatedAt: Date.now() };
      res.json({ members, cached: false });
    } catch (error) {
      console.error("Discord API error:", error);
      res.json({ members: discordCache?.members || 180, cached: false });
    }
  });

  app.get("/api/youtube/stats", async (_req, res) => {
    try {
      if (youtubeCache && Date.now() - youtubeCache.updatedAt < CACHE_DURATION) {
        return res.json({ subscribers: youtubeCache.subscribers, cached: true });
      }

      const apiKey = process.env.YOUTUBE_API_KEY;
      const channelId = process.env.YOUTUBE_CHANNEL_ID || "UC7020Psykose";
      
      if (!apiKey) {
        return res.json({ subscribers: 340, cached: false, error: "No API key" });
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
      );
      
      if (!response.ok) {
        return res.json({ subscribers: youtubeCache?.subscribers || 340, cached: false });
      }

      const data = await response.json();
      const subscribers = parseInt(data.items?.[0]?.statistics?.subscriberCount || "340", 10);
      
      youtubeCache = { subscribers, updatedAt: Date.now() };
      res.json({ subscribers, cached: false });
    } catch (error) {
      console.error("YouTube API error:", error);
      res.json({ subscribers: youtubeCache?.subscribers || 340, cached: false });
    }
  });

  app.get("/api/guides", async (_req, res) => {
    try {
      const guides = await storage.getCustomGuides();
      res.json(guides);
    } catch (error) {
      console.error("Get guides error:", error);
      res.status(500).json({ error: "Failed to get guides" });
    }
  });

  app.post("/api/admin/guides", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { categoryId, title, description, content, icon, color, link, externalLink, featured, sortOrder } = req.body;
      
      if (!categoryId || !title || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const guide = await storage.createCustomGuide({
        categoryId,
        title: title.substring(0, 200),
        description: description.substring(0, 500),
        content: content ? content.substring(0, 10000) : null,
        icon: icon || "BookOpen",
        color: color || "from-blue-500 to-cyan-600",
        link: validateInternalLink(link),
        externalLink: validateExternalUrl(externalLink),
        featured: featured ? 1 : 0,
        sortOrder: sortOrder || 0,
      });

      res.json(guide);
    } catch (error) {
      console.error("Create guide error:", error);
      res.status(500).json({ error: "Failed to create guide" });
    }
  });

  app.put("/api/admin/guides/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;

      const guideUpdateSchema = z.object({
        categoryId: z.string().max(100).optional(),
        title: z.string().max(200).optional(),
        description: z.string().max(500).optional(),
        content: z.string().max(10000).nullable().optional(),
        icon: z.string().max(50).optional(),
        color: z.string().max(100).optional(),
        link: z.string().max(500).nullable().optional(),
        externalLink: z.string().max(2000).nullable().optional(),
        featured: z.number().int().min(0).max(1).optional(),
        sortOrder: z.number().int().optional(),
      });

      const parsed = guideUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid fields" });
      }

      const updates = {
        ...parsed.data,
        link: validateInternalLink(parsed.data.link),
        externalLink: validateExternalUrl(parsed.data.externalLink),
      };

      const guide = await storage.updateCustomGuide(id, updates);
      if (!guide) {
        return res.status(404).json({ error: "Guide not found" });
      }

      res.json(guide);
    } catch (error) {
      console.error("Update guide error:", error);
      res.status(500).json({ error: "Failed to update guide" });
    }
  });

  app.delete("/api/admin/guides/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      await storage.deleteCustomGuide(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete guide error:", error);
      res.status(500).json({ error: "Failed to delete guide" });
    }
  });

  const compositionSchema = z.object({
    composition: z.string().min(10, "La composition doit contenir au moins 10 caractères").max(5000),
    strategy: z.string().max(2000).nullable().optional(),
    universe: z.string().max(100).nullable().optional(),
  });

  app.post("/api/surveys/fleet", async (req, res) => {
    try {
      const parsed = compositionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0]?.message || "Données invalides" });
      }
      
      await storage.createFleetComposition({
        composition: parsed.data.composition,
        strategy: parsed.data.strategy || null,
        universe: parsed.data.universe || null,
      });
      
      res.json({ success: true, message: "Merci pour votre participation !" });
    } catch (error) {
      console.error("Error saving fleet composition:", error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement" });
    }
  });

  app.post("/api/surveys/defense", async (req, res) => {
    try {
      const parsed = compositionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0]?.message || "Données invalides" });
      }
      
      await storage.createDefenseComposition({
        composition: parsed.data.composition,
        strategy: parsed.data.strategy || null,
        universe: parsed.data.universe || null,
      });
      
      res.json({ success: true, message: "Merci pour votre participation !" });
    } catch (error) {
      console.error("Error saving defense composition:", error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement" });
    }
  });

  app.get("/api/admin/compositions", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const fleetCompositions = await storage.listFleetCompositions();
      const defenseCompositions = await storage.listDefenseCompositions();
      
      res.json({
        fleet: fleetCompositions,
        defense: defenseCompositions,
      });
    } catch (error) {
      console.error("Error fetching compositions:", error);
      res.status(500).json({ error: "Failed to fetch compositions" });
    }
  });

  app.delete("/api/admin/compositions/fleet/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await storage.deleteFleetComposition(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting fleet composition:", error);
      res.status(500).json({ error: "Failed to delete composition" });
    }
  });

  app.delete("/api/admin/compositions/defense/:id", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await storage.deleteDefenseComposition(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting defense composition:", error);
      res.status(500).json({ error: "Failed to delete composition" });
    }
  });

  app.get("/api/admin/compositions/export", async (req, res) => {
    try {
      const token = req.cookies?.adminToken;
      if (!token || !validateToken(token)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const exportIp = extractClientIp(req) || "admin";
      if (checkPublicRateLimit(`export:${exportIp}`, 5, 60 * 1000)) {
        return res.status(429).json({ error: "Trop de requêtes d'export. Attendez 1 minute." });
      }

      const fleetCompositions = await storage.listFleetCompositions();
      const defenseCompositions = await storage.listDefenseCompositions();

      const fleetUnits = ["PT", "GT", "REC", "SE", "CL", "CLo", "CR", "VB", "BB", "DEST", "TRAQ", "EDM", "FAUCH", "ECL"];
      const defenseUnits = ["LM", "LL", "LLo", "Gauss", "Ion", "Plasma", "PB", "GB"];

      const parseComposition = (comp: string, units: string[]): Record<string, number> => {
        const result: Record<string, number> = {};
        units.forEach(u => result[u] = 0);
        
        const parts = comp.split("|").map(p => p.trim());
        parts.forEach(part => {
          const match = part.match(/^([A-Za-zÉé]+):\s*([\d\s.]+)$/);
          if (match) {
            const abbrev = match[1].toUpperCase();
            const qty = parseInt(match[2].replace(/[\s.]/g, "")) || 0;
            const unitKey = units.find(u => u.toUpperCase() === abbrev);
            if (unitKey) {
              result[unitKey] = qty;
            }
          }
        });
        return result;
      };

      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Psykoverse";
      workbook.created = new Date();

      const fleetSheet = workbook.addWorksheet("Compositions Flotte");
      fleetSheet.columns = [
        { header: "Date", key: "createdAt", width: 12 },
        { header: "Univers", key: "universe", width: 12 },
        ...fleetUnits.map(u => ({ header: u, key: u, width: 10 })),
        { header: "Commentaire", key: "strategy", width: 30 },
      ];
      fleetSheet.getRow(1).font = { bold: true };
      fleetSheet.getRow(1).fill = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "FF4A5568" } };
      fleetSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      
      fleetCompositions.forEach(c => {
        const parsed = parseComposition(c.composition, fleetUnits);
        fleetSheet.addRow({
          createdAt: c.createdAt.toISOString().split("T")[0],
          universe: c.universe || "",
          ...parsed,
          strategy: c.strategy || "",
        });
      });

      const defenseSheet = workbook.addWorksheet("Compositions Défense");
      defenseSheet.columns = [
        { header: "Date", key: "createdAt", width: 12 },
        { header: "Univers", key: "universe", width: 12 },
        ...defenseUnits.map(u => ({ header: u, key: u, width: 10 })),
        { header: "Commentaire", key: "strategy", width: 30 },
      ];
      defenseSheet.getRow(1).font = { bold: true };
      defenseSheet.getRow(1).fill = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "FF4A5568" } };
      defenseSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      
      defenseCompositions.forEach(c => {
        const parsed = parseComposition(c.composition, defenseUnits);
        defenseSheet.addRow({
          createdAt: c.createdAt.toISOString().split("T")[0],
          universe: c.universe || "",
          ...parsed,
          strategy: c.strategy || "",
        });
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=compositions_psykoverse.xlsx");
      
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error("Error exporting compositions:", error);
      res.status(500).json({ error: "Failed to export compositions" });
    }
  });

  return httpServer;
}
