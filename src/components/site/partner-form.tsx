"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { isWorkEmail } from "@/lib/validation";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Partner application form. Track options come from catalog/partners.ts via props. */
export function PartnerForm({
  locale,
  dict,
  tracks,
}: {
  locale: Locale;
  dict: Dictionary;
  tracks: { value: string; label: string }[];
}) {
  const f = dict.sections.partnerForm;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [emailError, setEmailError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!isWorkEmail(payload.email ?? "")) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/v1/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, language: locale }),
      });
      if (!res.ok) throw new Error();
      track("partner_apply", { track: payload.track, country: payload.country });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div role="status" className="flex flex-col items-center rounded-2xl border bg-brand-teal/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal-dark" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-brand-navy">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="pf-company">{f.company} *</Label>
          <Input id="pf-company" name="company" required minLength={2} maxLength={120} autoComplete="organization" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pf-name">{f.name} *</Label>
          <Input id="pf-name" name="name" required minLength={2} maxLength={80} autoComplete="name" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pf-email">{f.email} *</Label>
        <Input id="pf-email" name="email" type="email" required dir="ltr" autoComplete="email" aria-invalid={emailError} />
        {emailError ? <p className="text-sm text-brand-red">{dict.demoForm.workEmailOnly}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="pf-track">{f.track}</Label>
          <NativeSelect id="pf-track" name="track" defaultValue={tracks[0]?.value}>
            {tracks.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pf-country">{f.country}</Label>
          <NativeSelect id="pf-country" name="country" defaultValue="eg">
            <option value="eg">{locale === "ar" ? "مصر" : "Egypt"}</option>
            <option value="sa">{locale === "ar" ? "السعودية" : "Saudi Arabia"}</option>
            <option value="ae">{locale === "ar" ? "الإمارات" : "UAE"}</option>
            <option value="other">{locale === "ar" ? "أخرى" : "Other"}</option>
          </NativeSelect>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pf-message">{f.message}</Label>
        <Textarea id="pf-message" name="message" maxLength={2000} rows={4} />
      </div>
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" ? (
        <p role="alert" className="text-sm text-brand-red">
          {f.error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "sending"}>
        {f.submit}
      </Button>
    </form>
  );
}
