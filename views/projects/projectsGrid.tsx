import type { Project } from "@/lib/types/project";
import { ProjectGridCard } from "@/views/projects/projectGridCard";

type Props = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectGridCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
