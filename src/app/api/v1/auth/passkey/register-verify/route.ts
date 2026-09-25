import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { challengeId?: string; credential?: unknown } | null;
  if (!body?.challengeId || !body.credential) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const { data, error } = await supabase.auth.passkey.verifyRegistration({
    challengeId: body.challengeId,
    credential: body.credential as never,
  });
  if (error || !data) return NextResponse.json({ error: "failed" }, { status: 400 });
  await audit({ action: "passkey_added", userId: user.id, orgId: (user.app_metadata?.org_id as string) ?? null, resource: data.id });
  return NextResponse.json({ ok: true, id: data.id });
}
