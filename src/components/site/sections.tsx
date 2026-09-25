import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productColorClasses, type Product } from "@/content/products";
import { visibleMetrics, type Metric, type Testimonial } from "@/content/proof";
import { href } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon, WhatsAppIcon } from "./icons";
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

export function ProductCard({ product: p, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const c = productColorClasses[p.color];
  const isNavy = p.color === "navy";
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg",
        isNavy ? "border-brand-navy bg-brand-navy text-white" : cn("border-s-4 bg-card", c.border),
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            isNavy ? "bg-white/10 text-white" : cn(c.softBg, c.text),
          )}
        >
          <Icon name={p.icon} className="h-6 w-6" />
        </span>
        <div>
          <h3 className={cn("text-2xl font-bold", isNavy ? "text-white" : c.text)}>
            <span className="ltr-run">{p.name[locale]}</span>
          </h3>
          <p className={cn("text-sm font-medium", isNavy ? "text-white/70" : "text-muted-foreground")}>
            {p.category[locale]}
          </p>
        </div>
      </div>
      <p className={cn("mt-5 text-lg font-semibold", isNavy ? "text-white" : "text-foreground")}>{p.tagline[locale]}</p>
      <ul className="mt-4 flex-1 space-y-2.5">
        {p.benefits[locale].map((b) => (
          <li key={b} className={cn("flex gap-2 text-sm", isNavy ? "text-white/85" : "text-muted-foreground")}>
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", isNavy ? "text-brand-teal" : c.text)} aria-hidden />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild className={cn("w-full sm:w-auto", isNavy ? "bg-white text-brand-navy hover:bg-white/90" : c.button)}>
          <TrackedLink
            href={href(locale, `/${p.slug}`)}
            event={{ name: "cta_click", params: { cta: "product_card", location: "product_grid", product: p.key } }}
          >
            {p.cardCta[locale]}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
        <Link
          href={href(locale, "/demo") + `?product=${p.key}`}
          className={cn("text-sm font-medium underline-offset-4 hover:underline", isNavy ? "text-white/80" : "text-brand-teal-dark")}
        >
          {dict.nav.bookDemo}
        </Link>
      </div>
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
  product,
  location,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  body?: string;
  product?: string;
  location: string;
}) {
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
              href={href(locale, "/demo") + (product ? `?product=${product}` : "")}
              event={{ name: "cta_click", params: { cta: "book_demo", location, product } }}
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
        {eyebrow ? <p className="mt-6 text-sm font-semibold text-brand-teal">{eyebrow}</p> : null}
        <h1 className="h-display mt-3 max-w-4xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
