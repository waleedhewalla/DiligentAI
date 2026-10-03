import { Suspense } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/sections";
import { DemoBooking } from "@/components/site/demo-booking";
import { IntentSwitch } from "@/components/site/intent-switch";
import { demoAreaOptions } from "@/lib/demo-options";
import { WhatsAppIcon } from "@/components/site/icons";
import { TrackedAnchor } from "@/components/site/tracked-link";

const copy = {
  title: { en: "Book a 30-Minute AI Plant Review", ar: "احجز مراجعة ذكاء اصطناعي لمصنعك مدتها 30 دقيقة" },
  description: {
    en: "30 minutes with a senior consultant: your problem, the right AI approach, and how it connects to your ERP. Arabic or English, no contract required.",
    ar: "30 دقيقة مع مستشار أول: مشكلتك، والنهج المناسب بالذكاء الاصطناعي، وكيف يتصل بنظام ERP. بالعربية أو الإنجليزية، دون أي التزام.",
  },
  h1: { en: "Book Your 30-Minute Plant Review", ar: "احجز مراجعة لمصنعك في 30 دقيقة" },
  lead: {
    en: "Bring the problem – scheduling, forecasting, quality, supply chain or integration. We'll show you what AI can do about it. No sales pitch.",
    ar: "أحضر المشكلة – الجدولة أو التنبؤ أو الجودة أو سلاسل الإمداد أو التكامل. وسنريك ما يمكن للذكاء الاصطناعي فعله. بلا عرض بيعي.",
  },
  expect: { en: "What to expect", ar: "ماذا تتوقع" },
  points: {
    en: [
      "We tailor the session to your plant and your systems",
      "You'll see your own data scenarios if you share them in advance",
      "A senior consultant from our team leads every session",
      "Arabic or English – your choice",
      "No contract required afterwards",
    ],
    ar: [
      "نُفصّل الجلسة حسب مصنعك وأنظمتك",
      "سترى سيناريوهات من بياناتك إذا شاركتها معنا مسبقاً",
      "يقود كل جلسة مستشار أول من فريقنا",
      "بالعربية أو الإنجليزية – حسب اختيارك",
      "لا يوجد أي التزام تعاقدي بعدها",
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
  const wa = whatsappHref(
    locale === "ar"
      ? "مرحباً فريق VELIXI، أود حجز مراجعة لمصنعي"
      : "Hello VELIXI team, I'd like to book a plant review",
  );
  const reviewIntro = (
    <Intro
      locale={locale}
      crumb={dict.nav.bookDemo}
      home={dict.breadcrumbs.home}
      title={copy.h1[locale]}
      lead={copy.lead[locale]}
    />
  );
  const proposalIntro = (
    <Intro
      locale={locale}
      crumb={dict.proposal.crumb}
      home={dict.breadcrumbs.home}
      title={dict.proposal.h1}
      lead={dict.proposal.lead}
    />
  );
  const reviewSteps = <Steps title={copy.expect[locale]} items={copy.points[locale]} />;
  const proposalSteps = <Steps title={dict.proposal.expect} items={dict.proposal.steps} />;
  return (
    <section className="bg-surface-subtle">
      <div className="container py-12 md:py-16">
        {/* Same page serves the plant review and (?intent=proposal) the custom-proposal request. */}
        <Suspense fallback={reviewIntro}>
          <IntentSwitch proposal={proposalIntro}>{reviewIntro}</IntentSwitch>
        </Suspense>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<div className="min-h-[700px] rounded-2xl border bg-background" />}>
            <DemoBooking
              locale={locale}
              dict={dict}
              calendlyUrl={site.calendly}
              calendlyCeoUrl={site.calendlyCeo}
              bookingUrl={site.booking}
              areaOptions={demoAreaOptions(locale, dict)}
            />
          </Suspense>
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <Suspense fallback={reviewSteps}>
              <IntentSwitch proposal={proposalSteps}>{reviewSteps}</IntentSwitch>
            </Suspense>
            {wa ? (
              <div className="rounded-2xl border bg-background p-6">
                <p className="font-semibold text-brand-navy">{copy.alt[locale]}</p>
                <Button asChild variant="whatsapp" className="mt-4 w-full">
                  <TrackedAnchor
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    event={{ name: "whatsapp_click", params: { location: "demo_page" } }}
                  >
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

function Intro({
  locale,
  home,
  crumb,
  title,
  lead,
}: {
  locale: Locale;
  home: string;
  crumb: string;
  title: string;
  lead: string;
}) {
  return (
    <>
      <div className="text-brand-navy">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: home, path: "/" },
            { name: crumb, path: "/demo" },
          ]}
        />
      </div>
      <div className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold text-brand-navy md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{lead}</p>
      </div>
    </>
  );
}

function Steps({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border bg-background p-6">
      <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((pt) => (
          <li key={pt} className="flex gap-3 text-sm">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}
