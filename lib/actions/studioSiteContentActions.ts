"use server";

import {
  proxyUpdateAboutContent,
  proxyUpdateHomeContent,
  proxyUpdateOfferContent,
} from "@/lib/proxy/studioSiteContentProxy";
import type { SiteContentMap } from "@/lib/types/siteContent";

export async function actionUpdateHomeContent(data: SiteContentMap["home"]) {
  await proxyUpdateHomeContent(data);
}

export async function actionUpdateAboutContent(data: SiteContentMap["about"]) {
  await proxyUpdateAboutContent(data);
}

export async function actionUpdateOfferContent(data: SiteContentMap["offer"]) {
  await proxyUpdateOfferContent(data);
}
