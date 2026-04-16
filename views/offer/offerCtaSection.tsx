import Link from "next/link";

export function OfferCtaSection() {
  return (
    <section className="bg-primary px-6 py-20 text-center md:px-10">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-secondary">
        Następny krok
      </p>
      <h2
        className="mb-8 text-balance text-3xl text-primary-foreground md:text-4xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Nie wiesz, która usługa jest dla Ciebie?
      </h2>
      <Link
        href="/contact"
        className="inline-block border border-primary-foreground px-10 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary"
      >
        Porozmawiajmy
      </Link>
    </section>
  );
}
