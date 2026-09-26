import Link from "next/link";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { home } from "@/content/home";
import { getOffering, listDepartments, maturityOf, offeringsForDepartment } from "@/content/catalog";
import { starTransMetrics } from "@/content/proof";
import { tools } from "@/content/tools";
import { getPosts } from "@/content/blog";
import { href, pageMetadata } from "@/lib/seo";
import { overviewVideoUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsBand } from "@/components/site/stats-band";
import { HeroLights } from "@/components/site/hero-lights";
import { FinalCta, MetricsBar, SectionHeading } from "@/components/site/sections";
import { TrackedLink } from "@/components/site/tracked-link";
import { Variant } from "@/components/experiments/variant";
import { CtaLabel } from "@/components/experiments/cta-label";
import { FounderSection } from "@/components/site/founder";
import { ServiceModelGrid } from "@/components/site/catalog";
import { DepartmentPicker, type PickerDepartment } from "@/components/site/department-picker";
import { ProductGallery } from "@/components/site/product-gallery";
import { RoiCalculatorLazy } from "@/components/site/roi-calculator-lazy";
import { ProofStrip } from "@/components/site/proof-strip";
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
  // Department picker data is built here so the catalog stays on the server.
  const picker: PickerDepartment[] = listDepartments().map((d) => ({
    slug: d.slug,
    title: d.title[locale],
    owner: d.owner[locale],
    pains: d.pains[locale],
    icon: d.icon,
    accent: d.accent,
    href: href(locale, `/departments/${d.slug}`),
    bookHref: href(locale, "/demo") + `?area=${d.slug}`,
    offerings: offeringsForDepartment(d)
      .slice(0, 3)
      .map((o) => ({
        slug: o.slug,
        title: o.title[locale],
        summary: o.summary[locale],
        href: href(locale, `/solutions/${o.slug}`),
        badge: dict.common.maturity[maturityOf(o)].label,
      })),
  }));
  // Product showcase: offerings that have real screenshots (configure in home.showcase).
  const showcase = home.showcase.offerings.map(getOffering).filter((o) => o?.media?.length);

  return (
    <>
      {/* HERO — centred message on a deep-navy stage: spotlight glow, fading grid,
          twinkling light groups (HeroLights) and a soft blend into the numbers band. */}
      <section className="hero-home relative isolate overflow-hidden text-white">
        <div className="hero-home__spot absolute inset-0 -z-10" aria-hidden />
        <div className="grid-pattern absolute inset-0 -z-10" aria-hidden />
        <HeroLights />
        <div className="container relative pb-20 pt-10 md:pb-24 md:pt-12 lg:pb-28 lg:pt-14">
          <div className="mx-auto max-w-4xl text-center">
            <ul className="flex flex-wrap justify-center gap-2">
              {home.badges[locale].map((b, i) => (
                <li key={b}>
                  <Badge variant="glass" className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                    {i === 0 ? <Star className="h-3 w-3 fill-brand-orange text-brand-orange" aria-hidden /> : null}
                    {b}
                  </Badge>
                </li>
              ))}
            </ul>
            {/* A/B test "hero" (content/experiments.ts): version B is home.h1B. */}
            <h1 className="h-display mt-6">
              {(["a", "b"] as const).map((v) => (
                <Variant key={v} exp="hero" v={v}>
                  {(v === "a" ? home.h1 : home.h1B)[locale].map((line, i) => (
                    <span
                      key={line}
                      className={`rise ${i === 0 ? "block" : i === 1 ? "block text-brand-teal" : "block text-brand-orange"}`}
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      {line}
                    </span>
                  ))}
                </Variant>
              ))}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{home.h2[locale]}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full shadow-[0_10px_40px_-8px_rgb(233_119_48_/_0.55)] sm:w-auto">
                <TrackedLink href={href(locale, "/demo")} event={{ name: "cta_click", params: { cta: "book_demo", location: "home_hero" } }}>
                  <CtaLabel locale={locale} />
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
                <Button asChild size="lg" variant="inverse" className="w-full border-white/30 bg-white/5 backdrop-blur hover:border-white sm:w-auto">
                  <Link href={href(locale, "/solutions")}>{dict.nav.allSolutions}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS — verifiable figures only (home.stats); count up on scroll. */}
      <StatsBand locale={locale} />

      {/* A/B test "homeorder": version B moves the product showcase (#product) above the picker. */}
      <div className="flex flex-col">
      {/* PROBLEM → DEPARTMENT PICKER — "what's your problem?" */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={home.problem.eyebrow[locale]} title={home.problem.title[locale]} lead={home.problem.lead[locale]} />
          <div className="mt-10">
            <DepartmentPicker departments={picker} labels={{ ...home.picker, pains: home.picker.pains[locale], solutions: home.picker.solutions[locale], seeAll: home.picker.seeAll[locale], tablist: home.picker.tablist[locale], book: dict.cta.bookDemoShort }} />
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE — real screens from IPE and CEO OS. */}
      {showcase.length ? (
        <section className="section bg-surface-subtle" id="product">
          <div className="container">
            <SectionHeading eyebrow={home.showcase.eyebrow[locale]} title={home.showcase.title[locale]} lead={home.showcase.lead[locale]} />
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              {showcase.map((o) =>
                o ? (
                  <div key={o.slug}>
                    <ProductGallery media={o.media!} locale={locale} note={dict.common.sampleData} />
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="font-bold text-brand-navy">
                        {o.brand ? <span className="ltr-run">{o.brand}</span> : null} · {o.title[locale]}
                      </p>
                      <Link href={href(locale, `/solutions/${o.slug}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark hover:underline">
                        {dict.common.learnMore}
                        <span className="sr-only"> — {o.title[locale]}</span>
                        <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      ) : null}

      </div>

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

      {/* TRY IT NOW — interactive tools, no sign-up. */}
      <section className="section" id="try">
        <div className="container">
          <SectionHeading eyebrow={home.tryIt.eyebrow[locale]} title={home.tryIt.title[locale]} lead={home.tryIt.lead[locale]} />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <RoiCalculatorLazy locale={locale} dict={dict} />
            <div className="flex flex-col justify-between rounded-3xl bg-brand-navy p-8 text-white">
              <div>
                <p className="text-sm font-semibold text-brand-teal-light">
                  <span className="ltr-run">Nexus AI</span>
                </p>
                <h3 className="mt-2 text-2xl font-bold">{home.tryIt.nexusTitle[locale]}</h3>
                <p className="mt-3 text-white/80">{home.tryIt.nexusBody[locale]}</p>
              </div>
              <Button asChild variant="inverse" className="mt-8">
                <Link href={href(locale, "/solutions/arabic-commercial-content") + "#try"}>
                  {dict.common.tryIt}
                  <ArrowRight className="btn-icon" />
                </Link>
              </Button>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={href(locale, `/tools/${t.slug}`)} className="group flex h-full items-start justify-between gap-4 rounded-2xl border bg-card p-5 hover:shadow-md">
                  <span>
                    <span className="font-bold text-brand-navy group-hover:underline">{t.title[locale]}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{t.summary[locale]}</span>
                  </span>
                  <ArrowRight className="btn-icon mt-1 h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href={href(locale, "/solutions")} className="inline-flex items-center gap-1 font-semibold text-brand-teal-dark hover:underline">
              {home.catalog.title[locale]} — {dict.nav.allSolutions} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* STAR TRANS PROOF */}
      <section className="section pt-0">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-brand-navy text-white">
            <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-brand-teal-light">{home.proof.eyebrow[locale]} · Star Trans</p>
                <p className="mt-4 text-2xl font-bold leading-snug md:text-3xl">“{home.proof.quote[locale]}”</p>
                <Button asChild variant="ghost" className="mt-6 text-brand-teal-light">
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

      {/* PROOF — logos and approved testimonials; renders nothing until data exists (content/proof.ts). */}
      <ProofStrip locale={locale} />

      {/* WHY */}
      <section className="section pt-0">
        <div className="container">
          <SectionHeading eyebrow={home.why.eyebrow[locale]} title={home.why.title[locale]} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.why.items.map((w, i) => (
              <div key={i} className="rounded-2xl border p-6">
                <span className="text-sm font-bold text-brand-orange-dark" dir="ltr">
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
            <SectionHeading title={home.insightsTitle[locale]} align="start" />
            <Link href={href(locale, "/blog")} className="shrink-0 text-sm font-semibold text-brand-teal-dark hover:underline">
              {dict.cta.readMore}
              <span className="sr-only"> — {home.insightsTitle[locale]}</span>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={href(locale, `/blog/${p.slug}`)} className="lift group rounded-2xl border p-6">
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
