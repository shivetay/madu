import type { Service } from "@/lib/types/service";

const services: Service[] = [
  {
    number: "01",
    title: "Kompleksowe projektowanie wnętrz",
    description:
      "Usługa od koncepcji po realizację: nowe budynki, remonty i pełne metamorfozy pomieszczeń. Prowadzimy koncepcję, dobór, zamówienia i montaż — od pustej przestrzeni po gotowe wnętrze.",
    includes: [
      "Moodboard i koncepcja",
      "Plan przestrzenny i układ funkcjonalny",
      "Dobór materiałów i mebli",
      "Koordynacja rzemieślników i wykonawców",
      "Stylizacja i finalny montaż",
    ],
  },
  {
    number: "02",
    title: "Stylizacja pomieszczeń",
    description:
      "Skoncentrowana usługa dla wnętrz o dobrych proporcjach, które potrzebują przemyślanej edycji. Układamy warstwy mebli, tkanin, oświetlenia i dodatków, by nadać spójność, ciepło i charakter.",
    includes: [
      "Audyt istniejących elementów",
      "Plan uzupełnień i zakupów",
      "Przearanżowanie mebli",
      "Dobór dodatków i tekstyliów",
      "Sesja zdjęciowa wystylizowanego wnętrza",
    ],
  },
  {
    number: "03",
    title: "Konsultacja online",
    description:
      "Godzinne spotkanie wideo dla właścicieli domów w dowolnym miejscu na świecie. Przyjdźcie ze zdjęciami, pytaniami i rzutem — wyjdźcie z jasnym, możliwym do wdrożenia kierunkiem dla swojej przestrzeni.",
    includes: [
      "Rozmowa wideo — 60 minut",
      "Pisemne podsumowanie z rekomendacjami",
      "Lista zakupowa z bezpośrednimi linkami",
      "Tydzień wsparcia mailowego po spotkaniu",
    ],
  },
  {
    number: "04",
    title: "Dobór kolorów i materiałów",
    description:
      "Kolor to często najbardziej transformujący i najmniej kosztowny ruch w projekcie. Doradzamy palety farb, okładzin ścian, podłogi i tkaniny tak, by harmonizowały w świetle dziennym i sztucznym.",
    includes: [
      "Analiza kolorystyczna pomieszczenia",
      "Prezentacja próbek farb",
      "Dobór próbek materiałów i tkanin",
      "Ocena oświetlenia",
    ],
  },
];

export async function getServices(): Promise<Service[]> {
  return services;
}
