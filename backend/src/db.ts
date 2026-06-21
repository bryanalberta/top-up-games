import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Workaround for SQLite on Vercel read-only filesystem
if (process.env.VERCEL) {
  const pathsToTry = [
    path.join(__dirname, "..", "dev.db"),
    path.join(process.cwd(), "backend", "dev.db"),
    path.join(process.cwd(), "dev.db")
  ];

  let srcPath = "";
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      srcPath = p;
      break;
    }
  }

  const destPath = "/tmp/dev.db";

  try {
    if (srcPath) {
      if (!fs.existsSync(destPath)) {
        console.log(`Copying SQLite database from ${srcPath} to ${destPath}`);
        fs.copyFileSync(srcPath, destPath);
        fs.chmodSync(destPath, 0o666);
      } else {
        console.log(`SQLite database already exists at ${destPath}`);
      }
      process.env.DATABASE_URL = "file:" + destPath;
    } else {
      console.error(`Could not find dev.db in any of the search paths: ${JSON.stringify(pathsToTry)}`);
    }
  } catch (error) {
    console.error("Failed to copy SQLite database to /tmp:", error);
  }
}

const prisma = new PrismaClient();

export default prisma;
