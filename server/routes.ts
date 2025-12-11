import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomBytes, createHmac } from "crypto";
import { z } from "zod";

const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
const activeSessions = new Map<string, { createdAt: number }>();

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

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

function generateSecureToken(): string {
  const sessionId = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(sessionId + timestamp)
    .digest("hex");
  return `${sessionId}.${timestamp}.${signature}`;
}

function validateToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    
    const [sessionId, timestamp, signature] = parts;
    const expectedSignature = createHmac("sha256", SESSION_SECRET)
      .update(sessionId + timestamp)
      .digest("hex");
    
    if (signature !== expectedSignature) return false;
    
    const session = activeSessions.get(sessionId);
    if (!session) return false;
    
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 24 * 60 * 60 * 1000) {
      activeSessions.delete(sessionId);
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

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
      const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip || null;
      
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

  app.post("/api/admin/login", async (req, res) => {
    try {
      const ip = req.ip || req.socket?.remoteAddress || "unknown";
      
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
      
      if (password === adminPassword) {
        recordLoginAttempt(ip, true);
        const token = generateSecureToken();
        const sessionId = token.split(".")[0];
        activeSessions.set(sessionId, { createdAt: Date.now() });
        res.json({ success: true, token });
      } else {
        recordLoginAttempt(ip, false);
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        const sessionId = token.split(".")[0];
        activeSessions.delete(sessionId);
      }
      res.json({ success: true });
    } catch (error) {
      res.json({ success: true });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const stats = await storage.getVisitStats();
      const ipSet = new Set(stats.recentVisits.map(v => v.ip).filter(Boolean));
      const uniqueIPs = Array.from(ipSet) as string[];
      
      const geoData: Array<{ ip: string; lat: number; lon: number; city: string; country: string; count: number }> = [];
      
      for (const ip of uniqueIPs.slice(0, 20)) {
        try {
          const response = await fetch(`https://ipapi.co/${ip}/json/`);
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
        } catch {}
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
      const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip || null;
      
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      
      const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip || null;
      
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      res.json({ valid: true });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/admin/content", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const { id, content } = req.body;
      if (!id || typeof id !== "string" || !content || typeof content !== "string") {
        return res.status(400).json({ error: "Invalid request" });
      }

      if (id.length > 100 || content.length > 10000) {
        return res.status(400).json({ error: "Content too long" });
      }

      const sanitizedContent = content.replace(/<[^>]*>/g, "").trim();
      const updated = await storage.upsertEditableContent({ id, content: sanitizedContent });
      res.json(updated);
    } catch (error) {
      console.error("Content save error:", error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  app.post("/api/admin/content/bulk", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const { contents } = req.body;
      if (!contents || typeof contents !== "object") {
        return res.status(400).json({ error: "Invalid request" });
      }

      const results: Record<string, string> = {};
      for (const [id, content] of Object.entries(contents)) {
        if (typeof content === "string" && id.length <= 100 && content.length <= 10000) {
          const sanitizedContent = content.replace(/<[^>]*>/g, "").trim();
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
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
        link: link || null,
        externalLink: externalLink || null,
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const { id } = req.params;
      const updates = req.body;

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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      if (!validateToken(token)) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const { id } = req.params;
      await storage.deleteCustomGuide(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete guide error:", error);
      res.status(500).json({ error: "Failed to delete guide" });
    }
  });

  return httpServer;
}
