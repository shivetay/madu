import { z } from "zod";
import { siteContentDefaults } from "@/lib/data/siteContentDefaults";

const short = z.string().trim().min(1).max(180);
const medium = z.string().trim().min(1).max(600);
const longText = z.string().trim().min(1).max(4000);

export const homeContentSchema = z.object({
  heroEyebrow: short,
  heroTitle: medium,
  heroLead: longText,
  heroImageSrc: z.string().trim().min(1).max(2000),
  heroImageAlt: short,
  introTitle: medium,
  introBody: longText,
  introImageSrc: z.string().trim().min(1).max(2000),
  introImageAlt: short,
});

const aboutValueSchema = z.object({
  title: short,
  body: longText,
});

export const aboutContentSchema = z.object({
  heroEyebrow: short,
  heroTitle: medium,
  portrait: z.object({
    src: z.string().trim().min(1).max(2000),
    alt: short,
  }),
  bioTitle: medium,
  bioParagraphs: z.array(longText).min(1).max(8),
  quote: longText,
  quoteAttribution: short,
  valuesTitle: medium,
  values: z.array(aboutValueSchema).min(1).max(6),
});

const serviceSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  title: medium,
  description: longText,
  includes: z.array(short).min(1).max(10),
});

export const offerContentSchema = z.object({
  heroEyebrow: short,
  heroTitle: medium,
  heroLead: longText,
  ctaEyebrow: short,
  ctaTitle: medium,
  ctaButtonLabel: short,
  services: z.array(serviceSchema).min(1).max(12),
});

export const siteImageInputSchema = z.discriminatedUnion("key", [
  z.object({
    key: z.literal("home"),
    field: z.enum(["heroImageSrc", "introImageSrc"]),
  }),
  z.object({
    key: z.literal("about"),
    field: z.literal("portrait.src"),
  }),
]);

export const siteContentFallbackForStudio = {
  home: homeContentSchema.parse(siteContentDefaults.home),
  about: aboutContentSchema.parse(siteContentDefaults.about),
  offer: offerContentSchema.parse(siteContentDefaults.offer),
};
