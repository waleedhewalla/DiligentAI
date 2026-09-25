import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Passkey enrolment for the signed-in user (requires an active session). */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data, error } = await supabase.auth.passkey.startRegistration();
  if (error || !data) return NextResponse.json({ error: "unavailable" }, { status: 400 });
  return NextResponse.json({ challengeId: data.challenge_id, options: data.options }, { headers: { "Cache-Control": "no-store" } });
}
