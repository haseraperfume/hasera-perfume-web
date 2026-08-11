import { defaultLocale, locales, type Locale } from "@/app/[lang]/dictionaries";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haseraperfume.com";

export const BRAND_NAME = "HASERA";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function localePath(lang: Locale, path = "") {
  return `/${lang}${path}`;
}

/**
 * Canonical + hreflang set for a locale-agnostic path ("" for home,
 * "/cleopatra-noir" for a PDP). x-default points at the Indonesian version
 * because Indonesia is the primary market.
 */
export function alternatesFor(lang: Locale, path = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));

  return {
    canonical: absoluteUrl(localePath(lang, path)),
    languages,
  };
}

/**
 * For pages that exist in the default locale only (the /panduan guides).
 * Emitting hreflang that points at a 404 is worse than emitting none, so this
 * returns a bare self-canonical with no `languages` map.
 */
export function canonicalDefaultLocaleOnly(path = "") {
  return { canonical: absoluteUrl(localePath(defaultLocale, path)) };
}

/**
 * Last meaningful content change for pages whose copy lives in the
 * dictionaries. Bump by hand when you edit that copy. Deliberately NOT a build
 * timestamp: a lastmod that always says "now" is a signal Google learns to
 * ignore.
 */
export const CONTENT_UPDATED = "2026-08-11";

/** OG locale codes, keyed by our short locale. */
export const OG_LOCALE: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
};

export function ogLocaleAlternates(lang: Locale) {
  return locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]);
}

/**
 * URL to print as a QR code on product packaging. Deliberately locale-less so
 * the string stays short (denser QR scans worse on a small printed box);
 * `proxy.ts` permanently redirects it to the default locale.
 *
 * Boxes are physical and permanent: once printed, this slug can never change
 * and the redirect must be kept forever. See .plans/P-009_seo_audit.md §4a.
 */
export function qrUrl(slug: string) {
  return absoluteUrl(
    `/${slug}?utm_source=box&utm_medium=qr&utm_campaign=${slug}`
  );
}
