import Link from "next/link";
import { auth } from "@/auth";
import { dalListAllForStudio } from "@/lib/dal/projectsDal";
import { redirect } from "next/navigation";

export default async function StudioProjectsListPage() {
  const session = await auth();
  if (!session?.user) redirect("/studio/logowanie");

  const projects = await dalListAllForStudio();

  return (
    <div className="px-6 py-10 md:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-3xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            Projekty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edycja treści i galerii. Adres publiczny zawsze używa{" "}
            <span className="text-foreground">slug</span>, nie identyfikatora z
            bazy.
          </p>
        </div>
        <Link
          href="/studio/projekty/nowy"
          className="border border-foreground px-5 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Nowy projekt
        </Link>
      </div>

      <div className="divide-y divide-border border border-border">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 px-4 py-4"
          >
            <div>
              <p className="font-medium text-foreground">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                /projects/{p.slug}
                {!p.published ? " · szkic" : ""}
              </p>
            </div>
            <Link
              href={`/studio/projekty/${p.slug}/edycja`}
              className="text-xs uppercase tracking-widest text-accent underline-offset-4 hover:underline"
            >
              Edytuj
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
