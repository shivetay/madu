import type { Service } from "@/lib/types/service";

type Props = {
  service: Service;
};

export function OfferServiceRow({ service }: Props) {
  const { number, title, description, includes } = service;
  return (
    <div className="grid gap-10 py-14 md:grid-cols-[1fr_2fr] md:gap-20">
      <div>
        <p className="mb-3 text-xs tracking-widest text-muted-foreground">
          {number}
        </p>
        <h2
          className="text-2xl leading-snug md:text-3xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          {title}
        </h2>
      </div>
      <div>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="space-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
              <span className="mt-2 block h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
