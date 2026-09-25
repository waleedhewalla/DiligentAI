import Link from "next/link";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { home } from "@/content/home";
import { getCapability, type Capability } from "@/content/catalog";
import { starTransMetrics } from "@/content/proof";
import { getPosts } from "@/content/blog";
import { href, pageMetadata } from "@/lib/seo";
import { overviewVideoUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroVisual } from "@/components/site/hero-visual";
import { FinalCta, MetricsBar, SectionHeading } from "@/components/site/sections";
import { TrackedLink } from "@/components/site/tracked-link";
import { FounderSection } from "@/components/site/founder";
import { CatalogShowcase, ServiceModelGrid } from "@/components/site/catalog";
import { CommitmentBlock, ComplianceBand } from "@/components/site/catalog-blocks";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({
    locale: l,
    path: "/",
    title: home.seo.title[l],
    description: home.seo.description[l],
    keywords: home.seo.keywords[l],
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const posts = (await getPosts()).slice(0, 3);
  // Pain cards are driven by capability data (home.problem.capabilities picks which).
  const painCards = home.problem.capabilities.map(getCapability).filter((c): c is Capability => Boolean(c));

  return (
    <>
      {/* HERO — same design as before; copy repositioned to "AI for manufacturing". */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" aria-hidden />
        <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <ul className="flex flex-wrap gap-2">
              {home.badges[locale].map((b, i) => (
                <li key={b}>
                  <Badge variant="glass" className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                    {i === 0 ? <Star className="h-3 w-3 fill-brand-orange text-brand-orange" aria-hidden /> : null}
                    {b}
                  </Badge>
                </li>
              ))}
            </ul>
            <h1 className="h-display mt-6">
              {home.h1[locale].map((line, i) => (
                <span key={line} className={i === 0 ? "block" : i === 1 ? "block text-brand-teal" : "block text-brand-orange"}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">{home.h2[locale]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <TrackedLink href={href(locale, "/demo")} event={{ name: "cta_click", params: { cta: "book_demo", location: "home_hero" } }}>
                  {dict.cta.bookDemo}
                  <ArrowRight className="btn-icon" />
                </TrackedLink>
              </Button>
              {overviewVideoUrl ? (
                <Button asChild size="lg" variant="inverse">
                  <a href={overviewVideoUrl} target="_blank" rel="noopener noreferrer">
                    <PlayCircle className="h-5 w-5" />
                    {dict.cta.watchVideo}
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" variant="inverse">
                  <Link href={href(locale, "/solutions")}>{dict.nav.allSolutions}</Link>
                </Button>
              )}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
              <span className="font-medium text-white/50">{home.trustedBy[locale]}</span>
              <Link href={href(locale, "/case-studies/star-trans")} className="font-bold text-white hover:underline" dir="ltr">
                STAR TRANS
              </Link>
              {home.trustFacts[locale].map((f) => (
                <span key={f} className="before:me-4 before:content-['·']">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual locale={locale} />
        </div>
      </section>

      {/* PROBLEM — manufacturing pain first, each card links to its use case. */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={home.problem.eyebrow[locale]} title={home.problem.title[locale]} lead={home.problem.lead[locale]} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painCards.map((c) => (
              <Link
                key={c.slug}
                href={href(locale, `/capabilities/${c.slug}`)}
                className="group rounded-2xl border bg-surface-subtle p-7 transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-semibold text-brand-red">{c.title[locale]}</p>
                <h3 className="mt-3 text-xl font-bold text-brand-navy">{c.problem[locale]}</h3>
                <p className="mt-3 text-muted-foreground">{c.summary[locale]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark">
                  {dict.common.learnMore} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE MODELS — primary offer: Consult / Build / Integrate. */}
      <section className="section bg-surface-subtle" id="services">
        <div className="container">
          <SectionHeading eyebrow={home.services.eyebrow[locale]} title={home.services.title[locale]} lead={home.services.lead[locale]} />
          <div className="mt-12">
            <ServiceModelGrid locale={locale} dict={dict} />
          </div>
        </div>
      </section>

      {/* PILOT-TO-PRODUCTION COMMITMENT (gap 2) */}
      <CommitmentBlock locale={locale} dict={dict} />

      {/* COMPLIANCE DEADLINES (gap 3) — from catalog/compliance.ts */}
      <ComplianceBand locale={locale} dict={dict} />

      {/* CATALOG — every category and its items, straight from the catalog data. */}
      <section className="section" id="solutions">
        <div className="container">
          <SectionHeading eyebrow={home.catalog.eyebrow[locale]} title={home.catalog.title[locale]} />
          <div className="mt-12">
            <CatalogShowcase locale={locale} dict={dict} limit={3} />
          </div>
        </div>
      </section>

      {/* STAR TRANS PROOF */}
      <section className="section pt-0">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-brand-navy text-white">
            <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-brand-teal">{home.proof.eyebrow[locale]} · Star Trans</p>
                <p className="mt-4 text-2xl font-bold leading-snug md:text-3xl">“{home.proof.quote[locale]}”</p>
                <Button asChild variant="ghost" className="mt-6 text-brand-teal">
                  <Link href={href(locale, "/case-studies/star-trans")}>
                    {dict.cta.readCaseStudy}
                    <ArrowRight className="btn-icon" />
                  </Link>
                </Button>
              </div>
              <MetricsBar metrics={starTransMetrics} locale={locale} tone="dark" className="md:!grid-cols-3" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section pt-0">
        <div className="container">
          <SectionHeading eyebrow={home.why.eyebrow[locale]} title={home.why.title[locale]} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.why.items.map((w, i) => (
              <div key={i} className="rounded-2xl border p-6">
                <span className="text-sm font-bold text-brand-orange" dir="ltr">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold text-brand-navy">{w.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderSection locale={locale} dict={dict} />

      {/* LATEST INSIGHTS */}
      <section className="section">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading title={dict.nav.blog} align="start" />
            <Link href={href(locale, "/blog")} className="shrink-0 text-sm font-semibold text-brand-teal-dark hover:underline">
              {dict.cta.readMore}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={href(locale, `/blog/${p.slug}`)} className="group rounded-2xl border p-6 hover:shadow-md">
                <p className="text-xs text-muted-foreground">
                  {p.category[locale]} · {formatDate(p.publishedAt, locale)}
                </p>
                <h3 className="mt-2 font-bold text-brand-navy group-hover:text-brand-teal-dark">{p.title[locale]}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt[locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} title={home.finalCta.title[locale]} body={home.finalCta.body[locale]} location="home_final" />
    </>
  );
}
