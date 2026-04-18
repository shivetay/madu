import { Suspense } from "react";
import { auth } from "@/auth";
import { StudioLoginForm } from "@/components/studio/studioLoginForm";
import { redirect } from "next/navigation";

export default async function StudioLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/studio/projekty");
  }

  return (
    <Suspense
      fallback={
        <p className="p-10 text-center text-sm text-muted-foreground">
          Ładowanie…
        </p>
      }
    >
      <StudioLoginForm />
    </Suspense>
  );
}
