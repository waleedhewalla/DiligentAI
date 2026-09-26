import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { caseStudies } from "@/content/case-studies";
import { getOffering } from "@/content/catalog";
import { visibleMetrics } from "@/content/proof";
import { href, pageMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";

const copy = {
  title: { en: "Case Studies — Measured Results from MENA Companies", ar: "دراسات الحالة — نتائج مُقاسة من شركات المنطقة" },
  h1: { en: "Results you can verify", ar: "نتائج يمكنك التحقق منها" },
  lead: {
    en: "Real deployments, real numbers. Every metric on this page is measured at the customer, not estimated.",
    ar: "تطبيقات حقيقية وأرقام حقيقية. كل مؤشر في هذه الصفحة مُقاس لدى العميل، لا مُقدّر.",
  },
  description: {
    en: "How manufacturers in Egypt use AI for planning, executive decisions and commercial content. Star Trans: 80% less planning time in 8 weeks.",
    ar: "كيف تستخدم شركات التصنيع في مصر الذكاء الاصطناعي في التخطيط والقرار التنفيذي والمحتوى التجاري. ستار ترانس: انخفاض وقت التخطيط 80% خلال 8 أسابيع.",
  },
  next: {
    en: "Your company could be the next case study.",
    ar: "قد تكون شركتك دراسة الحالة التالية.",
  },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/case-studies", title: copy.title[l], description: copy.description[l] });
}

export default function CaseStudiesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        title={copy.h1[locale]}
        lead={copy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.caseStudies, path: "/case-studies" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container grid gap-8">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={href(locale, `/case-studies/${cs.slug}`)}
              className="group grid gap-8 rounded-3xl border p-8 transition-shadow hover:shadow-lg md:grid-cols-[1.4fr_1fr] md:p-10"
            >
              <div>
                <p className="text-sm font-semibold text-brand-teal-dark">
                  {locale === "ar" ? cs.clientAr : cs.client} · {cs.industry[locale]}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-brand-navy group-hover:text-brand-teal-dark md:text-3xl">
                  {cs.title[locale]}
                </h2>
                <p className="mt-3 text-muted-foreground">{cs.summary[locale]}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cs.offerings.map((slug) => {
                    const o = getOffering(slug);
                    return o ? (
                      <Badge key={slug} variant="muted">
                        {o.title[locale]}
                      </Badge>
                    ) : null;
                  })}
                </div>
                <span className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-teal-dark">
                  {dict.cta.readCaseStudy} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-4 self-center">
                {visibleMetrics(cs.metrics).map((m) => (
                  <div key={m.id} className="flex flex-col-reverse rounded-2xl bg-surface-subtle p-5 text-center">
                    <dt className="mt-1 text-xs text-muted-foreground">{m.label[locale]}</dt>
                    <dd className="text-3xl font-bold text-brand-navy">
                      <span className="ltr-run">{m.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.next[locale]} location="case_studies_index" />
    </>
  );
}
