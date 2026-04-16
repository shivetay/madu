import type { Metadata } from "next";
import { getHomeContent } from "@/lib/data/homeContent";
import { getProjects } from "@/lib/data/projects";
import { HomePageView } from "@/views/home/homePageView";

export const metadata: Metadata = {
  title: "MADU HOME | Pracownia projektowania wnętrz",
  description:
    "Elegancka pracownia wnętrz: styl wiejskiej siedziby, angielska chata, rustyka i francuski country.",
};

export default async function Page() {
  const [content, projects] = await Promise.all([
    getHomeContent(),
    getProjects(),
  ]);
  const featuredProjects = projects.slice(0, 3);

  return <HomePageView content={content} featuredProjects={featuredProjects} />;
}
