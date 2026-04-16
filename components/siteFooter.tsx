import Link from "next/link";
import { siteNavLinks } from "@/lib/siteNavLinks";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p
          className="text-sm uppercase tracking-[0.3em] text-foreground"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          MADU HOME
        </p>

        <nav className="flex items-center gap-8">
          {siteNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} Madu Home
        </p>
      </div>
    </footer>
  );
}
