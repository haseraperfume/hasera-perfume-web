"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "./dictionaries";
import { trackCtaClick } from "@/lib/gtag";

export default function SiteNav({
  lang,
  nav,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherLang: Locale = lang === "en" ? "id" : "en";

  // Swap only the locale segment so /id/cleopatra-noir -> /en/cleopatra-noir
  // instead of dumping the visitor back to the locale root.
  const otherLangHref = pathname.startsWith(`/${lang}`)
    ? `/${otherLang}${pathname.slice(lang.length + 1)}`
    : `/${otherLang}`;

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
      <a className="wordmark" href="#home" aria-label={nav.brandHome}>
        <img src="/images/hasera/hasera-perfume.svg" alt="Hasera" width={140} height={23} />
      </a>
      <nav className="nav-links" aria-label={nav.primaryNavigation}>
        {links.map(([href, label]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a
          className="lang-switch"
          href={otherLangHref}
          hrefLang={otherLang}
          aria-label={`Switch to ${otherLang === "en" ? "English" : "Bahasa Indonesia"}`}
          onClick={() =>
            trackCtaClick({ channel: "internal", location: "lang_switch" })
          }
        >
          {otherLang.toUpperCase()}
        </a>
        <a
          className="button button-dark nav-button"
          href="#collection"
          onClick={() =>
            trackCtaClick({ channel: "internal", location: "nav_shop_now" })
          }
        >
          {nav.shopNow}
        </a>
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
        aria-label={nav.mobileNavigation}
      >
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a
          href={otherLangHref}
          hrefLang={otherLang}
          onClick={() => {
            setOpen(false);
            trackCtaClick({ channel: "internal", location: "lang_switch_mobile" });
          }}
        >
          {otherLang === "en" ? "English" : "Bahasa Indonesia"}
        </a>
      </nav>
    </header>
  );
}
