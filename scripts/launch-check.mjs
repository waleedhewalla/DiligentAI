#!/usr/bin/env node
/**
 * Go-live readiness check (website assessment, Track 4).
 *
 *   npm run launch:check                 # uses the current environment
 *   vercel env pull .env.production.local && npm run launch:check
 *
 * Blockers exit with code 1; warnings list what is still a placeholder.
 * Reads process.env plus .env.production.local / .env.local when present.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const env = { ...loadEnv(".env.local"), ...loadEnv(".env.production.local"), ...process.env };
const blockers = [];
const warnings = [];
const ok = [];

function loadEnv(file) {
  const p = join(root, file);
  if (!existsSync(p)) return {};
  return Object.fromEntries(
    readFileSync(p, "utf8")
      .split("\n")
      .filter((l) => /^[A-Z0-9_]+=/.test(l))
      .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")]),
  );
}
const has = (k) => Boolean(env[k] && env[k].trim());
const need = (k, why) => (has(k) ? ok.push(k) : blockers.push(`${k} — ${why}`));
const want = (k, why) => (has(k) ? ok.push(k) : warnings.push(`${k} — ${why}`));

// ── Environment ──────────────────────────────────────────────────────────
const site = env.NEXT_PUBLIC_SITE_URL ?? "";
if (!/^https:\/\//.test(site) || /localhost|github\.io|vercel\.app/.test(site))
  blockers.push(`NEXT_PUBLIC_SITE_URL — must be the https custom domain (now "${site || "unset"}"); canonical URLs, sitemap and hreflang use it`);
else ok.push("NEXT_PUBLIC_SITE_URL");
if (env.NEXT_PUBLIC_PREVIEW === "1") blockers.push("NEXT_PUBLIC_PREVIEW=1 — this sets noindex on every page; remove it in production");

need("NEXT_PUBLIC_SUPABASE_URL", "auth, portal and lead storage");
need("NEXT_PUBLIC_SUPABASE_ANON_KEY", "auth and portal");
need("SUPABASE_SERVICE_ROLE_KEY", "demo requests and partner applications are stored server-side");
for (const p of ["IPE", "CEO_OS", "NEXUS"]) {
  need(`${p}_SECRET_KEY`, "signs portal launch tokens");
  want(`${p}_APP_URL`, "portal launch target");
}
want("ANTHROPIC_API_KEY", "live Nexus AI demo (falls back to curated samples without it)");
want("NEXT_PUBLIC_GA_MEASUREMENT_ID", "analytics, conversions and Web Vitals");
want("NEXT_PUBLIC_HOTJAR_ID", "heatmaps after consent");
want("DEMO_REQUEST_WEBHOOK_URL", "sends each lead to the CRM (HubSpot, Make, Zapier)");
want("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", "Google Search Console (or verify by DNS)");
want("NEXT_PUBLIC_BING_SITE_VERIFICATION", "Bing Webmaster Tools");
want("NEXT_PUBLIC_LINKEDIN_COMPANY_URL", "company page icon in the footer and Organization schema");
const booking = env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/waleed-hewalla-trzjna/15min (default)";
if (/15min/.test(booking)) warnings.push(`NEXT_PUBLIC_BOOKING_URL — ${booking} is a 15-minute event but the site offers a 30-minute review`);

// ── Content placeholders ─────────────────────────────────────────────────
const src = join(root, "src");
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) files.push(p);
  }
})(src);
const todos = files.flatMap((f) =>
  readFileSync(f, "utf8")
    .split("\n")
    .map((l, i) => ({ f: f.replace(root, ""), i: i + 1, l }))
    .filter((x) => x.l.includes("TODO(Waleed)")),
);
const offerings = readFileSync(join(src, "content/catalog/offerings.ts"), "utf8");
const unpriced = (offerings.match(/priceFromEGP:\s*null/g) ?? []).length;
const proof = readFileSync(join(src, "content/proof.ts"), "utf8");
const unapproved = (proof.match(/approved:\s*false/g) ?? []).length;
const nullMetrics = (proof.match(/value:\s*null/g) ?? []).length;
if (unpriced) warnings.push(`${unpriced} package(s) without an EGP price — /pricing says "quoted within 2 business days"`);
if (unapproved) warnings.push(`${unapproved} testimonial(s) not approved yet — hidden until approved`);
if (nullMetrics) warnings.push(`${nullMetrics} proof metric(s) still null (e.g. Star Trans on-time delivery) — hidden until filled`);
for (const d of ["public/downloads/star-trans-case-study.pdf", "public/downloads/ipe-technical-brief.pdf"])
  if (!existsSync(join(root, d))) warnings.push(`${d} missing — button falls back to print / request`);

// ── Report ───────────────────────────────────────────────────────────────
const line = (s) => console.log(s);
line(`\nDiligent AI — launch check\n`);
line(`✔ ${ok.length} settings present`);
if (warnings.length) {
  line(`\n⚠ ${warnings.length} warnings (site works; fill before or soon after launch):`);
  warnings.forEach((w) => line(`  - ${w}`));
}
line(`\nℹ ${todos.length} TODO(Waleed) markers in the code (placeholders to confirm):`);
todos.slice(0, 40).forEach((t) => line(`  - ${t.f}:${t.i}  ${t.l.trim().replace(/^\/\/\s*|^\/\*\*?\s*|\*\/$/g, "").slice(0, 110)}`));
if (blockers.length) {
  line(`\n✖ ${blockers.length} blockers — fix before switching DNS:`);
  blockers.forEach((b) => line(`  - ${b}`));
  process.exit(1);
}
line(`\n✔ No blockers. Ready to deploy.\n`);
