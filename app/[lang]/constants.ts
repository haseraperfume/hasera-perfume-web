export const SHOPEE_URL = "https://shopee.co.id/haseraperfume";
export const TIKTOK_URL = "https://www.tiktok.com/@haseraperfume";
export const INSTAGRAM_URL = "https://www.instagram.com/haseraperfume";
export const WHATSAPP_NUMBER = "6281263119830";

export function whatsappUrl(message: string) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

export const SOCIAL_ICON = {
  whatsapp: "/images/social-media/whatsapp256.png",
  shopee: "/images/social-media/shopee256.png",
  tiktok: "/images/social-media/tiktok256.png",
  instagram: "/images/social-media/instagram256.png",
} as const;
