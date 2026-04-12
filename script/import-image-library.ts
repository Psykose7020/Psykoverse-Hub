import fs from "fs";
import path from "path";
import { db } from "../server/db";
import { imageLibrary } from "../shared/schema";
import { sql } from "drizzle-orm";

const ROOT_DIR = path.resolve(process.cwd(), "attached_assets", "Database");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function toTitleCase(value: string): string {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = walk(ROOT_DIR);

  await db.delete(imageLibrary).where(sql`${imageLibrary.imageUrl} LIKE '/attached_assets/Database/%'`);

  const items = files.map((filePath, index) => {
    const relativePath = path.relative(path.resolve(process.cwd(), "attached_assets"), filePath).split(path.sep).join("/");
    const pathParts = relativePath.split("/");
    const category = pathParts[1] || "general";
    const filename = pathParts[pathParts.length - 1];

    return {
      title: toTitleCase(filename),
      imageUrl: `/attached_assets/${relativePath}`,
      thumbnailUrl: `/attached_assets/${relativePath}`,
      altText: toTitleCase(filename),
      category,
      tags: pathParts.slice(1, -1).join(", "),
      sourceUrl: null,
      credit: "Bibliothèque interne Psykoverse",
      isActive: 1,
      sortOrder: index,
    };
  });

  if (items.length > 0) {
    await db.insert(imageLibrary).values(items);
  }

  console.log(`Imported ${items.length} image(s) into image_library`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
