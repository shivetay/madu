import Link from "next/link";

export function ProjectDetailBackLink() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-6 md:px-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <span>←</span> Wszystkie realizacje
      </Link>
    </div>
  );
}
