import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { SupportForm } from "@/components/portal/support-form";
import { launchableOfferings } from "@/content/catalog";

export const dynamic = "force-dynamic";

export default function SupportPage({ params, searchParams }: { params: { locale: Locale }; searchParams: { product?: string } }) {
  const dict = getDictionary(params.locale);
  const s = dict.portal.support;
  const product = ["ipe", "ceo_os", "nexus"].includes(searchParams.product ?? "") ? searchParams.product : undefined;
  return (
    <div className="rounded-xl bg-background p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold text-brand-navy">{s.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {s.subtitle} · <a href={`mailto:${site.supportEmail}`} className="text-brand-purple hover:underline">{site.supportEmail}</a>
      </p>
      <div className="mt-6 max-w-2xl">
        <SupportForm
          dict={dict}
          defaultProduct={product}
          products={launchableOfferings().map((o) => ({ value: o.launch, label: o.brand ?? o.title[params.locale] }))}
        />
      </div>
    </div>
  );
}
