import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getOffering, listOfferings } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";
import { OfferingPage } from "@/components/site/offering-page";

// One static page per catalog offering — add an offering, get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return listOfferings().map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const o = getOffering(params.slug);
  if (!o) return {};
  const l = params.locale;
  return pageMetadata({
    locale: l,
    path: `/solutions/${o.slug}`,
    title: o.seo.title[l],
    description: o.seo.description[l],
    keywords: o.seo.keywords[l],
  });
}

export default function Page({ params }: { params: { locale: Locale; slug: string } }) {
  const o = getOffering(params.slug);
  if (!o) notFound();
  return <OfferingPage offering={o} locale={params.locale} />;
}
