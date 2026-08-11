import {
  INSTAGRAM_URL,
  SHOPEE_URL,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
} from "@/app/[lang]/constants";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { Product } from "./products";
import { BRAND_NAME, absoluteUrl, localePath } from "./site";

const ORGANIZATION_ID = absoluteUrl("/#organization");

/**
 * Locale-scoped: /id and /en emit different WebSite bodies (different url and
 * inLanguage), so they must not share one @id or the entity graph contradicts
 * itself.
 */
const websiteId = (lang: Locale) => absoluteUrl(`/#website-${lang}`);

/**
 * Tells Google that the bare token "hasera" is this brand. `sameAs` is the
 * corroborating link graph, see .plans/P-009_seo_audit.md §2.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BRAND_NAME,
    alternateName: ["Hasera", "Hasera Perfume", "Parfum Hasera"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/hasera/hasera-perfume.png"),
    image: absoluteUrl("/images/generated/hasera-footer-collection.webp"),
    sameAs: [INSTAGRAM_URL, TIKTOK_URL, SHOPEE_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${WHATSAPP_NUMBER}`,
        areaServed: "ID",
        availableLanguage: ["id", "en"],
      },
    ],
  };
}

export function websiteSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(lang),
    name: BRAND_NAME,
    url: absoluteUrl(localePath(lang)),
    inLanguage: lang,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Guides and trust pages. Answer engines weight attributable, dated content,
 * and the site had neither. `author`/`publisher` reference the Organization
 * node by @id rather than duplicating it.
 */
export function articleSchema({
  headline,
  description,
  path,
  lang,
  datePublished,
  dateModified,
  image,
  type = "Article",
}: {
  headline: string;
  description: string;
  path: string;
  lang: Locale;
  datePublished: string;
  dateModified: string;
  image?: string;
  type?: "Article" | "AboutPage" | "ContactPage" | "WebPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    name: headline,
    description,
    url: absoluteUrl(localePath(lang, path)),
    inLanguage: lang,
    datePublished,
    dateModified,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": websiteId(lang) },
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

export function itemListSchema(
  items: { name: string; path: string }[],
  lang: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}

/** Structural subset of a dictionary product entry that schema needs. */
type ProductDetail = {
  metaDescription: string;
  scentFamily: string;
};

export function productSchema(
  product: Product,
  detail: ProductDetail,
  lang: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND_NAME} ${product.name}`,
    sku: product.sku,
    description: detail.metaDescription,
    image: product.images.map((src) => absoluteUrl(src)),
    inLanguage: lang,
    brand: { "@type": "Brand", name: BRAND_NAME },
    category: detail.scentFamily,
    size: `${product.sizeMl} ml`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Concentration",
        value: product.concentration,
      },
      {
        "@type": "PropertyValue",
        name: "Volume",
        value: product.sizeMl,
        unitCode: "MLT",
      },
    ],
    // Deliberately no aggregateRating: on-site reviews are unverified and
    // name-masked. See .plans/P-009_seo_audit.md §7.6.
    offers: {
      "@type": "Offer",
      url: absoluteUrl(localePath(lang, `/${product.slug}`)),
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORGANIZATION_ID },
    },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  lang: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(localePath(lang, crumb.path)),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
