import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth";
import { audit } from "@/lib/audit";

/**
 * Landing point for Supabase email links (invite, recovery, verification) and
 * the PKCE code exchange after SSO.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const next = safeNext(url.searchParams.get("next"), "/ar/portal");
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const locale = next.startsWith("/en") ? "en" : "ar";
  const supabase = createClient();

  let ok = false;
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;
  }

  if (!ok) return NextResponse.redirect(new URL(`/${locale}/login?error=link`, url.origin));

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await audit({
      action: code ? "login_sso" : `email_link_${type}`,
      userId: user.id,
      orgId: (user.app_metadata?.org_id as string | undefined) ?? null,
    });
  }

  const dest = type === "invite" ? `/${locale}/register` : type === "recovery" ? `/${locale}/reset-password` : next;
  return NextResponse.redirect(new URL(dest, url.origin));
}
