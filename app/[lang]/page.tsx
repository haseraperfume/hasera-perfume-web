import Image from "next/image";
import { notFound } from "next/navigation";
import SiteNav from "./SiteNav";
import CtaLink from "./CtaLink";
import { getDictionary, hasLocale } from "./dictionaries";

const SHOPEE_URL = "https://shopee.co.id/haseraperfume";
const TIKTOK_URL = "https://www.tiktok.com/@haseraperfume";
const INSTAGRAM_URL = "https://www.instagram.com/haseraperfume";
const WHATSAPP_NUMBER = "6281263119830";

function whatsappUrl(message: string) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

const products = [
  { key: "cleopatra-noir", name: "Cleopatra Noir", image: "/images/generated/hasera-cleopatra-noir-card.webp", tone: "plum" },
  { key: "georgia-flora", name: "Georgia Flora", image: "/images/generated/hasera-georgia-flora-card.webp", tone: "rose" },
  { key: "croesus-gold", name: "Croesus Gold", image: "/images/generated/hasera-croesus-gold-card.webp", tone: "gold" },
] as const;

const valueIcons = ["◌", "♧", "◇", "♡"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const waHref = whatsappUrl(dict.cta.whatsappMessage);

  return (
    <main>
      <a className="skip-link" href="#main-content">{dict.nav.skipToContent}</a>

      <section className="hero" id="home">
        <video className="hero-image" autoPlay loop muted playsInline poster="/images/generated/hasera-hero-cleopatra-noir.webp">
          <source src="/videos/generated/hasera-hero-cleopatra-noir.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" />
        <div className="topbar">
          <div className="wrap topbar-inner">
            <span className="header-cta-label">{dict.topbar.label}</span>
            <div className="header-cta">
              <CtaLink className="button whatsapp" href={waHref} channel="whatsapp" location="topbar"><span aria-hidden="true">◉</span> {dict.topbar.whatsapp}</CtaLink>
              <CtaLink className="button orange" href={SHOPEE_URL} channel="shopee" location="topbar"><span aria-hidden="true">♧</span> {dict.topbar.shopee}</CtaLink>
              <CtaLink className="button outline" href={TIKTOK_URL} channel="tiktok" location="topbar"><span aria-hidden="true">♪</span> {dict.topbar.tiktok}</CtaLink>
            </div>
          </div>
        </div>
        <SiteNav lang={lang} nav={dict.nav} />
        <div className="hero-copy wrap" id="main-content">
          <p className="eyebrow">{dict.hero.eyebrow}</p>
          <h1>{dict.hero.titleLine1}<br />{dict.hero.titleLine2}<br /><em>{dict.hero.titleEm}</em></h1>
          <span className="rule" />
          <p className="hero-lede" dangerouslySetInnerHTML={{ __html: dict.hero.lede }} />
          <a className="button button-dark" href="#collection">{dict.hero.cta} <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="collection section wrap" id="collection" aria-labelledby="collection-heading">
        <p className="eyebrow center">{dict.collection.eyebrow}</p>
        <h2 className="center" id="collection-heading">{dict.collection.title}</h2>
        <div className="product-grid">
          {products.map((product) => {
            const copy = dict.collection.products[product.key];
            return (
              <a className={`product-card ${product.tone}`} href="#shop" key={product.key}>
                <Image src={product.image} alt={`${product.name} perfume`} fill sizes="(max-width: 720px) 92vw, 32vw" />
                <div className="product-overlay" />
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p>{copy.mood}<br />{copy.description}</p>
                  <span>{dict.collection.explore} <b aria-hidden="true">→</b></span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="values" id="ingredients" aria-label={dict.nav.ingredients}>
        <div className="wrap values-grid">
          {dict.values.map((value, i) => (
            <div className="value" key={value.title}>
              <strong aria-hidden="true">{valueIcons[i]}</strong>
              <div>
                <p>{value.title}</p><span>{value.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-heading">
        <div className="story-image">
          <Image src="/images/generated/hasera-footer-collection.webp" alt="The Hasera perfume collection" fill sizes="50vw" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">{dict.story.eyebrow}</p>
          <h2 id="story-heading" dangerouslySetInnerHTML={{ __html: dict.story.title }} /><span className="rule" />
          <p>{dict.story.body}</p>
          <div className="stats">
            {dict.story.stats.map((stat) => (
              <div key={stat.value}><b>{stat.value}</b><span dangerouslySetInnerHTML={{ __html: stat.label }} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews section wrap" id="reviews" aria-labelledby="reviews-heading">
        <p className="eyebrow center">{dict.reviews.eyebrow}</p>
        <h2 className="center" id="reviews-heading">{dict.reviews.title}</h2>
        <div className="review-grid">
          {dict.reviews.items.map((review) => (
            <article key={review.author}>
              <div role="img" aria-label={dict.reviews.ratingLabel}>★★★★★</div>
              <p>&ldquo;{review.quote}&rdquo;</p><small>{review.author}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="shop" aria-labelledby="cta-heading">
        <div className="wrap cta-inner">
          <div>
            <p className="eyebrow">{dict.cta.eyebrow}</p>
            <h2 id="cta-heading">{dict.cta.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: dict.cta.body }} />
          </div>
          <div className="cta-buttons">
            <CtaLink className="button whatsapp" href={waHref} channel="whatsapp" location="cta_section"><span aria-hidden="true">◉</span>&nbsp;{dict.cta.whatsapp}</CtaLink>
            <CtaLink className="button orange" href={SHOPEE_URL} channel="shopee" location="cta_section"><span aria-hidden="true">♧</span>&nbsp;{dict.cta.shopee}</CtaLink>
            <CtaLink className="button outline" href={TIKTOK_URL} channel="tiktok" location="cta_section"><span aria-hidden="true">♪</span>&nbsp;{dict.cta.tiktok}</CtaLink>
          </div>
        </div>
      </section>

      <section className="faq section wrap" id="faq" aria-labelledby="faq-heading">
        <p className="eyebrow center">{dict.faq.eyebrow}</p>
        <h2 className="center" id="faq-heading">{dict.faq.title}</h2>
        <div className="faq-list">
          {dict.faq.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-top">
          <a className="wordmark light" href="#home">HASERA</a>
          <nav aria-label="Footer navigation">
            <a href="#home">{dict.nav.home}</a>
            <a href="#collection">{dict.nav.collection}</a>
            <a href="#story">{dict.nav.story}</a>
            <a href="#ingredients">{dict.nav.ingredients}</a>
            <a href="#reviews">{dict.nav.reviews}</a>
            <a href="#faq">{dict.nav.faq}</a>
          </nav>
          <div className="socials">
            <CtaLink href={INSTAGRAM_URL} channel="instagram" location="footer" ariaLabel={dict.footer.socials.instagram}><span aria-hidden="true">◎</span></CtaLink>
            <CtaLink href={TIKTOK_URL} channel="tiktok" location="footer" ariaLabel={dict.footer.socials.tiktok}><span aria-hidden="true">♪</span></CtaLink>
            <CtaLink href={waHref} channel="whatsapp" location="footer" ariaLabel={dict.footer.socials.whatsapp}><span aria-hidden="true">✉</span></CtaLink>
          </div>
        </div>
        <div className="wrap copyright">{dict.footer.copyright}</div>
      </footer>
    </main>
  );
}
