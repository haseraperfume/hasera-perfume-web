"use client";

import { trackCtaClick } from "@/lib/gtag";

export default function CtaLink({
  href,
  className,
  channel,
  location,
  children,
  ariaLabel,
  itemId,
  itemName,
  external = true,
}: {
  href: string;
  className?: string;
  channel:
    | "whatsapp"
    | "shopee"
    | "tiktok"
    | "instagram"
    | "website"
    | "internal";
  location: string;
  children: React.ReactNode;
  ariaLabel?: string;
  /** Product slug, when the CTA is tied to a specific fragrance. */
  itemId?: string;
  itemName?: string;
  external?: boolean;
}) {
  return (
    <a
      className={className}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={() =>
        trackCtaClick({
          channel,
          location,
          item_id: itemId,
          item_name: itemName,
        })
      }
    >
      {children}
    </a>
  );
}
