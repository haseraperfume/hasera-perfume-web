import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./app/[lang]/dictionaries";

/**
 * Every unprefixed path permanently redirects to the default locale (id).
 *
 * We deliberately do NOT negotiate Accept-Language. Googlebot crawls mostly
 * from US IPs with en-US headers, so sniffing made Google treat the English
 * site as primary while Indonesia is the actual market. Google's own guidance
 * discourages automatic language redirects for this reason.
 * See .plans/P-009_seo_audit.md §7.1.
 *
 * 308 (not 307) so the redirect is cached as permanent, packaging QR codes
 * point at unprefixed slugs and must resolve the same way forever.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|images|videos|robots.txt|sitemap.xml).*)",
  ],
};
