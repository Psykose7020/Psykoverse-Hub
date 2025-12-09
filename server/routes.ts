import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
        res.json({ success: true, token: Buffer.from(`admin:${Date.now()}`).toString("base64") });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = authHeader.slice(7);
      try {
        const decoded = Buffer.from(token, "base64").toString();
        if (!decoded.startsWith("admin:")) {
          return res.status(401).json({ error: "Invalid token" });
        }
      } catch {
        return res.status(401).json({ error: "Invalid token" });
      }

      const stats = await storage.getVisitStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  return httpServer;
}
