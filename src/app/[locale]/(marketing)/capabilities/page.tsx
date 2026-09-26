import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategory, listCapabilities } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, CapabilityCard, FinalCta, PageHero } from "@/components/site/sections";

const copy = {
  title: { en: "Manufacturing AI Use Cases: Scheduling, Forecasting, Quality, Supply Chain", ar: "حالات استخدام الذكاء الاصطناعي في التصنيع: الجدولة والتنبؤ والجودة وسلاسل الإمداد" },
  description: {
    en: "How AI solves the problems manufacturers in Egypt and the Gulf face every week — production scheduling, demand planning, forecasting, quality control, supply chain and maintenance.",
    ar: "كيف يحل الذكاء الاصطناعي المشكلات التي تواجهها المصانع في مصر والخليج كل أسبوع — جدولة الإنتاج وتخطيط الطلب والتنبؤ وضبط الجودة وسلاسل الإمداد والصيانة.",
  },
  cta: { en: "See your use case on your own data.", ar: "شاهد حالة استخدامك على بياناتك." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/capabilities", title: copy.title[l], description: copy.description[l] });
}

export default function CapabilitiesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const category = getCategory("industry-capabilities");
  const caps = listCapabilities();
  return (
    <>
      <JsonLd data={itemListSchema(caps.map((c) => ({ name: c.title[locale], path: `/capabilities/${c.slug}` })), locale)} />
      <PageHero
        title={category.title[locale]}
        lead={category.summary[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.capabilities, path: "/capabilities" },
            ]}
          />
        }
      />
      <section className="section">
        <h2 className="sr-only">{category.title[locale]}</h2>
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <CapabilityCard key={c.slug} capability={c} locale={locale} dict={dict} />
          ))}
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} location="capabilities_hub" />
    </>
  );
}
