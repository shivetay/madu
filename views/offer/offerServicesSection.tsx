import type { Service } from "@/lib/types/service";
import { OfferServiceRow } from "@/views/offer/offerServiceRow";

type Props = {
  services: Service[];
};

export function OfferServicesSection({ services }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
      <div className="divide-y divide-border">
        {services.map((service) => (
          <OfferServiceRow key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}
