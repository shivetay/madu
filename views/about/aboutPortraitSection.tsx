import Image from "next/image";

type Props = {
  imageSrc: string;
  imageAlt: string;
  bioTitle: string;
  bioParagraphs: string[];
};

export function AboutPortraitSection({
  imageSrc,
  imageAlt,
  bioTitle,
  bioParagraphs,
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
      <div className="grid items-start gap-16 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="md:pt-10">
          <h2
            className="mb-6 text-2xl md:text-3xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            {bioTitle}
          </h2>
          {bioParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-sm leading-relaxed text-muted-foreground last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
