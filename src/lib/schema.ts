import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/utils";
import { founderName, site } from "@/lib/site";
import { href } from "@/lib/seo";
import type { Product } from "@/content/products";
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
    slogan: locale === "ar" ? "ذكاء المنطقة" : "MENA Intelligence",
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

export function productSchema(p: Product, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    additionalType: "https://schema.org/Product",
    name: `${p.name[locale]} — ${p.category[locale]}`,
    description: p.seo.description[locale],
    url: absoluteUrl(href(locale, `/${p.slug}`)),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["ar", "en"],
    brand: { "@type": "Brand", name: site.name },
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(href(locale, "/demo")),
      priceCurrency: "EGP",
      description: locale === "ar" ? "التسعير حسب الطلب — احجز عرضاً توضيحياً" : "Pricing on request — book a demo",
    },
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
