import { dalGetSiteContentForPublic } from "@/lib/dal/siteContentDal";
import type { OfferContent } from "@/lib/types/siteContent";

export async function getOfferContent(): Promise<OfferContent> {
  return dalGetSiteContentForPublic("offer");
}
