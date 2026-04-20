import type { Service } from "@/lib/types/service";
import type { OfferContent } from "@/lib/types/siteContent";
import { OfferCtaSection } from "@/views/offer/offerCtaSection";
import { OfferHeroSection } from "@/views/offer/offerHeroSection";
import { OfferServicesSection } from "@/views/offer/offerServicesSection";

type Props = {
  content: OfferContent;
  services: Service[];
};

export function OfferPageView({ content, services }: Props) {
  return (
    <main className="pt-16">
      <OfferHeroSection
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        lead={content.heroLead}
      />
      <OfferServicesSection services={services} />
      <OfferCtaSection
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        buttonLabel={content.ctaButtonLabel}
      />
    </main>
  );
}
