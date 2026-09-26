import type { Metadata } from "next";
import { siteUrl } from "./site-url";

export const brandName = "Creative Pie";
export const homeTitle = "Creative Pie — Creative & Social Media Agency in Lagos";
export const homeDescription = "Creative Pie is a Lagos-based, social-first agency for creative direction, content creation, social media management, branding and websites. Working worldwide.";
export const isPreview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
export const socialImage = {
  url: `${siteUrl}/og.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Creative Pie — We make culture worth stopping for. Creative direction, content and SMM, branding and websites. Lagos / Worldwide.",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} — ${brandName}`;
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { title: fullTitle, description, url: `${siteUrl}${path}`, siteName: brandName, locale: "en_NG", type: "website", images: [socialImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage.url] },
  };
}
