import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cbamChecklist as t } from "@/content/tools";
import { toolsCopy } from "@/content/tools";
import { href, pageMetadata } from "@/lib/seo";
import { Breadcrumbs, PageHero } from "@/components/site/sections";
import { DemoForm } from "@/components/site/demo-form";
import { demoAreaOptions } from "@/lib/demo-options";
import { reviewCopy } from "@/content/tools";
import { CbamChecklist } from "@/components/site/cbam-checklist";

const labels = {
  ready: { en: "Readiness", ar: "الجاهزية" },
  gaps: { en: "Open gaps", ar: "الفجوات المفتوحة" },
  allSet: { en: "Everything ticked — worth confirming with your verifier.", ar: "كل البنود مكتملة — يستحسن التأكيد مع جهة التحقق." },
  book: { en: "Close my gaps with an expert", ar: "أغلق الفجوات مع خبير" },
  print: { en: "Print / save PDF", ar: "اطبع / احفظ PDF" },
};
const levels = {
  en: ["Early — start with scope and metering", "In progress — focus on method and evidence", "Nearly ready — plan verification"],
  ar: ["مبكر — ابدأ بالنطاق والقياس", "قيد التقدم — ركّز على الطريقة والأدلة", "شبه جاهز — خطط للتحقق"],
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: `/tools/${t.slug}`, title: t.seo.title[l], description: t.seo.description[l] });
}

export default function CbamChecklistPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        title={t.title[locale]}
        lead={t.summary[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: toolsCopy.title[locale], path: "/tools" },
              { name: t.title[locale], path: `/tools/${t.slug}` },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container">
          <h2 className="sr-only">{t.title[locale]}</h2>
          <CbamChecklist
            data={{ groups: t.groups.map((g) => ({ title: g.title[locale], items: g.items.map((i) => ({ id: i.id, text: i.text[locale] })) })) }}
            labels={{
              ready: labels.ready[locale],
              gaps: labels.gaps[locale],
              allSet: labels.allSet[locale],
              book: labels.book[locale],
              print: labels.print[locale],
              levels: [...levels[locale]] as [string, string, string],
            }}
            bookHref={href(locale, "/demo") + `?area=cbam-emissions-reporting&intent=${t.slug}`}
          />
          <p className="mt-8 text-sm text-muted-foreground">{t.disclaimer[locale]}</p>
        </div>
      </section>
      <section className="section bg-surface-subtle print:hidden">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">{reviewCopy.title[locale]}</h2>
            <p className="mt-3 text-muted-foreground">{reviewCopy.body[locale]}</p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <DemoForm locale={locale} dict={dict} areaOptions={demoAreaOptions(locale, dict)} defaultInterest="consult" defaultArea="cbam-emissions-reporting" source={`tool:${t.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}
