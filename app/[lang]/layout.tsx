import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import { notFound } from "next/navigation";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import {
  BRAND_NAME,
  OG_LOCALE,
  SITE_URL,
  alternatesFor,
  localePath,
  ogLocaleAlternates,
} from "@/lib/site";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      // Sub-pages set only their own title and inherit the brand suffix.
      template: `%s | ${BRAND_NAME}`,
    },
    description: dict.meta.description,
    applicationName: BRAND_NAME,
    alternates: alternatesFor(lang),
    openGraph: {
      type: "website",
      siteName: BRAND_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
      url: localePath(lang),
      locale: OG_LOCALE[lang],
      alternateLocale: ogLocaleAlternates(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    icons: {
      icon: [
        { url: "/images/hasera/hasera-perfume.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <JsonLd schema={[organizationSchema(), websiteSchema(lang)]} />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;

                // GA4 DebugView. Always on in development. In production it is
                // opt-in via ?ga_debug=1 and persists for the tab, so a real
                // phone can be debugged without shipping debug traffic for
                // everyone. ?ga_debug=0 turns it back off.
                var gaDebug = ${process.env.NODE_ENV !== "production"};
                try {
                  var flag = new URLSearchParams(window.location.search).get('ga_debug');
                  if (flag === '1') sessionStorage.setItem('ga_debug', '1');
                  if (flag === '0') sessionStorage.removeItem('ga_debug');
                  if (sessionStorage.getItem('ga_debug') === '1') gaDebug = true;
                } catch (e) {}

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', gaDebug ? { debug_mode: true } : {});
                if (gaDebug) console.info('[GA4] debug_mode ON. Events appear in Admin > DebugView.');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
