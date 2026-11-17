import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SideNav } from "@/components/layout/side-nav";
import {
  BASE_OPEN_GRAPH,
  SITE_DESCRIPTION,
  SITE_NAME,
  siteUrl,
} from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: BASE_OPEN_GRAPH,
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body className="min-h-dvh lg:grid lg:grid-cols-[20rem_1fr]">
        <a
          href="#main"
          className="sr-only z-10 bg-plum px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SideNav />
        <main id="main" className="min-w-0">
          {children}
        </main>
      </body>
    </html>
  );
}
