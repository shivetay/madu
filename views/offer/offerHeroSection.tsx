export function OfferHeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
        Usługi
      </p>
      <h1
        className="max-w-2xl text-balance text-4xl leading-tight md:text-6xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Jak możemy współpracować.
      </h1>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Każdy projekt zaczyna się od rozmowy. Niezależnie od tego, czy potrzebujesz
        odświeżenia jednego pomieszczenia, czy całego domu od podstaw — na każdym
        poziomie oferujemy przemyślaną opiekę.
      </p>
    </section>
  );
}
