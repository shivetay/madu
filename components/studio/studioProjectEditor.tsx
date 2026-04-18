"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import {
  actionDeleteImage,
  actionReorderImages,
  actionSetCoverImage,
  actionUpdateImageAlt,
  actionUpdateProject,
} from "@/lib/actions/studioProjectActions";
import type { StudioEditorProject } from "@/lib/types/studioEditorProject";
import { StudioUploadButton } from "@/lib/uploadthing";

type Props = {
  project: StudioEditorProject;
};

export function StudioProjectEditor({ project }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const sortedIds = useMemo(
    () =>
      [...project.images]
        .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
        .map((i) => i.id),
    [project.images],
  );

  function refresh() {
    router.refresh();
  }

  function saveMain(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await actionUpdateProject(project.slug, {
        title: String(fd.get("title") ?? "").trim(),
        description: String(fd.get("description") ?? "").trim(),
        location: String(fd.get("location") ?? "").trim(),
        year: String(fd.get("year") ?? "").trim(),
        type: String(fd.get("type") ?? "").trim(),
        published: fd.get("published") === "on",
        sortOrder: Number(fd.get("sortOrder") ?? 0),
        metaTitle:
          String(fd.get("metaTitle") ?? "").trim() || null,
        metaDescription:
          String(fd.get("metaDescription") ?? "").trim() || null,
      });
      refresh();
    });
  }

  function moveImage(imageId: string, direction: -1 | 1) {
    const idx = sortedIds.indexOf(imageId);
    const j = idx + direction;
    if (idx < 0 || j < 0 || j >= sortedIds.length) return;
    const next = [...sortedIds];
    const t = next[idx];
    next[idx] = next[j]!;
    next[j] = t!;
    startTransition(async () => {
      await actionReorderImages(project.slug, next);
      refresh();
    });
  }

  return (
    <div className="px-6 py-10 md:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/studio/projekty"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          ← Lista projektów
        </Link>
        <p className="text-xs text-muted-foreground">
          Publiczny URL:{" "}
          <Link
            href={`/projects/${project.slug}`}
            className="text-foreground underline-offset-2 hover:underline"
          >
            /projects/{project.slug}
          </Link>
        </p>
      </div>

      <h1
        className="mb-8 text-3xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Edycja: {project.title}
      </h1>

      <form onSubmit={saveMain} className="max-w-2xl space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Tytuł
          </label>
          <input
            name="title"
            required
            defaultValue={project.title}
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Opis
          </label>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={project.description}
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Lokalizacja
            </label>
            <input
              name="location"
              defaultValue={project.location}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Typ
            </label>
            <input
              name="type"
              defaultValue={project.type}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Rok
            </label>
            <input
              name="year"
              defaultValue={project.year}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Kolejność na liście
            </label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={project.sortOrder}
              className="border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Tytuł SEO (opcjonalnie)
          </label>
          <input
            name="metaTitle"
            defaultValue={project.metaTitle ?? ""}
            placeholder="Domyślnie: tytuł projektu | MADU HOME"
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Opis SEO (opcjonalnie)
          </label>
          <textarea
            name="metaDescription"
            rows={3}
            defaultValue={project.metaDescription ?? ""}
            placeholder="Domyślnie: opis projektu"
            className="border border-border bg-transparent px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project.published}
            className="border-border"
          />
          Opublikowany (widoczny na stronie publicznej)
        </label>

        <button
          type="submit"
          disabled={pending}
          className="border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-opacity hover:bg-foreground hover:text-background disabled:opacity-50"
        >
          {pending ? "Zapisywanie…" : "Zapisz dane projektu"}
        </button>
      </form>

      <section className="mt-16 max-w-3xl border-t border-border pt-12">
        <h2
          className="mb-2 text-xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          Galeria
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Pierwsze zdjęcie w kolejności z flagą „okładka” jest używane na liście
          realizacji i jako zdjęcie główne na stronie projektu.
        </p>

        <div className="mb-8">
          <StudioUploadButton
            endpoint="projectImage"
            input={{ slug: project.slug }}
            onClientUploadComplete={() => refresh()}
            onUploadError={(err: Error) => {
              console.error(err);
              alert(err.message);
            }}
          />
        </div>

        <ul className="space-y-6">
          {[...project.images]
            .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
            .map((img, index) => (
              <li
                key={img.id}
                className="flex flex-wrap gap-4 border border-border p-4"
              >
                <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {img.isCover ? (
                      <span className="border border-accent px-2 py-1 text-accent">
                        Okładka
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={pending}
                        className="border border-border px-2 py-1 uppercase tracking-widest hover:bg-muted"
                        onClick={() =>
                          startTransition(async () => {
                            await actionSetCoverImage(img.id, project.slug);
                            refresh();
                          })
                        }
                      >
                        Ustaw jako okładkę
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={pending || index === 0}
                      className="border border-border px-2 py-1 uppercase tracking-widest hover:bg-muted disabled:opacity-40"
                      onClick={() => moveImage(img.id, -1)}
                    >
                      Wyżej
                    </button>
                    <button
                      type="button"
                      disabled={
                        pending || index === project.images.length - 1
                      }
                      className="border border-border px-2 py-1 uppercase tracking-widest hover:bg-muted disabled:opacity-40"
                      onClick={() => moveImage(img.id, 1)}
                    >
                      Niżej
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      className="border border-destructive px-2 py-1 uppercase tracking-widest text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        if (!confirm("Usunąć to zdjęcie?")) return;
                        startTransition(async () => {
                          await actionDeleteImage(img.id, project.slug);
                          refresh();
                        });
                      }}
                    >
                      Usuń
                    </button>
                  </div>
                  <form
                    className="flex flex-wrap items-end gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      startTransition(async () => {
                        await actionUpdateImageAlt(
                          img.id,
                          project.slug,
                          String(fd.get("alt") ?? "").trim() || null,
                        );
                        refresh();
                      });
                    }}
                  >
                    <input type="hidden" name="id" value={img.id} />
                    <input
                      name="alt"
                      defaultValue={img.alt ?? ""}
                      placeholder="Tekst alternatywny"
                      className="min-w-[200px] flex-1 border border-border bg-transparent px-2 py-1 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={pending}
                      className="border border-border px-3 py-1 text-xs uppercase tracking-widest hover:bg-muted"
                    >
                      Zapisz alt
                    </button>
                  </form>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
