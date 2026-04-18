import Link from "next/link";
import { auth } from "@/auth";
import { actionCreateProjectAndRedirect } from "@/lib/actions/studioProjectActions";
import { redirect } from "next/navigation";

export default async function StudioNewProjectPage() {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");

  return (
    <div className="mx-auto max-w-xl px-6 py-10 md:px-10">
      <Link
        href="/studio/projekty"
        className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        ← Lista projektów
      </Link>
      <h1
        className="mt-6 text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Nowy projekt
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Slug zostanie utworzony automatycznie z tytułu. Po zapisie dodaj zdjęcia
        w edycji (UploadThing).
      </p>

      <form action={actionCreateProjectAndRedirect} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Tytuł *
          </label>
          <input
            name="title"
            required
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Opis *
          </label>
          <textarea
            name="description"
            required
            rows={5}
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Lokalizacja
          </label>
          <input
            name="location"
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Rok
            </label>
            <input
              name="year"
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Typ pomieszczenia
            </label>
            <input
              name="type"
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 self-start border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background"
        >
          Utwórz i przejdź do edycji
        </button>
      </form>
    </div>
  );
}
