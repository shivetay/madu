import { StudioSidebar } from "@/components/studio/studioSidebar";

export default function StudioPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen pt-16">
      <StudioSidebar />
      <div className="min-w-0 flex-1 bg-background">{children}</div>
    </div>
  );
}
