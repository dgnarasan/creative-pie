import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";
import { isPreview } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: isPreview ? undefined : `${siteUrl}/sitemap.xml`,
  };
}
