import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Linktree duplicates the homepage's outbound links and adds no unique
      // content, keep it crawlable for humans, out of the index.
      disallow: ["/api/", "/*/links"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
