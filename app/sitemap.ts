import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Lists the site's pages for search engines. This is a one-page site, so the
// sitemap has a single entry — add another object here if a page is ever added.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
