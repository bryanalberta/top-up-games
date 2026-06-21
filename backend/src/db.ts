import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Workaround for SQLite on Vercel read-only filesystem
if (process.env.VERCEL) {
  const srcPath = path.join(process.cwd(), "dev.db");
  const destPath = "/tmp/dev.db";

  try {
    if (!fs.existsSync(destPath)) {
      console.log(`Copying SQLite database from ${srcPath} to ${destPath}`);
      fs.copyFileSync(srcPath, destPath);
      // Give write permissions
      fs.chmodSync(destPath, 0o666);
    } else {
      console.log(`SQLite database already exists at ${destPath}`);
    }
    // Set the environment variable dynamically for Prisma
    process.env.DATABASE_URL = "file:" + destPath;
  } catch (error) {
    console.error("Failed to copy SQLite database to /tmp:", error);
  }
}

const prisma = new PrismaClient();

export default prisma;
