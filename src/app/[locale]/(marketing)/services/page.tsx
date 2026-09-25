import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accentClasses, listOfferings, listServiceModels } from "@/content/catalog";
import { href, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, FinalCta, OfferingCard, PageHero } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";
import { TrackedLink } from "@/components/site/tracked-link";

const copy = {
  title: { en: "AI Consulting, Build & Integration Services for Manufacturers", ar: "خدمات استشارات وبناء وتكامل الذكاء الاصطناعي للمصانع" },
  description: {
    en: "Three ways to work with us: Consult (find and prioritise AI use cases), Build (deploy or develop AI), Integrate (connect AI to ERP, MES and legacy systems).",
    ar: "ثلاث طرق للعمل معنا: الاستشارة (تحديد فرص الذكاء الاصطناعي وأولوياتها)، البناء (تطبيق أو تطوير الذكاء الاصطناعي)، التكامل (ربطه بأنظمة ERP وMES والأنظمة القديمة).",
  },
  h1: { en: "Consult. Build. Integrate.", ar: "نستشير. نبني. نُكامل." },
  lead: {
    en: "One accountable team from the first workshop to a model running on your plant data and writing back to your ERP. Engage us for one step or all three.",
    ar: "فريق واحد مسؤول من أول ورشة عمل حتى نموذج يعمل على بيانات مصنعك ويكتب في نظام ERP. تعامل معنا في خطوة واحدة أو في الثلاث.",
  },
  delivered: { en: "Delivered through this model", ar: "يُقدَّم من خلال هذا النموذج" },
  cta: { en: "Tell us where you are. We'll suggest where to start.", ar: "أخبرنا أين أنت. وسنقترح من أين تبدأ." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/services", title: copy.title[l], description: copy.description[l] });
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const models = listServiceModels();
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
              { name: dict.nav.services, path: "/services" },
            ]}
          />
        }
      >
        {/* In-page jump links, generated from the service models. */}
        <nav aria-label={dict.nav.services} className="mt-8 flex flex-wrap gap-3">
          {models.map((m) => (
            <a key={m.id} href={`#${m.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
              <Icon name={m.icon} className="h-4 w-4" />
              {m.title[locale]}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* One section per service model — all content from catalog/service-models.ts. */}
      {models.map((m, idx) => {
        const c = accentClasses[m.accent];
        const delivered = listOfferings({ serviceModel: m.id });
        return (
          <section key={m.id} id={m.id} className={cn("section scroll-mt-20", idx % 2 === 1 && "bg-surface-subtle")}>
            <div className="container">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", c.softBg, c.text)}>
                    <Icon name={m.icon} className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-3xl font-bold text-brand-navy md:text-4xl">{m.title[locale]}</h2>
                  <p className="mt-3 text-xl font-semibold">{m.tagline[locale]}</p>
                  <p className="mt-4 text-lg text-muted-foreground">{m.description[locale]}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {dict.common.typicalDuration}: <span className="font-semibold text-foreground">{m.duration[locale]}</span>
                  </p>
                  <Button asChild className={cn("mt-6", c.button)}>
                    <TrackedLink
                      href={href(locale, "/demo") + `?interest=${m.id}`}
                      event={{ name: "cta_click", params: { cta: "service_model", location: "services_page", interest: m.id } }}
                    >
                      {m.cta[locale]}
                      <ArrowRight className="btn-icon" />
                    </TrackedLink>
                  </Button>
                </div>
                <div className="rounded-2xl border bg-background p-6">
                  <h3 className="font-bold text-brand-navy">{dict.common.deliverables}</h3>
                  <ul className="mt-4 space-y-3">
                    {m.deliverables[locale].map((d) => (
                      <li key={d} className="flex gap-3">
                        <Check className={cn("mt-1 h-5 w-5 shrink-0", c.text)} aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="mt-14 text-lg font-bold text-brand-navy">{dict.common.engagement}</h3>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {m.steps.map((s, i) => (
                  <li key={s.title.en} className="rounded-2xl border bg-background p-5">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white", c.bg)}>{i + 1}</span>
                    <p className="mt-3 font-bold text-brand-navy">{s.title[locale]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.body[locale]}</p>
                  </li>
                ))}
              </ol>

              {delivered.length ? (
                <>
                  <h3 className="mt-14 text-lg font-bold text-brand-navy">{copy.delivered[locale]}</h3>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {delivered.map((o) => (
                      <OfferingCard key={o.slug} offering={o} locale={locale} dict={dict} />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </section>
        );
      })}

      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} location="services_page" />
    </>
  );
}
