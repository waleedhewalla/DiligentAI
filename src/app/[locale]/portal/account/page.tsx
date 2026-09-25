import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortalContext, isAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { LanguageForm, PasskeySetup, TotpSetup } from "@/components/portal/security";

export const dynamic = "force-dynamic";

export default async function AccountPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const a = dict.portal.account;
  const ctx = (await getPortalContext())!;
  const admin = isAdmin(ctx.profile?.role);
  const supabase = createClient();

  // Both queries run under RLS: admins see their own organisation only.
  const [users, auditLog] = admin
    ? await Promise.all([
        supabase.from("users").select("id, full_name, email, role, is_active, last_login").order("created_at"),
        supabase.from("audit_log").select("id, action, resource, created_at, user_id").order("created_at", { ascending: false }).limit(50),
      ])
    : [null, null];

  const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  const card = "rounded-xl bg-background p-6 shadow-sm";

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-brand-navy">{a.title}</h1>

      <section className={card} aria-labelledby="profile-h">
        <h2 id="profile-h" className="text-lg font-semibold">
          {a.profile}
        </h2>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[160px_1fr]">
          <dt className="text-muted-foreground">{dict.auth.fullName}</dt>
          <dd>{ctx.profile?.full_name ?? "—"}</dd>
          <dt className="text-muted-foreground">{dict.auth.email}</dt>
          <dd dir="ltr" className="text-start">
            {ctx.user.email}
          </dd>
          <dt className="text-muted-foreground">{a.role}</dt>
          <dd>{ctx.profile?.role}</dd>
        </dl>
        <div className="mt-6">
          <LanguageForm dict={dict} current={ctx.profile?.language_pref ?? locale} />
        </div>
      </section>

      <section id="security" className={card} aria-labelledby="security-h">
        <h2 id="security-h" className="text-lg font-semibold">
          {a.security}
        </h2>
        <div className="mt-4 grid gap-8">
          <TotpSetup dict={dict} enabled={ctx.hasTotp} />
          <div>
            <h3 className="mb-2 font-semibold">{a.passkeys}</h3>
            <PasskeySetup dict={dict} />
          </div>
        </div>
      </section>

      {admin && users?.data ? (
        <section className={card} aria-labelledby="users-h">
          <h2 id="users-h" className="text-lg font-semibold">
            {a.users}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 text-start font-medium">{dict.auth.fullName}</th>
                  <th className="py-2 text-start font-medium">{dict.auth.email}</th>
                  <th className="py-2 text-start font-medium">{a.role}</th>
                  <th className="py-2 text-start font-medium">{dict.portal.lastLogin}</th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((u) => (
                  <tr key={u.id} className={u.is_active ? "border-b" : "border-b opacity-50"}>
                    <td className="py-2">{u.full_name ?? "—"}</td>
                    <td className="py-2" dir="ltr">
                      {u.email}
                    </td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2">{u.last_login ? fmt.format(new Date(u.last_login)) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {admin && auditLog?.data ? (
        <section className={card} aria-labelledby="audit-h">
          <h2 id="audit-h" className="text-lg font-semibold">
            {a.audit}
          </h2>
          <ul className="mt-4 divide-y text-sm">
            {auditLog.data.map((e) => (
              <li key={e.id} className="flex justify-between gap-4 py-2">
                <span className="font-mono text-xs" dir="ltr">
                  {e.action}
                  {e.resource ? ` · ${e.resource}` : ""}
                </span>
                <time className="shrink-0 text-muted-foreground" dateTime={e.created_at}>
                  {fmt.format(new Date(e.created_at))}
                </time>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
