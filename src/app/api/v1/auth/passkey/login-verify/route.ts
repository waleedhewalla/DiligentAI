import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

export const dynamic = "force-dynamic";

/** Step 2: verify the assertion. On success Supabase issues the session (httpOnly cookies). */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await request.json().catch(() => null)) as { challengeId?: string; credential?: unknown } | null;
  if (!body?.challengeId || !body.credential) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const supabase = createClient();
  const { data, error } = await supabase.auth.passkey.verifyAuthentication({
    challengeId: body.challengeId,
    credential: body.credential as never,
  });
  if (error || !data?.user) return NextResponse.json({ error: "failed" }, { status: 401 });
  await audit({ action: "login_passkey", userId: data.user.id, orgId: (data.user.app_metadata?.org_id as string) ?? null });
  return NextResponse.json({ ok: true });
}
