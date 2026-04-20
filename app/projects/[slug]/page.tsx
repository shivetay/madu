import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs, getProjects } from "@/lib/data/projects";
import { ProjectDetailPageView } from "@/views/projects/projectDetailPageView";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title =
    project.metaTitle?.trim() || `${project.title} | MADU HOME`;
  const description =
    project.metaDescription?.trim() || project.description;
  return {
    title,
    description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <ProjectDetailPageView
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
