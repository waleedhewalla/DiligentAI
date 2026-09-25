import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/utils";
import { founderName, site } from "@/lib/site";
import { href } from "@/lib/seo";
import type { Capability, Offering } from "@/content/catalog";
import type { Post } from "@/content/blog";
import type { CaseStudy } from "@/content/case-studies";

const ORG_ID = `${absoluteUrl("/")}#organization`;

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl(href(locale)),
    logo: absoluteUrl("/logo.svg"),
    email: site.email,
    slogan: locale === "ar" ? "حلول الذكاء الاصطناعي للتصنيع" : "AI solutions for manufacturing",
    knowsAbout: ["Artificial intelligence", "Manufacturing", "ERP integration", "Production planning", "Quality control", "Supply chain"],
    foundingLocation: { "@type": "Place", name: "Cairo, Egypt" },
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    areaServed: ["EG", "SA", "AE", "QA", "KW", "BH", "OM"].map((c) => ({ "@type": "Country", name: c })),
    founder: { "@type": "Person", name: founderName[locale], sameAs: [site.linkedin] },
    sameAs: [site.linkedin],
    knowsLanguage: ["ar", "en"],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(href(locale)),
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(href(locale, item.path)),
    })),
  };
}

/**
 * Offerings describe themselves: `kind: "product"` → SoftwareApplication,
 * `kind: "service"` → Service. Adding an offering needs no schema changes.
 */
export function offeringSchema(o: Offering, locale: Locale) {
  const base = {
    "@context": "https://schema.org",
    name: o.brand ? `${o.brand} — ${o.title[locale]}` : o.title[locale],
    description: o.seo.description[locale],
    url: absoluteUrl(href(locale, `/solutions/${o.slug}`)),
    provider: { "@id": ORG_ID },
    areaServed: ["EG", "SA", "AE", "QA", "KW", "BH", "OM"],
    audience: { "@type": "BusinessAudience", audienceType: "Manufacturers" },
  };
  if (o.kind === "service") {
    return { ...base, "@type": "Service", serviceType: o.title.en, category: o.category };
  }
  return {
    ...base,
    "@type": "SoftwareApplication",
    additionalType: "https://schema.org/Product",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["ar", "en"],
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(href(locale, "/demo")),
      priceCurrency: "EGP",
      description: locale === "ar" ? "التسعير حسب الطلب — احجز عرضاً توضيحياً" : "Pricing on request — book a demo",
    },
  };
}

export function capabilitySchema(c: Capability, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title[locale],
    description: c.seo.description[locale],
    serviceType: c.title.en,
    url: absoluteUrl(href(locale, `/capabilities/${c.slug}`)),
    provider: { "@id": ORG_ID },
    audience: { "@type": "BusinessAudience", audienceType: "Manufacturers" },
  };
}

/** A list of catalog items for hub pages (/solutions, /capabilities). */
export function itemListSchema(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(href(locale, it.path)),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(post: Post, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    inLanguage: locale,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author[locale], url: site.linkedin },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(href(locale, `/blog/${post.slug}`)),
    image: absoluteUrl(`/${locale}/opengraph-image`),
    keywords: post.keywords[locale].join(", "),
  };
}

export function caseStudySchema(cs: CaseStudy, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title[locale],
    description: cs.summary[locale],
    inLanguage: locale,
    datePublished: cs.publishedAt,
    dateModified: cs.updatedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@type": "Organization", name: locale === "ar" ? cs.clientAr : cs.client },
    mainEntityOfPage: absoluteUrl(href(locale, `/case-studies/${cs.slug}`)),
    image: absoluteUrl(`/${locale}/opengraph-image`),
  };
}
