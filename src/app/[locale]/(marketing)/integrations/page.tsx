import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { integrationGroups, listOfferings } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumbs, FinalCta, OfferingCard, PageHero, SectionHeading } from "@/components/site/sections";

// Gap 7 — integrations hub. Systems and support levels come from catalog/integrations.ts;
// integration services from offerings in the "system-integration" category.
const copy = {
  title: { en: "Integrations — SAP, Oracle, Dynamics, Odoo, MES/SCADA & AI Platforms", ar: "التكاملات — SAP وOracle وDynamics وOdoo وMES/SCADA ومنصات الذكاء الاصطناعي" },
  description: {
    en: "The ERP, shop-floor, cloud and AI-agent systems Diligent AI connects to, and how: standard interfaces, packaged connectors and connectors in pilot.",
    ar: "أنظمة ERP وأرض المصنع والسحابة ووكلاء الذكاء الاصطناعي التي تتصل بها Diligent AI، وكيف: واجهات قياسية وموصلات جاهزة وموصلات تجريبية.",
  },
  h1: { en: "AI that works inside the systems you already run", ar: "ذكاء اصطناعي يعمل داخل الأنظمة التي تستخدمها بالفعل" },
  lead: {
    en: "SAP, Oracle, Dynamics or Odoo; Siemens or Rockwell on the floor; Azure or AWS underneath. We connect to what you have and keep your ERP as the system of record.",
    ar: "SAP أو Oracle أو Dynamics أو Odoo؛ وSiemens أو Rockwell في أرض المصنع؛ وAzure أو AWS تحتها. نتصل بما لديك ونُبقي نظام ERP هو المرجع.",
  },
  services: { en: "Integration services", ar: "خدمات التكامل" },
  cta: { en: "Send us your systems list. We'll map the integration in one call.", ar: "أرسل لنا قائمة أنظمتك. وسنرسم خريطة التكامل في مكالمة واحدة." },
};

const supportStyle = {
  standard: "bg-brand-navy/10 text-brand-navy",
  packaged: "bg-brand-green/10 text-brand-green",
  pilot: "bg-brand-amber/15 text-brand-amber-dark",
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/integrations", title: copy.title[l], description: copy.description[l] });
}

export default function IntegrationsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const services = listOfferings({ category: "system-integration" });
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
              { name: dict.nav.integrations, path: "/integrations" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-2">
          {integrationGroups.map((g) => (
            <div key={g.id} id={g.id} className="rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-bold text-brand-navy">{g.title[locale]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{g.summary[locale]}</p>
              <ul className="mt-4 divide-y">
                {g.systems.map((sys) => (
                  <li key={sys.name} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <span dir="ltr" className="font-semibold">
                      {sys.name}
                      <span className="ms-2 text-xs font-normal text-muted-foreground">{sys.how}</span>
                    </span>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", supportStyle[sys.support])}>
                      {dict.sections.support[sys.support]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="section bg-surface-subtle">
        <div className="container">
          <SectionHeading title={copy.services[locale]} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((o) => (
              <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "integrate" }} location="integrations" />
    </>
  );
}
