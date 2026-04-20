import "@uploadthing/react/styles.css";
import { StudioShell } from "@/components/studio/studioShell";

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioShell>{children}</StudioShell>;
}
