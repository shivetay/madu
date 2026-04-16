import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { SiteFooter } from "@/components/siteFooter";
import { SiteNavigation } from "@/components/siteNavigation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const lato = Lato({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MADU HOME | Pracownia projektowania wnętrz",
  description:
    "Elegancka pracownia wnętrz: styl wiejskiej siedziby, angielska chata, rustyka i francuski country.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <SiteNavigation />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
