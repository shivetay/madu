import Image from "next/image";
import type { Project } from "@/lib/types/project";

type Props = {
  project: Project;
};

export function ProjectDetailHero({ project }: Props) {
  const hero = project.images[0] ?? "/icon.svg";
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={hero}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>
    </div>
  );
}
