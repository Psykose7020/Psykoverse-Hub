import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomBytes, createHmac } from "crypto";

const SESSION_SECRET = process.env.ADMIN_PASSWORD || randomBytes(32).toString("hex");
const activeSessions = new Map<string, { createdAt: number }>();

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
      const { page, referrer } = req.body;
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
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        return res.status(500).json({ error: "Admin password not configured" });
      }
      
      if (password === adminPassword) {
        const token = generateSecureToken();
        const sessionId = token.split(".")[0];
        activeSessions.set(sessionId, { createdAt: Date.now() });
        res.json({ success: true, token });
      } else {
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
      const uniqueIPs = [...new Set(stats.recentVisits.map(v => v.ip).filter(Boolean))];
      
      const geoData: Array<{ ip: string; lat: number; lon: number; city: string; country: string; count: number }> = [];
      
      for (const ip of uniqueIPs.slice(0, 20)) {
        try {
          const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,lat,lon`);
          const data = await response.json();
          if (data.status === "success") {
            const count = stats.recentVisits.filter(v => v.ip === ip).length;
            geoData.push({
              ip: ip as string,
              lat: data.lat,
              lon: data.lon,
              city: data.city || "Inconnu",
              country: data.country || "Inconnu",
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
      const { message, page } = req.body;
      
      if (!message || typeof message !== "string" || message.trim().length < 5) {
        return res.status(400).json({ error: "Le message doit contenir au moins 5 caractères" });
      }
      
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

  return httpServer;
}
