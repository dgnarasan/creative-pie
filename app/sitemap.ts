import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

const base = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/capabilities", "/studio", "/contact", "/privacy"];
  return staticRoutes.map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-09-01"), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.8 }));
}
