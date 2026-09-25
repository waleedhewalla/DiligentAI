import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, FinalCta, PageHero, SectionHeading } from "@/components/site/sections";
import { ServiceModelGrid } from "@/components/site/catalog";
import { FounderSection } from "@/components/site/founder";

const copy = {
  title: { en: "About Diligent AI — AI Solutions for Manufacturing", ar: "عن Diligent AI — حلول الذكاء الاصطناعي للتصنيع" },
  description: {
    en: "Diligent AI is a Cairo-based AI solutions and system-integration company for manufacturers in Egypt and the Gulf: consulting, pre-built AI tools, custom models and ERP integration.",
    ar: "Diligent AI شركة مقرها القاهرة لحلول الذكاء الاصطناعي وتكامل الأنظمة للمصانع في مصر والخليج: استشارات، وأدوات جاهزة، ونماذج مخصصة، وتكامل مع ERP.",
  },
  eyebrow: { en: "AI for manufacturing", ar: "ذكاء اصطناعي للتصنيع" },
  h1: {
    en: "Intelligence built in the region, for the region.",
    ar: "ذكاء صُنع في المنطقة، من أجل المنطقة.",
  },
  lead: {
    en: "The world's best planning and decision software was built in English, for Western factories, with 18-month implementations. MENA companies deserve better than a translated screen.",
    ar: "أفضل برمجيات التخطيط واتخاذ القرار في العالم بُنيت بالإنجليزية لمصانع غربية وبمشاريع تنفيذ مدتها 18 شهراً. شركات منطقتنا تستحق أكثر من شاشة مترجمة.",
  },
  missionTitle: { en: "Our mission", ar: "رسالتنا" },
  mission: {
    en: "Give every manufacturer and logistics company in Egypt and the Gulf the planning, executive and commercial intelligence that global leaders take for granted — in Arabic, deployed in weeks, supported locally.",
    ar: "أن نمنح كل شركة تصنيع ولوجستيات في مصر والخليج ذكاء التخطيط والقرار التنفيذي والتسويق الذي تعتبره الشركات العالمية أمراً مسلّماً به — بالعربية، وخلال أسابيع، وبدعم محلي.",
  },
  principlesTitle: { en: "What we believe", ar: "ما نؤمن به" },
  principles: [
    {
      t: { en: "Arabic-first, always", ar: "العربية أولاً، دائماً" },
      b: {
        en: "We design and reason in Arabic first. English is a second language of the product, not the other way round.",
        ar: "نصمم ونفكر بالعربية أولاً. الإنجليزية لغة ثانية للمنتج، وليس العكس.",
      },
    },
    {
      t: { en: "Specific beats impressive", ar: "الدقة قبل الإبهار" },
      b: {
        en: "We promise numbers and timeframes, then measure them at 30, 60 and 90 days. If it isn't measured, we don't claim it.",
        ar: "نعد بأرقام ومدد زمنية، ثم نقيسها بعد 30 و60 و90 يوماً. ما لا يُقاس لا ندّعيه.",
      },
    },
    {
      t: { en: "Operating partner, not vendor", ar: "شريك تشغيل، لا مورّد" },
      b: {
        en: "One accountable team from first demo to daily operations. You always know who to call.",
        ar: "فريق واحد مسؤول من أول عرض حتى التشغيل اليومي. تعرف دائماً بمن تتصل.",
      },
    },
    {
      t: { en: "Your data stays yours", ar: "بياناتك تبقى ملكك" },
      b: {
        en: "Row-level isolation per customer, an Egypt-hosted option and contracts that protect you — including if we ever part ways.",
        ar: "عزل على مستوى الصف لكل عميل، وخيار استضافة داخل مصر، وعقود تحميك — حتى إن افترقنا يوماً.",
      },
    },
  ],
  ecosystem: { en: "How we work with manufacturers", ar: "كيف نعمل مع المصانع" },
  cta: { en: "Meet the team behind the platform.", ar: "تعرّف على الفريق وراء المنصة." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/about", title: copy.title[l], description: copy.description[l] });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow[locale]}
        title={copy.h1[locale]}
        lead={copy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.about, path: "/about" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container max-w-3xl text-center">
          <p className="eyebrow">{copy.missionTitle[locale]}</p>
          <p className="mt-4 text-2xl font-semibold leading-relaxed text-brand-navy md:text-3xl">{copy.mission[locale]}</p>
        </div>
      </section>
      <section className="section bg-surface-subtle">
        <div className="container">
          <SectionHeading title={copy.principlesTitle[locale]} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {copy.principles.map((p) => (
              <div key={p.t.en} className="rounded-2xl border bg-background p-7">
                <h3 className="text-xl font-bold text-brand-navy">{p.t[locale]}</h3>
                <p className="mt-2 text-muted-foreground">{p.b[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FounderSection locale={locale} dict={dict} />
      <section className="section">
        <div className="container">
          <SectionHeading title={copy.ecosystem[locale]} />
          <div className="mt-10">
            {/* Service models from the catalog (Consult / Build / Integrate). */}
            <ServiceModelGrid locale={locale} dict={dict} />
          </div>
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} location="about_final" />
    </>
  );
}
