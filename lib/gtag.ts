export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

/**
 * `channel` and `location` are custom parameters, they stay invisible in GA4
 * reports until registered as custom dimensions in Admin → Custom definitions.
 * See .plans/P-009_seo_audit.md §1(b).
 */
export function trackCtaClick(params: {
  channel: string;
  location: string;
  item_id?: string;
  item_name?: string;
}) {
  const payload: Record<string, string> = {
    channel: params.channel,
    location: params.location,
  };
  if (params.item_id) payload.item_id = params.item_id;
  if (params.item_name) payload.item_name = params.item_name;
  trackEvent("cta_click", payload);
}

/** GA4 standard ecommerce event, feeds the built-in item reports for free. */
export function trackSelectItem(params: {
  item_id: string;
  item_name: string;
  location: string;
}) {
  trackEvent("select_item", {
    item_id: params.item_id,
    item_name: params.item_name,
    item_list_name: params.location,
  });
}
