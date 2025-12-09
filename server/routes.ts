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

  return httpServer;
}
