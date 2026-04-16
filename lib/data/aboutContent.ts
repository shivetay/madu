import { media } from "@/lib/data/media";

export type AboutValue = { title: string; body: string };

export type AboutContent = {
  portrait: { src: string; alt: string };
  bioTitle: string;
  bioParagraphs: string[];
  quote: string;
  quoteAttribution: string;
  valuesTitle: string;
  values: AboutValue[];
};

const aboutContent: AboutContent = {
  portrait: { src: media.aboutPortrait, alt: "Projektantka" },
  bioTitle: "Marie Duval, założycielka i projektantka",
  bioParagraphs: [
    "Z ponad dziesięcioletnim doświadczeniem w aranżacji prywatnych domów we Francji i Wielkiej Brytanii Marie założyła Madu Home z jedną przekonaniem: dom powinien być jak spokojny wydech. Zakorzeniony w miejscu, bogaty w fakturę, cichy w tonie.",
    "Jej prace czerpią z języka wiejskich siedzib, uroku angielskich chat oraz swobodnej elegancji francuskiego stylu country. Każdy projekt zaczyna się od słuchania — klienta, architektury i krajobrazu tuż za oknem.",
    "Marie studiowała architekturę wnętrz w Paryżu i współpracowała z rzemieślnikami, antykwariuszami oraz pracowniami tekstylnymi w całej Europie, by dobierać przedmioty z historią i charakterem.",
  ],
  quote:
    "Piękny pokój powinien wyglądać, jakby przybył powoli — zebrany przez lata, a nie udekorowany w jeden weekend.",
  quoteAttribution: "— Marie Duval",
  valuesTitle: "Co jest dla nas ważne",
  values: [
    {
      title: "Naturalne materiały",
      body: "Kamień, len, drewno i wiklina. Stawiamy na szczere materiały, które pięknie się starzeją i niosą ze sobą charakter pochodzenia.",
    },
    {
      title: "Powściągliwość",
      body: "Częściej wycinamy niż dodajemy. Hojna pusta przestrzeń pozwala każdemu elementowi oddychać, a detalom — być odczuwalnymi, a nie przytłoczonymi.",
    },
    {
      title: "Trwałość",
      body: "Wnętrza odporne na modę, oparte na ponadczasowych archetypach. Pokój zaprojektowany przez Madu Home ma wyglądać przemyślanie za dwadzieścia lat tak samo jak w dniu oddania.",
    },
  ],
};

export async function getAboutContent(): Promise<AboutContent> {
  return aboutContent;
}
