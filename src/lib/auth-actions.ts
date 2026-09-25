"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp, isLimited, rateLimit, recordHit } from "@/lib/rate-limit";
import { passwordSchema } from "@/lib/validation";
import { audit } from "@/lib/audit";
import { safeNext } from "@/lib/auth";
import { absoluteUrl } from "@/lib/utils";

export type ActionState = { error?: string; ok?: boolean; step?: "mfa" } | null;

const FIFTEEN_MIN = 15 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

function localeFrom(form: FormData): "ar" | "en" {
  return form.get("locale") === "en" ? "en" : "ar";
}

/** Spec §5.4: 5 failed logins → 15-minute lockout, per IP and per account. */
function loginKeys(email: string) {
  return [`login-ip:${clientIp(headers())}`, `login-email:${email}`];
}
function loginLimited(email: string) {
  return loginKeys(email).some((k) => isLimited(k, 5, FIFTEEN_MIN));
}
function recordLoginFailure(email: string) {
  loginKeys(email).forEach(recordHit);
}

async function afterPrimaryAuth(locale: "ar" | "en", next: string) {
  const supabase = createClient();
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") {
    return { step: "mfa" as const };
  }
  redirect(safeNext(next, `/${locale}/portal`));
}

export async function signInWithPassword(_: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) return { error: "notConfigured" };
  const locale = localeFrom(form);
  const parsed = z
    .object({ email: z.string().trim().toLowerCase().pipe(z.email()), password: z.string().min(1).max(128) })
    .safeParse({ email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return { error: "invalid" };
  const { email, password } = parsed.data;

  if (loginLimited(email)) return { error: "rateLimited" };

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    recordLoginFailure(email);
    await audit({ action: "login_failed", metadata: { email_domain: email.split("@")[1] } });
    return { error: error?.status === 429 ? "rateLimited" : "invalid" };
  }

  const orgId = (data.user.app_metadata?.org_id as string | undefined) ?? null;
  await audit({ action: "login", userId: data.user.id, orgId });
  const admin = createAdminClient();
  await admin?.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id);

  return afterPrimaryAuth(locale, String(form.get("next") ?? ""));
}

export async function verifyTotp(_: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) return { error: "notConfigured" };
  const locale = localeFrom(form);
  const code = String(form.get("code") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return { error: "invalid", step: "mfa" };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "generic" };
  if (!rateLimit(`mfa:${user.id}`, 5, FIFTEEN_MIN).ok) return { error: "rateLimited", step: "mfa" };

  const { data: factors } = await supabase.auth.mfa.listFactors();
  const factor = factors?.totp.find((f) => f.status === "verified");
  if (!factor) return { error: "generic", step: "mfa" };

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
  if (error) {
    await audit({ action: "mfa_failed", userId: user.id, orgId: (user.app_metadata?.org_id as string) ?? null });
    return { error: "invalid", step: "mfa" };
  }
  await audit({ action: "mfa_verified", userId: user.id, orgId: (user.app_metadata?.org_id as string) ?? null });
  redirect(safeNext(String(form.get("next") ?? ""), `/${locale}/portal`));
}

/** Enterprise SSO: route by email domain to the org's SAML 2.0 / OIDC identity provider. */
export async function signInWithSso(_: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) return { error: "notConfigured" };
  const locale = localeFrom(form);
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const domain = email.split("@")[1];
  if (!domain) return { error: "invalid" };

  const supabase = createClient();
  const next = safeNext(String(form.get("next") ?? ""), `/${locale}/portal`);
  const { data, error } = await supabase.auth.signInWithSSO({
    domain,
    options: { redirectTo: absoluteUrl(`/auth/callback?next=${encodeURIComponent(next)}`) },
  });
  if (error || !data?.url) return { error: "ssoNotConfigured" };
  redirect(data.url);
}

export async function requestPasswordReset(_: ActionState, form: FormData): Promise<ActionState> {
  const locale = localeFrom(form);
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  // Always return the same response to avoid account enumeration.
  if (!isSupabaseConfigured || !z.email().safeParse(email).success) return { ok: true };
  const ip = clientIp(headers());
  if (!rateLimit(`reset-email:${email}`, 3, HOUR).ok || !rateLimit(`reset-ip:${ip}`, 10, HOUR).ok) return { ok: true };

  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: absoluteUrl(`/auth/callback?next=/${locale}/reset-password`),
  });
  await audit({ action: "password_reset_requested", metadata: { email_domain: email.split("@")[1] } });
  return { ok: true };
}

export async function updatePassword(_: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) return { error: "notConfigured" };
  const locale = localeFrom(form);
  const parsed = passwordSchema.safeParse(String(form.get("password") ?? ""));
  if (!parsed.success) return { error: "weak" };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "generic" };
  const { error } = await supabase.auth.updateUser({ password: parsed.data });
  if (error) return { error: "generic" };
  await audit({ action: "password_changed", userId: user.id, orgId: (user.app_metadata?.org_id as string) ?? null });
  redirect(`/${locale}/portal`);
}

/**
 * Invite-only registration (spec §5.2 flow 1). The invite link establishes a
 * session via /auth/callback; here the user sets their name and password.
 * Organisation membership was fixed by the admin who sent the invite.
 */
export async function completeRegistration(_: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) return { error: "notConfigured" };
  const locale = localeFrom(form);
  const fullName = String(form.get("fullName") ?? "").trim();
  if (fullName.length < 2 || fullName.length > 120) return { error: "invalid" };
  const parsed = passwordSchema.safeParse(String(form.get("password") ?? ""));
  if (!parsed.success) return { error: "weak" };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "invite" };

  const { error } = await supabase.auth.updateUser({ password: parsed.data, data: { full_name: fullName } });
  if (error) return { error: "generic" };
  await supabase.from("users").update({ full_name: fullName, language_pref: locale }).eq("id", user.id);
  await audit({ action: "registration_completed", userId: user.id, orgId: (user.app_metadata?.org_id as string) ?? null });
  redirect(`/${locale}/portal?welcome=1`);
}
