/**
 * CONFIGURABLE — how the catalog is grouped in the menu, the homepage and /solutions.
 * `source` decides whether a category lists offerings or capabilities.
 */
import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "ai-solutions",
    icon: "brain",
    accent: "orange",
    title: { en: "AI Products & Solutions", ar: "منتجات وحلول الذكاء الاصطناعي" },
    summary: {
      en: "Consulting, pre-built AI tools and custom models for the plant and the boardroom.",
      ar: "استشارات وأدوات ذكاء اصطناعي جاهزة ونماذج مخصصة للمصنع ولمجلس الإدارة.",
    },
    source: "offerings",
    href: "/solutions#ai-solutions",
  },
  {
    id: "system-integration",
    icon: "cable",
    accent: "teal",
    title: { en: "System Integration", ar: "تكامل الأنظمة" },
    summary: {
      en: "AI-to-ERP integration, legacy and shop-floor connectivity, and the data pipelines underneath.",
      ar: "تكامل الذكاء الاصطناعي مع ERP، وربط الأنظمة القديمة وأرض المصنع، ومسارات البيانات تحتها.",
    },
    source: "offerings",
    href: "/solutions#system-integration",
  },
  {
    id: "industry-capabilities",
    icon: "factory",
    accent: "navy",
    title: { en: "Manufacturing Capabilities", ar: "قدرات قطاع التصنيع" },
    summary: {
      en: "Supply chain, forecasting, quality, demand and maintenance — the problems we solve on the floor.",
      ar: "سلاسل الإمداد والتنبؤ والجودة والطلب والصيانة — المشكلات التي نحلها في أرض المصنع.",
    },
    source: "capabilities",
    href: "/capabilities",
  },
];
