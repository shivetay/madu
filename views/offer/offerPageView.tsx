import type { Service } from "@/lib/types/service";
import { OfferCtaSection } from "@/views/offer/offerCtaSection";
import { OfferHeroSection } from "@/views/offer/offerHeroSection";
import { OfferServicesSection } from "@/views/offer/offerServicesSection";

type Props = {
  services: Service[];
};

export function OfferPageView({ services }: Props) {
  return (
    <main className="pt-16">
      <OfferHeroSection />
      <OfferServicesSection services={services} />
      <OfferCtaSection />
    </main>
  );
}
