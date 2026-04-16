import type { Project } from "@/lib/types/project";
import { ProjectGridCard } from "@/views/projects/projectGridCard";

type Props = {
  projects: Project[];
};

export function HomeFeaturedSection({ projects }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
        Wybrane
      </p>
      <h2
        className="mb-12 text-3xl md:text-4xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Ostatnie realizacje.
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectGridCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
