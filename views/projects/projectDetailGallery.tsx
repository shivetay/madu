import Image from "next/image";
import type { Project } from "@/lib/types/project";

type Props = {
  project: Project;
};

export function ProjectDetailGallery({ project }: Props) {
  const second = project.images[1];
  if (!second) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={second}
            alt={`${project.title} — detal`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden md:mt-20">
          <Image
            src={project.images[0]}
            alt={`${project.title} — widok ogólny`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
