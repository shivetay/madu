import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { StudioProjectEditor } from "@/components/studio/studioProjectEditor";
import { dalGetBySlugForStudio } from "@/lib/dal/projectsDal";
import { mapRowToStudioEditor } from "@/lib/studio/mapStudioProject";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edycja: ${slug} | Studio`,
    robots: { index: false, follow: false },
  };
}

export default async function StudioProjectEditPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");

  const { slug } = await params;
  const row = await dalGetBySlugForStudio(slug);
  if (!row) notFound();

  const initial = mapRowToStudioEditor(row);
  return <StudioProjectEditor project={initial} />;
}
