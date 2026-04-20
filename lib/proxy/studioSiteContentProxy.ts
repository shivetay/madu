import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { revalidateSiteContentByKey } from "@/lib/cache/revalidateSiteContent";
import {
  dalUpdateSiteContent,
  dalUpdateSiteImage,
} from "@/lib/dal/siteContentDal";
import {
  aboutContentSchema,
  homeContentSchema,
  offerContentSchema,
  siteImageInputSchema,
} from "@/lib/studio/siteContentValidation";

async function requireStudioSession() {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");
}

export async function proxyUpdateHomeContent(data: unknown) {
  await requireStudioSession();
  const payload = homeContentSchema.parse(data);
  await dalUpdateSiteContent("home", payload);
  revalidateSiteContentByKey("home");
}

export async function proxyUpdateAboutContent(data: unknown) {
  await requireStudioSession();
  const payload = aboutContentSchema.parse(data);
  await dalUpdateSiteContent("about", payload);
  revalidateSiteContentByKey("about");
}

export async function proxyUpdateOfferContent(data: unknown) {
  await requireStudioSession();
  const payload = offerContentSchema.parse(data);
  await dalUpdateSiteContent("offer", payload);
  revalidateSiteContentByKey("offer");
}

export async function proxyUpdateSiteImage(
  data: unknown,
  url: string,
) {
  await requireStudioSession();
  const input = siteImageInputSchema.parse(data);
  await dalUpdateSiteImage(input.key, input.field, url);
  revalidateSiteContentByKey(input.key);
}
