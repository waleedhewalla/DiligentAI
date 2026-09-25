import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productColorClasses, productList, type Product } from "@/content/products";
import { starTransMetrics, testimonials } from "@/content/proof";
import { getPosts } from "@/content/blog";
import { href } from "@/lib/seo";
import { faqSchema, productSchema } from "@/lib/schema";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, MetricsBar, SectionHeading, TestimonialBlock } from "./sections";
import { Icon } from "./icons";
import { TrackedLink } from "./tracked-link";
import { StickyCta } from "./sticky-cta";
import { DownloadButton } from "./download-button";
import { NexusWidget } from "./nexus-widget";

const TECH_BRIEF: Partial<Record<Product["slug"], string>> = { ipe: "/downloads/ipe-technical-brief.pdf" };

export async function ProductPage({ product: p, locale }: { product: Product; locale: Locale }) {
  const dict = getDictionary(locale);
  const c = productColorClasses[p.color];
  const demoHref = href(locale, "/demo") + `?product=${p.key}`;
  const relatedPosts = (await getPosts()).filter((post) => post.related.products.includes(p.slug)).slice(0, 2);
  const others = productList.filter((o) => o.slug !== p.slug);
  const briefPath = TECH_BRIEF[p.slug];
  const briefFile = briefPath && publicAssetExists(briefPath) ? briefPath : null;
  const testimonial = p.slug === "ceo-os" ? testimonials.ceo : testimonials.operations;

  return (
    <>
      <JsonLd data={[productSchema(p, locale), faqSchema(p.faqs.map((f) => ({ q: f.q[locale], a: f.a[locale] })))]} />

      {/* HERO */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" aria-hidden />
        <div className="container relative py-14 md:py-20">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: p.name[locale], path: `/${p.slug}` },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <Badge variant="glass">
              <span className={cn("h-2 w-2 rounded-full", c.bg === "bg-brand-navy" ? "bg-brand-teal" : c.bg)} />
              {p.hero.eyebrow[locale]}
            </Badge>
            <h1 className="h-display mt-5">{p.hero.title[locale]}</h1>
            <p className="mt-5 text-lg text-white/80 md:text-xl">{p.hero.lead[locale]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className={p.color === "teal" ? c.button : undefined}>
                {p.slug === "nexus" ? (
                  <a href="#try">
                    {p.hero.primaryCta[locale]}
                    <ArrowRight className="btn-icon" />
                  </a>
                ) : (
                  <TrackedLink href={demoHref} event={{ name: "cta_click", params: { cta: "book_demo", location: "product_hero", product: p.key } }}>
                    {p.hero.primaryCta[locale]}
                    <ArrowRight className="btn-icon" />
                  </TrackedLink>
                )}
              </Button>
              {p.slug === "ipe" && p.hero.secondaryCta ? (
                briefFile ? (
                  <DownloadButton file={briefFile} label={p.hero.secondaryCta[locale]} event={{ name: "tech_brief_download", params: { product: p.key } }} />
                ) : (
                  <Button asChild size="lg" variant="inverse">
                    <Link href={href(locale, "/demo") + `?product=${p.key}&intent=brief`}>{p.hero.secondaryCta[locale]}</Link>
                  </Button>
                )
              ) : p.slug === "nexus" && p.hero.secondaryCta ? (
                <Button asChild size="lg" variant="inverse">
                  <Link href={demoHref}>{p.hero.secondaryCta[locale]}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <MetricsBar metrics={p.metrics} locale={locale} tone="dark" className="mt-12" />
        </div>
      </section>

      {/* NEXUS: live demo widget directly under the hero */}
      {p.slug === "nexus" ? (
        <section id="try" className="section scroll-mt-20">
          <div className="container">
            <NexusWidget locale={locale} />
          </div>
        </section>
      ) : null}

      {/* HOW IT WORKS */}
      {p.steps ? (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={dict.common.howItWorks} title={p.tagline[locale]} />
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {p.steps.map((s, i) => (
                <li key={i} className="relative rounded-2xl border p-7">
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white", c.bg)}>
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-brand-navy">{s.title[locale]}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* MODULES (tabbed) */}
      {p.modules ? (
        <section className="section bg-surface-subtle">
          <div className="container">
            <SectionHeading eyebrow={p.category[locale]} title={dict.common.capabilities} />
            <Tabs defaultValue={p.modules[0].id} className="mt-10" dir={locale === "ar" ? "rtl" : "ltr"}>
              <div className="flex justify-center">
                <TabsList>
                  {p.modules.map((m) => (
                    <TabsTrigger key={m.id} value={m.id}>
                      {m.title[locale]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {p.modules.map((m) => (
                <TabsContent key={m.id} value={m.id}>
                  <div className="mx-auto grid max-w-4xl gap-8 rounded-2xl border bg-background p-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy">{m.title[locale]}</h3>
                      <p className="mt-3 text-lg text-muted-foreground">{m.body[locale]}</p>
                    </div>
                    <ul className="space-y-3">
                      {m.points[locale].map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <Check className={cn("mt-1 h-5 w-5 shrink-0", c.text)} aria-hidden />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      ) : null}

      {/* CAPABILITIES */}
      <section className="section">
        <div className="container">
          <SectionHeading title={p.modules ? p.tagline[locale] : dict.common.capabilities} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.capabilities.map((cap) => (
              <div key={cap.title.en} className="rounded-2xl border p-6">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", c.softBg, c.text)}>
                  <Icon name={cap.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{cap.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cap.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER — ROI */}
      <section className="section bg-surface-subtle">
        <div className="container">
          <SectionHeading title={p.roi.title[locale]} />
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border bg-background">
            <table className="w-full text-start text-sm md:text-base">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th scope="col" className="p-4 text-start font-semibold">
                    <span className="sr-only">{dict.common.industry}</span>
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
                {p.roi.rows.map((r) => (
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

      {/* USE CASES */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.common.useCases} title={p.category[locale]} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {p.useCases.map((u) => (
              <div key={u.title.en} className={cn("rounded-2xl border-s-4 bg-surface-subtle p-6", c.border)}>
                <h3 className="text-lg font-bold text-brand-navy">{u.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAR TRANS CALLOUT */}
      <section className="section pt-0">
        <div className="container">
          <div className="rounded-3xl bg-brand-navy p-8 text-white md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-brand-teal">Star Trans</p>
                <p className="mt-3 text-2xl font-bold">
                  {locale === "ar"
                    ? "من تخطيط يدوي يستغرق 3 أيام إلى جداول تلقائية خلال 8 أسابيع."
                    : "From 3-day manual planning to automated schedules in 8 weeks."}
                </p>
                <Button asChild variant="ghost" className="mt-5 text-brand-teal">
                  <Link href={href(locale, "/case-studies/star-trans")}>
                    {dict.cta.readCaseStudy}
                    <ArrowRight className="btn-icon" />
                  </Link>
                </Button>
              </div>
              <MetricsBar metrics={starTransMetrics} locale={locale} tone="dark" className="md:!grid-cols-3" />
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <TestimonialBlock testimonial={testimonial} locale={locale} />
          </div>
        </div>
      </section>

      {/* INTEGRATIONS + DEPLOYMENT */}
      <section className="section bg-surface-subtle">
        <div className="container grid gap-10 md:grid-cols-2">
          {p.integrations ? (
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">{dict.common.integrations}</h2>
              <ul className="mt-6 flex flex-wrap gap-3" dir="ltr">
                {p.integrations.map((i) => (
                  <li key={i} className="rounded-lg border bg-background px-4 py-2.5 text-sm font-semibold text-brand-navy">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className={p.integrations ? "" : "md:col-span-2"}>
            <h2 className="text-2xl font-bold text-brand-navy">{dict.common.deployment}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.deployment[locale].map((d) => (
                <li key={d} className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-medium">
                  <Check className={cn("h-4 w-4", c.text)} aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading title={dict.common.faq} />
          <Accordion type="single" collapsible className="mt-8">
            {p.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{f.q[locale]}</AccordionTrigger>
                <AccordionContent>{f.a[locale]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* INTERNAL LINKS: related reading + other products */}
      <section className="section border-t bg-surface-subtle">
        <div className="container grid gap-10 lg:grid-cols-2">
          {relatedPosts.length ? (
            <div>
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
          <div>
            <h2 className="text-xl font-bold text-brand-navy">{dict.nav.allProducts}</h2>
            <ul className="mt-4 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={href(locale, `/${o.slug}`)} className="font-medium text-brand-teal-dark hover:underline">
                    <span className="ltr-run">{o.name[locale]}</span> — {o.tagline[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta
        locale={locale}
        dict={dict}
        title={p.finalCta.title[locale]}
        body={p.finalCta.body[locale]}
        product={p.key}
        location={`product_${p.key}_final`}
      />
      <StickyCta
        label={p.name[locale]}
        text={p.stickyCta[locale]}
        cta={dict.nav.bookDemo}
        href={demoHref}
        product={p.key}
      />
    </>
  );
}
