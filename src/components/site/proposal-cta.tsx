import { ArrowRight, Check, FileSignature } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "./tracked-link";

/** Booking page pre-filled with the area and flagged as a proposal request. */
export function proposalHref(locale: Locale, area?: string) {
  const q = new URLSearchParams({ intent: "proposal" });
  if (area) q.set("area", area);
  return `${href(locale, "/demo")}?${q}`;
}

/**
 * "We'll prepare a custom proposal" – shown on every solution that is scoped
 * per client (not on the proven products). Variants:
 * - `banner`: full section block for detail pages
 * - `link`: compact text link for cards and lists (sits above card overlays)
 * - `hero`: light text link under hero buttons on navy
 */
export function ProposalCta({
  locale,
  dict,
  area,
  location,
  variant = "banner",
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  area?: string;
  location: string;
  variant?: "banner" | "link" | "hero";
  className?: string;
}) {
  const p = dict.proposal;
  const url = proposalHref(locale, area);
  const event = { name: "cta_click" as const, params: { cta: "custom_proposal", location, solution: area } };

  if (variant === "link" || variant === "hero") {
    return (
      <TrackedLink
        href={url}
        event={event}
        className={cn(
          "relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline",
          variant === "hero" ? "text-white/85 hover:text-white" : "text-brand-orange-dark",
          className,
        )}
      >
        <FileSignature className="h-4 w-4 shrink-0" aria-hidden />
        {variant === "hero" ? p.hero : p.short}
        <ArrowRight className="btn-icon h-3.5 w-3.5" aria-hidden />
      </TrackedLink>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/[0.06] via-background to-brand-teal/[0.06] p-6 md:p-8", className)}>
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-10">
        <div className="flex gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange-dark sm:flex">
            <FileSignature className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className="mt-1 text-2xl font-bold text-brand-navy">{p.title}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{p.body}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Check className="h-4 w-4 text-brand-teal-dark" aria-hidden />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button asChild size="lg" className="w-full md:w-auto">
          <TrackedLink href={url} event={event}>
            {p.cta}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
      </div>
    </div>
  );
}
