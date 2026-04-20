import type { Metadata } from "next";
import { getOfferContent } from "@/lib/data/offerContent";
import { OfferPageView } from "@/views/offer/offerPageView";

export const metadata: Metadata = {
  title: "Usługi | MADU HOME",
  description:
    "Projektowanie wnętrz w MADU HOME — pełna realizacja, stylizacja i konsultacje online.",
};

export default async function OfferPage() {
  const content = await getOfferContent();
  return <OfferPageView content={content} services={content.services} />;
}
