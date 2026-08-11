export const SHOPEE_URL = "https://shopee.co.id/haseraperfume";
export const TIKTOK_URL = "https://www.tiktok.com/@haseraperfume";
export const INSTAGRAM_URL = "https://www.instagram.com/haseraperfume";
export const WHATSAPP_NUMBER = "6281263119830";

export function whatsappUrl(message: string) {
  // Deliberately no UTM params, extra query keys break the prefilled message flow.
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

/**
 * Tags outbound marketplace links so Shopee/TikTok Seller Center can attribute
 * traffic back to the site, not just GA4 measuring the exit.
 */
export function withUtm(url: string, campaign: string) {
  const tagged = new URL(url);
  tagged.searchParams.set("utm_source", "haseraperfume.com");
  tagged.searchParams.set("utm_medium", "cta");
  tagged.searchParams.set("utm_campaign", campaign);
  return tagged.toString();
}

export const SOCIAL_ICON = {
  whatsapp: "/images/social-media/whatsapp256.png",
  shopee: "/images/social-media/shopee256.png",
  tiktok: "/images/social-media/tiktok256.png",
  instagram: "/images/social-media/instagram256.png",
} as const;
