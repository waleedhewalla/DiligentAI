import Link from "next/link";
import { ArrowRight, CalendarClock, Check, ExternalLink, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  arabicModels,
  commitment,
  complianceItems,
  getFundingRoute,
  hostingOptions,
  type Offering,
  type Package,
} from "@/content/catalog";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./sections";
import { TrackedLink } from "./tracked-link";

/**
 * Reusable, data-driven page blocks for the catalog. Each renders only from
 * config (catalog/*.ts) — edit the data, not these components.
 */

function formatEgp(n: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 0 }).format(n);
}

/** Price line for a package: a real number when set, otherwise the honest "quoted in EGP" line. */
export function PackagePrice({ pkg, locale, dict }: { pkg: Package; locale: Locale; dict: Dictionary }) {
  const s = dict.sections;
  if (pkg.priceFromEGP === null) return <p className="text-sm font-semibold text-brand-navy">{s.priceOnRequest}</p>;
  return (
    <p className="text-brand-navy">
      <span className="text-sm text-muted-foreground">{s.from} </span>
      <span className="text-2xl font-bold tabular-nums">{formatEgp(pkg.priceFromEGP, locale)}</span>
      <span className="text-sm font-semibold"> {s.egp}</span>
      <span className="text-sm text-muted-foreground"> / {pkg.unit[locale]}</span>
    </p>
  );
}

/** Gap 1 & 8 — fixed-price packages (from `offering.packages`). */
export function PackagesSection({ offering: o, locale, dict }: { offering: Offering; locale: Locale; dict: Dictionary }) {
  if (!o.packages?.length) return null;
  const s = dict.sections;
  return (
    <section className="section" id="packages">
      <div className="container">
        <SectionHeading title={s.packages} lead={s.packagesLead} />
        <div className={cn("mt-10 grid gap-6", o.packages.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
          {o.packages.map((p) => (
            <article
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 shadow-sm",
                p.recommended && "border-2 border-brand-orange shadow-md",
              )}
            >
              {p.recommended ? (
                <span className="absolute -top-3 start-6 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">{s.recommended}</span>
              ) : null}
              <h3 className="text-xl font-bold text-brand-navy">{p.name[locale]}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.scope[locale]}</p>
              <div className="mt-5">
                <PackagePrice pkg={p} locale={locale} dict={dict} />
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" aria-hidden />
                {s.duration}: {p.duration[locale]}
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.includes[locale].map((i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6" variant={p.recommended ? "primary" : "secondary"} size="sm">
                <TrackedLink
                  href={href(locale, "/demo") + `?interest=build&area=${o.slug}&intent=package-${p.id}`}
                  event={{ name: "package_select", params: { solution: o.slug, package: p.id } }}
                >
                  {s.choosePackage}
                  <ArrowRight className="btn-icon" />
                </TrackedLink>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Gap 2 — the Pilot-to-Production commitment (from commitment.ts). */
export function CommitmentBlock({ locale, dict, tone = "light" }: { locale: Locale; dict: Dictionary; tone?: "light" | "subtle" }) {
  const s = dict.sections;
  const fee =
    commitment.feeAtRiskPercent !== null ? `${commitment.feeAtRiskPercent}% ${s.feeAtRisk}` : s.feeAtRiskGeneric;
  return (
    <section className={cn("section", tone === "subtle" && "bg-surface-subtle")} id="commitment">
      <div className="container">
        <div className="rounded-3xl border-2 border-brand-teal/40 bg-background p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-teal-dark">
                <ShieldCheck className="h-5 w-5" aria-hidden />
                {fee}
              </p>
              <h2 className="h-section mt-3 text-brand-navy">{commitment.title[locale]}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{commitment.lead[locale]}</p>
            </div>
            <Button asChild variant="teal">
              <Link href={href(locale, "/solutions/pilot-to-production")}>
                {dict.common.learnMore}
                <ArrowRight className="btn-icon" />
              </Link>
            </Button>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitment.steps.map((st, i) => (
              <li key={st.title.en} className="rounded-2xl bg-surface-subtle p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal-dark text-sm font-bold text-white">{i + 1}</span>
                <p className="mt-3 font-bold text-brand-navy">{st.title[locale]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{st.body[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StatusChip({ status, dict }: { status: "available" | "on-request"; dict: Dictionary }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
        status === "available" ? "bg-brand-green/10 text-brand-green" : "bg-muted text-muted-foreground",
      )}
    >
      {status === "available" ? dict.sections.available : dict.sections.onRequest}
    </span>
  );
}

/** Gap 5 (and PDPL in gap 3) — model and hosting choice (from models.ts). */
export function ModelChoiceBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.sections;
  return (
    <section className="section bg-surface-subtle" id="models">
      <div className="container">
        <SectionHeading title={s.modelsTitle} lead={s.modelsLead} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6">
            <h3 className="font-bold text-brand-navy">{s.arabicModels}</h3>
            <ul className="mt-4 divide-y">
              {arabicModels.map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold" dir="ltr">
                      {m.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {m.origin[locale]} · {m.note[locale]}
                    </p>
                  </div>
                  <StatusChip status={m.status} dict={dict} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-background p-6">
            <h3 className="font-bold text-brand-navy">{s.hosting}</h3>
            <ul className="mt-4 divide-y">
              {hostingOptions.map((h) => (
                <li key={h.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold">{h.name[locale]}</p>
                    <p className="text-sm text-muted-foreground">{h.note[locale]}</p>
                  </div>
                  <StatusChip status={h.status} dict={dict} />
                </li>
              ))}
            </ul>
            <Link href={href(locale, "/trust")} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark hover:underline">
              {dict.nav.trust} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Gap 6 — funding programmes (from funding.ts, referenced by `offering.fundingRoutes`). */
export function FundingBlock({ ids, locale, dict }: { ids: string[]; locale: Locale; dict: Dictionary }) {
  const routes = ids.map(getFundingRoute).filter((r): r is NonNullable<typeof r> => Boolean(r));
  if (!routes.length) return null;
  const s = dict.sections;
  return (
    <section className="section" id="funding">
      <div className="container">
        <SectionHeading title={s.fundingTitle} lead={s.fundingLead} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {routes.map((r) => (
            <div key={r.id} className="flex flex-col rounded-2xl border bg-card p-6">
              <h3 className="font-bold text-brand-navy">{r.name[locale]}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.body[locale]}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark hover:underline">
                {s.officialSite} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Gap 3 — live regulatory deadlines band (from compliance.ts). */
export function ComplianceBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.sections;
  return (
    <section className="section bg-brand-navy text-white" id="compliance">
      <div className="container">
        <p className="text-sm font-semibold text-brand-teal">{s.complianceEyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">{s.complianceTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {complianceItems.map((c) => (
            <Link key={c.id} href={href(locale, c.href)} className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10">
              <span className="w-fit rounded-full bg-brand-orange/20 px-3 py-1 text-xs font-bold text-brand-orange">{c.when[locale]}</span>
              <h3 className="mt-4 text-lg font-bold">{c.title[locale]}</h3>
              <p className="mt-2 flex-1 text-sm text-white/75">{c.body[locale]}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal group-hover:underline">
                {dict.common.learnMore} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Cross-cutting — category comparison vs. global planning suites (no named competitors). */
export function ComparisonSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.sections;
  // CONFIGURABLE: ranges for global suites come from public third-party sources (see research report).
  const rows: { key: keyof typeof s.comparisonRow; them: { en: string; ar: string }; us: { en: string; ar: string } }[] = [
    { key: "time", them: { en: "3–24 months", ar: "3–24 شهراً" }, us: { en: "4–8 weeks", ar: "4–8 أسابيع" } },
    { key: "price", them: { en: "Six figures, USD per year", ar: "مئات الآلاف من الدولارات سنوياً" }, us: { en: "Fixed-price packages in EGP", ar: "باقات بسعر ثابت بالجنيه" } },
    { key: "arabic", them: { en: "Translated UI at best", ar: "واجهة مترجمة في أحسن الأحوال" }, us: { en: "Arabic-first screens, reports and AI", ar: "شاشات وتقارير وذكاء بالعربية أولاً" } },
    { key: "team", them: { en: "Remote vendor + integrator", ar: "مورد عن بُعد + شريك تنفيذ" }, us: { en: "One accountable Cairo team", ar: "فريق واحد مسؤول في القاهرة" } },
    { key: "erp", them: { en: "Often replaces planning modules", ar: "غالباً يستبدل وحدات التخطيط" }, us: { en: "Works inside SAP, Oracle, Dynamics, Odoo", ar: "يعمل داخل SAP وOracle وDynamics وOdoo" } },
  ];
  return (
    <section className="section bg-surface-subtle" id="comparison">
      <div className="container">
        <SectionHeading title={s.comparisonTitle} lead={s.comparisonLead} />
        <div className="mx-auto mt-10 max-w-4xl overflow-x-auto rounded-2xl border bg-background">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-brand-navy text-white">
              <tr>
                <th scope="col" className="p-4 text-start font-semibold">
                  <span className="sr-only">—</span>
                </th>
                <th scope="col" className="p-4 text-start font-semibold">
                  {s.them}
                </th>
                <th scope="col" className="p-4 text-start font-semibold">
                  {s.us}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-t">
                  <th scope="row" className="p-4 text-start font-semibold text-brand-navy">
                    {s.comparisonRow[r.key]}
                  </th>
                  <td className="p-4 text-muted-foreground">{r.them[locale]}</td>
                  <td className="p-4 font-medium">
                    <span className="inline-flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                      {r.us[locale]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
