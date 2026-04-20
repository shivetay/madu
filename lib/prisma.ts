import { PrismaClient } from "@prisma/client";

/**
 * Prisma z `provider = "postgresql"` wymaga URL zaczynającego się od
 * `postgres://` lub `postgresql://`. Inne wartości (np. placeholder, inny
 * silnik) powodują błąd już przy pierwszym zapytaniu — wtedy traktujemy URL
 * jak „brak skonfigurowanej bazy” (puste listy na froncie zamiast 500).
 */
export function isValidPostgresDatabaseUrl(url?: string): boolean {
  const raw = (url ?? process.env.DATABASE_URL)?.trim();
  if (!raw) return false;
  const u = raw.toLowerCase();
  return u.startsWith("postgres://") || u.startsWith("postgresql://");
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
