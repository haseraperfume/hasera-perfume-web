/**
 * Product catalog, commercial and structural data only.
 * All human copy (mood, description, notes, persona story, FAQ) lives in
 * app/[lang]/dictionaries/{id,en}.json so it stays translatable.
 *
 * `slug` values are printed on packaging QR codes. Never rename them.
 */

export const CURRENCY = "IDR";

/** Selling price. `compareAtPrice` is the list price shown struck through. */
export const PRICE = 99_000;
export const COMPARE_AT_PRICE = 140_000;

export type ProductKey =
  | "cleopatra-noir"
  | "georgia-flora"
  | "croesus-gold"
  | "rose-antoinette";

export type Product = {
  key: ProductKey;
  slug: string;
  name: string;
  /** CSS accent class defined in app/globals.css */
  tone: string;
  image: string;
  images: string[];
  price: number;
  compareAtPrice: number;
  currency: string;
  sizeMl: number;
  /** Spelled out, not just "EDP", so it matches how people search. */
  concentration: string;
  /**
   * Skin and fabric wear differently, so they are stated separately rather
   * than collapsed into one optimistic number. Fabric is always rendered as
   * "up to", skin as a range.
   */
  longevity: { skinMinHours: number; skinMaxHours: number; fabricHours: number };
  sku: string;
  published: boolean;
};

export const products: Product[] = [
  {
    key: "cleopatra-noir",
    slug: "cleopatra-noir",
    name: "Cleopatra Noir",
    tone: "plum",
    image: "/images/generated/hasera-cleopatra-noir-card.webp",
    images: [
      "/images/generated/hasera-cleopatra-noir-card.webp",
      "/images/generated/hasera-hero-cleopatra-noir.webp",
    ],
    price: PRICE,
    compareAtPrice: COMPARE_AT_PRICE,
    currency: CURRENCY,
    sizeMl: 50,
    concentration: "Eau de Parfum (EDP)",
    longevity: { skinMinHours: 6, skinMaxHours: 8, fabricHours: 12 },
    sku: "HSR-CN-50",
    published: true,
  },
  {
    key: "georgia-flora",
    slug: "georgia-flora",
    name: "Georgia Flora",
    tone: "rose",
    image: "/images/generated/hasera-georgia-flora-card.webp",
    images: ["/images/generated/hasera-georgia-flora-card.webp"],
    price: PRICE,
    compareAtPrice: COMPARE_AT_PRICE,
    currency: CURRENCY,
    sizeMl: 50,
    concentration: "Eau de Parfum (EDP)",
    longevity: { skinMinHours: 6, skinMaxHours: 8, fabricHours: 12 },
    sku: "HSR-GF-50",
    published: true,
  },
  {
    key: "croesus-gold",
    slug: "croesus-gold",
    name: "Croesus Gold",
    tone: "gold",
    image: "/images/generated/hasera-croesus-gold-card.webp",
    images: ["/images/generated/hasera-croesus-gold-card.webp"],
    price: PRICE,
    compareAtPrice: COMPARE_AT_PRICE,
    currency: CURRENCY,
    sizeMl: 50,
    concentration: "Eau de Parfum (EDP)",
    longevity: { skinMinHours: 6, skinMaxHours: 8, fabricHours: 12 },
    sku: "HSR-CG-50",
    published: true,
  },
  {
    // Real SKU, still in R&D. Slug reserved so nothing else claims it; the
    // route stays a 404 until this flips to true.
    key: "rose-antoinette",
    slug: "rose-antoinette",
    name: "Rose Antoinette",
    tone: "rose",
    image: "",
    images: [],
    price: PRICE,
    compareAtPrice: COMPARE_AT_PRICE,
    currency: CURRENCY,
    sizeMl: 50,
    concentration: "Eau de Parfum (EDP)",
    longevity: { skinMinHours: 6, skinMaxHours: 8, fabricHours: 12 },
    sku: "HSR-RA-50",
    published: false,
  },
];

export const publishedProducts = products.filter((p) => p.published);

export function getProduct(slug: string) {
  return publishedProducts.find((p) => p.slug === slug);
}

export function otherProducts(slug: string) {
  return publishedProducts.filter((p) => p.slug !== slug);
}

export function formatIdr(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
