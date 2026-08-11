import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaLink from "../CtaLink";
import SiteFooter from "../SiteFooter";
import JsonLd from "@/components/JsonLd";
import { getDictionary, hasLocale, locales } from "../dictionaries";
import {
  SHOPEE_URL,
  SOCIAL_ICON,
  TIKTOK_URL,
  whatsappUrl,
  withUtm,
} from "../constants";
import {
  formatIdr,
  getProduct,
  otherProducts,
  publishedProducts,
} from "@/lib/products";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import { alternatesFor, localePath } from "@/lib/site";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    publishedProducts.map((product) => ({ lang, slug: product.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();

  const dict = await getDictionary(lang);
  const detail = dict.products[product.key as keyof typeof dict.products];

  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    alternates: alternatesFor(lang, `/${product.slug}`),
    openGraph: {
      type: "website",
      title: detail.metaTitle,
      description: detail.metaDescription,
      url: localePath(lang, `/${product.slug}`),
      images: product.image ? [{ url: product.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: detail.metaTitle,
      description: detail.metaDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();

  const dict = await getDictionary(lang);
  const detail = dict.products[product.key as keyof typeof dict.products];
  const mood = dict.collection.products[product.key as keyof typeof dict.collection.products];
  const pdp = dict.pdp;
  const waHref = whatsappUrl(`${dict.cta.whatsappMessage} ${product.name}`);
  const others = otherProducts(product.slug);

  const noteGroups: [string, readonly string[]][] = [
    [pdp.notesTop, detail.notes.top],
    [pdp.notesHeart, detail.notes.heart],
    [pdp.notesBase, detail.notes.base],
  ];

  const specs: [string, string][] = [
    [pdp.specFamily, detail.scentFamily],
    [pdp.specSize, `${product.sizeMl} ml`],
    [pdp.specConcentration, product.concentration],
    [
      pdp.specLongevitySkin,
      `${product.longevity.skinMinHours}-${product.longevity.skinMaxHours} ${pdp.hours}`,
    ],
    [
      pdp.specLongevityFabric,
      `${pdp.upTo} ${product.longevity.fabricHours} ${pdp.hours}`,
    ],
  ];

  return (
    <main className="pdp">
      <a className="skip-link" href="#main-content">{dict.nav.skipToContent}</a>

      <header className="pdp-header wrap">
        <a className="wordmark" href={`/${lang}`} aria-label={dict.nav.brandHome}>
          <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={140} height={23} />
        </a>
        <nav className="pdp-crumbs" aria-label={pdp.breadcrumbCollection}>
          <Link href={`/${lang}`}>{pdp.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}#collection`}>{pdp.breadcrumbCollection}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </header>

      {/* Commerce first: the search visitor converts from here. The persona
          story sits below for the QR-scanner audience. */}
      <section className={`pdp-hero wrap ${product.tone}`} id="main-content">
        <div className="pdp-media">
          <Image
            src={product.image}
            alt={`${product.name}, ${detail.scentFamily}`}
            fill
            priority
            sizes="(max-width: 860px) 92vw, 46vw"
          />
        </div>
        <div className="pdp-intro">
          <p className="eyebrow">{mood.mood}</p>
          <h1>{product.name}</h1>
          <span className="rule" />
          <p className="pdp-tagline">{detail.tagline}</p>

          <div className="pdp-price">
            <b>{formatIdr(product.price)}</b>
            <s aria-label={pdp.priceCompareLabel}>
              {formatIdr(product.compareAtPrice)}
            </s>
          </div>

          <h2 className="pdp-block-title">{pdp.specsTitle}</h2>
          <dl className="pdp-specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="pdp-block-title">{pdp.buyTitle}</h2>
          <div className="pdp-buy">
            <CtaLink className="button orange" href={withUtm(SHOPEE_URL, `shopee_pdp_${product.slug}`)} channel="shopee" location="pdp" itemId={product.slug} itemName={product.name}>
              <Image className="btn-icon" src={SOCIAL_ICON.shopee} alt="" width={20} height={20} />{dict.cta.shopee}
            </CtaLink>
            <CtaLink className="button dark-outline" href={withUtm(TIKTOK_URL, `tiktok_pdp_${product.slug}`)} channel="tiktok" location="pdp" itemId={product.slug} itemName={product.name}>
              <Image className="btn-icon" src={SOCIAL_ICON.tiktok} alt="" width={20} height={20} />{dict.cta.tiktok}
            </CtaLink>
            <CtaLink className="button whatsapp" href={waHref} channel="whatsapp" location="pdp" itemId={product.slug} itemName={product.name}>
              <Image className="btn-icon" src={SOCIAL_ICON.whatsapp} alt="" width={20} height={20} />{dict.cta.whatsapp}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="pdp-notes section wrap" aria-labelledby="notes-heading">
        <h2 className="center" id="notes-heading">{pdp.notesTitle}</h2>
        {/* dl, not ul: the tier label has to stay bound to its notes when a
            parser or answer engine lifts this block out of the page. */}
        <dl className="pdp-notes-grid">
          {noteGroups.map(([label, notes]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{notes.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pdp-story" aria-labelledby="persona-heading">
        <div className="wrap pdp-story-inner">
          <p className="eyebrow">{detail.personaName}</p>
          <h2 id="persona-heading">{pdp.storyTitle}</h2>
          <span className="rule" />
          {detail.story.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="faq section wrap" aria-labelledby="pdp-faq-heading">
        <h2 className="center" id="pdp-faq-heading">{pdp.faqTitle}</h2>
        <div className="faq-list">
          {detail.faq.map((item) => (
            <details key={item.q}>
              <summary><h3>{item.q}</h3></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pdp-also section wrap" aria-labelledby="also-heading">
        <h2 className="center" id="also-heading">{pdp.alsoTitle}</h2>
        <div className="pdp-also-grid">
          {others.map((other) => {
            const otherMood = dict.collection.products[other.key as keyof typeof dict.collection.products];
            return (
              <Link className={`product-card ${other.tone}`} href={`/${lang}/${other.slug}`} key={other.slug}>
                <Image src={other.image} alt={other.name} fill sizes="(max-width: 720px) 92vw, 40vw" />
                <div className="product-overlay" />
                <div className="product-copy">
                  <h3>{other.name}</h3>
                  <p>{otherMood.mood}</p>
                  <span>{dict.collection.explore} <b aria-hidden="true">→</b></span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="center pdp-back">
          <Link href={`/${lang}#collection`}>{pdp.backToCollection}</Link>
        </p>
      </section>

      <SiteFooter lang={lang} dict={dict} />

      <JsonLd
        schema={[
          productSchema(product, detail, lang),
          breadcrumbSchema(
            [
              { name: pdp.breadcrumbHome, path: "" },
              { name: product.name, path: `/${product.slug}` },
            ],
            lang
          ),
          faqSchema(detail.faq),
        ]}
      />
    </main>
  );
}
