import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Check, Gauge, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accentClasses, getCapability, getDepartment, listDepartments, offeringsForDepartment, type Capability } from "@/content/catalog";
import { caseStudies } from "@/content/case-studies";
import { href, pageMetadata } from "@/lib/seo";
import { departmentSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, CapabilityCard, FinalCta, OfferingCard, PageHero, SectionHeading } from "@/components/site/sections";
import { MaturityLegend } from "@/components/site/maturity-badge";
import { Icon } from "@/components/site/icons";
import { departmentCopy } from "@/components/site/department-card";

// One static page per department in catalog/departments.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return listDepartments().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const d = getDepartment(params.slug);
  if (!d) return {};
  const l = params.locale;
  return pageMetadata({ locale: l, ogImage: true, path: `/departments/${d.slug}`, title: d.seo.title[l], description: d.seo.description[l], keywords: d.seo.keywords[l] });
}

const t = {
  pains: { en: "Sound familiar?", ar: "هل يبدو هذا مألوفاً؟" },
  outcomes: { en: "What changes", ar: "ما الذي يتغير" },
  kpis: { en: "KPIs we report against", ar: "مؤشرات الأداء التي نقيس عليها" },
  solutions: { en: "Solutions for this department", ar: "حلول لهذه الإدارة" },
  useCases: { en: "Related use cases", ar: "حالات استخدام ذات صلة" },
  roadmap: { en: "On the roadmap — co-develop it with us", ar: "على خارطة الطريق — طوّره معنا" },
  roadmapBody: {
    en: "Pilot customers shape these products and get founding-customer terms. Tell us your case.",
    ar: "العملاء التجريبيون يشكّلون هذه المنتجات ويحصلون على شروط العملاء المؤسسين. أخبرنا بحالتك.",
  },
  join: { en: "Join the pilot", ar: "انضم للتجربة" },
  other: { en: "Other departments", ar: "إدارات أخرى" },
};

export default function DepartmentPage({ params }: { params: { locale: Locale; slug: string } }) {
  const d = getDepartment(params.slug);
  if (!d) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const c = accentClasses[d.accent];
  const solutions = offeringsForDepartment(d);
  const useCases = d.capabilities.map(getCapability).filter((x): x is Capability => Boolean(x));
  const stories = caseStudies.filter((cs) => cs.capabilities.some((s) => d.capabilities.includes(s)));
  const others = listDepartments().filter((x) => x.slug !== d.slug);

  return (
    <>
      <JsonLd data={departmentSchema(d, locale)} />
      <PageHero
        eyebrow={d.owner[locale]}
        title={d.title[locale]}
        lead={d.summary[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: departmentCopy.hubTitle[locale], path: "/departments" },
              { name: d.title[locale], path: `/departments/${d.slug}` },
            ]}
          />
        }
      />

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
              <AlertTriangle className="h-5 w-5 text-brand-red" aria-hidden />
              {t.pains[locale]}
            </h2>
            <ul className="mt-4 space-y-3">
              {d.pains[locale].map((p) => (
                <li key={p} className="text-sm font-medium">“{p}”</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
              <Sparkles className={cn("h-5 w-5", c.text)} aria-hidden />
              {t.outcomes[locale]}
            </h2>
            <ul className="mt-4 space-y-3">
              {d.outcomes[locale].map((o) => (
                <li key={o} className="flex gap-2 text-sm">
                  <Check className={cn("mt-0.5 h-4 w-4 shrink-0", c.text)} aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-brand-navy p-6 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Gauge className="h-5 w-5 text-brand-teal-light" aria-hidden />
              {t.kpis[locale]}
            </h2>
            <ul className="mt-4 space-y-3">
              {d.kpis[locale].map((k) => (
                <li key={k} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold">{k}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {solutions.length ? (
        <section className="section bg-surface-subtle">
          <div className="container">
            <SectionHeading title={t.solutions[locale]} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((o) => (
                <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
              ))}
            </div>
            <MaturityLegend dict={dict} className="mt-8" />
          </div>
        </section>
      ) : null}

      {d.roadmap?.length ? (
        <section className="section">
          <div className="container">
            <SectionHeading title={t.roadmap[locale]} lead={t.roadmapBody[locale]} />
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {d.roadmap.map((r) => (
                <div key={r.title.en} className="w-full rounded-2xl border-2 border-dashed p-6 md:w-[26rem]">
                  <p className="text-lg font-bold text-brand-navy">{r.title[locale]}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body[locale]}</p>
                  <Link
                    href={href(locale, "/demo") + `?interest=build&area=${d.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brand-teal-dark hover:underline"
                  >
                    {t.join[locale]} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {useCases.length ? (
        <section className={cn("section", d.roadmap?.length ? "bg-surface-subtle" : "")}>
          <div className="container">
            <SectionHeading title={t.useCases[locale]} />
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {useCases.map((cap) => (
                <div key={cap.slug} className="flex w-full md:w-80">
                  <CapabilityCard capability={cap} locale={locale} dict={dict} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {stories.length ? (
        <section className="section">
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
          <h2 className="text-xl font-bold text-brand-navy">{t.other[locale]}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={href(locale, `/departments/${o.slug}`)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">
                  <Icon name={o.icon} className={cn("h-4 w-4", accentClasses[o.accent].text)} />
                  {o.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} title={d.title[locale]} body={d.summary[locale]} query={{ area: d.slug }} location={`department_${d.slug}`} />
    </>
  );
}
