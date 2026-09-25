import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** Step 1 of passkey sign-in: fetch a WebAuthn challenge from Supabase Auth. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!rateLimit(`passkey:${clientIp(request.headers)}`, 10, 15 * 60 * 1000).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const { data, error } = await createClient().auth.passkey.startAuthentication();
  if (error || !data) return NextResponse.json({ error: "unavailable" }, { status: 400 });
  return NextResponse.json({ challengeId: data.challenge_id, options: data.options }, { headers: { "Cache-Control": "no-store" } });
}
