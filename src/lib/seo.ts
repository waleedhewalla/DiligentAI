import type { Metadata } from "next";
import { locales, ogLocale, type Locale } from "@/i18n/config";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { site } from "@/lib/site";

/** Locale-prefixed internal path. `href("ar", "/ipe")` → `/ar/ipe`. */
export function href(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** hreflang map for a path that exists in every locale. */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "ar" ? "ar-EG" : "en"] = absoluteUrl(href(l, path));
  languages["x-default"] = absoluteUrl(href("ar", path));
  return languages;
}

type PageMeta = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Absolute title (skips the "| Diligent AI" template). */
  absoluteTitle?: boolean;
  /** Per-page social card (a sibling opengraph-image route). Defaults to the locale card. */
  ogImage?: boolean;
};

export function pageMetadata(m: PageMeta): Metadata {
  const url = absoluteUrl(href(m.locale, m.path));
  // Per-page cards (a sibling opengraph-image.tsx) exist on the real deployment only — the
  // static preview strips them. Next injects their hashed URL itself, so we set no image then.
  const perPage = m.ogImage && process.env.NEXT_PUBLIC_PREVIEW !== "1";
  const ogImage = absoluteUrl(`/${m.locale}/opengraph-image`);
  const images = perPage ? {} : { images: [{ url: ogImage, width: 1200, height: 630, alt: m.title }] };
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: url, languages: languageAlternates(m.path) },
    openGraph: {
      type: m.type ?? "website",
      url,
      title: m.title,
      description: m.description,
      siteName: site.name,
      locale: ogLocale[m.locale],
      alternateLocale: locales.filter((l) => l !== m.locale).map((l) => ogLocale[l]),
      ...images,
      ...(m.publishedTime ? { publishedTime: m.publishedTime } : {}),
      ...(m.modifiedTime ? { modifiedTime: m.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, ...(perPage ? {} : { images: [ogImage] }) },
    // The GitHub Pages preview must never compete with the real domain in search.
    robots: m.noindex || process.env.NEXT_PUBLIC_PREVIEW === "1" ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const metadataBase = new URL(siteUrl);
