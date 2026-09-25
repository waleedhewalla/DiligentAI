import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortalContext } from "@/lib/auth";
import { getOffering } from "@/content/catalog";
import { LaunchButton } from "@/components/portal/launch-button";

export const dynamic = "force-dynamic";

export default async function ProductLauncher({ params }: { params: { locale: Locale; product: string } }) {
  const locale = params.locale;
  // Route segment is the offering slug; only offerings with a launch key have a portal page.
  const p = getOffering(params.product);
  if (!p?.launch) notFound();
  const key = p.launch;
  const name = p.brand ?? p.title[locale];
  const dict = getDictionary(locale);
  const ctx = (await getPortalContext())!;
  const grant = ctx.access.find((a) => a.product === key);

  return (
    <div className="rounded-xl bg-background p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-brand-navy">{name}</h1>
      <p className="mt-1 text-muted-foreground">{p.title[locale]}</p>
      <div className="mt-6 max-w-xs">
        {grant ? (
          <LaunchButton
            product={key}
            label={`${dict.portal.open} ${name}`}
            launchingLabel={dict.portal.launching}
            errorLabel={dict.portal.launchError}
            auto
          />
        ) : (
          <div className="grid gap-3">
            <p className="text-sm">{dict.portal.notLicensed}</p>
            <Link href={`/${locale}/portal/support?product=${key}`} className="text-sm font-medium text-brand-purple hover:underline">
              {dict.portal.requestAccess}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
