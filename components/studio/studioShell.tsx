"use client";

import { SessionProvider } from "next-auth/react";

export function StudioShell({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
