import type { Project } from "@/lib/types/project";
import { ProjectDetailBackLink } from "@/views/projects/projectDetailBackLink";
import { ProjectDetailGallery } from "@/views/projects/projectDetailGallery";
import { ProjectDetailHero } from "@/views/projects/projectDetailHero";
import { ProjectDetailInfo } from "@/views/projects/projectDetailInfo";
import { ProjectDetailRelated } from "@/views/projects/projectDetailRelated";

type Props = {
  project: Project;
  relatedProjects: Project[];
};

export function ProjectDetailPageView({
  project,
  relatedProjects,
}: Props) {
  return (
    <main className="pt-16">
      <ProjectDetailBackLink />
      <ProjectDetailHero project={project} />
      <ProjectDetailInfo project={project} />
      <ProjectDetailGallery project={project} />
      <ProjectDetailRelated projects={relatedProjects} />
    </main>
  );
}
