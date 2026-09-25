import type { Locale } from "@/i18n/config";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/site/product-page";

const product = products["ceo-os"];

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({
    locale: l,
    path: "/ceo-os",
    title: product.seo.title[l],
    description: product.seo.description[l],
    keywords: product.seo.keywords[l],
  });
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <ProductPage product={product} locale={params.locale} />;
}
