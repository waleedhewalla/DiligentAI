import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const accept = request.headers.get("accept-language") ?? "";
  // Arabic-first: only fall back to English when the browser clearly prefers it.
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("en")) return "en";
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // HTTPS is enforced at the edge (Vercel + Cloudflare "Always Use HTTPS") and pinned by HSTS in next.config.mjs.
  const segment = pathname.split("/")[1];
  if (!isLocale(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 307);
  }

  const locale = segment;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const isPortal = pathname.startsWith(`/${locale}/portal`);
  const isAuthPage = /^\/(ar|en)\/(login|register|forgot-password|reset-password)(\/|$)/.test(pathname);

  // Only touch Supabase where a session matters; public pages stay static and fast.
  if (!isPortal && !isAuthPage) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const { response, user } = await updateSession(request, requestHeaders);

  if (isPortal && !user) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Skip API routes, Next internals, SEO files and static assets.
  matcher: [
    "/((?!api|auth|_next/static|_next/image|favicon.ico|icon|apple-icon|logo.svg|robots.txt|sitemap.xml|downloads|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|pdf|txt|xml)$).*)",
  ],
};
