import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortalContext, isAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Logo } from "@/components/site/logo";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { PortalNav } from "@/components/portal/sidebar";
import { site } from "@/lib/site";
import { launchableOfferings } from "@/content/catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Portal", robots: { index: false, follow: false } };

export default async function PortalLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  if (!isSupabaseConfigured) redirect(`/${locale}/login`);

  const ctx = await getPortalContext();
  if (!ctx) redirect(`/${locale}/login?next=/${locale}/portal`);
  // Enrolled factor but session only at aal1 → finish the second factor first.
  if (ctx.aal.next === "aal2" && ctx.aal.current !== "aal2") redirect(`/${locale}/login?mfa=1`);

  const mfaMissingForAdmin = isAdmin(ctx.profile?.role) && !ctx.hasTotp;

  return (
    <div className="min-h-screen bg-surface-subtle">
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={`/${locale}/portal`}>
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-muted-foreground sm:inline">{ctx.org?.name}</span>
            <LocaleSwitcher locale={locale} label={dict.locale.switchTo} />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple text-sm font-semibold text-white" aria-label={ctx.user.email}>
              {(ctx.profile?.full_name ?? ctx.user.email).slice(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <PortalNav
            locale={locale}
            dict={dict}
            orgName={ctx.org?.name ?? ""}
            products={launchableOfferings().map((o) => ({ slug: o.slug, label: o.brand ?? o.title[locale], accent: o.accent }))}
          />
        </aside>
        <main id="main" className="min-w-0">
          {mfaMissingForAdmin ? (
            <div role="alert" className="mb-6 flex items-center gap-3 rounded-xl border border-brand-amber/40 bg-brand-amber/10 p-4 text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 text-brand-amber" aria-hidden />
              <span className="flex-1">{dict.portal.account.mfaRequired}</span>
              <Link href={`/${locale}/portal/account#security`} className="font-semibold text-brand-purple hover:underline">
                {dict.portal.account.enableMfa}
              </Link>
            </div>
          ) : null}
          {children}
        </main>
      </div>
      <footer className="border-t bg-background py-4 text-center text-xs text-muted-foreground">
        Diligent AI · {site.supportEmail} · v1.0
      </footer>
    </div>
  );
}
