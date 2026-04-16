type Props = {
  quote: string;
  attribution: string;
};

export function AboutPhilosophySection({ quote, attribution }: Props) {
  return (
    <section className="bg-muted/30 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
          Filozofia projektowania
        </p>
        <blockquote
          className="text-balance text-2xl leading-snug italic md:text-4xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
          {attribution}
        </p>
      </div>
    </section>
  );
}
