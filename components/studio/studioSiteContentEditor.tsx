"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  actionUpdateAboutContent,
  actionUpdateHomeContent,
  actionUpdateOfferContent,
} from "@/lib/actions/studioSiteContentActions";
import { StudioUploadButton } from "@/lib/uploadthing";
import type { AboutValue, SiteContentKey, SiteContentMap } from "@/lib/types/siteContent";

type Props = {
  content: SiteContentMap;
  section?: SiteContentKey | "all";
};

type OfferServiceDraft = {
  id: string;
  title: string;
  description: string;
  includesText: string;
};

function parseLines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function twoDigitNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function StudioSiteContentEditor({ content, section = "all" }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const sectionLabel =
    section === "home"
      ? "strony glownej"
      : section === "about"
        ? "O nas"
        : section === "offer"
          ? "oferty"
          : "stron";

  const showHome = section === "all" || section === "home";
  const showAbout = section === "all" || section === "about";
  const showOffer = section === "all" || section === "offer";

  const [aboutValues, setAboutValues] = useState<AboutValue[]>(content.about.values);
  const [offerServices, setOfferServices] = useState<OfferServiceDraft[]>(
    content.offer.services.map((service, index) => ({
      id: `${service.number}-${index}`,
      title: service.title,
      description: service.description,
      includesText: service.includes.join("\n"),
    })),
  );

  const sortedServices = useMemo(() => offerServices, [offerServices]);

  function refresh() {
    router.refresh();
  }

  function saveHome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await actionUpdateHomeContent({
        heroEyebrow: String(fd.get("heroEyebrow") ?? "").trim(),
        heroTitle: String(fd.get("heroTitle") ?? "").trim(),
        heroLead: String(fd.get("heroLead") ?? "").trim(),
        heroImageSrc: String(fd.get("heroImageSrc") ?? "").trim(),
        heroImageAlt: String(fd.get("heroImageAlt") ?? "").trim(),
        introTitle: String(fd.get("introTitle") ?? "").trim(),
        introBody: String(fd.get("introBody") ?? "").trim(),
        introImageSrc: String(fd.get("introImageSrc") ?? "").trim(),
        introImageAlt: String(fd.get("introImageAlt") ?? "").trim(),
      });
      refresh();
    });
  }

  function saveAbout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const bioParagraphs = parseLines(String(fd.get("bioParagraphs") ?? ""));

    startTransition(async () => {
      await actionUpdateAboutContent({
        heroEyebrow: String(fd.get("heroEyebrow") ?? "").trim(),
        heroTitle: String(fd.get("heroTitle") ?? "").trim(),
        portrait: {
          src: String(fd.get("portraitSrc") ?? "").trim(),
          alt: String(fd.get("portraitAlt") ?? "").trim(),
        },
        bioTitle: String(fd.get("bioTitle") ?? "").trim(),
        bioParagraphs,
        quote: String(fd.get("quote") ?? "").trim(),
        quoteAttribution: String(fd.get("quoteAttribution") ?? "").trim(),
        valuesTitle: String(fd.get("valuesTitle") ?? "").trim(),
        values: aboutValues,
      });
      refresh();
    });
  }

  function saveOffer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      await actionUpdateOfferContent({
        heroEyebrow: String(fd.get("heroEyebrow") ?? "").trim(),
        heroTitle: String(fd.get("heroTitle") ?? "").trim(),
        heroLead: String(fd.get("heroLead") ?? "").trim(),
        ctaEyebrow: String(fd.get("ctaEyebrow") ?? "").trim(),
        ctaTitle: String(fd.get("ctaTitle") ?? "").trim(),
        ctaButtonLabel: String(fd.get("ctaButtonLabel") ?? "").trim(),
        services: sortedServices.map((service, index) => ({
          number: twoDigitNumber(index),
          title: service.title.trim(),
          description: service.description.trim(),
          includes: parseLines(service.includesText),
        })),
      });
      refresh();
    });
  }

  return (
    <div className="px-6 py-10 md:px-10">
      <h1
        className="mb-8 text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Edycja {sectionLabel}
      </h1>

      {showHome ? (
        <section className="max-w-3xl border border-border p-5">
        <h2 className="mb-6 text-lg font-medium">Strona główna</h2>
        <form onSubmit={saveHome} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Hero - nagłówek pomocniczy
              </label>
              <input
                name="heroEyebrow"
                required
                defaultValue={content.home.heroEyebrow}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Hero - alt zdjęcia
              </label>
              <input
                name="heroImageAlt"
                required
                defaultValue={content.home.heroImageAlt}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - tytuł
            </label>
            <textarea
              name="heroTitle"
              required
              rows={2}
              defaultValue={content.home.heroTitle}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - opis
            </label>
            <textarea
              name="heroLead"
              required
              rows={4}
              defaultValue={content.home.heroLead}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - URL zdjęcia
            </label>
            <input
              name="heroImageSrc"
              required
              defaultValue={content.home.heroImageSrc}
              className="w-full border border-border bg-transparent px-3 py-2 text-sm"
            />
            <StudioUploadButton
              endpoint="siteImage"
              input={{ key: "home", field: "heroImageSrc" }}
              onClientUploadComplete={() => refresh()}
              onUploadError={(err: Error) => {
                console.error(err);
                alert(err.message);
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Intro - tytuł
              </label>
              <textarea
                name="introTitle"
                required
                rows={2}
                defaultValue={content.home.introTitle}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Intro - alt zdjęcia
              </label>
              <input
                name="introImageAlt"
                required
                defaultValue={content.home.introImageAlt}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Intro - opis
            </label>
            <textarea
              name="introBody"
              required
              rows={4}
              defaultValue={content.home.introBody}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Intro - URL zdjęcia
            </label>
            <input
              name="introImageSrc"
              required
              defaultValue={content.home.introImageSrc}
              className="w-full border border-border bg-transparent px-3 py-2 text-sm"
            />
            <StudioUploadButton
              endpoint="siteImage"
              input={{ key: "home", field: "introImageSrc" }}
              onClientUploadComplete={() => refresh()}
              onUploadError={(err: Error) => {
                console.error(err);
                alert(err.message);
              }}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-opacity hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {pending ? "Zapisywanie..." : "Zapisz stronę główną"}
          </button>
        </form>
        </section>
      ) : null}

      {showAbout ? (
        <section className={`${showHome ? "mt-10 " : ""}max-w-3xl border border-border p-5`}>
        <h2 className="mb-6 text-lg font-medium">O nas</h2>
        <form onSubmit={saveAbout} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Hero - nagłówek pomocniczy
              </label>
              <input
                name="heroEyebrow"
                required
                defaultValue={content.about.heroEyebrow}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Portret - alt zdjęcia
              </label>
              <input
                name="portraitAlt"
                required
                defaultValue={content.about.portrait.alt}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - tytuł
            </label>
            <textarea
              name="heroTitle"
              required
              rows={2}
              defaultValue={content.about.heroTitle}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Portret - URL zdjęcia
            </label>
            <input
              name="portraitSrc"
              required
              defaultValue={content.about.portrait.src}
              className="w-full border border-border bg-transparent px-3 py-2 text-sm"
            />
            <StudioUploadButton
              endpoint="siteImage"
              input={{ key: "about", field: "portrait.src" }}
              onClientUploadComplete={() => refresh()}
              onUploadError={(err: Error) => {
                console.error(err);
                alert(err.message);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Tytuł sekcji bio
            </label>
            <input
              name="bioTitle"
              required
              defaultValue={content.about.bioTitle}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Bio - akapity (1 wiersz = 1 akapit)
            </label>
            <textarea
              name="bioParagraphs"
              required
              rows={8}
              defaultValue={content.about.bioParagraphs.join("\n")}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Cytat
              </label>
              <textarea
                name="quote"
                required
                rows={3}
                defaultValue={content.about.quote}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Autor cytatu
              </label>
              <input
                name="quoteAttribution"
                required
                defaultValue={content.about.quoteAttribution}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Tytuł wartości
            </label>
            <input
              name="valuesTitle"
              required
              defaultValue={content.about.valuesTitle}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Wartości
            </p>
            {aboutValues.map((value, index) => (
              <div key={`${value.title}-${index}`} className="space-y-2 border border-border p-3">
                <input
                  value={value.title}
                  onChange={(e) => {
                    const next = [...aboutValues];
                    next[index] = { ...next[index], title: e.target.value };
                    setAboutValues(next);
                  }}
                  placeholder="Tytuł"
                  className="w-full border border-border bg-transparent px-3 py-2 text-sm"
                />
                <textarea
                  value={value.body}
                  onChange={(e) => {
                    const next = [...aboutValues];
                    next[index] = { ...next[index], body: e.target.value };
                    setAboutValues(next);
                  }}
                  rows={3}
                  placeholder="Opis"
                  className="w-full border border-border bg-transparent px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted"
                  onClick={() => {
                    setAboutValues((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  Usuń wartość
                </button>
              </div>
            ))}
            <button
              type="button"
              className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted"
              onClick={() => {
                setAboutValues((prev) => [...prev, { title: "", body: "" }]);
              }}
            >
              Dodaj wartość
            </button>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-opacity hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {pending ? "Zapisywanie..." : "Zapisz O nas"}
          </button>
        </form>
        </section>
      ) : null}

      {showOffer ? (
        <section className={`${showHome || showAbout ? "mt-10 " : ""}max-w-3xl border border-border p-5`}>
        <h2 className="mb-6 text-lg font-medium">Oferta</h2>
        <form onSubmit={saveOffer} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Hero - nagłówek pomocniczy
              </label>
              <input
                name="heroEyebrow"
                required
                defaultValue={content.offer.heroEyebrow}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                CTA - nagłówek pomocniczy
              </label>
              <input
                name="ctaEyebrow"
                required
                defaultValue={content.offer.ctaEyebrow}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - tytuł
            </label>
            <textarea
              name="heroTitle"
              required
              rows={2}
              defaultValue={content.offer.heroTitle}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Hero - opis
            </label>
            <textarea
              name="heroLead"
              required
              rows={4}
              defaultValue={content.offer.heroLead}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                CTA - tytuł
              </label>
              <textarea
                name="ctaTitle"
                required
                rows={2}
                defaultValue={content.offer.ctaTitle}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                CTA - etykieta przycisku
              </label>
              <input
                name="ctaButtonLabel"
                required
                defaultValue={content.offer.ctaButtonLabel}
                className="border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Pozycje usług
            </p>
            {sortedServices.map((service, index) => (
              <div key={service.id} className="space-y-2 border border-border p-3">
                <p className="text-xs text-muted-foreground">Pozycja {twoDigitNumber(index)}</p>
                <input
                  value={service.title}
                  onChange={(e) => {
                    const next = [...sortedServices];
                    next[index] = { ...next[index], title: e.target.value };
                    setOfferServices(next);
                  }}
                  placeholder="Tytuł usługi"
                  className="w-full border border-border bg-transparent px-3 py-2 text-sm"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => {
                    const next = [...sortedServices];
                    next[index] = { ...next[index], description: e.target.value };
                    setOfferServices(next);
                  }}
                  rows={4}
                  placeholder="Opis usługi"
                  className="w-full border border-border bg-transparent px-3 py-2 text-sm"
                />
                <textarea
                  value={service.includesText}
                  onChange={(e) => {
                    const next = [...sortedServices];
                    next[index] = { ...next[index], includesText: e.target.value };
                    setOfferServices(next);
                  }}
                  rows={5}
                  placeholder="Zakres usługi - 1 wiersz = 1 pozycja"
                  className="w-full border border-border bg-transparent px-3 py-2 text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted disabled:opacity-50"
                    onClick={() => {
                      const next = [...sortedServices];
                      const current = next[index];
                      next[index] = next[index - 1]!;
                      next[index - 1] = current!;
                      setOfferServices(next);
                    }}
                  >
                    Wyżej
                  </button>
                  <button
                    type="button"
                    disabled={index === sortedServices.length - 1}
                    className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted disabled:opacity-50"
                    onClick={() => {
                      const next = [...sortedServices];
                      const current = next[index];
                      next[index] = next[index + 1]!;
                      next[index + 1] = current!;
                      setOfferServices(next);
                    }}
                  >
                    Niżej
                  </button>
                  <button
                    type="button"
                    className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted"
                    onClick={() => {
                      setOfferServices((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    Usuń usługę
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted"
              onClick={() => {
                setOfferServices((prev) => [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                    includesText: "",
                  },
                ]);
              }}
            >
              Dodaj usługę
            </button>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-opacity hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {pending ? "Zapisywanie..." : "Zapisz ofertę"}
          </button>
        </form>
        </section>
      ) : null}
    </div>
  );
}
