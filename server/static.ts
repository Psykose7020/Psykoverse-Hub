import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  const attachedAssetsPath = path.resolve(__dirname, "..", "attached_assets");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use("/attached_assets", express.static(attachedAssetsPath));
  app.use(express.static(distPath));

  app.use(/^\/api(?:\/|$)/, (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Serve the SPA only for non-API routes.
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
