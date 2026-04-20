import { dalGetSiteContentForPublic } from "@/lib/dal/siteContentDal";
import type { HomeContent } from "@/lib/types/homeContent";

export async function getHomeContent(): Promise<HomeContent> {
  return dalGetSiteContentForPublic("home");
}
