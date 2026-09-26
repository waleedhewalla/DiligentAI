import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { buildNav } from "@/lib/nav";
import { href } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import { MobileActionBar } from "@/components/site/mobile-action-bar";

export default function MarketingLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <JsonLd data={[organizationSchema(params.locale), websiteSchema(params.locale)]} />
      {/* Menu is generated from the catalog on the server (lib/nav.ts). */}
      <Header locale={params.locale} dict={dict} nav={buildNav(params.locale, dict)} />
      <main id="main">{children}</main>
      <Footer locale={params.locale} dict={dict} />
      {/* Keeps the footer clear of the mobile action bar. */}
      <div className="h-20 md:hidden" aria-hidden />
      <MobileActionBar
        bookHref={href(params.locale, "/demo")}
        bookLabel={dict.cta.bookDemoShort}
        whatsappHref={whatsappHref(params.locale === "ar" ? "مرحباً، أود حجز مراجعة لمصنعي" : "Hi, I'd like to book a plant review")}
        whatsappLabel={dict.cta.whatsapp}
      />
    </>
  );
}
