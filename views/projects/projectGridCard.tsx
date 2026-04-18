import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types/project";

type Props = {
  project: Project;
};

export function ProjectGridCard({ project }: Props) {
  const { slug, title, location, year, type, images } = project;
  const cover = images[0] ?? "/icon.svg";
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative mb-5 aspect-[4/5] overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-base text-foreground"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {title}
          </p>
          <p className="mt-1 text-xs tracking-wider text-muted-foreground">
            {location}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs tracking-wider text-muted-foreground">{type}</p>
          <p className="text-xs tracking-wider text-muted-foreground">{year}</p>
        </div>
      </div>
    </Link>
  );
}
