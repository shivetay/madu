import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-10">
      <h1
        className="mb-6 text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Nie znaleziono projektu
      </h1>
      <Link
        href="/projects"
        className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Wróć do realizacji
      </Link>
    </main>
  );
}
