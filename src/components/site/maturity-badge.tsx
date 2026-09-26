import type { Maturity } from "@/content/catalog";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

// Contrast-checked (≥4.5:1) pairs for light and navy backgrounds.
const tone: Record<Maturity, { light: string; dark: string; dot: string }> = {
  live: { light: "bg-brand-green/10 text-brand-green", dark: "bg-white/15 text-white", dot: "bg-[#4ade80]" },
  pilot: { light: "bg-brand-amber/15 text-brand-amber-dark", dark: "bg-white/15 text-white", dot: "bg-brand-amber" },
  assessment: { light: "bg-brand-purple/10 text-brand-purple", dark: "bg-white/15 text-white", dot: "bg-[#a5a0ff]" },
  service: { light: "bg-muted text-foreground/80", dark: "bg-white/15 text-white", dot: "bg-white/70" },
};

/** Live / Pilot / Assessment / Service — shown on every offering so buyers know what exists today. */
export function MaturityBadge({ maturity, dict, dark = false, className }: { maturity: Maturity; dict: Dictionary; dark?: boolean; className?: string }) {
  const t = tone[maturity];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold", dark ? t.dark : t.light, className)}
      title={dict.common.maturity[maturity].body}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dark ? t.dot : "bg-current")} aria-hidden />
      {dict.common.maturity[maturity].label}
    </span>
  );
}

/** Legend explaining the badges (solutions hub, pricing). */
export function MaturityLegend({ dict, className }: { dict: Dictionary; className?: string }) {
  const keys: Maturity[] = ["live", "pilot", "assessment", "service"];
  return (
    <div className={cn("rounded-2xl border bg-surface-subtle p-5", className)}>
      <p className="text-sm font-bold text-brand-navy">{dict.common.maturity.title}</p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {keys.map((k) => (
          <div key={k} className="text-sm">
            <dt>
              <MaturityBadge maturity={k} dict={dict} />
            </dt>
            <dd className="mt-1 text-muted-foreground">{dict.common.maturity[k].body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
