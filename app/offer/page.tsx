import type { Metadata } from "next";
import { getServices } from "@/lib/data/services";
import { OfferPageView } from "@/views/offer/offerPageView";

export const metadata: Metadata = {
  title: "Usługi | MADU HOME",
  description:
    "Projektowanie wnętrz w MADU HOME — pełna realizacja, stylizacja i konsultacje online.",
};

export default async function OfferPage() {
  const services = await getServices();
  return <OfferPageView services={services} />;
}
