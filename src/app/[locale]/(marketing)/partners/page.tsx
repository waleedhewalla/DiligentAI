import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { partnerTracks, signedPartners } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, PageHero, SectionHeading } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";
import { PartnerForm } from "@/components/site/partner-form";

// Gap 4 & 7 — partner programme. Tracks and signed partners come from catalog/partners.ts;
// signed partners render only when that list is non-empty (never list unsigned names).
const copy = {
  title: { en: "Partner Programme — ERP, Automation, Cloud & Hardware Partners", ar: "برنامج الشركاء — شركاء ERP والأتمتة والسحابة والأجهزة" },
  description: {
    en: "Partner with Diligent AI to bring AI to your manufacturing customers in Egypt and the Gulf: referral, white-label and joint delivery models.",
    ar: "شارك Diligent AI لتقديم الذكاء الاصطناعي لعملائك من المصانع في مصر والخليج: نماذج الإحالة والعلامة البيضاء والتنفيذ المشترك.",
  },
  h1: { en: "You own the relationship. We add the AI.", ar: "أنت تملك العلاقة. ونحن نضيف الذكاء الاصطناعي." },
  lead: {
    en: "ERP implementers, automation vendors, cloud providers and hardware suppliers: your manufacturing customers are being asked about AI. Partner with us to answer — in Arabic, integrated with the systems you already deliver.",
    ar: "منفذو ERP وموردو الأتمتة ومزودو السحابة وموردو الأجهزة: عملاؤك من المصانع يُسألون عن الذكاء الاصطناعي. شاركنا لتقديم الإجابة — بالعربية، ومتكاملة مع الأنظمة التي تقدمها بالفعل.",
  },
  current: { en: "Current partners", ar: "الشركاء الحاليون" },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/partners", title: copy.title[l], description: copy.description[l] });
}

export default function PartnersPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
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
              { name: dict.nav.partners, path: "/partners" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          {partnerTracks.map((t) => (
            <article key={t.id} className="rounded-2xl border bg-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal-dark">
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-brand-navy">{t.title[locale]}</h2>
              <p className="mt-2 text-muted-foreground">{t.body[locale]}</p>
              <ul className="mt-4 space-y-2">
                {t.gives[locale].map((g) => (
                  <li key={g} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden />
                    {g}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-surface-subtle">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading title={copy.current[locale]} align="start" />
            {signedPartners.length ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {signedPartners.map((p) => (
                  <li key={p.name} className="rounded-lg border bg-background px-4 py-2.5 font-semibold text-brand-navy">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-muted-foreground">{dict.sections.noPartnersYet}</p>
            )}
          </div>
          <div className="rounded-2xl border bg-background p-6 md:p-8">
            <h2 className="text-xl font-bold text-brand-navy">{dict.sections.partnerForm.title}</h2>
            <div className="mt-6">
              <PartnerForm locale={locale} dict={dict} tracks={partnerTracks.map((t) => ({ value: t.id, label: t.title[locale] }))} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
