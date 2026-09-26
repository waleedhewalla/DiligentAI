import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { listDepartments } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";
import { DepartmentCard, departmentCopy } from "@/components/site/department-card";

const meta = {
  title: { en: "AI Solutions by Manufacturing Department", ar: "حلول الذكاء الاصطناعي حسب إدارات المصنع" },
  description: {
    en: "AI for every manufacturing department: production, S&OP, quality, maintenance, supply chain, finance and costing, sales, HR and the executive team.",
    ar: "ذكاء اصطناعي لكل إدارة في المصنع: الإنتاج وS&OP والجودة والصيانة وسلسلة الإمداد والمالية والتكاليف والمبيعات والموارد البشرية والإدارة العليا.",
  },
  cta: { en: "Not sure where to start? We'll help you pick the first department.", ar: "لست متأكداً من أين تبدأ؟ سنساعدك في اختيار أول إدارة." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/departments", title: meta.title[l], description: meta.description[l] });
}

export default function DepartmentsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const all = listDepartments();
  return (
    <>
      <JsonLd data={itemListSchema(all.map((d) => ({ name: d.title[locale], path: `/departments/${d.slug}` })), locale)} />
      <PageHero
        title={departmentCopy.hubTitle[locale]}
        lead={departmentCopy.hubLead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: departmentCopy.hubTitle[locale], path: "/departments" },
            ]}
          />
        }
      />
      <section className="section">
        <h2 className="sr-only">{departmentCopy.hubTitle[locale]}</h2>
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {all.map((d) => (
            <DepartmentCard key={d.slug} department={d} locale={locale} />
          ))}
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={meta.cta[locale]} location="departments_hub" />
    </>
  );
}
