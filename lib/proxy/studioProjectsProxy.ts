/**
 * Warstwa proxy studia: weryfikacja sesji + DAL + rewalidacja cache.
 * Nie wywołuj DAL zapisów projektów poza tym modułem ani server actions,
 * które go importują.
 */
import { auth } from "@/auth";
import { revalidateProjectBySlug } from "@/lib/cache/revalidateProjects";
import * as dal from "@/lib/dal/projectsDal";
import { redirect } from "next/navigation";

async function requireStudioSession() {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");
}

export async function proxyUpdateProject(
  slug: string,
  data: Parameters<typeof dal.dalUpdateProjectBySlug>[1],
) {
  await requireStudioSession();
  await dal.dalUpdateProjectBySlug(slug, data);
  revalidateProjectBySlug(slug);
}

export async function proxyCreateProject(
  data: Parameters<typeof dal.dalCreateProject>[0],
) {
  await requireStudioSession();
  const p = await dal.dalCreateProject(data);
  revalidateProjectBySlug(p.slug);
  return p;
}

export async function proxyDeleteImage(imageId: string, projectSlug: string) {
  await requireStudioSession();
  const { utKey } = await dal.dalDeleteImage(imageId);
  revalidateProjectBySlug(projectSlug);
  return { utKey };
}

export async function proxySetCoverImage(
  imageId: string,
  projectSlug: string,
) {
  await requireStudioSession();
  await dal.dalSetCoverImage(imageId);
  revalidateProjectBySlug(projectSlug);
}

export async function proxyReorderImages(
  projectSlug: string,
  orderedIds: string[],
) {
  await requireStudioSession();
  await dal.dalReorderImages(projectSlug, orderedIds);
  revalidateProjectBySlug(projectSlug);
}

export async function proxyUpdateImageAlt(
  imageId: string,
  projectSlug: string,
  alt: string | null,
) {
  await requireStudioSession();
  await dal.dalUpdateImageAlt(imageId, alt);
  revalidateProjectBySlug(projectSlug);
}
