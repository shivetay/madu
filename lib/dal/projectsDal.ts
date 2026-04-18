import type { Project as UiProject } from "@/lib/types/project";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { isValidPostgresDatabaseUrl, prisma } from "@/lib/prisma";
import { slugifyTitle } from "@/lib/utils/slugify";

function hasDatabaseUrl() {
  return isValidPostgresDatabaseUrl();
}

function assertDatabaseUrl() {
  if (!hasDatabaseUrl()) {
    throw new Error(
      "Brak poprawnego DATABASE_URL — ustaw connection string Postgres z prefiksem postgres:// lub postgresql:// (patrz .env.example).",
    );
  }
}

/**
 * Błędy, przy których publiczne odczyty zwracają pusty wynik zamiast 500:
 * - brak połączenia (Postgres wyłączony, zły host/port),
 * - brak migracji / tabeli (P2021 — uruchom `npx prisma db push`).
 */
function isDegradableReadError(e: unknown): boolean {
  if (e instanceof PrismaClientInitializationError) return true;
  if (e instanceof PrismaClientKnownRequestError) {
    return (
      e.code === "P1001" ||
      e.code === "P1017" ||
      e.code === "P2021"
    );
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
          "[projectsDal] Odczyt projektów niemożliwy — zwracam pusty wynik. Sprawdź Postgres, DATABASE_URL oraz `npx prisma db push`.",
        );
      }
      return fallback;
    }
    throw e;
  }
}

type DbProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  year: string;
  type: string;
  published: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  images: {
    id: string;
    url: string;
    alt: string | null;
    sortOrder: number;
    isCover: boolean;
  }[];
};

function mapToUi(p: DbProject): UiProject {
  const imgs = [...p.images].sort((a, b) => {
    if (a.isCover !== b.isCover) return a.isCover ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id.localeCompare(b.id);
  });
  const urls = imgs.map((i) => i.url);
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    location: p.location,
    year: p.year,
    type: p.type,
    images: urls.length > 0 ? urls : ["/icon.svg"],
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
  };
}

export async function dalListPublishedForPublic(): Promise<UiProject[]> {
  return withDalReadFallback([], async () => {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      include: { images: true },
    });
    return rows.map((r) => mapToUi(r as DbProject));
  });
}

export async function dalGetPublishedBySlug(
  slug: string,
): Promise<UiProject | null> {
  return withDalReadFallback(null, async () => {
    const row = await prisma.project.findFirst({
      where: { slug, published: true },
      include: { images: true },
    });
    return row ? mapToUi(row as DbProject) : null;
  });
}

export async function dalListSlugsPublished(): Promise<string[]> {
  return withDalReadFallback([], async () => {
    const rows = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  });
}

export async function dalListAllForStudio() {
  return withDalReadFallback([], async () =>
    prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      include: { images: true },
    }),
  );
}

export async function dalGetBySlugForStudio(slug: string) {
  return withDalReadFallback(null, async () =>
    prisma.project.findUnique({
      where: { slug },
      include: { images: true },
    }),
  );
}

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  let n = 0;
  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function dalCreateProject(data: {
  title: string;
  description: string;
  location: string;
  year: string;
  type: string;
  published?: boolean;
  sortOrder?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
}) {
  assertDatabaseUrl();
  const base = slugifyTitle(data.title);
  const slug = await ensureUniqueSlug(base);
  return prisma.project.create({
    data: {
      slug,
      title: data.title,
      description: data.description,
      location: data.location,
      year: data.year,
      type: data.type,
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? 0,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
    },
  });
}

export async function dalUpdateProjectBySlug(
  slug: string,
  data: {
    title?: string;
    description?: string;
    location?: string;
    year?: string;
    type?: string;
    published?: boolean;
    sortOrder?: number;
    metaTitle?: string | null;
    metaDescription?: string | null;
  },
) {
  assertDatabaseUrl();
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (!existing) throw new Error("Projekt nie istnieje");
  return prisma.project.update({
    where: { slug },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.location !== undefined ? { location: data.location } : {}),
      ...(data.year !== undefined ? { year: data.year } : {}),
      ...(data.type !== undefined ? { type: data.type } : {}),
      ...(data.published !== undefined ? { published: data.published } : {}),
      ...(data.sortOrder !== undefined ? { sortOrder: data.sortOrder } : {}),
      ...(data.metaTitle !== undefined ? { metaTitle: data.metaTitle } : {}),
      ...(data.metaDescription !== undefined
        ? { metaDescription: data.metaDescription }
        : {}),
    },
  });
}

export async function dalAppendImageForSlug(
  slug: string,
  url: string,
  utKey: string | null,
) {
  assertDatabaseUrl();
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });
  if (!project) throw new Error("Projekt nie istnieje");
  const maxOrder = project.images.reduce(
    (m, i) => Math.max(m, i.sortOrder),
    -1,
  );
  const hasCover = project.images.some((i) => i.isCover);
  return prisma.projectImage.create({
    data: {
      projectId: project.id,
      url,
      utKey,
      sortOrder: maxOrder + 1,
      isCover: !hasCover,
    },
  });
}

export async function dalDeleteImage(imageId: string) {
  assertDatabaseUrl();
  const img = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (!img) throw new Error("Zdjęcie nie istnieje");
  await prisma.projectImage.delete({ where: { id: imageId } });
  if (img.isCover) {
    const next = await prisma.projectImage.findFirst({
      where: { projectId: img.projectId },
      orderBy: { sortOrder: "asc" },
    });
    if (next) {
      await prisma.projectImage.update({
        where: { id: next.id },
        data: { isCover: true },
      });
    }
  }
  return { utKey: img.utKey };
}

export async function dalSetCoverImage(imageId: string) {
  assertDatabaseUrl();
  const img = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (!img) throw new Error("Zdjęcie nie istnieje");
  await prisma.projectImage.updateMany({
    where: { projectId: img.projectId },
    data: { isCover: false },
  });
  await prisma.projectImage.update({
    where: { id: imageId },
    data: { isCover: true },
  });
}

export async function dalReorderImages(projectSlug: string, orderedIds: string[]) {
  assertDatabaseUrl();
  const project = await prisma.project.findUnique({ where: { slug: projectSlug } });
  if (!project) throw new Error("Projekt nie istnieje");
  const existing = await prisma.projectImage.findMany({
    where: { projectId: project.id },
    select: { id: true },
  });
  const allowed = new Set(existing.map((e) => e.id));
  for (const id of orderedIds) {
    if (!allowed.has(id)) throw new Error("Nieprawidłowe zdjęcie w kolejności");
  }
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.projectImage.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );
}

export async function dalUpdateImageAlt(imageId: string, alt: string | null) {
  assertDatabaseUrl();
  return prisma.projectImage.update({
    where: { id: imageId },
    data: { alt },
  });
}
