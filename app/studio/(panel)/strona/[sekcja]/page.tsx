import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { StudioSiteContentEditor } from "@/components/studio/studioSiteContentEditor";
import { dalGetAllSiteContentForStudio } from "@/lib/dal/siteContentDal";
import type { SiteContentKey } from "@/lib/types/siteContent";

type Props = {
  params: Promise<{ sekcja: string }>;
};

const sectionMap: Record<string, SiteContentKey> = {
  glowna: "home",
  "o-nas": "about",
  oferta: "offer",
};

function mapSection(segment: string): SiteContentKey | null {
  return sectionMap[segment] ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { sekcja } = await params;

  const title =
    sekcja === "glowna"
      ? "Edycja: strona glowna | Studio"
      : sekcja === "o-nas"
        ? "Edycja: O nas | Studio"
        : sekcja === "oferta"
          ? "Edycja: oferta | Studio"
          : "Edycja stron | Studio";

  return {
    title,
    robots: { index: false, follow: false },
  };
}

export default async function StudioSiteSectionPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");

  const { sekcja } = await params;
  const section = mapSection(sekcja);
  if (!section) notFound();

  const content = await dalGetAllSiteContentForStudio();
  return <StudioSiteContentEditor content={content} section={section} />;
}
