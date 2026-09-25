"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productKeys } from "@/lib/validation";
import { CalendlyEmbed } from "./calendly";
import { DemoForm } from "./demo-form";

/**
 * Calendly is the primary, zero-friction path (spec §3.6). The short form is
 * the fallback for visitors who prefer to be contacted, and the only path
 * when Calendly isn't configured.
 */
export function DemoBooking({
  locale,
  dict,
  calendlyUrl,
  calendlyCeoUrl,
}: {
  locale: Locale;
  dict: Dictionary;
  calendlyUrl: string;
  calendlyCeoUrl: string;
}) {
  const params = useSearchParams();
  const raw = params.get("product") ?? "all";
  const product = (productKeys as readonly string[]).includes(raw) ? raw : "all";
  const intent = params.get("intent") ?? undefined;
  // CEOs get the 15-minute slot (spec journey 2).
  const url = product === "ceo_os" && calendlyCeoUrl ? calendlyCeoUrl : calendlyUrl;

  return (
    <div className="grid gap-8">
      {url ? <CalendlyEmbed url={url} locale={locale} product={product} /> : null}
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-navy">{dict.demoForm.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{dict.demoForm.subtitle}</p>
        <div className="mt-6">
          <DemoForm locale={locale} dict={dict} defaultProduct={product} source={intent ? `demo:${intent}` : "demo"} />
        </div>
      </div>
    </div>
  );
}
