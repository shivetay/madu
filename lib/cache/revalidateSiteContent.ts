import { revalidatePath } from "next/cache";
import type { SiteContentKey } from "@/lib/types/siteContent";

const contentPathMap: Record<SiteContentKey, string[]> = {
  home: ["/"],
  about: ["/about"],
  offer: ["/offer"],
};

export function revalidateSiteContentByKey(key: SiteContentKey) {
  const paths = contentPathMap[key];
  for (const path of paths) {
    revalidatePath(path);
  }
}
