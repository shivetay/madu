import { dalGetSiteContentForPublic } from "@/lib/dal/siteContentDal";
import type { AboutContent } from "@/lib/types/siteContent";

export async function getAboutContent(): Promise<AboutContent> {
  return dalGetSiteContentForPublic("about");
}
