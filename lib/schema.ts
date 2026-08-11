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
const WEBSITE_ID = absoluteUrl("/#website");

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
    "@id": WEBSITE_ID,
    name: BRAND_NAME,
    url: absoluteUrl(localePath(lang)),
    inLanguage: lang,
    publisher: { "@id": ORGANIZATION_ID },
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
