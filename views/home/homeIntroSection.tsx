import Image from "next/image";

type Props = {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

export function HomeIntroSection({ title, body, imageSrc, imageAlt }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden md:order-2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:order-1 md:pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            Podejście
          </p>
          <h2
            className="mb-6 text-3xl leading-tight md:text-4xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
