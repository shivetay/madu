import type { Project } from "@/lib/types/project";
import {
  dalGetPublishedBySlug,
  dalListPublishedForPublic,
  dalListSlugsPublished,
} from "@/lib/dal/projectsDal";

export async function getProjects(): Promise<Project[]> {
  return dalListPublishedForPublic();
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const p = await dalGetPublishedBySlug(slug);
  return p ?? undefined;
}

export async function getProjectSlugs(): Promise<string[]> {
  return dalListSlugsPublished();
}
