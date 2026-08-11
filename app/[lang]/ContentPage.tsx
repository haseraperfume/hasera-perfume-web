import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "./SiteFooter";
import JsonLd from "@/components/JsonLd";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CONTENT_UPDATED, alternatesFor, localePath } from "@/lib/site";

type PageKey = "tentang-kami" | "kebijakan-privasi" | "pengiriman-pengembalian";

const SCHEMA_TYPE: Record<PageKey, "AboutPage" | "ContactPage" | "WebPage"> = {
  "tentang-kami": "AboutPage",
  "kebijakan-privasi": "WebPage",
  "pengiriman-pengembalian": "WebPage",
};

/** Shared metadata builder for the static trust pages. */
export async function contentMetadata(
  lang: string,
  key: PageKey
): Promise<Metadata> {
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const page = dict.pages[key];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: alternatesFor(lang, `/${key}`),
    openGraph: {
      type: "article",
      title: page.metaTitle,
      description: page.metaDescription,
      url: localePath(lang, `/${key}`),
    },
  };
}

export default async function ContentPage({
  lang,
  pageKey,
}: {
  lang: Locale;
  pageKey: PageKey;
}) {
  const dict = await getDictionary(lang);
  const page = dict.pages[pageKey];

  return (
    <main className="content-page">
      <a className="skip-link" href="#main-content">{dict.nav.skipToContent}</a>

      <header className="pdp-header wrap">
        <a className="wordmark" href={`/${lang}`} aria-label={dict.nav.brandHome}>
          <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={140} height={23} />
        </a>
        <nav className="pdp-crumbs" aria-label={dict.pdp.breadcrumbHome}>
          <Link href={`/${lang}`}>{dict.pdp.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.eyebrow}</span>
        </nav>
      </header>

      <article className="wrap content-body" id="main-content">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span className="rule" />
        <p className="byline">
          {dict.footer.updatedPrefix}{" "}
          <time dateTime={CONTENT_UPDATED}>
            {new Date(CONTENT_UPDATED).toLocaleDateString(
              lang === "id" ? "id-ID" : "en-GB",
              { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
            )}
          </time>
        </p>
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>

      <SiteFooter lang={lang} dict={dict} />

      <JsonLd
        schema={[
          articleSchema({
            headline: page.title,
            description: page.metaDescription,
            path: `/${pageKey}`,
            lang,
            datePublished: CONTENT_UPDATED,
            dateModified: CONTENT_UPDATED,
            type: SCHEMA_TYPE[pageKey],
          }),
          breadcrumbSchema(
            [
              { name: dict.pdp.breadcrumbHome, path: "" },
              { name: page.eyebrow, path: `/${pageKey}` },
            ],
            lang
          ),
        ]}
      />
    </main>
  );
}
