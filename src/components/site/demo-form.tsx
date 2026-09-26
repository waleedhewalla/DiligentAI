"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { isWorkEmail } from "@/lib/validation";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Area-of-interest options are built on the server from the catalog (see
 * `demoAreaOptions`) and passed in, so the full catalog isn't shipped to the
 * browser and new offerings/capabilities appear here automatically.
 */
export type AreaOptionGroup = { label: string; options: { value: string; label: string }[] };

export function DemoForm({
  locale,
  dict,
  areaOptions = [],
  defaultInterest = "unsure",
  defaultArea = "",
  source,
}: {
  locale: Locale;
  dict: Dictionary;
  areaOptions?: AreaOptionGroup[];
  defaultInterest?: string;
  defaultArea?: string;
  source?: string;
}) {
  const f = dict.demoForm;
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    if (!isWorkEmail(payload.email ?? "")) {
      setEmailError(f.workEmailOnly);
      return;
    }
    setEmailError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/v1/demo/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, language: payload.language || locale, source, attribution: getAttribution() }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; mql?: boolean };
      if (!res.ok) {
        if (json.error === "work_email_required") setEmailError(f.workEmailOnly);
        setMessage(json.error === "rate_limited" ? dict.auth.errors.rateLimited : f.error);
        setStatus("error");
        return;
      }
      track("generate_lead", { form: "demo_request", interest: payload.interest, area: payload.area, industry: payload.industry });
      if (json.mql) track("mql", { interest: payload.interest, area: payload.area, industry: payload.industry });
      setStatus("success");
    } catch {
      setMessage(f.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center rounded-2xl border bg-brand-teal/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal-dark" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-brand-navy">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="df-name">{f.firstName} *</Label>
          <Input id="df-name" name="name" required autoComplete="given-name" maxLength={80} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="df-company">{f.company} *</Label>
          <Input id="df-company" name="company" required autoComplete="organization" maxLength={120} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="df-email">{f.email} *</Label>
        <Input
          id="df-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "df-email-error" : undefined}
          onBlur={(e) => setEmailError(e.target.value && !isWorkEmail(e.target.value) ? f.workEmailOnly : null)}
        />
        {emailError ? (
          <p id="df-email-error" className="text-sm text-brand-red">
            {emailError}
          </p>
        ) : null}
      </div>
      {/* Primary question: which service model (Consult / Build / Integrate). */}
      <div className="grid gap-2">
        <Label htmlFor="df-interest">{f.interest}</Label>
        <NativeSelect id="df-interest" name="interest" defaultValue={defaultInterest}>
          {Object.entries(f.interests).map(([v, label]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="df-area">{f.area}</Label>
          <NativeSelect id="df-area" name="area" defaultValue={defaultArea}>
            <option value="">{f.areaAny}</option>
            {areaOptions.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="df-industry">{f.industry}</Label>
          <NativeSelect id="df-industry" name="industry" defaultValue="manufacturing">
            {Object.entries(f.industries).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="df-language">{f.language}</Label>
          <NativeSelect id="df-language" name="language" defaultValue={locale}>
            {Object.entries(f.languages).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && message ? (
        <p role="alert" className="text-sm text-brand-red">
          {message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? f.submitting : f.submit}
      </Button>
      <p className="text-xs text-muted-foreground">{f.privacy}</p>
    </form>
  );
}
