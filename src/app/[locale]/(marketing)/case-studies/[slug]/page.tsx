import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { accentClasses, getOffering, type Offering } from "@/content/catalog";
import { testimonials } from "@/content/proof";
import { href, pageMetadata } from "@/lib/seo";
import { caseStudySchema } from "@/lib/schema";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, MetricsBar, PageHero, TestimonialBlock } from "@/components/site/sections";
import { DownloadButton } from "@/components/site/download-button";
import { TrackedLink } from "@/components/site/tracked-link";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  const l = params.locale;
  return pageMetadata({
    locale: l,
    path: `/case-studies/${cs.slug}`,
    title: cs.title[l],
    description: cs.summary[l],
    type: "article",
    publishedTime: cs.publishedAt,
    modifiedTime: cs.updatedAt,
  });
}

const labels = {
  challenge: { en: "The challenge", ar: "التحدي" },
  solution: { en: "The solution", ar: "الحل" },
  results: { en: "Results at 30 / 60 / 90 days", ar: "النتائج بعد 30 / 60 / 90 يوماً" },
  similar: { en: "In a similar situation?", ar: "هل تمر بموقف مشابه؟" },
  similarBody: {
    en: "Book a 30-minute demo and we'll walk through how the Star Trans deployment maps to your operation.",
    ar: "احجز عرضاً مدته 30 دقيقة وسنوضح كيف ينطبق تطبيق ستار ترانس على عملياتك.",
  },
};

export default function CaseStudyPage({ params }: { params: { locale: Locale; slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const pdf = publicAssetExists(cs.pdf) ? cs.pdf : null;

  return (
    <>
      <JsonLd data={caseStudySchema(cs, locale)} />
      <PageHero
        eyebrow={`${locale === "ar" ? cs.clientAr : cs.client} · ${cs.industry[locale]} · ${cs.location[locale]}`}
        title={cs.title[locale]}
        lead={cs.summary[locale]}
        breadcrumbs={
          <div className="print:hidden">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: dict.breadcrumbs.home, path: "/" },
                { name: dict.nav.caseStudies, path: "/case-studies" },
                { name: locale === "ar" ? cs.clientAr : cs.client, path: `/case-studies/${cs.slug}` },
              ]}
            />
          </div>
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
          <span className="font-semibold text-white">{dict.common.productsUsed}:</span>
          {cs.offerings
            .map(getOffering)
            .filter((o): o is Offering => Boolean(o))
            .map((o) => (
              <Link key={o.slug} href={href(locale, `/solutions/${o.slug}`)} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">
                {o.title[locale]}
              </Link>
            ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
          <DownloadButton
            file={pdf}
            label={dict.cta.downloadCaseStudy}
            event={{ name: "case_study_download", params: { case_study: cs.slug } }}
          />
          <Button asChild size="lg">
            <TrackedLink href={href(locale, "/demo")} event={{ name: "cta_click", params: { cta: "book_similar", location: "case_study_hero" } }}>
              {dict.cta.bookSimilar}
              <ArrowRight className="btn-icon" />
            </TrackedLink>
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <MetricsBar metrics={cs.metrics} locale={locale} />
        </div>
      </section>

      <article className="container max-w-3xl pb-16">
        <section>
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{labels.challenge[locale]}</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {cs.challenge[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{labels.solution[locale]}</h2>
          <div className="mt-6 space-y-5">
            {cs.solution.map((s) => {
              const o = getOffering(s.offering);
              if (!o) return null;
              const c = accentClasses[o.accent];
              return (
                <div key={s.offering} className={cn("rounded-2xl border-s-4 bg-surface-subtle p-6", c.border)}>
                  <h3 className={cn("text-lg font-bold", c.text)}>
                    <Link href={href(locale, `/solutions/${o.slug}`)} className="hover:underline">
                      {o.title[locale]}
                      {o.brand ? (
                        <>
                          {" "}
                          (<span className="ltr-run">{o.brand}</span>)
                        </>
                      ) : null}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted-foreground">{s.body[locale]}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{labels.results[locale]}</h2>
          <ol className="mt-6 space-y-6 border-s-2 border-brand-teal ps-6">
            {cs.results.map((r) => (
              <li key={r.period.en} className="relative">
                <span className="absolute -start-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-brand-teal" aria-hidden />
                <p className="font-bold text-brand-navy">{r.period[locale]}</p>
                <p className="mt-1 text-muted-foreground">{r.body[locale]}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 grid gap-6">
          <TestimonialBlock testimonial={testimonials.operations} locale={locale} />
          <TestimonialBlock testimonial={testimonials.ceo} locale={locale} />
        </div>
      </article>

      <div className="print:hidden">
        <FinalCta locale={locale} dict={dict} title={labels.similar[locale]} body={labels.similarBody[locale]} location="case_study_final" />
      </div>
    </>
  );
}
