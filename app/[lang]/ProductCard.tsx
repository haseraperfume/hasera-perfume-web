"use client";

import Image from "next/image";
import Link from "next/link";
import { trackSelectItem } from "@/lib/gtag";

export default function ProductCard({
  href,
  slug,
  name,
  alt,
  tone,
  image,
  mood,
  description,
  exploreLabel,
  location = "collection",
}: {
  href: string;
  slug: string;
  name: string;
  alt: string;
  tone: string;
  image: string;
  mood: string;
  description: string;
  exploreLabel: string;
  location?: string;
}) {
  return (
    <Link
      className={`product-card ${tone}`}
      href={href}
      onClick={() =>
        trackSelectItem({ item_id: slug, item_name: name, location })
      }
    >
      <Image src={image} alt={alt} fill sizes="(max-width: 720px) 92vw, 32vw" />
      <div className="product-overlay" />
      <div className="product-copy">
        <h3>{name}</h3>
        <p>
          {mood}
          <br />
          {description}
        </p>
        <span>
          {exploreLabel} <b aria-hidden="true">→</b>
        </span>
      </div>
    </Link>
  );
}
