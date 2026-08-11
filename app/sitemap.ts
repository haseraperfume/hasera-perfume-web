import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "./[lang]/dictionaries";
import { publishedProducts } from "@/lib/products";
import { absoluteUrl, localePath } from "@/lib/site";

/**
 * One entry per locale per page, each carrying the full hreflang set so the
 * sitemap and the <head> tags agree. /links is intentionally excluded, it is
 * a linktree that duplicates homepage links (see robots.ts).
 */
function entry(
  path: string,
  options: Partial<MetadataRoute.Sitemap[number]> = {}
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));

  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified: new Date(),
    alternates: { languages },
    ...options,
  }));
}

const CONTENT_PAGES = [
  "/tentang-kami",
  "/pengiriman-pengembalian",
  "/kebijakan-privasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("", { changeFrequency: "weekly", priority: 1 }),
    ...publishedProducts.flatMap((product) =>
      entry(`/${product.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
    ...CONTENT_PAGES.flatMap((path) =>
      entry(path, { changeFrequency: "yearly", priority: 0.3 })
    ),
  ];
}
