# Diligent AI — Website & Customer Portal

Bilingual (Arabic-first / English) website and customer portal for **Diligent AI** — AI solutions and system integration for manufacturers in Egypt and the Gulf. The site is catalog-driven: **service models** (Consult · Build · Integrate), **AI products & solutions**, **system integration services** and **manufacturing capabilities** are all data, so new offerings need no page or component changes.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS + shadcn/ui · Supabase (Postgres, Auth, RLS) · Vercel + Cloudflare.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm run dev                  # http://localhost:3300 → redirects to /ar
```

The marketing site builds and runs with **no environment variables**. Auth, the portal, demo-request storage, analytics and live Nexus generation switch on as their variables are set.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build && npm start` | Production build / serve |
| `npm run lint` · `npm run typecheck` | ESLint · `tsc --noEmit` |
| `npm run format` | Prettier |

## Project layout

```
src/
  app/
    [locale]/                 ar | en — html lang/dir set here
      (marketing)/            Home, /solutions(/[slug]), /services, /capabilities(/[slug]), /case-studies, /demo, /contact, /about, /blog, legal
      (auth)/                 /login, /register (invite-only), /forgot-password, /reset-password
      portal/                 Dashboard, product launchers, /account (MFA, passkeys, users, audit), /support
      opengraph-image.tsx     Per-locale OG image
    api/v1/                   demo/request · nexus/generate · portal/launch/[product] · auth/passkey/*
    auth/                     callback (PKCE + email links) · signout
    sitemap.ts · robots.ts
  content/
    catalog/                  ★ service models, categories, offerings, capabilities (see "Catalog" below)
    home.ts, case-studies.ts, blog.ts, proof.ts, legal.ts   editorial copy, bilingual
  i18n/                       locale config + UI dictionaries
  lib/                        seo, schema.org, supabase clients, auth actions, scoped tokens, analytics, rate limit
  components/{ui,site,auth,portal,seo,analytics}
supabase/migrations/          schema + RLS + custom access token hook
supabase/seed.sql             example tenant (Star Trans)
```

### Catalog — adding products and services

Everything sold on the site lives in `src/content/catalog/`:

| File | What it holds | Where it shows up |
| --- | --- | --- |
| `service-models.ts` | **Consult · Build · Integrate** — tagline, deliverables, duration, engagement steps | Homepage "How we work", `/services`, mega menu, every offering/capability page, demo form |
| `categories.ts` | The three groupings: AI Products & Solutions · System Integration · Manufacturing Capabilities | Mega menu columns, homepage & `/solutions` sections, footer |
| `offerings.ts` | Products and services (pre-built tools, consulting, custom AI, ERP/legacy/data integration) | Cards, `/solutions/[slug]`, portal (if `launch` is set), sitemap, JSON-LD, demo form |
| `capabilities.ts` | Manufacturing use cases written problem-first (scheduling, demand, forecasting, quality, supply chain, maintenance, executive intelligence) | `/capabilities/[slug]`, homepage pain cards, cross-links |
| `index.ts` | The only import surface (`listOfferings`, `getCapability`, `offeringsForCapability`, …) + a build-time integrity check | — |

**To add an offering:** append one object to `offerings.ts`. Required fields build the card, menu entry and page hero; optional fields (`metrics`, `steps`, `roi`, `faqs`, `integrations`, `deployment`, `caseStudy`, `download`, `demo`) each add a page section only when present. Link it to use cases with `capabilities: ["quality-control", …]` — the capability pages link back automatically. A typo in a slug fails the build with a readable message.

**To add a use case:** append to `capabilities.ts`, then reference its slug from the relevant offerings.

**To move the catalog to a CMS/Supabase:** change the functions in `catalog/index.ts`; pages and components never import the data files directly.

Former product URLs (`/ipe`, `/ceo-os`, `/nexus`) 308-redirect to their catalog pages. The portal still launches IPE, CEO OS and Nexus AI through each offering's `launch` key.

### Editing content

Every word on the site lives in `src/content/*` and `src/i18n/dictionaries.ts`, typed as `{ en, ar }` so a missing translation is a compile error.

- **Proof numbers** — `src/content/proof.ts` is the single source of truth. A metric with `value: null` is hidden everywhere (the Star Trans OTD figure is waiting for the verified number). Testimonials render only when `approved: true`; **no quotes are published yet.**
- **Blog** — `src/content/blog.ts`. `getPosts()`/`getPost()` are the only access points; replace their bodies with a Sanity or Supabase query when the CMS goes live.
- **Downloads** — drop `public/downloads/star-trans-case-study.pdf` and `public/downloads/ipe-technical-brief.pdf` in place and the buttons switch from “print to PDF” / “request brief” to direct, tracked downloads automatically.
- **Founder photo** — add `public/images/waleed.jpg` and set `founderPhoto` in `src/lib/site.ts`.

## Internationalisation & RTL

- Routes are locale-prefixed (`/ar/...`, `/en/...`). `/` redirects using the `NEXT_LOCALE` cookie, then `Accept-Language`, defaulting to **Arabic**.
- `<html lang="ar-EG" dir="rtl">` / `<html lang="en" dir="ltr">`; layout uses Tailwind logical properties (`ms-`, `pe-`, `start-`, `border-s-`) so it mirrors without per-locale CSS. Directional icons carry `.btn-icon` and flip in RTL.
- Fonts: **Noto Sans Arabic** + **Inter** via `next/font` (self-hosted at build, `display: swap`).
- Latin runs inside Arabic text (product names, numbers) use `.ltr-run` for correct bidi.

## SEO

- Per-page `title`/`description`/keywords per locale, canonical URLs and **hreflang** (`ar-EG`, `en`, `x-default → ar`) in both `<head>` and `sitemap.xml`.
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`/`Product` + `FAQPage` (product pages), `Article` (case study), `BlogPosting`, `BreadcrumbList` (every inner page).
- Internal linking: product ↔ case study ↔ blog silos, related-posts blocks, footer site links.
- Marketing pages are statically prerendered (SSG); only auth/portal render per request.
- Search-console / Ahrefs / Semrush / Bing ownership meta tags come from `NEXT_PUBLIC_*_SITE_VERIFICATION`.

## Analytics & KPIs

GA4 loads with **Consent Mode v2** (analytics denied until the visitor accepts the banner — cookieless pings only); **Hotjar** loads only after consent. Events (`src/lib/analytics.ts`):

| KPI | Event |
| --- | --- |
| Demo requests | `generate_lead` (form, with `interest` = service model and `area` = catalog slug) · `demo_booked` (Calendly `event_scheduled`) |
| MQLs | `mql` — work email + target industry or a chosen service model (also stored as `demo_requests.is_mql`) |
| Case-study downloads | `case_study_download` · `tech_brief_download` |
| Funnel | `cta_click` (with `location`, `solution`, `interest`), `whatsapp_click`, `nexus_generate`, `language_switch` |

Any link can pre-fill the demo form: `/en/demo?interest=integrate&area=quality-control`.

Mark `generate_lead`, `demo_booked` and `case_study_download` as key events in GA4.

## Supabase setup

1. Create a project (EU / Frankfurt by default, per spec). Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. Apply the schema: `supabase db push` (or paste `supabase/migrations/*.sql` into the SQL editor).
3. **Authentication → Hooks → Custom Access Token** → `public.custom_access_token_hook`. This puts `org_id` / `role` into the JWT that every RLS policy reads, and refuses tokens for deactivated users.
4. **Authentication → Settings**
   - JWT expiry **3600 s**; refresh-token rotation on; reuse interval 10 s.
   - Sessions: inactivity timeout **4 h**, time-box **15 days**.
   - Password: minimum length **12**, require lower/upper/digit/symbol; enable **leaked-password protection**.
   - MFA: enable **TOTP**; enable **Passkeys (WebAuthn)** with RP ID = your domain.
   - Rate limits: sign-in/verify and email sends per spec (§5.4); enable **CAPTCHA (Cloudflare Turnstile)**.
   - Site URL `https://diligentai.com`; redirect allow-list `https://diligentai.com/auth/callback`.
5. **Email templates** — point links at the server callback so sessions stay in httpOnly cookies:
   - Invite: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=invite&next=/ar/register`
   - Reset password: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery`
   - Confirm signup: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email`
6. **Enterprise SSO (SAML 2.0)** — `supabase sso add --type saml --metadata-url <IdP metadata> --domains startrans.com`. Users click “Continue with SSO”, enter their work email and are routed to their IdP by domain. OIDC IdPs (Google Workspace, Entra ID) can be added as OAuth providers.
7. Onboard a tenant: invite the admin, then run `supabase/seed.sql` (edit the email).

## Security

| Control | Where |
| --- | --- |
| Tenant isolation | Postgres RLS on every table, forced; policies read `org_id` from the signed JWT (`supabase/migrations`) |
| Sessions | Supabase Auth with PKCE; access JWT 1 h, rotating refresh token; cookies **httpOnly + Secure + SameSite=Lax**. The browser never holds tokens — all auth calls run server-side |
| MFA | TOTP (required for admin roles — the portal nags until enrolled), enforced as AAL2 before portal access and product launch |
| Passkeys | WebAuthn via Supabase Auth passkeys (sign-in + enrolment in *Account*) |
| SSO | SAML 2.0 by email domain; OIDC via providers |
| Cross-product SSO | `POST /api/v1/portal/launch/[product]` checks entitlement under RLS, then mints an **HS256 JWT scoped to one product** (`aud`, `scope`, 1 h, `jti`), signed with that product’s own secret; token passed in the URL fragment. Each product app verifies with its key |
| Rate limiting | Login 5 failures / 15 min per IP and per account; reset 3 / h per email; demo form 3 / day per email; Nexus demo 5 / h per IP. In-memory per instance — **also** configure Supabase Auth limits and Cloudflare rate-limiting rules on `/api/*` and `/[locale]/login` |
| Headers | CSP, HSTS (1 y, preload), `X-Frame-Options: DENY`, `nosniff`, strict referrer, permissions policy (`next.config.mjs`) |
| Audit | `audit_log` (append-only from the server) for logins, failures, MFA, passkeys, product launches, tickets; 2-year retention function |
| Misc | Open-redirect-safe `next` handling, same-origin checks on state-changing routes, honeypot + work-email validation on lead forms, `server-only` guards on secrets |

**Password hashing:** Supabase Auth (GoTrue) hashes passwords with **bcrypt**; it can *verify* imported Argon2 hashes but does not create them. If Argon2id at rest is contractually required, that needs either Supabase support confirmation for your plan or an auth layer you operate yourself — flagged for decision, not silently assumed. With SSO and passkeys, most enterprise users never set a password at all.

## Deployment (Vercel + Cloudflare)

1. Import the repo in Vercel; framework preset **Next.js**; add env vars from `.env.example` (Production + Preview).
2. Domain on Cloudflare → CNAME to Vercel, proxy on; SSL **Full (strict)**, **Always Use HTTPS**, min TLS 1.2 (1.3 enabled), HSTS.
3. Cloudflare WAF managed rules + Bot Fight Mode; rate-limit rules for `/api/v1/*` and `/*/login`; Turnstile keys to Supabase CAPTCHA.
4. Product apps (IPE, CEO OS, Nexus) each receive their own `*_SECRET_KEY` and verify launch tokens with `aud = diligentai:<product>`.

## Launch checklist (from spec §10) — owner sign-off still required

- [ ] Real Star Trans metrics + written permission (`src/content/proof.ts`); OTD number filled in
- [ ] Approved quotes from Eng. Mohamed / Eng. Hamdy (`approved: true`)
- [ ] Founder photo; Arabic spelling of the founder's name (`src/lib/site.ts`)
- [ ] Case-study PDF and IPE technical brief in `public/downloads/`
- [ ] Privacy Policy & Terms reviewed by counsel (`src/content/legal.ts` is a draft)
- [ ] Calendly URLs, WhatsApp number, GA4 & Hotjar IDs, verification tokens
- [ ] Lighthouse ≥ 90 on production URL (mobile, both locales); Search Console verified; sitemap submitted
- [ ] RLS test: user from Org A cannot read Org B (two test tenants)

## GitHub Pages preview

A static, click-through copy of the marketing pages lives in `docs/` and is served at
**https://waleedhewalla.github.io/DiligentAI/** once Pages is enabled
(*Settings → Pages → Deploy from a branch → `claude/great-maxwell-0ue8bi` / `/docs`*).

Regenerate after content changes with `npm run preview:export`, then commit `docs/`.
The preview has no server: login/portal are omitted, the demo and contact forms can't submit,
the Nexus generator shows sample output, and every page is `noindex` so it never competes with the real domain in search.
