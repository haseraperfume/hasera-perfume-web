"use client";

import { trackEvent } from "@/lib/gtag";

export default function CtaLink({
  href,
  className,
  channel,
  location,
  children,
  ariaLabel,
  external = true,
}: {
  href: string;
  className?: string;
  channel: "whatsapp" | "shopee" | "tiktok" | "instagram" | "website";
  location: string;
  children: React.ReactNode;
  ariaLabel?: string;
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
        trackEvent("cta_click", { channel, location })
      }
    >
      {children}
    </a>
  );
}
