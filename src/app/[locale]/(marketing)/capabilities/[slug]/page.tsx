import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Check, Database, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accentClasses, getCapability, getServiceModel, listCapabilities, offeringsForCapability } from "@/content/catalog";
import { caseStudies } from "@/content/case-studies";
import { href, pageMetadata } from "@/lib/seo";
import { capabilitySchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, OfferingCard, PageHero, SectionHeading } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";

// One static page per capability in catalog/capabilities.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return listCapabilities().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const c = getCapability(params.slug);
  if (!c) return {};
  const l = params.locale;
  return pageMetadata({ locale: l, path: `/capabilities/${c.slug}`, title: c.seo.title[l], description: c.seo.description[l], keywords: c.seo.keywords[l] });
}

export default function CapabilityPage({ params }: { params: { locale: Locale; slug: string } }) {
  const cap = getCapability(params.slug);
  if (!cap) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const c = accentClasses[cap.accent];
  // Cross-links are computed, not hand-maintained.
  const solutions = offeringsForCapability(cap.slug);
  const stories = caseStudies.filter((cs) => cs.capabilities.includes(cap.slug));
  const others = listCapabilities().filter((x) => x.slug !== cap.slug);

  const column = (title: string, items: string[], icon: React.ReactNode) => (
    <div className="rounded-2xl border bg-background p-6">
      <h3 className="flex items-center gap-2 font-bold text-brand-navy">
        {icon}
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", c.text)} aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <JsonLd data={capabilitySchema(cap, locale)} />
      <PageHero
        eyebrow={cap.title[locale]}
        title={cap.problem[locale]}
        lead={cap.summary[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.capabilities, path: "/capabilities" },
              { name: cap.title[locale], path: `/capabilities/${cap.slug}` },
            ]}
          />
        }
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={cap.title[locale]} title={dict.common.symptoms} />
          <ul className="mt-10 flex flex-wrap justify-center gap-4">
            {cap.symptoms[locale].map((s) => (
              <li key={s} className="flex w-full gap-3 rounded-2xl border bg-surface-subtle p-6 md:w-80">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden />
                <span className="font-medium text-brand-navy">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface-subtle">
        <div className="container grid gap-6 lg:grid-cols-3">
          {column(dict.common.howAiHelps, cap.approach[locale], <Sparkles className={cn("h-5 w-5", c.text)} aria-hidden />)}
          {column(dict.common.outcomes, cap.outcomes[locale], <Icon name={cap.icon} className={cn("h-5 w-5", c.text)} />)}
          {column(dict.common.dataWeUse, cap.dataSources[locale], <Database className={cn("h-5 w-5", c.text)} aria-hidden />)}
        </div>
      </section>

      {solutions.length ? (
        <section className="section">
          <div className="container">
            <SectionHeading title={dict.common.relatedSolutions} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((o) => (
                <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section pt-0">
        <div className="container">
          <SectionHeading title={dict.common.serviceModels} />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {cap.serviceModels.map((id) => {
              const m = getServiceModel(id);
              return (
                <Link
                  key={id}
                  href={href(locale, "/demo") + `?interest=${id}&area=${cap.slug}`}
                  className={cn("w-full rounded-2xl border-t-4 bg-card p-6 shadow-sm hover:shadow-md md:w-80", accentClasses[m.accent].border)}
                >
                  <span className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                    <Icon name={m.icon} className={cn("h-5 w-5", accentClasses[m.accent].text)} />
                    {m.title[locale]}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">{m.tagline[locale]}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark">
                    {m.cta[locale]} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {stories.length ? (
        <section className="section bg-surface-subtle">
          <div className="container">
            <SectionHeading title={dict.nav.caseStudies} />
            <div className="mx-auto mt-8 grid max-w-3xl gap-4">
              {stories.map((cs) => (
                <Link key={cs.slug} href={href(locale, `/case-studies/${cs.slug}`)} className="rounded-2xl border bg-background p-6 hover:shadow-md">
                  <p className="text-sm font-semibold text-brand-teal-dark">{locale === "ar" ? cs.clientAr : cs.client}</p>
                  <p className="mt-1 text-lg font-bold text-brand-navy">{cs.title[locale]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section border-t">
        <div className="container">
          <h2 className="text-xl font-bold text-brand-navy">{dict.nav.allCapabilities}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={href(locale, `/capabilities/${o.slug}`)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">
                  <Icon name={o.icon} className={cn("h-4 w-4", accentClasses[o.accent].text)} />
                  {o.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} title={cap.title[locale]} body={cap.summary[locale]} query={{ area: cap.slug }} location={`capability_${cap.slug}`} />
    </>
  );
}
