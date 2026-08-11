import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../SiteFooter";
import JsonLd from "@/components/JsonLd";
import { defaultLocale, getDictionary, hasLocale } from "../../dictionaries";
import { GUIDE_UI, getGuide, guides, relatedGuides } from "@/lib/guides";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { canonicalDefaultLocaleOnly, localePath } from "@/lib/site";

// Indonesian only. /en/panduan/* is intentionally a 404 rather than a thin
// translation, and no hreflang points at it.
export async function generateStaticParams() {
  return guides.map((guide) => ({ lang: defaultLocale, slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/panduan/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuide(slug);
  if (lang !== defaultLocale || !guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: canonicalDefaultLocaleOnly(`/panduan/${guide.slug}`),
    openGraph: {
      type: "article",
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: localePath(defaultLocale, `/panduan/${guide.slug}`),
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({
  params,
}: PageProps<"/[lang]/panduan/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || lang !== defaultLocale) notFound();
  const guide = getGuide(slug);
  if (!guide) notFound();

  const dict = await getDictionary(lang);
  const related = relatedGuides(guide.slug);

  return (
    <main className="content-page">
      <a className="skip-link" href="#main-content">{dict.nav.skipToContent}</a>

      <header className="pdp-header wrap">
        <a className="wordmark" href={`/${lang}`} aria-label={dict.nav.brandHome}>
          <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={140} height={23} />
        </a>
        <nav className="pdp-crumbs" aria-label={GUIDE_UI.breadcrumb}>
          <Link href={`/${lang}`}>{dict.pdp.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/panduan`}>{GUIDE_UI.breadcrumb}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{guide.question}</span>
        </nav>
      </header>

      <article className="wrap content-body" id="main-content">
        <h1>{guide.question}</h1>

        {/* The answer block. This is the passage an answer engine lifts, so it
            has to read correctly with nothing above or below it. */}
        <p className="answer-lede">{guide.answer}</p>

        <p className="byline">
          {GUIDE_UI.author}
          <span aria-hidden="true"> · </span>
          {GUIDE_UI.updatedPrefix}{" "}
          <time dateTime={guide.updated}>
            {new Date(guide.updated).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </p>

        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>{GUIDE_UI.faqTitle}</h2>
          {/* Rendered as open prose, not <details>. Collapsed content is a
              weaker snippet candidate, and a guide page is read-mode anyway. */}
          {guide.faq.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </section>

        <aside className="guide-cta">
          <h2>{GUIDE_UI.productCtaTitle}</h2>
          <p>{GUIDE_UI.productCtaBody}</p>
          <Link href={`/${lang}#collection`}>{GUIDE_UI.productCtaLink}</Link>
        </aside>

        {related.length > 0 && (
          <section>
            <h2>{GUIDE_UI.relatedTitle}</h2>
            <ul className="guide-related">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/${lang}/panduan/${other.slug}`}>{other.question}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="pdp-back">
          <Link href={`/${lang}/panduan`}>{GUIDE_UI.backToHub}</Link>
        </p>
      </article>

      <SiteFooter lang={lang} dict={dict} />

      <JsonLd
        schema={[
          articleSchema({
            headline: guide.question,
            description: guide.answer,
            path: `/panduan/${guide.slug}`,
            lang,
            datePublished: guide.published,
            dateModified: guide.updated,
          }),
          breadcrumbSchema(
            [
              { name: dict.pdp.breadcrumbHome, path: "" },
              { name: GUIDE_UI.breadcrumb, path: "/panduan" },
              { name: guide.question, path: `/panduan/${guide.slug}` },
            ],
            lang
          ),
          faqSchema(guide.faq),
        ]}
      />
    </main>
  );
}
