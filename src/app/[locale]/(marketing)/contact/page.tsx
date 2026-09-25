import { Mail, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero } from "@/components/site/sections";
import { DemoForm } from "@/components/site/demo-form";
import { LinkedInIcon, WhatsAppIcon } from "@/components/site/icons";
import { TrackedAnchor } from "@/components/site/tracked-link";

const copy = {
  title: { en: "Contact Diligent AI — Cairo, Egypt", ar: "تواصل مع Diligent AI — القاهرة، مصر" },
  description: {
    en: "Talk to the Diligent AI team in Cairo about IPE, CEO OS and Nexus AI. WhatsApp, email or a short form — we reply within one business day.",
    ar: "تحدث مع فريق Diligent AI في القاهرة عن IPE وCEO OS وNexus AI. واتساب أو بريد إلكتروني أو نموذج قصير — نرد خلال يوم عمل واحد.",
  },
  h1: { en: "Talk to a person, not a ticket queue", ar: "تحدث مع شخص، لا مع قائمة انتظار" },
  lead: {
    en: "Our Cairo team replies within one business day — in Arabic or English.",
    ar: "فريقنا في القاهرة يرد خلال يوم عمل واحد — بالعربية أو الإنجليزية.",
  },
  direct: { en: "Reach us directly", ar: "تواصل معنا مباشرة" },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/contact", title: copy.title[l], description: copy.description[l] });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const wa = whatsappHref(locale === "ar" ? "مرحباً، أود التواصل مع Diligent AI" : "Hello, I'd like to talk to Diligent AI");
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
              { name: dict.nav.contact, path: "/contact" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border p-6 md:p-8">
            <h2 className="text-xl font-bold text-brand-navy">{dict.demoForm.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{dict.demoForm.subtitle}</p>
            <div className="mt-6">
              <DemoForm locale={locale} dict={dict} source="contact" />
            </div>
          </div>
          <aside className="space-y-4">
            <h2 className="text-xl font-bold text-brand-navy">{copy.direct[locale]}</h2>
            {wa ? (
              <Button asChild variant="whatsapp" className="w-full">
                <TrackedAnchor href={wa} target="_blank" rel="noopener noreferrer" event={{ name: "whatsapp_click", params: { location: "contact_page" } }}>
                  <WhatsAppIcon className="h-5 w-5" />
                  {dict.cta.whatsapp}
                </TrackedAnchor>
              </Button>
            ) : null}
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-xl border p-4 hover:bg-muted">
              <Mail className="h-5 w-5 text-brand-teal-dark" aria-hidden />
              <span dir="ltr">{site.email}</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border p-4 hover:bg-muted">
              <LinkedInIcon className="h-5 w-5 text-brand-navy" />
              LinkedIn
            </a>
            <p className="flex items-center gap-3 rounded-xl border p-4">
              <MapPin className="h-5 w-5 text-brand-orange" aria-hidden />
              {site.city[locale]}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
