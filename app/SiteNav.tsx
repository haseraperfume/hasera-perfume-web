"use client";

import { useState } from "react";

const links = [
  ["#collection", "Home"],
  ["#collection", "Collection"],
  ["#story", "Our story"],
  ["#ingredients", "Ingredients"],
  ["#reviews", "Reviews"],
  ["#faq", "FAQ"],
] as const;

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav wrap">
      <a className="wordmark" href="#home" aria-label="Hasera home">HASERA</a>
      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a href={href} key={label}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="button button-dark nav-button" href="#collection">Shop now</a>
        <button
          type="button"
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <nav className={`mobile-menu ${open ? "open" : ""}`} aria-label="Mobile navigation">
        {links.map(([href, label]) => (
          <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
