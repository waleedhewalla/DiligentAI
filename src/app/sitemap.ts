import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { listCapabilities, listDepartments, listOfferings } from "@/content/catalog";
import { caseStudies } from "@/content/case-studies";
import { getPosts } from "@/content/blog";
import { tools } from "@/content/tools";
import { href, languageAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    // Dynamic: every catalog offering and capability gets a URL automatically.
    { path: "/departments", priority: 0.9, changeFrequency: "monthly" },
    ...listDepartments().map((d) => ({ path: `/departments/${d.slug}`, priority: 0.85, changeFrequency: "monthly" as const })),
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/capabilities", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/integrations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/trust", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ksa", priority: 0.7, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.5, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.7, changeFrequency: "monthly" },
    ...tools.map((t) => ({ path: `/tools/${t.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...listOfferings().map((o) => ({ path: `/solutions/${o.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...listCapabilities().map((c) => ({ path: `/capabilities/${c.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    ...caseStudies.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: c.updatedAt })),
    { path: "/demo", priority: 0.9, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: p.updatedAt })),
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
  ];

  // One URL per locale, each carrying the full hreflang cluster.
  return entries.flatMap((e) =>
    locales.map((l) => ({
      url: absoluteUrl(href(l, e.path)),
      lastModified: e.lastModified ? new Date(e.lastModified) : new Date(),
      changeFrequency: e.changeFrequency,
      priority: e.priority,
      alternates: { languages: languageAlternates(e.path) },
    })),
  );
}
