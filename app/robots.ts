import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Tells crawlers what they may index and where to find the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
