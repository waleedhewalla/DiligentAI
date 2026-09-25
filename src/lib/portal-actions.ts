"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";
import { getPortalContext } from "@/lib/auth";

export type PortalActionState = { ok?: boolean; error?: string; qr?: string; factorId?: string; secret?: string } | null;

export async function updateLanguage(_: PortalActionState, form: FormData): Promise<PortalActionState> {
  const lang = form.get("language") === "en" ? "en" : "ar";
  const ctx = await getPortalContext();
  if (!ctx) return { error: "unauthorized" };
  const { error } = await createClient().from("users").update({ language_pref: lang }).eq("id", ctx.user.id);
  if (error) return { error: "generic" };
  revalidatePath("/[locale]/portal", "layout");
  return { ok: true };
}

/** Step 1 of TOTP enrolment: returns the QR code to scan. */
export async function startTotpEnrollment(): Promise<PortalActionState> {
  const ctx = await getPortalContext();
  if (!ctx) return { error: "unauthorized" };
  const supabase = createClient();
  // Remove abandoned, unverified factors so enrolment can be retried.
  const { data: factors } = await supabase.auth.mfa.listFactors();
  for (const f of factors?.all ?? []) {
    if (f.factor_type === "totp" && f.status !== "verified") await supabase.auth.mfa.unenroll({ factorId: f.id });
  }
  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Authenticator" });
  if (error || !data) return { error: "generic" };
  return { qr: data.totp.qr_code, secret: data.totp.secret, factorId: data.id };
}

export async function confirmTotpEnrollment(_: PortalActionState, form: FormData): Promise<PortalActionState> {
  const ctx = await getPortalContext();
  if (!ctx) return { error: "unauthorized" };
  const factorId = String(form.get("factorId") ?? "");
  const code = String(form.get("code") ?? "").replace(/\s/g, "");
  if (!factorId || !/^\d{6}$/.test(code)) return { error: "invalid", factorId };
  const { error } = await createClient().auth.mfa.challengeAndVerify({ factorId, code });
  if (error) return { error: "invalid", factorId };
  await audit({ action: "mfa_enrolled", userId: ctx.user.id, orgId: ctx.org?.id });
  revalidatePath("/[locale]/portal", "layout");
  return { ok: true };
}

const ticketSchema = z.object({
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
  product: z.enum(["ipe", "ceo_os", "nexus", "general"]),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

export async function submitTicket(_: PortalActionState, form: FormData): Promise<PortalActionState> {
  const ctx = await getPortalContext();
  if (!ctx?.org) return { error: "unauthorized" };
  const parsed = ticketSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return { error: "invalid" };
  const { product, ...rest } = parsed.data;
  const { error } = await createClient()
    .from("support_tickets")
    .insert({ ...rest, product: product === "general" ? null : product, org_id: ctx.org.id, user_id: ctx.user.id });
  if (error) return { error: "generic" };
  await audit({ action: "support_ticket_created", userId: ctx.user.id, orgId: ctx.org.id, resource: product });
  return { ok: true };
}
