import type { Project } from "@/lib/types/project";
import { media } from "@/lib/data/media";

const projects: Project[] = [
  {
    slug: "elm-bedroom",
    title: "Sypialnia pod wiązem",
    location: "Oxfordshire, Wielka Brytania",
    year: "2024",
    type: "Sypialnia",
    description:
      "Przebudowa sypialni głównej w zabytkowej wiejskiej siedzibie w Oxfordshire. Blade, szałwiowe tynki, pościel z lnianego szycia ręcznego, zabytkowe wezgłowie z dębu i oświetlenie z rattanu tworzą atmosferę cichej przystani. Każdy element pochodził z lokalnych źródeł lub antykwariatu.",
    images: [media.project1, media.project5],
  },
  {
    slug: "maison-lumiere",
    title: "Maison Lumière",
    location: "Prowansja, Francja",
    year: "2023",
    type: "Kuchnia",
    description:
      "Kuchnia w stylu francuskiej siedziby przywrócona do pierwotnego ducha. Kremowe fronty, blaty z drewna rzeźniczego, donice z terakoty i otwarte półki z ceramiką — prosto, szczerze i serdecznie.",
    images: [media.project2, media.project4],
  },
  {
    slug: "heather-farmhouse",
    title: "Gospodarstwo na wrzosowisku",
    location: "Yorkshire, Wielka Brytania",
    year: "2023",
    type: "Salon",
    description:
      "Przestronny salon wiejskiej siedziby w Yorkshire z kamienny kominkiem i widocznymi belkami. Fotele lniane, zabytkowy kilim, dębowe stoliki i ciepłe świece świec — pokój, który od pierwszego dnia wydaje się zamieszkany.",
    images: [media.project3, media.project6],
  },
  {
    slug: "bain-de-campagne",
    title: "Bain de Campagne",
    location: "Dordogne, Francja",
    year: "2024",
    type: "Łazienka",
    description:
      "Wanna wolnostojąca, marmurowa posadzka, ściany w pylistym błękicie-szarości i wiązki suszonej lawendy. Łazienka w stylu francuskiego country jako studium stonowanego luksusu — oszczędnie, ale nie chłodno.",
    images: [media.project4, media.project1],
  },
  {
    slug: "the-round-table",
    title: "Przy okrągłym stole",
    location: "Cotswolds, Wielka Brytania",
    year: "2022",
    type: "Jadalnia",
    description:
      "Jadalnia, która zaprasza na długie wieczory. Okrągły stół wiejskiej siedziby, lniane krzesła o zróżnicowanym charakterze, botaniczne grafiki i świeczniki na różnych wysokościach — wyrafinowanie bez sztywności.",
    images: [media.project5, media.project2],
  },
  {
    slug: "studiolo",
    title: "Studiolo",
    location: "Edynburg, Wielka Brytania",
    year: "2022",
    type: "Biuro domowe",
    description:
      "Gabinet do skupionej pracy i spokojnej refleksji. Biurko antyczne, zasłony lniane, półki z książkami i miękkie popołudniowe światło przez okna od północy.",
    images: [media.project6, media.project3],
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  return projects.map((p) => p.slug);
}
