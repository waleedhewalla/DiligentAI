"use client";

import { useSearchParams } from "next/navigation";
import { FileSignature } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { interests } from "@/lib/validation";
import { CalendlyEmbed } from "./calendly";
import { CalEmbed } from "./cal-embed";
import { DemoForm, type AreaOptionGroup } from "./demo-form";

/**
 * Calendly is the primary, zero-friction path (spec §3.6); the short form is
 * the fallback. Links pre-fill the form with `?interest=<service model>` and
 * `?area=<offering or capability slug>` from anywhere in the catalog.
 */
export function DemoBooking({
  locale,
  dict,
  calendlyUrl,
  calendlyCeoUrl,
  bookingUrl = "",
  areaOptions,
}: {
  locale: Locale;
  dict: Dictionary;
  calendlyUrl: string;
  calendlyCeoUrl: string;
  /** Public Cal.com event link; takes precedence over Calendly when set. */
  bookingUrl?: string;
  areaOptions: AreaOptionGroup[];
}) {
  const params = useSearchParams();
  const rawInterest = params.get("interest") ?? "unsure";
  const interest = (interests as readonly string[]).includes(rawInterest) ? rawInterest : "unsure";
  const rawArea = params.get("area") ?? "";
  const known = areaOptions.some((g) => g.options.some((o) => o.value === rawArea));
  const area = known ? rawArea : "";
  // Executives asking about decision intelligence get the short 15-minute slot (spec journey 2).
  const url = area === "executive-intelligence" || area === "executive-decision-intelligence" ? calendlyCeoUrl || calendlyUrl : calendlyUrl;

  // Proposal requests (from "Request a custom proposal" links) lead with the form.
  const proposal = params.get("intent") === "proposal";

  return (
    <div className="grid gap-8">
      {proposal ? (
        <p className="order-first flex gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orange/[0.06] p-4 text-sm text-foreground">
          <FileSignature className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark" aria-hidden />
          {dict.proposal.formNote}
        </p>
      ) : null}
      {bookingUrl ? (
        <CalEmbed url={bookingUrl} locale={locale} interest={interest} area={area} title={dict.nav.bookDemo} />
      ) : url ? (
        <CalendlyEmbed url={url} locale={locale} interest={interest} area={area} />
      ) : null}
      <div className={`rounded-2xl border bg-card p-6 md:p-8 ${proposal ? "order-first" : ""}`}>
        <h2 className="text-xl font-bold text-brand-navy">{proposal ? dict.proposal.title : dict.demoForm.title}</h2>
        {proposal ? null : <p className="mt-1 text-sm text-muted-foreground">{dict.demoForm.subtitle}</p>}
        <div className="mt-6">
          <DemoForm
            locale={locale}
            dict={dict}
            areaOptions={areaOptions}
            defaultInterest={interest}
            defaultArea={area}
            source={params.get("intent") ? `demo:${params.get("intent")}` : "demo"}
          />
        </div>
      </div>
    </div>
  );
}
