import { NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const DAY = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const ipLimit = rateLimit(`demo-ip:${ip}`, 10, 60 * 60 * 1000);
  if (!ipLimit.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    const workEmail = parsed.error.issues.some((i) => i.message === "work_email_required");
    return NextResponse.json({ error: workEmail ? "work_email_required" : "invalid_input" }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot filled → pretend success, store nothing.
  if (data.website) return NextResponse.json({ ok: true });

  // Spec §9.1: 3 requests per email per day.
  const emailLimit = rateLimit(`demo-email:${data.email}`, 3, DAY);
  if (!emailLimit.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  // MQL definition: verified work email (enforced above) from a target industry.
  const isMql = data.industry !== "other";

  const admin = createAdminClient();
  if (admin) {
    const since = new Date(Date.now() - DAY).toISOString();
    const { count } = await admin
      .from("demo_requests")
      .select("id", { count: "exact", head: true })
      .eq("email", data.email)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

    const { error } = await admin.from("demo_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      industry: data.industry,
      product: data.product,
      language: data.language,
      source: data.source ?? null,
      is_mql: isMql,
      ip_address: ip === "unknown" ? null : ip,
      user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    });
    if (error) {
      console.error("demo_requests insert failed", error.message);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }
  } else {
    console.warn("Supabase not configured — demo request not persisted", { company: data.company, product: data.product });
  }

  const webhook = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (webhook?.startsWith("https://")) {
    // Fire-and-forget notification (Slack/Teams/Make/Notion automation).
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New demo request: ${data.name} — ${data.company} (${data.industry}) · ${data.product} · ${data.language.toUpperCase()}`,
        ...data,
        website: undefined,
        is_mql: isMql,
      }),
      signal: AbortSignal.timeout(4000),
    }).catch((e) => console.error("demo webhook failed", e));
  }

  return NextResponse.json({ ok: true, mql: isMql });
}
