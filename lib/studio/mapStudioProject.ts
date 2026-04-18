import type { Project, ProjectImage } from "@prisma/client";
import type { StudioEditorProject } from "@/lib/types/studioEditorProject";

export type StudioProjectRow = Project & { images: ProjectImage[] };

export function mapRowToStudioEditor(row: StudioProjectRow): StudioEditorProject {
  const images = [...row.images].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id.localeCompare(b.id);
  });
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    location: row.location,
    year: row.year,
    type: row.type,
    published: row.published,
    sortOrder: row.sortOrder,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    images: images.map((i) => ({
      id: i.id,
      url: i.url,
      alt: i.alt,
      sortOrder: i.sortOrder,
      isCover: i.isCover,
    })),
  };
}
