import { NextResponse } from "next/server";
import { partnerApplicationSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Partner applications (gap 4 & 7). Same safeguards as demo requests. */
export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!rateLimit(`partner-ip:${ip}`, 5, 60 * 60 * 1000).ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = partnerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const workEmail = parsed.error.issues.some((i) => i.message === "work_email_required");
    return NextResponse.json({ error: workEmail ? "work_email_required" : "invalid_input" }, { status: 400 });
  }
  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const admin = createAdminClient();
  if (admin) {
    const { error } = await admin.from("partner_applications").insert({
      company: data.company,
      name: data.name,
      email: data.email,
      track: data.track,
      country: data.country,
      message: data.message ?? null,
      language: data.language,
      ip_address: ip === "unknown" ? null : ip,
    });
    if (error) {
      console.error("partner_applications insert failed", error.message);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }
  } else {
    console.warn("Supabase not configured — partner application not persisted", { company: data.company, track: data.track });
  }

  const webhook = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (webhook?.startsWith("https://")) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `New partner application: ${data.company} (${data.track}, ${data.country}) — ${data.name}`, ...data, website: undefined }),
      signal: AbortSignal.timeout(4000),
    }).catch((e) => console.error("partner webhook failed", e));
  }
  return NextResponse.json({ ok: true });
}
