"use client";

import { trackEvent } from "@/lib/gtag";

export default function CtaLink({
  href,
  className,
  channel,
  location,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  channel: "whatsapp" | "shopee" | "tiktok" | "instagram";
  location: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() =>
        trackEvent("cta_click", { channel, location })
      }
    >
      {children}
    </a>
  );
}
