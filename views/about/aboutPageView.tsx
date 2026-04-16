import type { AboutContent } from "@/lib/data/aboutContent";
import { AboutHeroSection } from "@/views/about/aboutHeroSection";
import { AboutPhilosophySection } from "@/views/about/aboutPhilosophySection";
import { AboutPortraitSection } from "@/views/about/aboutPortraitSection";
import { AboutValuesSection } from "@/views/about/aboutValuesSection";

type Props = {
  content: AboutContent;
};

export function AboutPageView({ content }: Props) {
  return (
    <main className="pt-16">
      <AboutHeroSection />
      <AboutPortraitSection
        imageSrc={content.portrait.src}
        imageAlt={content.portrait.alt}
        bioTitle={content.bioTitle}
        bioParagraphs={content.bioParagraphs}
      />
      <AboutPhilosophySection
        quote={content.quote}
        attribution={content.quoteAttribution}
      />
      <AboutValuesSection
        title={content.valuesTitle}
        values={content.values}
      />
    </main>
  );
}
