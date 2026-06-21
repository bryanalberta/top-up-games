import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

let dbUrl = process.env.DATABASE_URL || "file:./dev.db";

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
      console.log(`Copying SQLite database from ${srcPath} to ${destPath}`);
      if (fs.existsSync(destPath)) {
        try {
          fs.unlinkSync(destPath);
        } catch (e) {}
      }
      fs.copyFileSync(srcPath, destPath);
      fs.chmodSync(destPath, 0o666);
      
      // Use 3 slashes for absolute path on Linux Vercel environment
      dbUrl = "file:///tmp/dev.db";
      process.env.DATABASE_URL = dbUrl;
    } else {
      console.error(`Could not find dev.db in any of the search paths: ${JSON.stringify(pathsToTry)}`);
    }
  } catch (error) {
    console.error("Failed to copy SQLite database to /tmp:", error);
  }
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

export default prisma;
