import { revalidatePath } from "next/cache";

export function revalidateProjectBySlug(slug: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}
