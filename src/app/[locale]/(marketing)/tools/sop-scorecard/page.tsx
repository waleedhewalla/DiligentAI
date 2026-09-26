import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sopScorecard as t } from "@/content/tools";
import { toolsCopy } from "@/content/tools";
import { site } from "@/lib/site";
import { href, pageMetadata } from "@/lib/seo";
import { Breadcrumbs, PageHero } from "@/components/site/sections";
import { DemoForm } from "@/components/site/demo-form";
import { demoAreaOptions } from "@/lib/demo-options";
import { reviewCopy } from "@/content/tools";
import { SopScorecard } from "@/components/site/sop-scorecard";

const labels = {
  progress: { en: "Answered", ar: "تمت الإجابة" },
  result: { en: "Your S&OP maturity", ar: "نضج S&OP لديك" },
  score: { en: "Score", ar: "الدرجة" },
  focus: { en: "Focus here first", ar: "ابدأ من هنا" },
  book: { en: "Review my result with an expert", ar: "راجع نتيجتي مع خبير" },
  print: { en: "Print / save PDF", ar: "اطبع / احفظ PDF" },
  reset: { en: "Start again", ar: "ابدأ من جديد" },
  whatsapp: { en: "WhatsApp my result to an expert", ar: "أرسل نتيجتي لخبير عبر واتساب" },
  answerAll: { en: "Answer all eight questions to see your maturity level and where to start.", ar: "أجب عن الأسئلة الثمانية لترى مستوى النضج ومن أين تبدأ." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: `/tools/${t.slug}`, title: t.seo.title[l], description: t.seo.description[l] });
}

export default function SopScorecardPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const L = Object.fromEntries(Object.entries(labels).map(([k, v]) => [k, v[locale]])) as Record<keyof typeof labels, string>;
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
          <SopScorecard
            data={{
              questions: t.questions.map((q) => ({ id: q.id, title: q.title[locale], levels: q.levels.map((l) => l[locale]), advice: q.advice[locale] })),
              bands: t.bands.map((b) => ({ min: b.min, title: b.title[locale], body: b.body[locale] })),
            }}
            labels={L}
            bookHref={href(locale, "/demo") + `?area=${t.department}&intent=${t.slug}`}
            whatsappNumber={site.whatsapp.replace(/\D/g, "")}
          />
        </div>
      </section>
      <section className="section bg-surface-subtle print:hidden">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">{reviewCopy.title[locale]}</h2>
            <p className="mt-3 text-muted-foreground">{reviewCopy.body[locale]}</p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <DemoForm locale={locale} dict={dict} areaOptions={demoAreaOptions(locale, dict)} defaultInterest="consult" defaultArea="sop" source={`tool:${t.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}
