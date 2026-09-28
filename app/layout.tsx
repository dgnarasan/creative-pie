import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./reference-home.css";
import { SiteChrome } from "./site-chrome";
import { siteUrl } from "./site-url";
import { brandName, homeTitle, homeDescription, isPreview, socialImage } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s — Creative Pie",
  },
  description: homeDescription,
  applicationName: brandName,
  category: "Creative agency",
  robots: { index: !isPreview, follow: true, googleBot: { index: !isPreview, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    title: "Creative Pie — We make culture worth stopping for.",
    description: homeDescription,
    url: siteUrl,
    siteName: brandName,
    locale: "en_NG",
    type: "website",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", title: "Creative Pie — We make culture worth stopping for.", description: homeDescription, images: [socialImage.url] },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-v3.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-96.png?v=3", type: "image/png", sizes: "96x96" },
      { url: "/favicon-v3.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon-v3.ico",
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#090a09", colorScheme: "dark light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/archivo-latin-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/bodoni-latin-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/plex-mono-latin-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
