"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteNavLinks } from "@/lib/siteNavLinks";

export function SiteNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          MADU HOME
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {siteNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-xs uppercase tracking-widest transition-colors duration-200",
                pathname === href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Otwórz lub zamknij menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-all duration-200",
              menuOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-all duration-200",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-all duration-200",
              menuOpen && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {menuOpen ? (
        <nav className="flex flex-col gap-5 border-t border-border bg-background px-6 pt-4 pb-6 md:hidden">
          {siteNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors duration-200",
                pathname === href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
