import type { Locale } from "@/i18n/config";
import { termsOfService as doc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/site/legal-page";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/terms-of-service", title: doc.title[l], description: doc.description[l] });
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <LegalPage doc={doc} path="/terms-of-service" locale={params.locale} />;
}
