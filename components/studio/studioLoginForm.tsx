"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function StudioLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/studio/projekty";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const password = new FormData(form).get("password");
    if (typeof password !== "string" || !password) {
      setError("Podaj hasło.");
      setPending(false);
      return;
    }
    const res = await signIn("credentials", {
      password,
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError(
        "Logowanie nie powiodło się. Sprawdź hasło. W Vercelu wklej sam hash bcrypt (zaczyna się od $2a$ / $2b$ / $2y$) — bez cudzysłowów i bez znaków \\ przed $. Lokalnie w .env używaj \\$ przed każdym $. Upewnij się też, że AUTH_SECRET jest ustawiony.",
      );
      return;
    }
    window.location.href = next;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <h1
        className="mb-2 text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Logowanie do studia
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Wpisz hasło administratora. Po pierwszej konfiguracji ustaw zmienne
        AUTH_SECRET oraz STUDIO_PASSWORD_HASH w środowisku.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="border border-foreground bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background transition-opacity disabled:opacity-50"
        >
          {pending ? "Logowanie…" : "Zaloguj"}
        </button>
      </form>
    </main>
  );
}
