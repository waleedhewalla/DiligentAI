import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortalContext } from "@/lib/auth";
import { products, type ProductSlug } from "@/content/products";
import { LaunchButton } from "@/components/portal/launch-button";

export const dynamic = "force-dynamic";

export default async function ProductLauncher({ params }: { params: { locale: Locale; product: string } }) {
  const p = products[params.product as ProductSlug];
  if (!p) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const ctx = (await getPortalContext())!;
  const grant = ctx.access.find((a) => a.product === p.key);

  return (
    <div className="rounded-xl bg-background p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-brand-navy">{p.name[locale]}</h1>
      <p className="mt-1 text-muted-foreground">{p.category[locale]}</p>
      <div className="mt-6 max-w-xs">
        {grant ? (
          <LaunchButton
            product={p.key}
            label={`${dict.portal.open} ${p.name[locale]}`}
            launchingLabel={dict.portal.launching}
            errorLabel={dict.portal.launchError}
            auto
          />
        ) : (
          <div className="grid gap-3">
            <p className="text-sm">{dict.portal.notLicensed}</p>
            <Link href={`/${locale}/portal/support?product=${p.key}`} className="text-sm font-medium text-brand-purple hover:underline">
              {dict.portal.requestAccess}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
