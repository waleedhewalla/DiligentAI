import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortalContext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { accentClasses, launchableOfferings } from "@/content/catalog";
import { cn } from "@/lib/utils";
import { LaunchButton } from "@/components/portal/launch-button";

export const dynamic = "force-dynamic";

const ACTION_LABELS: Record<string, { en: string; ar: string }> = {
  login: { en: "Signed in", ar: "تسجيل دخول" },
  login_sso: { en: "Signed in with SSO", ar: "دخول موحد" },
  login_passkey: { en: "Signed in with passkey", ar: "دخول بمفتاح المرور" },
  product_launch: { en: "Opened product", ar: "فتح منتج" },
  mfa_enrolled: { en: "Two-step verification enabled", ar: "تفعيل التحقق بخطوتين" },
  passkey_added: { en: "Passkey added", ar: "إضافة مفتاح مرور" },
  support_ticket_created: { en: "Support ticket submitted", ar: "فتح تذكرة دعم" },
  password_changed: { en: "Password changed", ar: "تغيير كلمة المرور" },
};

export default async function PortalDashboard({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const ctx = (await getPortalContext())!;
  const { data: activity } = await createClient()
    .from("audit_log")
    .select("id, action, resource, created_at")
    .eq("user_id", ctx.user.id)
    .order("created_at", { ascending: false })
    .limit(8);

  const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  const name = ctx.profile?.full_name ?? ctx.user.email;

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy md:text-3xl">
          {dict.portal.welcome}, {name}
        </h1>
        {ctx.profile?.last_login ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {dict.portal.lastLogin}: {fmt.format(new Date(ctx.profile.last_login))}
          </p>
        ) : null}
      </div>

      <section aria-labelledby="products-h">
        <h2 id="products-h" className="text-lg font-semibold">
          {dict.portal.yourProducts}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Dynamic: cards come from catalog offerings that customers can launch. */}
          {launchableOfferings().map((p) => {
            const grant = ctx.access.find((a) => a.product === p.launch);
            const c = accentClasses[p.accent];
            const name = p.brand ?? p.title[locale];
            return (
              <div key={p.launch} className={cn("flex flex-col rounded-xl border-t-4 bg-background p-5 shadow-sm", c.border)}>
                <p className={cn("text-lg font-bold", c.text)}>{name}</p>
                <p className="text-sm text-muted-foreground">{p.title[locale]}</p>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <span className={cn("h-2 w-2 rounded-full", grant ? "bg-brand-green" : "bg-muted-foreground/40")} />
                  {grant ? dict.portal.active : dict.portal.notLicensed}
                </p>
                <div className="mt-5">
                  {grant ? (
                    <LaunchButton
                      product={p.launch}
                      label={`${dict.portal.open} ${name}`}
                      launchingLabel={dict.portal.launching}
                      errorLabel={dict.portal.launchError}
                    />
                  ) : (
                    <Link href={`/${locale}/portal/support?product=${p.launch}`} className="text-sm font-medium text-brand-purple hover:underline">
                      {dict.portal.requestAccess}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="activity-h" className="rounded-xl bg-background p-5 shadow-sm">
          <h2 id="activity-h" className="text-lg font-semibold">
            {dict.portal.recentActivity}
          </h2>
          {activity?.length ? (
            <ul className="mt-4 divide-y">
              {activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span>
                    {ACTION_LABELS[a.action]?.[locale] ?? a.action}
                    {a.resource ? <span className="text-muted-foreground"> — {a.resource}</span> : null}
                  </span>
                  <time className="shrink-0 text-muted-foreground" dateTime={a.created_at}>
                    {fmt.format(new Date(a.created_at))}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">{dict.portal.noActivity}</p>
          )}
        </section>
        <section aria-labelledby="links-h" className="rounded-xl bg-background p-5 shadow-sm">
          <h2 id="links-h" className="text-lg font-semibold">
            {dict.portal.quickLinks}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/portal/support`} className="font-medium text-brand-purple hover:underline">
                {dict.portal.submitTicket}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/portal/account`} className="font-medium text-brand-purple hover:underline">
                {dict.portal.accountSettings}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
