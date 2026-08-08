"use client";

import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "./dictionaries";

export default function SiteNav({
  lang,
  nav,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
}) {
  const [open, setOpen] = useState(false);
  const otherLang: Locale = lang === "en" ? "id" : "en";

  const links: [string, string][] = [
    ["#home", nav.home],
    ["#collection", nav.collection],
    ["#story", nav.story],
    ["#ingredients", nav.ingredients],
    ["#reviews", nav.reviews],
    ["#faq", nav.faq],
  ];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="nav wrap">
      <a className="wordmark" href="#home" aria-label="Hasera home">
        <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={140} height={23} />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a
          className="lang-switch"
          href={`/${otherLang}`}
          aria-label={`Switch to ${otherLang === "en" ? "English" : "Bahasa Indonesia"}`}
        >
          {otherLang.toUpperCase()}
        </a>
        <a className="button button-dark nav-button" href="#collection">{nav.shopNow}</a>
        <button
          type="button"
          className={`nav-burger${open ? " open" : ""}`}
          aria-label={nav.toggleMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href={`/${otherLang}`} onClick={() => setOpen(false)}>
          {otherLang === "en" ? "English" : "Bahasa Indonesia"}
        </a>
      </nav>
    </header>
  );
}
