import Link from "next/link";
import { AlertTriangle, ArrowRight, Check, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  accentClasses,
  capabilitiesForOffering,
  getCategory,
  getServiceModel,
  listOfferings,
  type Offering,
} from "@/content/catalog";
import { getCaseStudy } from "@/content/case-studies";
import { starTransMetrics, testimonials } from "@/content/proof";
import { getPosts } from "@/content/blog";
import { href } from "@/lib/seo";
import { faqSchema, offeringSchema } from "@/lib/schema";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, CapabilityCard, FinalCta, MetricsBar, OfferingCard, SectionHeading, TestimonialBlock } from "./sections";
import { Icon } from "./icons";
import { TrackedLink } from "./tracked-link";
import { StickyCta } from "./sticky-cta";
import { DownloadButton } from "./download-button";
import { NexusWidget } from "./nexus-widget";
import { RoiCalculator } from "./roi-calculator";
import { CommitmentBlock, FundingBlock, ModelChoiceBlock, PackagesSection } from "./catalog-blocks";

/**
 * Generic detail page for ANY catalog offering (product or service).
 *
 * Sections render only when the offering provides the data, so a new service
 * with just problems + features gets a clean page, and a mature product with
 * metrics, ROI, FAQs and a case study gets the full treatment — same template.
 */
export async function OfferingPage({ offering: o, locale }: { offering: Offering; locale: Locale }) {
  const dict = getDictionary(locale);
  const c = accentClasses[o.accent];
  const category = getCategory(o.category);
  const primaryModel = o.serviceModels[0];
  const demoHref = href(locale, "/demo") + `?area=${o.slug}&interest=${primaryModel}`;
  const caps = capabilitiesForOffering(o);
  const siblings = listOfferings({ category: o.category }).filter((x) => x.slug !== o.slug).slice(0, 3);
  const relatedPosts = (await getPosts()).filter((p) => p.related.offerings.includes(o.slug)).slice(0, 2);
  const caseStudy = o.caseStudy ? getCaseStudy(o.caseStudy) : undefined;
  const downloadFile = o.download && publicAssetExists(o.download.path) ? o.download.path : null;
  const displayName = o.brand ?? o.title[locale];

  return (
    <>
      <JsonLd
        data={[
          offeringSchema(o, locale),
          ...(o.faqs?.length ? [faqSchema(o.faqs.map((f) => ({ q: f.q[locale], a: f.a[locale] })))] : []),
        ]}
      />

      {/* HERO */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" aria-hidden />
        <div className="container relative py-14 md:py-20">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.solutions, path: "/solutions" },
              { name: o.title[locale], path: `/solutions/${o.slug}` },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="glass">
                <span className={cn("h-2 w-2 rounded-full", o.accent === "navy" ? "bg-brand-teal" : c.bg)} />
                {category.title[locale]}
              </Badge>
              {o.brand ? (
                <Badge variant="glass">
                  <span className="ltr-run">{o.brand}</span>
                </Badge>
              ) : null}
            </div>
            <h1 className="h-display mt-5">{o.title[locale]}</h1>
            <p className="mt-5 text-lg text-white/80 md:text-xl">{o.lead[locale]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className={o.accent === "teal" ? c.button : undefined}>
                {o.demo ? (
                  <a href="#try">
                    {o.demo === "roi-calculator" ? dict.sections.roiTitle : dict.common.tryIt}
                    <ArrowRight className="btn-icon" />
                  </a>
                ) : (
                  <TrackedLink
                    href={demoHref}
                    event={{ name: "cta_click", params: { cta: "book_demo", location: "offering_hero", solution: o.slug, interest: primaryModel } }}
                  >
                    {getServiceModel(primaryModel).cta[locale]}
                    <ArrowRight className="btn-icon" />
                  </TrackedLink>
                )}
              </Button>
              {o.download ? (
                downloadFile ? (
                  <DownloadButton file={downloadFile} label={o.download.label[locale]} event={{ name: "tech_brief_download", params: { solution: o.slug } }} />
                ) : (
                  <Button asChild size="lg" variant="inverse">
                    <Link href={`${demoHref}&intent=brief`}>{o.download.label[locale]}</Link>
                  </Button>
                )
              ) : o.demo ? (
                <Button asChild size="lg" variant="inverse">
                  <Link href={demoHref}>{dict.cta.bookDemoShort}</Link>
                </Button>
              ) : o.packages?.length ? (
                <Button asChild size="lg" variant="inverse">
                  <a href="#packages">{dict.sections.packages}</a>
                </Button>
              ) : null}
            </div>
          </div>
          {o.metrics ? <MetricsBar metrics={o.metrics} locale={locale} tone="dark" className="mt-12" /> : null}
        </div>
      </section>

      {/* OPTIONAL INTERACTIVE DEMO — registry of widgets keyed by `offering.demo`. */}
      {o.demo ? (
        <section id="try" className="section scroll-mt-20">
          <div className="container">
            {o.demo === "arabic-content-generator" ? <NexusWidget locale={locale} /> : null}
            {o.demo === "roi-calculator" ? <RoiCalculator locale={locale} dict={dict} /> : null}
          </div>
        </section>
      ) : null}

      {/* PROBLEMS FIRST — manufacturing pain this offering removes. */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.common.symptoms} title={dict.common.problemsWeSolve} />
          <ul className="mt-10 flex flex-wrap justify-center gap-4">
            {o.problems[locale].map((p) => (
              <li key={p} className="flex w-full gap-3 rounded-2xl border bg-surface-subtle p-6 md:w-80">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden />
                <span className="font-medium text-brand-navy">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS (optional) */}
      {o.steps ? (
        <section className="section pt-0">
          <div className="container">
            <SectionHeading eyebrow={dict.common.howItWorks} title={o.summary[locale]} />
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {o.steps.map((s, i) => (
                <li key={i} className="rounded-2xl border p-7">
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white", c.bg)}>{i + 1}</span>
                  <h3 className="mt-4 text-xl font-bold text-brand-navy">{s.title[locale]}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* FEATURES */}
      <section className="section bg-surface-subtle">
        <div className="container">
          <SectionHeading title={dict.common.whatYouGet} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {o.features.map((f) => (
              <div key={f.title.en} className="rounded-2xl border bg-background p-6">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", c.softBg, c.text)}>
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{f.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES (optional, gap 1 & 8) — fixed-scope, fixed-price EGP packages. */}
      <PackagesSection offering={o} locale={locale} dict={dict} />

      {/* BEFORE / AFTER (optional) */}
      {o.roi ? (
        <section className="section">
          <div className="container">
            <SectionHeading title={o.roi.title[locale]} />
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border bg-background">
              <table className="w-full text-start text-sm md:text-base">
                <thead className="bg-brand-navy text-white">
                  <tr>
                    <th scope="col" className="p-4 text-start font-semibold">
                      <span className="sr-only">—</span>
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      {dict.common.before}
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      {dict.common.after}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {o.roi.rows.map((r) => (
                    <tr key={r.label.en} className="border-t">
                      <th scope="row" className="p-4 text-start font-semibold text-brand-navy">
                        {r.label[locale]}
                      </th>
                      <td className="p-4 text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          <X className="mt-1 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
                          {r.before[locale]}
                        </span>
                      </td>
                      <td className="p-4 font-medium">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                          {r.after[locale]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* PILOT-TO-PRODUCTION COMMITMENT (optional, gap 2) */}
      {o.pilotToProduction ? <CommitmentBlock locale={locale} dict={dict} tone="subtle" /> : null}

      {/* MODEL & HOSTING CHOICE (optional, gap 5) */}
      {o.sovereignModels ? <ModelChoiceBlock locale={locale} dict={dict} /> : null}

      {/* FUNDING ROUTES (optional, gap 6) */}
      {o.fundingRoutes?.length ? <FundingBlock ids={o.fundingRoutes} locale={locale} dict={dict} /> : null}

      {/* SERVICE MODELS this offering is delivered through */}
      <section className="section">
        <div className="container">
          <SectionHeading title={dict.common.serviceModels} />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {o.serviceModels.map((id) => {
              const m = getServiceModel(id);
              const mc = accentClasses[m.accent];
              return (
                <Link key={id} href={href(locale, `/services#${id}`)} className={cn("w-full rounded-2xl border-t-4 bg-card p-6 shadow-sm hover:shadow-md md:w-80", mc.border)}>
                  <span className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                    <Icon name={m.icon} className={cn("h-5 w-5", mc.text)} />
                    {m.title[locale]}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">{m.tagline[locale]}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES this offering addresses (cross-linked from capability pages) */}
      {caps.length ? (
        <section className="section bg-surface-subtle">
          <div className="container">
            <SectionHeading title={dict.common.relatedCapabilities} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caps.map((cap) => (
                <CapabilityCard key={cap.slug} capability={cap} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CASE STUDY (optional) */}
      {caseStudy ? (
        <section className="section">
          <div className="container">
            <div className="rounded-3xl bg-brand-navy p-8 text-white md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-brand-teal">{locale === "ar" ? caseStudy.clientAr : caseStudy.client}</p>
                  <p className="mt-3 text-2xl font-bold">{caseStudy.title[locale]}</p>
                  <Button asChild variant="ghost" className="mt-5 text-brand-teal">
                    <Link href={href(locale, `/case-studies/${caseStudy.slug}`)}>
                      {dict.cta.readCaseStudy}
                      <ArrowRight className="btn-icon" />
                    </Link>
                  </Button>
                </div>
                <MetricsBar metrics={starTransMetrics} locale={locale} tone="dark" className="md:!grid-cols-3" />
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-3xl">
              <TestimonialBlock testimonial={o.launch === "ceo_os" ? testimonials.ceo : testimonials.operations} locale={locale} />
            </div>
          </div>
        </section>
      ) : null}

      {/* INTEGRATIONS + DEPLOYMENT (optional) */}
      {o.integrations || o.deployment ? (
        <section className="section bg-surface-subtle">
          <div className="container grid gap-10 md:grid-cols-2">
            {o.integrations ? (
              <div>
                <h2 className="text-2xl font-bold text-brand-navy">{dict.common.integrations}</h2>
                <ul className="mt-6 flex flex-wrap gap-3" dir="ltr">
                  {o.integrations.map((i) => (
                    <li key={i} className="rounded-lg border bg-background px-4 py-2.5 text-sm font-semibold text-brand-navy">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {o.deployment ? (
              <div className={o.integrations ? "" : "md:col-span-2"}>
                <h2 className="text-2xl font-bold text-brand-navy">{dict.common.deployment}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {o.deployment[locale].map((d) => (
                    <li key={d} className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-medium">
                      <Check className={cn("h-4 w-4", c.text)} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQ (optional) */}
      {o.faqs?.length ? (
        <section className="section">
          <div className="container max-w-3xl">
            <SectionHeading title={dict.common.faq} />
            <Accordion type="single" collapsible className="mt-8">
              {o.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.q[locale]}</AccordionTrigger>
                  <AccordionContent>{f.a[locale]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {/* INTERNAL LINKS: related reading + other offerings in this category */}
      <section className="section border-t bg-surface-subtle">
        <div className="container">
          {relatedPosts.length ? (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-brand-navy">{dict.common.related}</h2>
              <ul className="mt-4 space-y-3">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={href(locale, `/blog/${post.slug}`)} className="font-medium text-brand-teal-dark hover:underline">
                      {post.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {siblings.length ? (
            <>
              <h2 className="text-xl font-bold text-brand-navy">{category.title[locale]}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {siblings.map((s) => (
                  <OfferingCard key={s.slug} offering={s} locale={locale} dict={dict} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <FinalCta
        locale={locale}
        dict={dict}
        title={getServiceModel(primaryModel).tagline[locale]}
        body={o.summary[locale]}
        query={{ area: o.slug, interest: primaryModel }}
        location={`offering_${o.slug}_final`}
      />
      <StickyCta label={displayName} text={o.summary[locale]} cta={dict.nav.bookDemo} href={demoHref} solution={o.slug} />
    </>
  );
}
