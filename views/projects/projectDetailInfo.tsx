import type { Project } from "@/lib/types/project";

type Props = {
  project: Project;
};

const rows: (keyof Pick<
  Project,
  "location" | "year" | "type"
>)[] = ["location", "year", "type"];

const labels: Record<(typeof rows)[number], string> = {
  location: "Lokalizacja",
  year: "Rok",
  type: "Typ",
};

export function ProjectDetailInfo({ project }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr] md:gap-20 md:px-10">
      <div>
        <h1
          className="mb-6 text-balance text-3xl md:text-5xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          {project.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-6 md:flex-none md:flex-col md:gap-0 md:divide-y md:divide-border">
        {rows.map((key) => (
          <div key={key} className="flex-1 md:flex-none md:py-5">
            <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
              {labels[key]}
            </p>
            <p className="text-sm text-foreground">{project[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
