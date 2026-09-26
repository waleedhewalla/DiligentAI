/**
 * ─── Catalog content model ──────────────────────────────────────────────
 *
 * The site no longer hardcodes products. Everything a visitor can buy or
 * engage us for is described by four configurable collections:
 *
 *   serviceModels  How we engage: Consult · Build · Integrate (primary).
 *   categories     How the catalog is grouped in navigation and on pages.
 *   offerings      Things we deliver — pre-built AI tools, custom AI,
 *                  consulting, and system-integration services.
 *   capabilities   Manufacturing problems/use cases (supply chain,
 *                  forecasting, quality, …) that offerings solve.
 *
 * To add a new product or service: append one object to `offerings.ts`.
 * It automatically appears in the header menu, the /solutions hub, its
 * category section, related capability pages, the sitemap, JSON-LD and
 * the demo form — no component or page changes needed.
 */
import type { L10n } from "@/i18n/config";
import type { Metric } from "../proof";

/** Brand accent used for cards, borders and icons. Keep to the brand palette. */
export type Accent = "orange" | "navy" | "teal";

export type IconName =
  | "factory" | "gauge" | "languages" | "plug" | "refresh" | "server" | "layout" | "brain" | "file" | "pen"
  | "target" | "briefcase" | "clock" | "shield" | "users" | "chart" | "truck" | "trending" | "scan" | "wrench"
  | "package" | "database" | "workflow" | "lightbulb" | "code" | "cable" | "clipboard" | "cpu" | "compass"
  | "blocks" | "calendar" | "network";

// ─── Service models ─────────────────────────────────────────────────────
export type ServiceModelId = "consult" | "build" | "integrate";

export type ServiceModel = {
  id: ServiceModelId;
  icon: IconName;
  accent: Accent;
  title: L10n;
  /** One-line promise shown on cards. */
  tagline: L10n;
  description: L10n;
  /** What the client walks away with. */
  deliverables: L10n<string[]>;
  /** Typical engagement length — TODO(Waleed): confirm against real engagements. */
  duration: L10n;
  /** Ordered engagement steps shown on /services. */
  steps: { title: L10n; body: L10n }[];
  cta: L10n;
};

// ─── Categories ─────────────────────────────────────────────────────────
export type CategoryId = "ai-solutions" | "system-integration" | "industry-capabilities";

export type Category = {
  id: CategoryId;
  icon: IconName;
  accent: Accent;
  title: L10n;
  summary: L10n;
  /** Which collection populates this category. */
  source: "offerings" | "capabilities";
  /** Where the category "see all" link points. */
  href: string;
};

// ─── Offerings (products & services) ────────────────────────────────────
/** Portal launch keys — must match the `product_key` enum in Supabase. */
export type ProductKey = "ipe" | "ceo_os" | "nexus";

/** Registry of optional interactive embeds an offering page can show. */
export type DemoWidget = "arabic-content-generator" | "roi-calculator";

/** Markets an offering or capability is sold in (drives region pages like /ksa). */
export type Region = "eg" | "sa" | "ae";

/**
 * A fixed-scope, fixed-price package (gap 1 & 8: EGP starter packs, per-site pricing).
 * `priceFromEGP: null` renders "fixed price, quoted in EGP" — set real numbers when approved.
 */
export type Package = {
  id: string;
  name: L10n;
  scope: L10n;
  duration: L10n;
  /** TODO(Waleed): starting price in EGP; null until approved. */
  priceFromEGP: number | null;
  /** Optional upper bound — renders a range ("EGP 250,000 – 400,000") instead of "from". */
  priceToEGP?: number | null;
  /** Price unit, e.g. per site, per line, one-off. */
  unit: L10n;
  includes: L10n<string[]>;
  /** Highlight as the recommended package. */
  recommended?: boolean;
};

export type Offering = {
  slug: string;
  category: Exclude<CategoryId, "industry-capabilities">;
  /** "product" renders SoftwareApplication schema; "service" renders Service schema. */
  kind: "product" | "service";
  /** Hidden from navigation when "coming-soon"; shown with a badge when "pilot". */
  status: "available" | "pilot" | "coming-soon";
  icon: IconName;
  accent: Accent;
  /**
   * Delivery maturity badge (Live / Pilot / Assessment / Service). Optional —
   * inferred by maturityOf() when omitted; set it to override.
   */
  maturity?: Maturity;
  /** Real product screenshots (under /public/images/products) shown in a gallery on the page. */
  media?: { src: string; width: number; height: number; alt: L10n; caption?: L10n }[];
  /** Optional product brand shown as a badge (e.g. "IPE"). Leave out for services. */
  brand?: string;
  /** Set when customers open this offering from the portal (scoped SSO launch). */
  launch?: ProductKey;
  title: L10n;
  /** Short line for cards and menus. */
  summary: L10n;
  /** Longer hero paragraph on the detail page. */
  lead: L10n;
  serviceModels: ServiceModelId[];
  /** Capability slugs this offering addresses (drives cross-links both ways). */
  capabilities: string[];
  /** The manufacturing problems it removes — shown before features, on purpose. */
  problems: L10n<string[]>;
  features: { icon: IconName; title: L10n; body: L10n }[];

  // Everything below is optional; the page template renders a section only when present.
  metrics?: Metric[];
  steps?: { title: L10n; body: L10n }[];
  roi?: { title: L10n; rows: { label: L10n; before: L10n; after: L10n }[] };
  integrations?: string[];
  deployment?: L10n<string[]>;
  faqs?: { q: L10n; a: L10n }[];
  /** Case-study slug to feature as proof. */
  caseStudy?: string;
  demo?: DemoWidget;
  /** Downloadable asset under /public; the button falls back to a request link until the file exists. */
  download?: { path: string; label: L10n };
  /** Fixed-price packages (renders the Packages section and lists the offering on /pricing). */
  packages?: Package[];
  /** Delivered under the Pilot-to-Production commitment (renders the commitment block; see commitment.ts). */
  pilotToProduction?: boolean;
  /** Customer can choose the Arabic model and hosting (renders the model-choice block; see models.ts). */
  sovereignModels?: boolean;
  /** Markets where it is sold. Omit = all markets. */
  regions?: Region[];
  /** Funding programmes it can be financed through (ids from funding.ts). */
  fundingRoutes?: string[];
  seo: { title: L10n; description: L10n; keywords: L10n<string[]> };
};

// ─── Capabilities (industry use cases) ──────────────────────────────────
export type Capability = {
  slug: string;
  icon: IconName;
  accent: Accent;
  title: L10n;
  summary: L10n;
  /** The plant-floor pain, in the reader's words. */
  problem: L10n;
  symptoms: L10n<string[]>;
  /** How AI changes it. */
  approach: L10n<string[]>;
  /** Qualitative outcomes. Put measured numbers in proof.ts, not here. */
  outcomes: L10n<string[]>;
  /** Data we typically need — sets expectations for IT. */
  dataSources: L10n<string[]>;
  serviceModels: ServiceModelId[];
  seo: { title: L10n; description: L10n; keywords: L10n<string[]> };
};

// ─── Departments (primary navigation) ───────────────────────────────────
/**
 * How manufacturers look for help: by the team that owns the problem.
 * A department page is assembled from offerings + capabilities by slug, so
 * adding an offering to a department is a one-line change here.
 */
export type Department = {
  slug: string;
  icon: IconName;
  accent: Accent;
  title: L10n;
  /** Who owns it in the plant — shown under the title. */
  owner: L10n;
  summary: L10n;
  /** Weekly pain, in the department's own words. */
  pains: L10n<string[]>;
  /** What changes when AI is in place (qualitative; numbers live in proof.ts). */
  outcomes: L10n<string[]>;
  /** KPIs this department is measured on — we report against these. */
  kpis: L10n<string[]>;
  /** Offering slugs, most relevant first. */
  offerings: string[];
  /** Capability (use-case) slugs. */
  capabilities: string[];
  /**
   * Products we are co-developing with pilot customers. Shown honestly as
   * "on the roadmap"; move to `offerings` once live.
   */
  roadmap?: { title: L10n; body: L10n }[];
  seo: { title: L10n; description: L10n; keywords: L10n<string[]> };
};

/** Delivery maturity shown as a badge on every offering (assessment: be explicit about what is live). */
export type Maturity = "live" | "pilot" | "assessment" | "service";
