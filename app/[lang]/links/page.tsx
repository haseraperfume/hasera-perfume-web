import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CtaLink from "../CtaLink";
import { getDictionary, hasLocale } from "../dictionaries";
import { SHOPEE_URL, TIKTOK_URL, INSTAGRAM_URL, whatsappUrl, withUtm, SOCIAL_ICON } from "../constants";

// Duplicates the homepage's outbound links with no unique content, useful for
// an IG bio, worthless in the index. Also disallowed in app/robots.ts.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

const links = [
  { channel: "website" as const, className: "linktree-btn official", labelKey: "website" as const, href: (lang: string) => `/${lang}`, external: false, icon: null },
  { channel: "shopee" as const, className: "linktree-btn shopee", labelKey: "shopee" as const, href: () => withUtm(SHOPEE_URL, "shopee_linktree"), external: true, icon: SOCIAL_ICON.shopee },
  { channel: "tiktok" as const, className: "linktree-btn tiktok", labelKey: "tiktok" as const, href: () => withUtm(TIKTOK_URL, "tiktok_linktree"), external: true, icon: SOCIAL_ICON.tiktok },
  { channel: "instagram" as const, className: "linktree-btn instagram", labelKey: "instagram" as const, href: () => INSTAGRAM_URL, external: true, icon: SOCIAL_ICON.instagram },
  { channel: "whatsapp" as const, className: "linktree-btn whatsapp", labelKey: "whatsapp" as const, href: (_lang: string, message: string) => whatsappUrl(message), external: true, icon: SOCIAL_ICON.whatsapp },
];

export default async function LinksPage({ params }: PageProps<"/[lang]/links">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="linktree">
      <div className="linktree-inner">
        <img className="linktree-wordmark" src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={200} height={33} />
        <p className="linktree-tagline">{dict.linktree.tagline}</p>
        <nav className="linktree-list" aria-label={dict.linktree.navLabel}>
          {links.map((link) => (
            <CtaLink
              key={link.channel}
              className={link.className}
              href={link.href(lang, dict.linktree.whatsappMessage)}
              channel={link.channel}
              location="linktree"
              external={link.external}
            >
              {link.icon && <Image className="btn-icon" src={link.icon} alt="" width={28} height={28} />}
              {dict.linktree.labels[link.labelKey]}
            </CtaLink>
          ))}
        </nav>
      </div>
    </main>
  );
}
