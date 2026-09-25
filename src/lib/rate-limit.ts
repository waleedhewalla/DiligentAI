import "server-only";

/**
 * Sliding-window rate limiter (in-memory, per server instance).
 *
 * This is the application-level layer. The authoritative limits for
 * credential endpoints are enforced upstream by Supabase Auth and Cloudflare
 * rate-limiting rules (see README → Security); this layer stops cheap abuse of
 * our own endpoints (demo form, Nexus generator) before they hit paid APIs.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    return { ok: false as const, retryAfter };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 10_000) {
    // Opportunistic cleanup to bound memory.
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true as const };
}

/** Check a limit without recording a hit (pair with `recordHit` to count failures only). */
export function isLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  buckets.set(key, hits);
  return hits.length >= limit;
}

export function recordHit(key: string) {
  const hits = buckets.get(key) ?? [];
  hits.push(Date.now());
  buckets.set(key, hits);
}

export function clientIp(headers: Headers) {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
