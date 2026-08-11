import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "./[lang]/dictionaries";
import { publishedProducts } from "@/lib/products";
import { guides, guidesUpdated } from "@/lib/guides";
import { CONTENT_UPDATED, absoluteUrl, localePath } from "@/lib/site";

/**
 * `lastModified` comes from content dates, never from build time. An earlier
 * version used `new Date()`, which made all URLs claim to change on every
 * deploy including CSS-only ones, and a lastmod that is always "now" is a
 * signal Google learns to discount.
 */
function bilingual(
  path: string,
  lastModified: string,
  options: Partial<MetadataRoute.Sitemap[number]> = {}
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));

  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified,
    alternates: { languages },
    ...options,
  }));
}

/** Guides exist in the default locale only, so they carry no alternates. */
function idOnly(
  path: string,
  lastModified: string,
  options: Partial<MetadataRoute.Sitemap[number]> = {}
): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(localePath(defaultLocale, path)),
      lastModified,
      ...options,
    },
  ];
}

const CONTENT_PAGES = [
  "/tentang-kami",
  "/pengiriman-pengembalian",
  "/kebijakan-privasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...bilingual("", CONTENT_UPDATED, { changeFrequency: "weekly", priority: 1 }),
    ...publishedProducts.flatMap((product) =>
      bilingual(`/${product.slug}`, CONTENT_UPDATED, {
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
    ...idOnly("/panduan", guidesUpdated, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    ...guides.flatMap((guide) =>
      idOnly(`/panduan/${guide.slug}`, guide.updated, {
        changeFrequency: "yearly",
        priority: 0.6,
      })
    ),
    ...CONTENT_PAGES.flatMap((path) =>
      bilingual(path, CONTENT_UPDATED, {
        changeFrequency: "yearly",
        priority: 0.3,
      })
    ),
  ];
}
