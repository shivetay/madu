"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/studio/projekty", label: "Projekty" },
] as const;

export function StudioSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/20">
      <div className="border-b border-border px-5 py-6">
        <p
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Studio
        </p>
        <p
          className="mt-1 text-sm font-semibold text-foreground"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          MADU HOME
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              pathname === href || pathname.startsWith(`${href}/`)
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          Wyloguj
        </button>
      </div>
    </aside>
  );
}
