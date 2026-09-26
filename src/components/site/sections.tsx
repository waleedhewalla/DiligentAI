import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { accentClasses, maturityOf, type Capability, type Offering, type ServiceModel } from "@/content/catalog";
import { visibleMetrics, type Metric, type Testimonial } from "@/content/proof";
import { href } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon, WhatsAppIcon } from "./icons";
import { MaturityBadge } from "./maturity-badge";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "start";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <As className="h-section mt-2 text-brand-navy">{title}</As>
      {lead ? <p className="mt-4 text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

/**
 * Generic catalog card. Renders ANY offering (product or service) from
 * catalog/offerings.ts — colour, icon, brand badge and copy all come from data.
 * `featured` gives the navy treatment the CEO OS card used to have.
 */
export function OfferingCard({
  offering: o,
  locale,
  dict,
  featured = false,
}: {
  offering: Offering;
  locale: Locale;
  dict: Dictionary;
  featured?: boolean;
}) {
  const c = accentClasses[o.accent];
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col rounded-2xl border p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg",
        featured ? "border-brand-navy bg-brand-navy text-white" : cn("border-s-4 bg-card", c.border),
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            featured ? "bg-white/10 text-white" : cn(c.softBg, c.text),
          )}
        >
          <Icon name={o.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {o.brand ? (
              <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-bold", featured ? "bg-white/15" : cn(c.softBg, "text-brand-navy"))}>
                <span className="ltr-run">{o.brand}</span>
              </span>
            ) : null}
            <MaturityBadge maturity={maturityOf(o)} dict={dict} dark={featured} />
          </div>
          <h3 className={cn("mt-1 text-xl font-bold leading-snug", featured ? "text-white" : "text-brand-navy")}>
            <Link href={href(locale, `/solutions/${o.slug}`)} className="after:absolute after:inset-0">
              {o.title[locale]}
            </Link>
          </h3>
        </div>
      </div>
      <p className={cn("mt-4 flex-1 text-sm", featured ? "text-white/80" : "text-muted-foreground")}>{o.summary[locale]}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={dict.common.serviceModels}>
        {o.serviceModels.map((m) => (
          <li
            key={m}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              featured ? "bg-white/10 text-white/90" : "bg-muted text-muted-foreground",
            )}
          >
            {dict.demoForm.interests[m].split(" — ")[0]}
          </li>
        ))}
      </ul>
      <span className={cn("mt-5 inline-flex items-center gap-1 text-sm font-semibold", featured ? "text-brand-teal-light" : c.text)}>
        {dict.common.learnMore}
        <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
      </span>
    </article>
  );
}

/** Primary service-model card (Consult / Build / Integrate) — data from catalog/service-models.ts. */
export function ServiceModelCard({ model: m, locale, dict, index }: { model: ServiceModel; locale: Locale; dict: Dictionary; index: number }) {
  const c = accentClasses[m.accent];
  return (
    <article className={cn("flex flex-col rounded-2xl border-t-4 bg-card p-7 shadow-sm", c.border)}>
      <div className="flex items-center justify-between">
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-xl", c.softBg, c.text)}>
          <Icon name={m.icon} className="h-6 w-6" />
        </span>
        <span className="text-sm font-bold text-muted-foreground" dir="ltr">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-bold text-brand-navy">{m.title[locale]}</h3>
      <p className="mt-2 font-semibold">{m.tagline[locale]}</p>
      <p className="mt-3 text-sm text-muted-foreground">{m.description[locale]}</p>
      <ul className="mt-5 flex-1 space-y-2">
        {m.deliverables[locale].map((d) => (
          <li key={d} className="flex gap-2 text-sm">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", c.text)} aria-hidden />
            {d}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-muted-foreground">
        {dict.common.typicalDuration}: {m.duration[locale]}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button asChild size="sm" className={c.button}>
          <TrackedLink
            href={href(locale, "/demo") + `?interest=${m.id}`}
            event={{ name: "cta_click", params: { cta: "service_model", location: "service_card", interest: m.id } }}
          >
            {m.cta[locale]}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
        <Link href={href(locale, `/services#${m.id}`)} className="text-sm font-medium text-brand-teal-dark hover:underline">
          {dict.common.learnMore}
        </Link>
      </div>
    </article>
  );
}

/** Manufacturing use-case card — data from catalog/capabilities.ts. */
export function CapabilityCard({ capability: cap, locale, dict }: { capability: Capability; locale: Locale; dict: Dictionary }) {
  const c = accentClasses[cap.accent];
  return (
    <article className="group relative flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg", c.softBg, c.text)}>
        <Icon name={cap.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-brand-navy group-hover:text-brand-teal-dark">
        <Link href={href(locale, `/capabilities/${cap.slug}`)} className="after:absolute after:inset-0">
          {cap.title[locale]}
        </Link>
      </h3>
      <p className="mt-2 text-sm font-medium text-brand-red/90">“{cap.problem[locale]}”</p>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{cap.summary[locale]}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark">
        {dict.common.learnMore}
        <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
      </span>
    </article>
  );
}

export function MetricsBar({
  metrics,
  locale,
  tone = "light",
  className,
}: {
  metrics: Metric[];
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  const shown = visibleMetrics(metrics);
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl",
        shown.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        tone === "dark" ? "bg-white/10" : "border bg-border",
        className,
      )}
    >
      {shown.map((m) => (
        <div key={m.id} className={cn("flex flex-col-reverse p-6 text-center", tone === "dark" ? "bg-brand-navy-deep/60" : "bg-background")}>
          <dt className={cn("mt-1 text-sm", tone === "dark" ? "text-white/70" : "text-muted-foreground")}>{m.label[locale]}</dt>
          <dd className={cn("text-3xl font-bold md:text-4xl", tone === "dark" ? "text-white" : "text-brand-navy")}>
            <span className="ltr-run">{m.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TestimonialBlock({ testimonial, locale }: { testimonial: Testimonial; locale: Locale }) {
  if (!testimonial.approved || !testimonial.quote[locale]) return null;
  return (
    <figure className="rounded-2xl border bg-card p-8">
      <blockquote className="text-xl font-medium leading-relaxed text-brand-navy">“{testimonial.quote[locale]}”</blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{testimonial.name[locale]}</span> · {testimonial.role[locale]}
      </figcaption>
    </figure>
  );
}

export function FinalCta({
  locale,
  dict,
  title,
  body,
  query,
  location,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  body?: string;
  /** Pre-fills the demo form, e.g. { area: "quality-control", interest: "build" }. */
  query?: { area?: string; interest?: string };
  location: string;
}) {
  const qs = query ? "?" + new URLSearchParams(Object.entries(query).filter(([, v]) => v) as [string, string][]).toString() : "";
  const wa = whatsappHref(locale === "ar" ? "مرحباً وليد، أود معرفة المزيد عن Diligent AI" : "Hi Waleed, I'd like to learn more about Diligent AI");
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="grid-pattern absolute inset-0" aria-hidden />
      <div className="container relative py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">{title}</h2>
        {body ? <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{body}</p> : null}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <TrackedLink
              href={href(locale, "/demo") + qs}
              event={{ name: "cta_click", params: { cta: "book_demo", location, solution: query?.area, interest: query?.interest } }}
            >
              {dict.cta.bookDemo}
              <ArrowRight className="btn-icon" />
            </TrackedLink>
          </Button>
          {wa ? (
            <Button asChild size="lg" variant="whatsapp" className="w-full sm:w-auto">
              <TrackedAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                event={{ name: "whatsapp_click", params: { location } }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.cta.whatsapp}
              </TrackedAnchor>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items, locale)} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 opacity-80">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={href(locale, item.path)} className="hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="grid-pattern absolute inset-0" aria-hidden />
      <div className="container relative py-16 md:py-20">
        {breadcrumbs}
        {eyebrow ? <p className="mt-6 text-sm font-semibold text-brand-teal-light">{eyebrow}</p> : null}
        <h1 className="h-display mt-3 max-w-4xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
