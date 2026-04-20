/**
 * `prisma generate` na Windows bywa kończył się EPERM przy rename DLL (plik zablokowany).
 * Kilka prób + usunięcie `node_modules/.prisma` zwykle pomaga — zamknij wcześniej `npm run dev`.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const prismaCache = path.join(root, "node_modules", ".prisma");

function rmPrismaCache() {
  try {
    fs.rmSync(prismaCache, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const maxAttempts = 4;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    execSync("prisma generate", {
      stdio: "inherit",
      cwd: root,
      shell: true,
      env: process.env,
    });
    process.exit(0);
  } catch {
    console.warn(
      `\n[postinstall] prisma generate — próba ${attempt}/${maxAttempts} nieudana (często EPERM na Windows).`,
    );
    if (attempt < maxAttempts) {
      console.warn(
        "→ Zamknij procesy Node (np. Next dev), ewentualnie IDE trzymające pliki w node_modules, potem ponawiam…\n",
      );
      rmPrismaCache();
      await sleep(800 * attempt);
    }
  }
}

console.error(
  "\n[postinstall] Nadal błąd. Uruchom ręcznie po zamknięciu dev serwera:\n  npm run db:generate\n",
);
process.exit(1);
