import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export default function MarketingLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <JsonLd data={[organizationSchema(params.locale), websiteSchema(params.locale)]} />
      <Header locale={params.locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </>
  );
}
