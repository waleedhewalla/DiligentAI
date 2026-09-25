import { Suspense } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/sections";
import { DemoBooking } from "@/components/site/demo-booking";
import { WhatsAppIcon } from "@/components/site/icons";
import { TrackedAnchor } from "@/components/site/tracked-link";

const copy = {
  title: { en: "Book a 30-Minute Demo — IPE, CEO OS, Nexus AI", ar: "احجز عرضاً توضيحياً مدته 30 دقيقة — IPE وCEO OS وNexus AI" },
  description: {
    en: "See IPE, CEO OS or Nexus AI live on your industry's data. 30 minutes, Arabic or English, no contract required.",
    ar: "شاهد IPE أو CEO OS أو Nexus AI مباشرة على بيانات قطاعك. 30 دقيقة، بالعربية أو الإنجليزية، دون أي التزام.",
  },
  h1: { en: "Book Your 30-Minute Demo", ar: "احجز عرضك التوضيحي في 30 دقيقة" },
  lead: {
    en: "See IPE, CEO OS or Nexus AI live. No sales pitch. Just a real demo.",
    ar: "شاهد IPE أو CEO OS أو Nexus AI مباشرة. بلا عرض بيعي. عرض حقيقي فقط.",
  },
  expect: { en: "What to expect", ar: "ماذا تتوقع" },
  points: {
    en: [
      "We tailor the demo to your industry — manufacturing, logistics or FMCG",
      "You'll see your own data scenarios if you share them in advance",
      "Waleed or a senior team member conducts every demo",
      "Arabic or English — your choice",
      "No contract required after the demo",
    ],
    ar: [
      "نُفصّل العرض حسب قطاعك — التصنيع أو اللوجستيات أو السلع الاستهلاكية",
      "سترى سيناريوهات من بياناتك إذا شاركتها معنا مسبقاً",
      "وليد أو أحد كبار أعضاء الفريق يقدم كل عرض بنفسه",
      "بالعربية أو الإنجليزية — حسب اختيارك",
      "لا يوجد أي التزام تعاقدي بعد العرض",
    ],
  },
  alt: { en: "Prefer to talk now?", ar: "تفضّل التحدث الآن؟" },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/demo", title: copy.title[l], description: copy.description[l] });
}

export default function DemoPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const wa = whatsappHref(locale === "ar" ? "مرحباً وليد، أود حجز عرض توضيحي" : "Hi Waleed, I'd like to book a demo");
  return (
    <section className="bg-surface-subtle">
      <div className="container py-12 md:py-16">
        <div className="text-brand-navy">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.bookDemo, path: "/demo" },
            ]}
          />
        </div>
        <div className="mt-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-brand-navy md:text-5xl">{copy.h1[locale]}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{copy.lead[locale]}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<div className="min-h-[700px] rounded-2xl border bg-background" />}>
            <DemoBooking locale={locale} dict={dict} calendlyUrl={site.calendly} calendlyCeoUrl={site.calendlyCeo} />
          </Suspense>
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-background p-6">
              <h2 className="text-lg font-bold text-brand-navy">{copy.expect[locale]}</h2>
              <ul className="mt-4 space-y-3">
                {copy.points[locale].map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            {wa ? (
              <div className="rounded-2xl border bg-background p-6">
                <p className="font-semibold text-brand-navy">{copy.alt[locale]}</p>
                <Button asChild variant="whatsapp" className="mt-4 w-full">
                  <TrackedAnchor href={wa} target="_blank" rel="noopener noreferrer" event={{ name: "whatsapp_click", params: { location: "demo_page" } }}>
                    <WhatsAppIcon className="h-5 w-5" />
                    {dict.cta.whatsapp}
                  </TrackedAnchor>
                </Button>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
