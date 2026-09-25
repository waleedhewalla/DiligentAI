import "server-only";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp } from "@/lib/rate-limit";

/** Append an event to audit_log (service role; clients cannot write it). Never throws. */
export async function audit(entry: {
  action: string;
  userId?: string | null;
  orgId?: string | null;
  resource?: string;
  metadata?: Record<string, unknown>;
}) {
  const admin = createAdminClient();
  if (!admin) return;
  let ip: string | null = null;
  try {
    const v = clientIp(headers());
    ip = v === "unknown" ? null : v;
  } catch {
    /* outside a request scope */
  }
  const { error } = await admin.from("audit_log").insert({
    action: entry.action,
    user_id: entry.userId ?? null,
    org_id: entry.orgId ?? null,
    resource: entry.resource ?? null,
    metadata: entry.metadata ?? {},
    ip_address: ip,
  });
  if (error) console.error("audit insert failed", error.message);
}
