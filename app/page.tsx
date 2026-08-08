import Image from "next/image";

const products = [
  {
    name: "Cleopatra Noir",
    mood: "Bold. Seductive. Elegant.",
    description: "A signature of your power.",
    image: "/images/generated/hasera-cleopatra-noir-card.png",
    tone: "plum",
  },
  {
    name: "Georgia Flora",
    mood: "Feminine. Radiant. Enchanting.",
    description: "A floral expression of timeless elegance.",
    image: "/images/generated/hasera-georgia-flora-card.png",
    tone: "rose",
  },
  {
    name: "Croesus Gold",
    mood: "Bold. Magnetic. Victorious.",
    description: "A signature of confidence and success.",
    image: "/images/generated/hasera-croesus-gold-card.png",
    tone: "gold",
  },
];

const values = [
  ["◌", "Premium ingredients", "The finest raw materials from around the world."],
  ["♧", "Masterfully crafted", "Blended with precision, perfected with passion."],
  ["◇", "Unique & memorable", "Scents that leave a lasting impression everywhere you go."],
  ["♡", "Made with care", "Cruelty-free, ethically sourced, and crafted responsibly."],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <video className="hero-image" autoPlay loop muted playsInline poster="/images/generated/hasera-hero-cleopatra-noir.png">
          <source src="/videos/generated/hasera-hero-cleopatra-noir.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" />
        <div className="topbar">
          <div className="wrap topbar-inner">
            <span className="header-cta-label">Ready to make it yours?</span>
            <div className="header-cta"><a className="button whatsapp" href="#shop">◉ WhatsApp</a><a className="button orange" href="#shop">♧ Shopee</a><a className="button outline" href="#shop">♪ TikTok</a></div>
          </div>
        </div>
        <header className="nav wrap">
          <a className="wordmark" href="#home" aria-label="Hasera home">HASERA</a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#collection">Home</a><a href="#collection">Collection</a><a href="#story">Our story</a><a href="#ingredients">Ingredients</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a>
          </nav>
          <a className="button button-dark nav-button" href="#collection">Shop now</a>
        </header>
        <div className="hero-copy wrap">
          <p className="eyebrow">Crafted to be remembered</p>
          <h1>Not just<br />perfume.<br /><em>A signature.</em></h1>
          <span className="rule" />
          <p className="hero-lede">HASERA is more than a fragrance.<br />It&apos;s the invisible armor you wear<br />every single day.</p>
          <a className="button button-dark" href="#collection">Discover collection <span>→</span></a>
        </div>
      </section>

      <section className="collection section wrap" id="collection">
        <p className="eyebrow center">Our collection</p>
        <h2 className="center">Three signatures. Three stories.</h2>
        <div className="product-grid">
          {products.map((product) => (
          <a className={`product-card ${product.tone}`} href="#shop" key={product.name}>
            <Image src={product.image} alt={`${product.name} perfume`} fill sizes="(max-width: 720px) 92vw, 32vw" />
            <div className="product-overlay" />
            <div className="product-copy">
              <h3>{product.name}</h3>
              <p>{product.mood}<br />{product.description}</p><span>Explore <b>→</b></span>
            </div>
          </a>
          ))}
        </div>
      </section>

      <section className="values" id="ingredients">
        <div className="wrap values-grid">{values.map(([icon, title, text]) => <div className="value" key={title}><strong>{icon}</strong>
            <div>
              <p>{title}</p><span>{text}</span>
            </div>
          </div>)}</div>
      </section>

      <section className="story" id="story">
        <div className="story-image">
          <Image src="/images/generated/hasera-footer-collection.png" alt="The Hasera perfume collection" fill sizes="50vw" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Why Hasera</p>
          <h2>Every detail,<br />every emotion.</h2><span className="rule" />
          <p>We believe perfume is a personal statement. Every drop is designed to elevate your presence and become a part of your identity.</p>
          <div className="stats">
            <div><b>20+</b><span>Premium<br />ingredients</span></div>
            <div><b>3</b><span>Signature<br />scents</span></div>
            <div><b>12</b><span>Hours<br />lasting</span></div>
            <div><b>100%</b><span>Made<br />with love</span></div>
          </div>
        </div>
      </section>

      <section className="reviews section wrap" id="reviews">
        <p className="eyebrow center">Loved by many</p>
        <h2 className="center">Their signature. Their story.</h2>
        <div className="review-grid">
          <article>
            <div>★★★★★</div>
            <p>&ldquo;Cleopatra Noir is my everyday confidence. It&apos;s bold, sexy, and lasts all day.&rdquo;</p><small>P**** M.</small>
          </article>
          <article>
            <div>★★★★★</div>
            <p>&ldquo;Georgia Flora is so feminine and elegant. I get compliments every time I wear it.&rdquo;</p><small>F****** S.</small>
          </article>
          <article>
            <div>★★★★★</div>
            <p>&ldquo;Croesus Gold smells powerful and luxurious. It&apos;s my go-to for special occasions.&rdquo;</p><small>S***** P.</small>
          </article>
        </div>
        <div className="dots">●　○　○　○</div>
      </section>

      <section className="cta" id="shop">
        <div className="wrap cta-inner">
          <div>
            <p className="eyebrow">Find your signature</p>
            <h2>Ready to make it yours?</h2>
            <p>Choose your signature fragrance and<br />let HASERA become a part of your story.</p>
          </div>
          <div className="cta-buttons"><a className="button whatsapp" href="#shop">◉ &nbsp;Chat via WhatsApp</a><a className="button orange" href="#shop">♧ &nbsp;Buy on Shopee</a><a className="button outline" href="#shop">♪ &nbsp;Buy on TikTok Shop</a></div>
        </div>
      </section>
      <footer className="footer" id="faq">
        <div className="wrap footer-top"><a className="wordmark light" href="#home">HASERA</a>
          <nav><a href="#home">Home</a><a href="#collection">Collection</a><a href="#story">Our story</a><a href="#ingredients">Ingredients</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a></nav>
          <div className="socials">◎　♪　◌　✉</div>
        </div>
        <div className="wrap copyright">© 2024 HASERA. All Rights Reserved.</div>
      </footer>
    </main>
  );
}
