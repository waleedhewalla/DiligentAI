import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { listCapabilities, listOfferings } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";
import { CatalogShowcase } from "@/components/site/catalog";

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
      <section className="section">
        <div className="container">
          <CatalogShowcase locale={locale} dict={dict} headingLevel="h2" />
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "consult" }} location="solutions_hub" />
    </>
  );
}
