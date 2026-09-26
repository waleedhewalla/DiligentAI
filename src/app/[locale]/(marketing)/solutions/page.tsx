import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import { accentClasses, listCapabilities, listDepartments, listOfferings } from "@/content/catalog";
import { href, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/icons";
import { MaturityLegend } from "@/components/site/maturity-badge";
import { itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";
import { CatalogShowcase } from "@/components/site/catalog";
import { ComparisonSection } from "@/components/site/catalog-blocks";

// Editorial copy only — the page body is generated from the catalog.
const copy = {
  title: { en: "AI Solutions & System Integration for Manufacturing", ar: "حلول الذكاء الاصطناعي وتكامل الأنظمة للتصنيع" },
  description: {
    en: "AI consulting, pre-built AI tools, custom models, ERP and shop-floor integration, and manufacturing use cases — all in one place.",
    ar: "استشارات الذكاء الاصطناعي، والأدوات الجاهزة، والنماذج المخصصة، والتكامل مع ERP وأرض المصنع، وحالات الاستخدام في التصنيع — في مكان واحد.",
  },
  h1: { en: "Everything we deliver for manufacturers", ar: "كل ما نقدمه للمصانع" },
  lead: {
    en: "Products you can deploy, services that design and build what's missing, and the integration that connects it all to your ERP and plant systems.",
    ar: "منتجات يمكنك تطبيقها، وخدمات تصمم وتبني ما ينقصك، وتكامل يربط كل ذلك بنظام ERP وأنظمة المصنع.",
  },
  cta: { en: "Not sure where to start? Start with the problem.", ar: "لست متأكداً من أين تبدأ؟ ابدأ من المشكلة." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/solutions", title: copy.title[l], description: copy.description[l] });
}

export default function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  return (
    <>
      <JsonLd
        data={itemListSchema(
          [
            ...listOfferings().map((o) => ({ name: o.title[locale], path: `/solutions/${o.slug}` })),
            ...listCapabilities().map((c) => ({ name: c.title[locale], path: `/capabilities/${c.slug}` })),
          ],
          locale,
        )}
      />
      <PageHero
        title={copy.h1[locale]}
        lead={copy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.solutions, path: "/solutions" },
            ]}
          />
        }
      />
      {/* Browse by department first — the primary way in (see catalog/departments.ts). */}
      <section className="border-b bg-surface-subtle py-8">
        <div className="container">
          <p className="text-sm font-bold text-brand-navy">{dict.nav.departments}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {listDepartments().map((d) => (
              <li key={d.slug}>
                <Link href={href(locale, `/departments/${d.slug}`)} className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
                  <Icon name={d.icon} className={cn("h-4 w-4", accentClasses[d.accent].text)} />
                  {d.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <MaturityLegend dict={dict} className="mb-12" />
          <CatalogShowcase locale={locale} dict={dict} headingLevel="h2" />
        </div>
      </section>
      <ComparisonSection locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "consult" }} location="solutions_hub" />
    </>
  );
}
