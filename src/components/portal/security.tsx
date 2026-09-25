"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Fingerprint, ShieldCheck } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  confirmTotpEnrollment,
  startTotpEnrollment,
  updateLanguage,
  type PortalActionState,
} from "@/lib/portal-actions";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";

export function LanguageForm({ dict, current }: { dict: Dictionary; current: "ar" | "en" }) {
  const [state, action] = useFormState<PortalActionState, FormData>(updateLanguage, null);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="grid gap-2">
        <Label htmlFor="language">{dict.portal.account.language}</Label>
        <NativeSelect id="language" name="language" defaultValue={current} className="w-48">
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </NativeSelect>
      </div>
      <SubmitButton variant="portal" size="sm" className="h-12" pendingLabel="…">
        {dict.portal.account.save}
      </SubmitButton>
      {state?.ok ? <p className="text-sm text-brand-green">{dict.portal.account.saved}</p> : null}
    </form>
  );
}

export function TotpSetup({ dict, enabled }: { dict: Dictionary; enabled: boolean }) {
  const a = dict.portal.account;
  const [enrollment, setEnrollment] = useState<PortalActionState>(null);
  const [state, action] = useFormState<PortalActionState, FormData>(confirmTotpEnrollment, null);

  if (enabled || state?.ok) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-brand-green">
        <ShieldCheck className="h-5 w-5" aria-hidden /> {a.mfa}: {a.mfaEnabled}
      </p>
    );
  }
  if (!enrollment?.qr) {
    return (
      <div className="grid gap-2">
        <p className="text-sm text-muted-foreground">
          {a.mfa}: {a.mfaDisabled} · {a.mfaRequired}
        </p>
        <Button variant="portal" size="sm" className="w-fit" onClick={async () => setEnrollment(await startTotpEnrollment())}>
          <ShieldCheck />
          {a.enableMfa}
        </Button>
        {enrollment?.error ? <p className="text-sm text-brand-red">{dict.auth.errors.generic}</p> : null}
      </div>
    );
  }
  return (
    <form action={action} className="grid gap-4">
      <p className="text-sm">{a.scanQr}</p>
      {/* Supabase returns the QR as an SVG data URI generated server-side. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={enrollment.qr} alt="TOTP QR code" width={180} height={180} className="rounded-lg border bg-white p-2" />
      <code className="w-fit rounded bg-muted px-2 py-1 text-xs" dir="ltr">
        {enrollment.secret}
      </code>
      <input type="hidden" name="factorId" value={enrollment.factorId} />
      <div className="grid max-w-xs gap-2">
        <Label htmlFor="totp-code">{dict.auth.mfaCode}</Label>
        <Input id="totp-code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required dir="ltr" />
      </div>
      {state?.error ? <p className="text-sm text-brand-red">{dict.auth.errors.invalid}</p> : null}
      <SubmitButton variant="portal" size="sm" className="w-fit" pendingLabel="…">
        {dict.auth.verify}
      </SubmitButton>
    </form>
  );
}

export function PasskeySetup({ dict }: { dict: Dictionary }) {
  const a = dict.portal.account;
  const [status, setStatus] = useState<"idle" | "busy" | "ok" | "error">("idle");
  async function add() {
    setStatus("busy");
    try {
      const opt = await fetch("/api/v1/auth/passkey/register-options", { method: "POST" });
      if (!opt.ok) throw new Error();
      const { challengeId, options } = await opt.json();
      const credential = await startRegistration({ optionsJSON: options });
      const res = await fetch("/api/v1/auth/passkey/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, credential }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="grid gap-2">
      <p className="text-sm text-muted-foreground">{a.passkeysHint}</p>
      <Button variant="outline" size="sm" className="w-fit" onClick={add} disabled={status === "busy"}>
        <Fingerprint />
        {a.addPasskey}
      </Button>
      {status === "ok" ? <p className="text-sm text-brand-green">{a.passkeyAdded}</p> : null}
      {status === "error" ? <p className="text-sm text-brand-red">{dict.auth.errors.generic}</p> : null}
    </div>
  );
}
