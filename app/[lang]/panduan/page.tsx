import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../SiteFooter";
import JsonLd from "@/components/JsonLd";
import { defaultLocale, getDictionary, hasLocale } from "../dictionaries";
import { GUIDE_UI, guides } from "@/lib/guides";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { canonicalDefaultLocaleOnly, localePath } from "@/lib/site";

export async function generateStaticParams() {
  return [{ lang: defaultLocale }];
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/panduan">): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== defaultLocale) return {};

  return {
    title: GUIDE_UI.hubMetaTitle,
    description: GUIDE_UI.hubMetaDescription,
    alternates: canonicalDefaultLocaleOnly("/panduan"),
    openGraph: {
      type: "website",
      title: GUIDE_UI.hubMetaTitle,
      description: GUIDE_UI.hubMetaDescription,
      url: localePath(defaultLocale, "/panduan"),
    },
  };
}

export default async function GuideHubPage({
  params,
}: PageProps<"/[lang]/panduan">) {
  const { lang } = await params;
  if (!hasLocale(lang) || lang !== defaultLocale) notFound();
  const dict = await getDictionary(lang);

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
          <span aria-current="page">{GUIDE_UI.breadcrumb}</span>
        </nav>
      </header>

      <div className="wrap content-body" id="main-content">
        <p className="eyebrow">{GUIDE_UI.hubEyebrow}</p>
        <h1>{GUIDE_UI.hubTitle}</h1>
        <span className="rule" />
        <p>{GUIDE_UI.hubIntro}</p>

        <ul className="guide-index">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <h2>
                <Link href={`/${lang}/panduan/${guide.slug}`}>{guide.question}</Link>
              </h2>
              <p>{guide.answer}</p>
            </li>
          ))}
        </ul>
      </div>

      <SiteFooter lang={lang} dict={dict} />

      <JsonLd
        schema={[
          itemListSchema(
            guides.map((guide) => ({
              name: guide.question,
              path: `/panduan/${guide.slug}`,
            })),
            lang
          ),
          breadcrumbSchema(
            [
              { name: dict.pdp.breadcrumbHome, path: "" },
              { name: GUIDE_UI.breadcrumb, path: "/panduan" },
            ],
            lang
          ),
        ]}
      />
    </main>
  );
}
