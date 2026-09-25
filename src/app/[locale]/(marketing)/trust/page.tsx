import Link from "next/link";
import { Check, Lock, MapPin, ScrollText } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { complianceItems } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, FinalCta, PageHero, SectionHeading } from "@/components/site/sections";
import { ModelChoiceBlock } from "@/components/site/catalog-blocks";

// Gap 3 (PDPL) & gap 5 — where data lives and how it is protected. Controls listed
// here mirror what the platform actually implements (see README → Security).
const copy = {
  title: { en: "Trust & Data Residency — Egypt-Hosted and On-Premise AI", ar: "الثقة وإقامة البيانات — ذكاء اصطناعي مستضاف في مصر أو داخل المصنع" },
  description: {
    en: "Where your data lives and how it is protected: EU, Egypt-hosted, in-Kingdom or on-premise AI, tenant isolation, encryption, audit logs and SSO.",
    ar: "أين تعيش بياناتك وكيف تُحمى: ذكاء اصطناعي في الاتحاد الأوروبي أو مستضاف في مصر أو داخل المملكة أو داخل المصنع، مع عزل البيانات والتشفير وسجلات التدقيق والدخول الموحد.",
  },
  h1: { en: "Your plant data stays where you decide", ar: "بيانات مصنعك تبقى حيث تقرر" },
  lead: {
    en: "Egypt's data-protection law now requires a licence to move personal data abroad, and many boards want production data kept at home. Choose the hosting and the Arabic model that fit your rules.",
    ar: "قانون حماية البيانات المصري يتطلب الآن ترخيصاً لنقل البيانات الشخصية للخارج، وكثير من مجالس الإدارة تريد إبقاء بيانات الإنتاج في الداخل. اختر الاستضافة والنموذج العربي المناسبين لقواعدك.",
  },
  controlsTitle: { en: "Security controls", ar: "ضوابط الأمان" },
  controls: [
    { en: "Each customer's data isolated with database row-level security", ar: "بيانات كل عميل معزولة بأمان على مستوى الصف في قاعدة البيانات" },
    { en: "Encryption at rest (AES-256) and in transit (TLS)", ar: "تشفير أثناء التخزين (AES-256) وأثناء النقل (TLS)" },
    { en: "Enterprise single sign-on (SAML / OIDC), passkeys and two-step verification", ar: "دخول موحد للمؤسسات (SAML / OIDC) ومفاتيح مرور وتحقق بخطوتين" },
    { en: "Audit log of logins, exports and product access, kept for 2 years", ar: "سجل تدقيق لعمليات الدخول والتصدير والوصول للمنتجات لمدة عامين" },
    { en: "Read-only access to shop-floor systems by default", ar: "صلاحية قراءة فقط لأنظمة أرض المصنع افتراضياً" },
    { en: "Your data is never used to train shared models", ar: "لا تُستخدم بياناتك أبداً لتدريب نماذج مشتركة" },
  ],
  regsTitle: { en: "Regulations we design for", ar: "اللوائح التي نصمم وفقها" },
  cta: { en: "Bring your IT and legal team to the first call.", ar: "أحضر فريق تقنية المعلومات والفريق القانوني إلى المكالمة الأولى." },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/trust", title: copy.title[l], description: copy.description[l] });
}

export default function TrustPage({ params }: { params: { locale: Locale } }) {
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
              { name: dict.nav.trust, path: "/trust" },
            ]}
          />
        }
      />
      <ModelChoiceBlock locale={locale} dict={dict} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-navy">
              <Lock className="h-6 w-6 text-brand-teal-dark" aria-hidden />
              {copy.controlsTitle[locale]}
            </h2>
            <ul className="mt-6 space-y-3">
              {copy.controls.map((c) => (
                <li key={c.en} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
                  {c[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-navy">
              <ScrollText className="h-6 w-6 text-brand-orange" aria-hidden />
              {copy.regsTitle[locale]}
            </h2>
            <ul className="mt-6 space-y-4">
              {complianceItems.map((c) => (
                <li key={c.id} className="rounded-2xl border p-5">
                  <p className="flex items-center gap-2 text-xs font-bold text-brand-orange">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {c.when[locale]}
                  </p>
                  <p className="mt-1 font-bold text-brand-navy">{c.title[locale]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.body[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container">
          <SectionHeading title={dict.footer.privacy} lead={locale === "ar" ? "للتفاصيل الكاملة حول كيفية التعامل مع البيانات الشخصية." : "For full details on how personal data is handled."} />
          <p className="mt-4 text-center">
            <Link href={`/${locale}/privacy-policy`} className="font-semibold text-brand-teal-dark hover:underline">
              {dict.footer.privacy}
            </Link>
          </p>
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={copy.cta[locale]} query={{ interest: "consult" }} location="trust" />
    </>
  );
}
