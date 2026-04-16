import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types/project";

type Props = {
  projects: Project[];
};

export function ProjectDetailRelated({ projects }: Props) {
  return (
    <section className="mx-auto max-w-6xl border-t border-border px-6 pt-16 pb-24 md:px-10">
      <h2
        className="mb-10 text-2xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Więcej realizacji
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(({ slug, title, location, images }) => (
          <Link key={slug} href={`/projects/${slug}`} className="group block">
            <div className="relative mb-4 aspect-[4/5] overflow-hidden">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <p
              className="text-sm text-foreground"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {title}
            </p>
            <p className="mt-1 text-xs tracking-wider text-muted-foreground">
              {location}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
