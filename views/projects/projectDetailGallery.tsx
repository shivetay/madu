import Image from "next/image";
import type { Project } from "@/lib/types/project";

type Props = {
  project: Project;
};

export function ProjectDetailGallery({ project }: Props) {
  const imgs = project.images;
  if (imgs.length < 2) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 pb-16 md:px-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={imgs[1]}
            alt={`${project.title} — detal`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden md:mt-20">
          <Image
            src={imgs[0]}
            alt={`${project.title} — widok ogólny`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {imgs.length > 2 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {imgs.slice(2).map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={src}
                alt={`${project.title} — ${index + 3}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
