import type { Metadata } from "next";
import { getAboutContent } from "@/lib/data/aboutContent";
import { AboutPageView } from "@/views/about/aboutPageView";

export const metadata: Metadata = {
  title: "O nas | MADU HOME",
  description:
    "Poznaj projektantkę i filozofię pracowni MADU HOME.",
};

export default async function AboutPage() {
  const content = await getAboutContent();
  return <AboutPageView content={content} />;
}
