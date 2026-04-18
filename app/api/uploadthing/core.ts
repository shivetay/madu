import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { auth } from "@/auth";
import { revalidateProjectBySlug } from "@/lib/cache/revalidateProjects";
import { dalAppendImageForSlug } from "@/lib/dal/projectsDal";

const f = createUploadthing();

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "16MB", maxFileCount: 8 },
  })
    .input(z.object({ slug: z.string().min(1) }))
    .middleware(async ({ input }) => {
      const session = await auth();
      if (!session?.user) {
        throw new UploadThingError("Brak autoryzacji");
      }
      return { slug: input.slug };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const key =
        "key" in file && typeof (file as { key?: string }).key === "string"
          ? (file as { key: string }).key
          : null;
      await dalAppendImageForSlug(metadata.slug, file.ufsUrl, key);
      revalidateProjectBySlug(metadata.slug);
      return { uploadedAt: Date.now() };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
