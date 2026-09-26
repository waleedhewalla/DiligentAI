"use client";

import { useSearchParams } from "next/navigation";
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

  return (
    <div className="grid gap-8">
      {bookingUrl ? (
        <CalEmbed url={bookingUrl} locale={locale} interest={interest} area={area} title={dict.nav.bookDemo} />
      ) : url ? (
        <CalendlyEmbed url={url} locale={locale} interest={interest} area={area} />
      ) : null}
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-navy">{dict.demoForm.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{dict.demoForm.subtitle}</p>
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
