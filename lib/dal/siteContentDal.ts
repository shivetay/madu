import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { isValidPostgresDatabaseUrl, prisma } from "@/lib/prisma";
import { siteContentDefaults } from "@/lib/data/siteContentDefaults";
import {
  aboutContentSchema,
  homeContentSchema,
  offerContentSchema,
  siteContentFallbackForStudio,
} from "@/lib/studio/siteContentValidation";
import type { SiteContentKey, SiteContentMap } from "@/lib/types/siteContent";

type SiteContentRecord = {
  id: string;
  key: SiteContentKey;
  payload: unknown;
};

const contentSchemaByKey = {
  home: homeContentSchema,
  about: aboutContentSchema,
  offer: offerContentSchema,
} as const;

function hasDatabaseUrl() {
  return isValidPostgresDatabaseUrl();
}

function assertDatabaseUrl() {
  if (!hasDatabaseUrl()) {
    throw new Error(
      "Brak poprawnego DATABASE_URL - ustaw connection string Postgres z prefiksem postgres:// lub postgresql://.",
    );
  }
}

function isDegradableReadError(e: unknown): boolean {
  if (e instanceof PrismaClientInitializationError) return true;
  if (e instanceof PrismaClientKnownRequestError) {
    return e.code === "P1001" || e.code === "P1017" || e.code === "P2021";
  }
  if (e instanceof Error) {
    const m = e.message;
    return (
      m.includes("Can't reach database server") ||
      m.includes("ECONNREFUSED") ||
      m.includes("ETIMEDOUT") ||
      m.includes("ENOTFOUND") ||
      m.includes("getaddrinfo ENOTFOUND") ||
      m.includes("does not exist in the current database")
    );
  }
  return false;
}

async function withDalReadFallback<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  if (!hasDatabaseUrl()) return fallback;
  try {
    return await fn();
  } catch (e) {
    if (isDegradableReadError(e)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[siteContentDal] Odczyt treści niemożliwy - zwracam fallback. Sprawdź Postgres, DATABASE_URL oraz migracje Prisma.",
        );
      }
      return fallback;
    }
    throw e;
  }
}

function validateContent<K extends SiteContentKey>(
  key: K,
  payload: unknown,
): SiteContentMap[K] {
  const schema = contentSchemaByKey[key];
  const parsed = schema.safeParse(payload);
  if (parsed.success) return parsed.data as SiteContentMap[K];
  return siteContentDefaults[key] as SiteContentMap[K];
}

async function readRowByKey<K extends SiteContentKey>(
  key: K,
): Promise<SiteContentMap[K]> {
  const row = (await prisma.siteContent.findUnique({
    where: { key },
  })) as SiteContentRecord | null;
  if (!row) {
    return siteContentDefaults[key] as SiteContentMap[K];
  }
  return validateContent(key, row.payload);
}

export async function dalGetSiteContentForPublic<K extends SiteContentKey>(
  key: K,
): Promise<SiteContentMap[K]> {
  return withDalReadFallback(siteContentDefaults[key] as SiteContentMap[K], () =>
    readRowByKey(key),
  );
}

export async function dalGetAllSiteContentForStudio(): Promise<SiteContentMap> {
  return withDalReadFallback(siteContentFallbackForStudio, async () => {
    const [home, about, offer] = await Promise.all([
      readRowByKey("home"),
      readRowByKey("about"),
      readRowByKey("offer"),
    ]);
    return { home, about, offer };
  });
}

export async function dalUpdateSiteContent<K extends SiteContentKey>(
  key: K,
  payload: SiteContentMap[K],
): Promise<SiteContentMap[K]> {
  assertDatabaseUrl();
  const sanitized = validateContent(key, payload);
  await prisma.siteContent.upsert({
    where: { key },
    create: { key, payload: sanitized },
    update: { payload: sanitized },
  });
  return sanitized;
}

export async function dalUpdateSiteImage(
  key: "home" | "about",
  field: "heroImageSrc" | "introImageSrc" | "portrait.src",
  url: string,
) {
  assertDatabaseUrl();

  if (key === "home") {
    const content = await readRowByKey("home");
    if (field === "heroImageSrc") {
      content.heroImageSrc = url;
    } else if (field === "introImageSrc") {
      content.introImageSrc = url;
    }
    await dalUpdateSiteContent("home", content);
    return;
  }

  const content = await readRowByKey("about");
  if (field === "portrait.src") {
    content.portrait.src = url;
  }
  await dalUpdateSiteContent("about", content);
}
