import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accentClasses, listPackagedOfferings } from "@/content/catalog";
import { href, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";
import { CommitmentBlock, ComparisonSection, PackagePrice } from "@/components/site/catalog-blocks";
import { Icon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { MaturityLegend } from "@/components/site/maturity-badge";

// Gap 1 — every offering with `packages` in catalog/offerings.ts appears here automatically.
const copy = {
  title: { en: "Pricing — Fixed-Scope AI Packages in EGP", ar: "الأسعار — باقات ذكاء اصطناعي بنطاق محدد بالجنيه" },
  description: {
    en: "Fixed-scope, fixed-price AI packages for manufacturers, priced in Egyptian pounds: starter packs, vision quality control and machine health.",
    ar: "باقات ذكاء اصطناعي بنطاق وسعر ثابتين للمصانع، بالجنيه المصري: باقات البداية والفحص البصري للجودة وصحة الماكينات.",
  },
  // The "fixed price" headline is shown only once every package has a published price;
  // until then the page says what is actually true (assessment Track 1 #7).
  h1: { en: "Fixed scope. Fixed price. In Egyptian pounds.", ar: "نطاق ثابت. سعر ثابت. بالجنيه المصري." },
  h1Quoted: { en: "Transparent pricing in Egyptian pounds.", ar: "تسعير واضح بالجنيه المصري." },
  leadQuoted: {
    en: "Every package has a defined scope and timeline. We confirm the EGP price within two business days of a 30-minute call — no six-figure dollar licences and no open-ended consulting.",
    ar: "لكل باقة نطاق وجدول زمني محددان. نؤكد السعر بالجنيه خلال يومي عمل من مكالمة مدتها 30 دقيقة — لا تراخيص بمئات الآلاف من الدولارات ولا استشارات مفتوحة.",
  },
  lead: {
    en: "No six-figure dollar licences and no open-ended consulting. Every package has a defined scope, a timeline and a price agreed before we start. Larger programmes are quoted per project.",
    ar: "لا تراخيص بمئات الآلاف من الدولارات ولا استشارات مفتوحة. لكل باقة نطاق محدد وجدول زمني وسعر متفق عليه قبل البدء. البرامج الأكبر تُسعّر لكل مشروع.",
  },
  cta: { en: "Tell us your plant. We'll quote in EGP within two business days.", ar: "أخبرنا عن مصنعك. وسنرسل عرض سعر بالجنيه خلال يومي عمل." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/pricing", title: copy.title[l], description: copy.description[l] });
}

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const offerings = listPackagedOfferings();
  const allPriced = offerings.every((o) => o.packages!.every((p) => p.priceFromEGP !== null));
  return (
    <>
      <PageHero
        title={(allPriced ? copy.h1 : copy.h1Quoted)[locale]}
        lead={(allPriced ? copy.lead : copy.leadQuoted)[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.pricing, path: "/pricing" },
            ]}
          />
        }
      >
        <Button asChild size="lg" className="mt-8">
          <TrackedLink href={href(locale, "/demo") + "?interest=build&intent=quote"} event={{ name: "cta_click", params: { cta: "book_demo", location: "pricing_hero" } }}>
            {dict.cta.bookDemo}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
      </PageHero>

      <section className="pt-10">
        <div className="container">
          <MaturityLegend dict={dict} />
        </div>
      </section>

      {offerings.map((o, idx) => {
        const c = accentClasses[o.accent];
        return (
          <section key={o.slug} id={o.slug} className={cn("section scroll-mt-20", idx % 2 === 1 && "bg-surface-subtle")}>
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", c.softBg, c.text)}>
                    <Icon name={o.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-navy">{o.title[locale]}</h2>
                    <p className="mt-1 max-w-2xl text-muted-foreground">{o.summary[locale]}</p>
                  </div>
                </div>
                <Link href={href(locale, `/solutions/${o.slug}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark hover:underline">
                  {dict.common.learnMore} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {o.packages!.map((p) => (
                  <Link
                    key={p.id}
                    href={href(locale, `/solutions/${o.slug}#packages`)}
                    className={cn("flex flex-col rounded-2xl border bg-background p-6 hover:shadow-md", p.recommended && "border-2 border-brand-orange")}
                  >
                    <p className="font-bold text-brand-navy">{p.name[locale]}</p>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.scope[locale]}</p>
                    <div className="mt-4">
                      <PackagePrice pkg={p} locale={locale} dict={dict} />
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-brand-teal-dark" aria-hidden />
                      {dict.sections.duration}: {p.duration[locale]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CommitmentBlock locale={locale} dict={dict} />
      <ComparisonSection locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "build" }} location="pricing" />
    </>
  );
}
