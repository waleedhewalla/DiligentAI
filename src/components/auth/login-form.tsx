"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Fingerprint, KeyRound } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { signInWithPassword, signInWithSso, verifyTotp, type ActionState } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./password-input";
import { SubmitButton } from "./submit-button";

function errorText(dict: Dictionary, code?: string) {
  if (!code) return null;
  const e = dict.auth.errors;
  return (
    { invalid: e.invalid, rateLimited: e.rateLimited, ssoNotConfigured: e.ssoNotConfigured, notConfigured: e.notConfigured }[code] ??
    e.generic
  );
}

export function LoginForm({
  locale,
  dict,
  next,
  initialError,
  startWithMfa = false,
}: {
  locale: Locale;
  dict: Dictionary;
  next?: string;
  initialError?: string;
  startWithMfa?: boolean;
}) {
  const a = dict.auth;
  const router = useRouter();
  const [state, passwordAction] = useFormState<ActionState, FormData>(signInWithPassword, null);
  const [mfaState, mfaAction] = useFormState<ActionState, FormData>(verifyTotp, null);
  const [ssoState, ssoAction] = useFormState<ActionState, FormData>(signInWithSso, null);
  const [mode, setMode] = useState<"password" | "sso">("password");
  const [passkeyError, setPasskeyError] = useState<string | null>(null);
  const [passkeyBusy, setPasskeyBusy] = useState(false);

  const nextPath = next ?? `/${locale}/portal`;

  async function passkeySignIn() {
    setPasskeyError(null);
    setPasskeyBusy(true);
    try {
      const opt = await fetch("/api/v1/auth/passkey/login-options", { method: "POST" });
      if (!opt.ok) throw new Error("options");
      const { challengeId, options } = await opt.json();
      const credential = await startAuthentication({ optionsJSON: options });
      const res = await fetch("/api/v1/auth/passkey/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, credential }),
      });
      if (!res.ok) throw new Error("verify");
      router.replace(nextPath);
      router.refresh();
    } catch {
      setPasskeyError(a.errors.passkeyFailed);
    } finally {
      setPasskeyBusy(false);
    }
  }

  if (startWithMfa || state?.step === "mfa" || mfaState?.step === "mfa") {
    const err = errorText(dict, mfaState?.error);
    return (
      <form action={mfaAction} className="grid gap-5">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">{a.mfaTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{a.mfaSubtitle}</p>
        </div>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />
        <div className="grid gap-2">
          <Label htmlFor="code">{a.mfaCode}</Label>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            required
            autoFocus
            dir="ltr"
            className="text-center text-2xl tracking-[0.5em]"
          />
        </div>
        {err ? (
          <p role="alert" className="text-sm text-brand-red">
            {err}
          </p>
        ) : null}
        <SubmitButton variant="navy" pendingLabel={a.signingIn}>
          {a.verify}
        </SubmitButton>
      </form>
    );
  }

  const err = errorText(dict, mode === "sso" ? ssoState?.error : state?.error ?? initialError);

  return (
    <div className="grid gap-5">
      {mode === "password" ? (
        <form action={passwordAction} className="grid gap-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="next" value={nextPath} />
          <div className="grid gap-2">
            <Label htmlFor="email">{a.email}</Label>
            <Input id="email" name="email" type="email" autoComplete="username webauthn" required dir="ltr" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{a.password}</Label>
              <Link href={`/${locale}/forgot-password`} className="text-sm font-medium text-brand-teal-dark hover:underline">
                {a.forgot}
              </Link>
            </div>
            <PasswordInput id="password" name="password" autoComplete="current-password" required showLabel={a.show} hideLabel={a.hide} />
          </div>
          {err ? (
            <p role="alert" className="text-sm text-brand-red">
              {err}
            </p>
          ) : null}
          <SubmitButton variant="navy" pendingLabel={a.signingIn}>
            {a.signIn}
          </SubmitButton>
        </form>
      ) : (
        <form action={ssoAction} className="grid gap-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="next" value={nextPath} />
          <p className="text-sm text-muted-foreground">{a.ssoHint}</p>
          <div className="grid gap-2">
            <Label htmlFor="sso-email">{a.email}</Label>
            <Input id="sso-email" name="email" type="email" autoComplete="email" required dir="ltr" />
          </div>
          {err ? (
            <p role="alert" className="text-sm text-brand-red">
              {err}
            </p>
          ) : null}
          <SubmitButton variant="navy" pendingLabel={a.signingIn}>
            {a.sso}
          </SubmitButton>
        </form>
      )}

      <div className="flex items-center gap-3 text-xs uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {a.or}
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-3">
        <Button type="button" variant="outline" onClick={passkeySignIn} disabled={passkeyBusy}>
          <Fingerprint />
          {a.passkey}
        </Button>
        <Button type="button" variant="outline" onClick={() => setMode(mode === "password" ? "sso" : "password")}>
          <KeyRound />
          {mode === "password" ? a.sso : a.signIn}
        </Button>
        {passkeyError ? (
          <p role="alert" className="text-sm text-brand-red">
            {passkeyError}
          </p>
        ) : null}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {a.newHere}{" "}
        <Link href={`/${locale}/contact`} className="font-medium text-brand-teal-dark hover:underline">
          {a.contactUs}
        </Link>
      </p>
    </div>
  );
}
