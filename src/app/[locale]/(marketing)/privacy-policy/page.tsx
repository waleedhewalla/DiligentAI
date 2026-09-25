import type { Locale } from "@/i18n/config";
import { privacyPolicy as doc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/site/legal-page";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/privacy-policy", title: doc.title[l], description: doc.description[l] });
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <LegalPage doc={doc} path="/privacy-policy" locale={params.locale} />;
}
