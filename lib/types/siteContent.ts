import type { Service } from "@/lib/types/service";

export type AboutValue = {
  title: string;
  body: string;
};

export type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  portrait: { src: string; alt: string };
  bioTitle: string;
  bioParagraphs: string[];
  quote: string;
  quoteAttribution: string;
  valuesTitle: string;
  values: AboutValue[];
};

export type OfferContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButtonLabel: string;
  services: Service[];
};

export type SiteContentMap = {
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroImageSrc: string;
    heroImageAlt: string;
    introTitle: string;
    introBody: string;
    introImageSrc: string;
    introImageAlt: string;
  };
  about: AboutContent;
  offer: OfferContent;
};

export type SiteContentKey = keyof SiteContentMap;
