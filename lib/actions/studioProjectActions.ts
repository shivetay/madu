"use server";

import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import {
  proxyCreateProject,
  proxyDeleteImage,
  proxyReorderImages,
  proxySetCoverImage,
  proxyUpdateImageAlt,
  proxyUpdateProject,
} from "@/lib/proxy/studioProjectsProxy";

export async function actionUpdateProject(
  slug: string,
  data: Parameters<typeof proxyUpdateProject>[1],
) {
  await proxyUpdateProject(slug, data);
}

export async function actionCreateProject(
  data: Parameters<typeof proxyCreateProject>[0],
) {
  return proxyCreateProject(data);
}

export async function actionCreateProjectFromForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  if (!title || !description) {
    throw new Error("Tytuł i opis są wymagane.");
  }
  return proxyCreateProject({
    title,
    description,
    location: location || "—",
    year: year || "—",
    type: type || "—",
    published: false,
  });
}

export async function actionCreateProjectAndRedirect(formData: FormData) {
  const project = await actionCreateProjectFromForm(formData);
  redirect(`/studio/projekty/${project.slug}/edycja`);
}

export async function actionDeleteImage(imageId: string, projectSlug: string) {
  const { utKey } = await proxyDeleteImage(imageId, projectSlug);
  if (utKey && process.env.UPLOADTHING_TOKEN) {
    const utapi = new UTApi({ token: process.env.UPLOADTHING_TOKEN });
    try {
      await utapi.deleteFiles(utKey);
    } catch {
      /* plik mógł już nie istnieć */
    }
  }
}

export async function actionSetCoverImage(
  imageId: string,
  projectSlug: string,
) {
  await proxySetCoverImage(imageId, projectSlug);
}

export async function actionReorderImages(
  projectSlug: string,
  orderedIds: string[],
) {
  await proxyReorderImages(projectSlug, orderedIds);
}

export async function actionUpdateImageAlt(
  imageId: string,
  projectSlug: string,
  alt: string | null,
) {
  await proxyUpdateImageAlt(imageId, projectSlug, alt);
}
