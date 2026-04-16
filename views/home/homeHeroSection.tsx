import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  imageSrc: string;
  imageAlt: string;
};

export function HomeHeroSection({
  eyebrow,
  title,
  lead,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <section className="relative min-h-[70vh] w-full">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/35" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-6 py-24 md:px-10 md:py-32">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary-foreground/90">
          {eyebrow}
        </p>
        <h1
          className="mb-6 max-w-3xl text-balance text-4xl leading-tight text-primary-foreground md:text-6xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          {title}
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-primary-foreground/90">
          {lead}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="border border-primary-foreground px-10 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary"
          >
            Zobacz realizacje
          </Link>
          <Link
            href="/offer"
            className="border border-transparent px-10 py-3 text-xs uppercase tracking-widest text-primary-foreground underline-offset-4 transition-colors hover:underline"
          >
            Usługi
          </Link>
        </div>
      </div>
    </section>
  );
}
