import type { Metadata } from "next";
import { getProjects } from "@/lib/data/projects";
import { ProjectsPageView } from "@/views/projects/projectsPageView";

export const metadata: Metadata = {
  title: "Realizacje | MADU HOME",
  description:
    "Portfolio projektów MADU HOME — chaty, wiejskie siedziby i domy w stylu francuskiego country.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsPageView projects={projects} />;
}
