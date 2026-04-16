import { media } from "@/lib/data/media";
import type { HomeContent } from "@/lib/types/homeContent";

const homeContent: HomeContent = {
  heroEyebrow: "Pracownia projektowania wnętrz",
  heroTitle: "Domy, które wyglądają jak zebrane z lat, nie urządzone na weekend.",
  heroLead:
    "Spokój wiejskiej siedziby, ciepło angielskiej chaty i swoboda francuskiego stylu — wnętrza powstające powoli, z naturalnych materiałów i cichego poczucia miejsca.",
  heroImageSrc: media.homeHero,
  heroImageAlt: "Nasłoneczniony salon z lnem i drewnem",
  introTitle: "Projekt zakorzeniony w krajobrazie i świetle.",
  introBody:
    "Od pełnych remontów po odświeżenie jednego pomieszczenia — towarzyszymy Wam w tworzeniu przestrzeni, które starzeją się z wdziękiem: stonowanych, zmysłowych i naprawdę osobistych.",
  introImageSrc: media.project3,
  introImageAlt: "Detal wnętrza w miękkim dziennym świetle",
};

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}
