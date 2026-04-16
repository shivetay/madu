import type { Project } from "@/lib/types/project";
import { ProjectsGrid } from "@/views/projects/projectsGrid";
import { ProjectsPageHeader } from "@/views/projects/projectsPageHeader";

type Props = {
  projects: Project[];
};

export function ProjectsPageView({ projects }: Props) {
  return (
    <main className="pt-16">
      <ProjectsPageHeader />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
