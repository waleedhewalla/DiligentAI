import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  accentClasses,
  listCapabilities,
  listCategories,
  listOfferings,
  listServiceModels,
  type Category,
} from "@/content/catalog";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { CapabilityCard, OfferingCard, ServiceModelCard } from "./sections";
import { Icon } from "./icons";

/**
 * Renders one catalog category as a section. Items are pulled from the
 * collection named by `category.source`, so adding data is all it takes.
 * `limit` trims long lists on the homepage; hubs pass no limit.
 */
export function CategorySection({
  category,
  locale,
  dict,
  limit,
  headingLevel = "h3",
}: {
  category: Category;
  locale: Locale;
  dict: Dictionary;
  limit?: number;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const c = accentClasses[category.accent];
  const offerings = category.source === "offerings" ? listOfferings({ category: category.id }) : [];
  const capabilities = category.source === "capabilities" ? listCapabilities() : [];
  const total = offerings.length + capabilities.length;
  const shownOfferings = limit ? offerings.slice(0, limit) : offerings;
  const shownCapabilities = limit ? capabilities.slice(0, limit) : capabilities;

  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", c.softBg, c.text)}>
            <Icon name={category.icon} className="h-6 w-6" />
          </span>
          <div>
            <H className="text-2xl font-bold text-brand-navy">{category.title[locale]}</H>
            <p className="mt-1 max-w-2xl text-muted-foreground">{category.summary[locale]}</p>
          </div>
        </div>
        {limit && total > limit ? (
          <Link href={href(locale, category.href)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark hover:underline">
            {dict.common.viewAll} ({total})
            <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shownOfferings.map((o) => (
          <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
        ))}
        {shownCapabilities.map((cap) => (
          <CapabilityCard key={cap.slug} capability={cap} locale={locale} dict={dict} />
        ))}
      </div>
    </section>
  );
}

/** All categories stacked — the core of /solutions and the homepage. */
export function CatalogShowcase({ locale, dict, limit, headingLevel }: { locale: Locale; dict: Dictionary; limit?: number; headingLevel?: "h2" | "h3" }) {
  return (
    <div className="grid gap-16">
      {listCategories().map((cat) => (
        <CategorySection key={cat.id} category={cat} locale={locale} dict={dict} limit={limit} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

/** The three primary service models as cards. */
export function ServiceModelGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {listServiceModels().map((m, i) => (
        <ServiceModelCard key={m.id} model={m} locale={locale} dict={dict} index={i} />
      ))}
    </div>
  );
}
