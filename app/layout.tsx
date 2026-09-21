import type { Metadata } from "next";
import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./reference-home.css";
import { SiteChrome } from "./site-chrome";
import { siteUrl } from "./site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Creative Pie — Culture worth stopping for.",
    template: "%s — Creative Pie",
  },
  description:
    "Creative strategy, direction, campaigns and digital experiences for ambitious brands in Lagos and worldwide.",
  keywords: [
    "Creative Pie",
    "creative agency Lagos",
    "brand strategy",
    "campaigns",
    "content studio",
    "digital experiences",
  ],
  openGraph: {
    title: "Creative Pie — Culture worth stopping for.",
    description:
      "Creative strategy, campaigns, image production and websites from Lagos.",
    type: "website",
    images: [{ url: "/assets/cp-reference-hero.webp", width: 1584, height: 990, alt: "Original Creative Pie night movement studio study" }],
  },
  twitter: { card: "summary_large_image", title: "Creative Pie — Culture worth stopping for.", description: "Creative strategy, campaigns, image production and websites from Lagos.", images: ["/assets/cp-reference-hero.webp"] },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
