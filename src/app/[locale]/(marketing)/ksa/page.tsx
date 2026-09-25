import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fundingRoutes, listOfferings, regionalOfferings, siriCertified } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, FinalCta, OfferingCard, PageHero, SectionHeading } from "@/components/site/sections";
import { FundingBlock, ModelChoiceBlock } from "@/components/site/catalog-blocks";

// Gap 6 — Saudi Arabia landing page. Offerings come from the catalog (`regions` /
// `fundingRoutes`); programmes from catalog/funding.ts. No eligibility promises.
const copy = {
  title: { en: "AI for Saudi Manufacturers — Future Factories & SIRI", ar: "الذكاء الاصطناعي للمصانع السعودية — مصانع المستقبل وSIRI" },
  description: {
    en: "SIRI-aligned smart-factory assessments, AI planning, quality and maintenance for Saudi factories — with Arabic delivery and in-Kingdom hosting options.",
    ar: "تقييمات للمصنع الذكي متوافقة مع SIRI، وذكاء اصطناعي للتخطيط والجودة والصيانة للمصانع السعودية — بتنفيذ عربي وخيارات استضافة داخل المملكة.",
  },
  h1: { en: "From readiness assessment to a running smart factory", ar: "من تقييم الجاهزية إلى مصنع ذكي يعمل" },
  lead: {
    en: "The Kingdom plans to grow from about 12,000 factories to 36,000 by 2035, and its programmes are moving thousands of them toward automation. We help you take the first step — and deliver the AI that follows.",
    ar: "تخطط المملكة للنمو من نحو 12 ألف مصنع إلى 36 ألفاً بحلول 2035، وبرامجها تنقل الآلاف منها نحو الأتمتة. نساعدك في الخطوة الأولى — ونسلّم الذكاء الاصطناعي الذي يليها.",
  },
  start: { en: "Start here", ar: "ابدأ من هنا" },
  alsoAvailable: { en: "Also available in Saudi Arabia", ar: "متاح أيضاً في المملكة" },
  cta: { en: "Book a 30-minute readiness call.", ar: "احجز مكالمة جاهزية مدتها 30 دقيقة." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/ksa", title: copy.title[l], description: copy.description[l] });
}

export default function KsaPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const start = regionalOfferings("sa");
  const startSlugs = new Set(start.map((o) => o.slug));
  const more = listOfferings({ region: "sa" }).filter((o) => !startSlugs.has(o.slug) && !o.regions).slice(0, 6);
  return (
    <>
      <PageHero
        eyebrow={siriCertified ? (locale === "ar" ? "مقيّم SIRI معتمد" : "Certified SIRI assessor") : undefined}
        title={copy.h1[locale]}
        lead={copy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.ksa, path: "/ksa" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container">
          <SectionHeading title={copy.start[locale]} />
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {start.map((o) => (
              <div key={o.slug} className="flex w-full md:w-[24rem]">
                <OfferingCard offering={o} locale={locale} dict={dict} featured />
              </div>
            ))}
          </div>
        </div>
      </section>
      <FundingBlock ids={fundingRoutes.filter((f) => f.region === "sa").map((f) => f.id)} locale={locale} dict={dict} />
      <section className="section bg-surface-subtle">
        <div className="container">
          <SectionHeading title={copy.alsoAvailable[locale]} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((o) => (
              <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>
      <ModelChoiceBlock locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "consult", area: "ksa-smart-factory-assessment" }} location="ksa" />
    </>
  );
}
