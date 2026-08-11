import Image from "next/image";
import CtaLink from "./CtaLink";
import type { Dictionary, Locale } from "./dictionaries";
import {
  INSTAGRAM_URL,
  SOCIAL_ICON,
  TIKTOK_URL,
  whatsappUrl,
  withUtm,
} from "./constants";

export default function SiteFooter({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const waHref = whatsappUrl(dict.cta.whatsappMessage);
  const home = `/${lang}`;

  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <a className="wordmark light" href={home}>
          <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={150} height={25} />
        </a>
        <nav aria-label={dict.nav.footerNavigation}>
          <a href={`${home}#home`}>{dict.nav.home}</a>
          <a href={`${home}#collection`}>{dict.nav.collection}</a>
          <a href={`${home}#story`}>{dict.nav.story}</a>
          <a href={`${home}#ingredients`}>{dict.nav.ingredients}</a>
          <a href={`${home}#reviews`}>{dict.nav.reviews}</a>
          <a href={`${home}#faq`}>{dict.nav.faq}</a>
        </nav>
        <div className="socials">
          <CtaLink href={INSTAGRAM_URL} channel="instagram" location="footer" ariaLabel={dict.footer.socials.instagram}><Image className="btn-icon" src={SOCIAL_ICON.instagram} alt="" width={26} height={26} /></CtaLink>
          <CtaLink href={withUtm(TIKTOK_URL, "tiktok_footer")} channel="tiktok" location="footer" ariaLabel={dict.footer.socials.tiktok}><Image className="btn-icon" src={SOCIAL_ICON.tiktok} alt="" width={26} height={26} /></CtaLink>
          <CtaLink href={waHref} channel="whatsapp" location="footer" ariaLabel={dict.footer.socials.whatsapp}><Image className="btn-icon" src={SOCIAL_ICON.whatsapp} alt="" width={26} height={26} /></CtaLink>
        </div>
      </div>
      <nav className="wrap footer-legal" aria-label={dict.footer.legalNavigation}>
        {/* Guides are Indonesian only, so the link only exists on /id. */}
        {lang === "id" && <a href={`/${lang}/panduan`}>{dict.footer.guides}</a>}
        <a href={`/${lang}/tentang-kami`}>{dict.footer.about}</a>
        <a href={`/${lang}/pengiriman-pengembalian`}>{dict.footer.shipping}</a>
        <a href={`/${lang}/kebijakan-privasi`}>{dict.footer.privacy}</a>
      </nav>
      <div className="wrap copyright">{dict.footer.copyright}</div>
    </footer>
  );
}
