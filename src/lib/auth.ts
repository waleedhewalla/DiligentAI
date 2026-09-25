import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ProductKey } from "@/content/catalog";

export type Role = "super_admin" | "admin" | "power_user" | "user" | "viewer" | "trial";

export type PortalContext = {
  user: { id: string; email: string };
  profile: { full_name: string | null; role: Role; language_pref: "ar" | "en"; last_login: string | null } | null;
  org: { id: string; name: string; slug: string; plan: string } | null;
  access: { product: ProductKey; access_level: string; expires_at: string | null }[];
  aal: { current: string | null; next: string | null };
  hasTotp: boolean;
};

/** Everything the portal needs about the signed-in user, fetched under RLS. */
export const getPortalContext = cache(async (): Promise<PortalContext | null> => {
  if (!isSupabaseConfigured) return null;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [profileRes, accessRes, aalRes, factorsRes] = await Promise.all([
    supabase.from("users").select("full_name, role, language_pref, last_login, org_id").eq("id", user.id).maybeSingle(),
    supabase.from("product_access").select("product, access_level, expires_at").eq("user_id", user.id),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    supabase.auth.mfa.listFactors(),
  ]);

  const profile = profileRes.data;
  let org: PortalContext["org"] = null;
  if (profile?.org_id) {
    const { data } = await supabase.from("organizations").select("id, name, slug, plan").eq("id", profile.org_id).maybeSingle();
    org = data;
  }

  const now = Date.now();
  const access = (accessRes.data ?? []).filter((a) => !a.expires_at || new Date(a.expires_at).getTime() > now);

  return {
    user: { id: user.id, email: user.email ?? "" },
    profile: profile
      ? { full_name: profile.full_name, role: profile.role as Role, language_pref: profile.language_pref, last_login: profile.last_login }
      : null,
    org,
    access: access as PortalContext["access"],
    aal: { current: aalRes.data?.currentLevel ?? null, next: aalRes.data?.nextLevel ?? null },
    hasTotp: (factorsRes.data?.totp ?? []).some((f) => f.status === "verified"),
  };
});

export function isAdmin(role: Role | undefined) {
  return role === "admin" || role === "super_admin";
}

/** Only allow same-origin relative redirects (prevents open redirects). */
export function safeNext(next: string | null | undefined, fallback: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
