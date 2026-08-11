import Image from "next/image";
import { notFound } from "next/navigation";
import SiteNav from "./SiteNav";
import CtaLink from "./CtaLink";
import ProductCard from "./ProductCard";
import { getDictionary, hasLocale } from "./dictionaries";
import { SHOPEE_URL, TIKTOK_URL, INSTAGRAM_URL, whatsappUrl, withUtm, SOCIAL_ICON } from "./constants";
import { publishedProducts } from "@/lib/products";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

const valueIcons = ["♤", "♧", "♢", "♡"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const waHref = whatsappUrl(dict.cta.whatsappMessage);

  return (
    <main>
      {/* The hero poster is the LCP element on mobile, where the video is
          deprioritised or suppressed by prefers-reduced-motion. React 19
          hoists this into <head>. */}
      <link
        rel="preload"
        as="image"
        href="/images/generated/hasera-hero-cleopatra-noir.webp"
        fetchPriority="high"
      />
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
              <CtaLink className="button whatsapp" href={waHref} channel="whatsapp" location="topbar"><Image className="btn-icon" src={SOCIAL_ICON.whatsapp} alt="" width={18} height={18} />{dict.topbar.whatsapp}</CtaLink>
              <CtaLink className="button orange" href={withUtm(SHOPEE_URL, "shopee_topbar")} channel="shopee" location="topbar"><Image className="btn-icon" src={SOCIAL_ICON.shopee} alt="" width={18} height={18} />{dict.topbar.shopee}</CtaLink>
              <CtaLink className="button outline" href={withUtm(TIKTOK_URL, "tiktok_topbar")} channel="tiktok" location="topbar"><Image className="btn-icon" src={SOCIAL_ICON.tiktok} alt="" width={18} height={18} />{dict.topbar.tiktok}</CtaLink>
            </div>
          </div>
        </div>
        <SiteNav lang={lang} nav={dict.nav} />
        <div className="hero-copy wrap" id="main-content">
          <p className="eyebrow">{dict.hero.eyebrow}</p>
          <h1>{dict.hero.titleLine1}<br />{dict.hero.titleLine2}<br /><em>{dict.hero.titleEm}</em></h1>
          <span className="rule" />
          <p className="hero-lede" dangerouslySetInnerHTML={{ __html: dict.hero.lede }} />
          <CtaLink className="button button-dark" href="#collection" channel="internal" location="hero" external={false}>{dict.hero.cta} <span aria-hidden="true">→</span></CtaLink>
        </div>
      </section>

      <section className="collection section wrap" id="collection" aria-labelledby="collection-heading">
        <p className="eyebrow center">{dict.collection.eyebrow}</p>
        <h2 className="center" id="collection-heading">{dict.collection.title}</h2>
        <div className="product-grid">
          {publishedProducts.map((product) => {
            const copy = dict.collection.products[product.key as keyof typeof dict.collection.products];
            const detail = dict.products[product.key as keyof typeof dict.products];
            return (
              <ProductCard
                key={product.key}
                href={`/${lang}/${product.slug}`}
                slug={product.slug}
                name={product.name}
                alt={`${product.name}, ${detail.scentFamily}`}
                tone={product.tone}
                image={product.image}
                mood={copy.mood}
                description={copy.description}
                exploreLabel={dict.collection.explore}
              />
            );
          })}
        </div>
      </section>

      <section className="values" aria-label={dict.nav.values}>
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

      <section className="ingredients section wrap" id="ingredients" aria-labelledby="ingredients-heading">
        <p className="eyebrow center">{dict.ingredients.eyebrow}</p>
        <h2 className="center" id="ingredients-heading">{dict.ingredients.title}</h2>
        <p className="center ingredients-intro">{dict.ingredients.intro}</p>
        <dl className="ingredients-grid">
          {dict.ingredients.items.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="story" id="story" aria-labelledby="story-heading">
        <div className="story-image">
          <Image src="/images/generated/hasera-footer-collection.webp" alt={dict.story.imageAlt} fill sizes="50vw" />
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
            <CtaLink className="button whatsapp" href={waHref} channel="whatsapp" location="cta_section"><Image className="btn-icon" src={SOCIAL_ICON.whatsapp} alt="" width={22} height={22} />{dict.cta.whatsapp}</CtaLink>
            <CtaLink className="button orange" href={withUtm(SHOPEE_URL, "shopee_cta_section")} channel="shopee" location="cta_section"><Image className="btn-icon" src={SOCIAL_ICON.shopee} alt="" width={22} height={22} />{dict.cta.shopee}</CtaLink>
            <CtaLink className="button outline" href={withUtm(TIKTOK_URL, "tiktok_cta_section")} channel="tiktok" location="cta_section"><Image className="btn-icon" src={SOCIAL_ICON.tiktok} alt="" width={22} height={22} />{dict.cta.tiktok}</CtaLink>
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
          <a className="wordmark light" href="#home">
            <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={150} height={25} />
          </a>
          <nav aria-label={dict.nav.footerNavigation}>
            <a href="#home">{dict.nav.home}</a>
            <a href="#collection">{dict.nav.collection}</a>
            <a href="#story">{dict.nav.story}</a>
            <a href="#ingredients">{dict.nav.ingredients}</a>
            <a href="#reviews">{dict.nav.reviews}</a>
            <a href="#faq">{dict.nav.faq}</a>
          </nav>
          <div className="socials">
            <CtaLink href={INSTAGRAM_URL} channel="instagram" location="footer" ariaLabel={dict.footer.socials.instagram}><Image className="btn-icon" src={SOCIAL_ICON.instagram} alt="" width={26} height={26} /></CtaLink>
            <CtaLink href={withUtm(TIKTOK_URL, "tiktok_footer")} channel="tiktok" location="footer" ariaLabel={dict.footer.socials.tiktok}><Image className="btn-icon" src={SOCIAL_ICON.tiktok} alt="" width={26} height={26} /></CtaLink>
            <CtaLink href={waHref} channel="whatsapp" location="footer" ariaLabel={dict.footer.socials.whatsapp}><Image className="btn-icon" src={SOCIAL_ICON.whatsapp} alt="" width={26} height={26} /></CtaLink>
          </div>
        </div>
        <div className="wrap copyright">{dict.footer.copyright}</div>
      </footer>

      <JsonLd schema={faqSchema(dict.faq.items)} />
    </main>
  );
}
