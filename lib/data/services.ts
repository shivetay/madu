import type { Service } from "@/lib/types/service";
import { getOfferContent } from "@/lib/data/offerContent";

export async function getServices(): Promise<Service[]> {
  const content = await getOfferContent();
  return content.services;
}
