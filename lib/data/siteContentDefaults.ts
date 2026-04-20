import { media } from "@/lib/data/media";
import type { SiteContentMap } from "@/lib/types/siteContent";

export const siteContentDefaults: SiteContentMap = {
  home: {
    heroEyebrow: "Pracownia projektowania wnętrz",
    heroTitle:
      "Domy, które wyglądają jak zebrane z lat, nie urządzone na weekend.",
    heroLead:
      "Spokój wiejskiej siedziby, ciepło angielskiej chaty i swoboda francuskiego stylu - wnętrza powstające powoli, z naturalnych materiałów i cichego poczucia miejsca.",
    heroImageSrc: media.homeHero,
    heroImageAlt: "Nasłoneczniony salon z lnem i drewnem",
    introTitle: "Projekt zakorzeniony w krajobrazie i świetle.",
    introBody:
      "Od pełnych remontów po odświeżenie jednego pomieszczenia - towarzyszymy Wam w tworzeniu przestrzeni, które starzeją się z wdziękiem: stonowanych, zmysłowych i naprawdę osobistych.",
    introImageSrc: media.project3,
    introImageAlt: "Detal wnętrza w miękkim dziennym świetle",
  },
  about: {
    heroEyebrow: "O nas",
    heroTitle: "Przestrzenie zakorzenione w naturze, ukształtowane historią.",
    portrait: { src: media.aboutPortrait, alt: "Projektantka" },
    bioTitle: "Marie Duval, założycielka i projektantka",
    bioParagraphs: [
      "Z ponad dziesięcioletnim doświadczeniem w aranżacji prywatnych domów we Francji i Wielkiej Brytanii Marie założyła Madu Home z jedną przekonaniem: dom powinien być jak spokojny wydech. Zakorzeniony w miejscu, bogaty w fakturę, cichy w tonie.",
      "Jej prace czerpią z języka wiejskich siedzib, uroku angielskich chat oraz swobodnej elegancji francuskiego stylu country. Każdy projekt zaczyna się od słuchania - klienta, architektury i krajobrazu tuż za oknem.",
      "Marie studiowała architekturę wnętrz w Paryżu i współpracowała z rzemieślnikami, antykwariuszami oraz pracowniami tekstylnymi w całej Europie, by dobierać przedmioty z historią i charakterem.",
    ],
    quote:
      "Piękny pokój powinien wyglądać, jakby przybył powoli - zebrany przez lata, a nie udekorowany w jeden weekend.",
    quoteAttribution: "- Marie Duval",
    valuesTitle: "Co jest dla nas ważne",
    values: [
      {
        title: "Naturalne materiały",
        body: "Kamień, len, drewno i wiklina. Stawiamy na szczere materiały, które pięknie się starzeją i niosą ze sobą charakter pochodzenia.",
      },
      {
        title: "Powściągliwość",
        body: "Częściej wycinamy niż dodajemy. Hojna pusta przestrzeń pozwala każdemu elementowi oddychać, a detalom - być odczuwalnymi, a nie przytłoczonymi.",
      },
      {
        title: "Trwałość",
        body: "Wnętrza odporne na modę, oparte na ponadczasowych archetypach. Pokój zaprojektowany przez Madu Home ma wyglądać przemyślanie za dwadzieścia lat tak samo jak w dniu oddania.",
      },
    ],
  },
  offer: {
    heroEyebrow: "Usługi",
    heroTitle: "Jak możemy współpracować.",
    heroLead:
      "Każdy projekt zaczyna się od rozmowy. Niezależnie od tego, czy potrzebujesz odświeżenia jednego pomieszczenia, czy całego domu od podstaw - na każdym poziomie oferujemy przemyślaną opiekę.",
    ctaEyebrow: "Następny krok",
    ctaTitle: "Nie wiesz, która usługa jest dla Ciebie?",
    ctaButtonLabel: "Porozmawiajmy",
    services: [
      {
        number: "01",
        title: "Kompleksowe projektowanie wnętrz",
        description:
          "Usługa od koncepcji po realizację: nowe budynki, remonty i pełne metamorfozy pomieszczeń. Prowadzimy koncepcję, dobór, zamówienia i montaż - od pustej przestrzeni po gotowe wnętrze.",
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
          "Godzinne spotkanie wideo dla właścicieli domów w dowolnym miejscu na świecie. Przyjdźcie ze zdjęciami, pytaniami i rzutem - wyjdźcie z jasnym, możliwym do wdrożenia kierunkiem dla swojej przestrzeni.",
        includes: [
          "Rozmowa wideo - 60 minut",
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
    ],
  },
};
