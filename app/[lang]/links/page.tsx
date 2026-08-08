import Image from "next/image";
import { notFound } from "next/navigation";
import CtaLink from "../CtaLink";
import { hasLocale } from "../dictionaries";
import { SHOPEE_URL, TIKTOK_URL, INSTAGRAM_URL, whatsappUrl, SOCIAL_ICON } from "../constants";

const links = [
  { channel: "website" as const, className: "linktree-btn official", label: "OFFICIAL WEBSITE", href: (lang: string) => `/${lang}`, external: false, icon: null },
  { channel: "shopee" as const, className: "linktree-btn shopee", label: "SHOPEE", href: () => SHOPEE_URL, external: true, icon: SOCIAL_ICON.shopee },
  { channel: "tiktok" as const, className: "linktree-btn tiktok", label: "TIKTOK", href: () => TIKTOK_URL, external: true, icon: SOCIAL_ICON.tiktok },
  { channel: "instagram" as const, className: "linktree-btn instagram", label: "INSTAGRAM", href: () => INSTAGRAM_URL, external: true, icon: SOCIAL_ICON.instagram },
  { channel: "whatsapp" as const, className: "linktree-btn whatsapp", label: "WHATSAPP", href: () => whatsappUrl("Hi Hasera, saya mau tanya produk."), external: true, icon: SOCIAL_ICON.whatsapp },
];

export default async function LinksPage({ params }: PageProps<"/[lang]/links">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="linktree">
      <div className="linktree-inner">
        <img className="linktree-wordmark" src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={200} height={33} />
        <p className="linktree-tagline">Choose where to find us</p>
        <nav className="linktree-list" aria-label="Hasera links">
          {links.map((link) => (
            <CtaLink
              key={link.channel}
              className={link.className}
              href={link.href(lang)}
              channel={link.channel}
              location="linktree"
              external={link.external}
            >
              {link.icon && <Image className="btn-icon" src={link.icon} alt="" width={28} height={28} />}
              {link.label}
            </CtaLink>
          ))}
        </nav>
      </div>
    </main>
  );
}
