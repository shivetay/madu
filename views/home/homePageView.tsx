import type { HomeContent } from "@/lib/types/homeContent";
import type { Project } from "@/lib/types/project";
import { HomeFeaturedSection } from "@/views/home/homeFeaturedSection";
import { HomeHeroSection } from "@/views/home/homeHeroSection";
import { HomeIntroSection } from "@/views/home/homeIntroSection";

type Props = {
  content: HomeContent;
  featuredProjects: Project[];
};

export function HomePageView({ content, featuredProjects }: Props) {
  return (
    <main className="pt-16">
      <HomeHeroSection
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        lead={content.heroLead}
        imageSrc={content.heroImageSrc}
        imageAlt={content.heroImageAlt}
      />
      <HomeIntroSection
        title={content.introTitle}
        body={content.introBody}
        imageSrc={content.introImageSrc}
        imageAlt={content.introImageAlt}
      />
      <HomeFeaturedSection projects={featuredProjects} />
    </main>
  );
}
