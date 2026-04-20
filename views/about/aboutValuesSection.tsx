import type { AboutValue } from "@/lib/types/siteContent";

type Props = {
  title: string;
  values: AboutValue[];
};

export function AboutValuesSection({ title, values }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h2
        className="mb-14 text-center text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        {title}
      </h2>
      <div className="grid gap-12 md:grid-cols-3">
        {values.map(({ title: valueTitle, body }) => (
          <div key={valueTitle}>
            <h3
              className="mb-4 text-xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {valueTitle}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
