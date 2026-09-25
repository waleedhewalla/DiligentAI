"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { completeRegistration, requestPasswordReset, updatePassword, type ActionState } from "@/lib/auth-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./password-input";
import { PasswordChecklist, allRulesPass } from "./password-checklist";
import { SubmitButton } from "./submit-button";

function Err({ dict, code }: { dict: Dictionary; code?: string }) {
  if (!code) return null;
  const text =
    code === "weak"
      ? dict.auth.passwordRules.length
      : code === "invite"
        ? dict.auth.inviteRequired
        : code === "notConfigured"
          ? dict.auth.errors.notConfigured
          : dict.auth.errors.generic;
  return (
    <p role="alert" className="text-sm text-brand-red">
      {text}
    </p>
  );
}

export function ForgotPasswordForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action] = useFormState<ActionState, FormData>(requestPasswordReset, null);
  if (state?.ok) {
    return (
      <div className="grid gap-4">
        <p role="status" className="rounded-lg bg-brand-teal/10 p-4 text-sm">
          {dict.auth.linkSent}
        </p>
        <Link href={`/${locale}/login`} className="text-sm font-medium text-brand-teal-dark hover:underline">
          {dict.auth.backToLogin}
        </Link>
      </div>
    );
  }
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-2">
        <Label htmlFor="email">{dict.auth.email}</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required dir="ltr" />
      </div>
      <SubmitButton variant="navy" pendingLabel={dict.auth.signingIn}>
        {dict.auth.sendLink}
      </SubmitButton>
      <Link href={`/${locale}/login`} className="text-center text-sm font-medium text-brand-teal-dark hover:underline">
        {dict.auth.backToLogin}
      </Link>
    </form>
  );
}

export function NewPasswordForm({ locale, dict, mode }: { locale: Locale; dict: Dictionary; mode: "reset" | "register" }) {
  const [state, action] = useFormState<ActionState, FormData>(mode === "reset" ? updatePassword : completeRegistration, null);
  const [pw, setPw] = useState("");
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      {mode === "register" ? (
        <div className="grid gap-2">
          <Label htmlFor="fullName">{dict.auth.fullName}</Label>
          <Input id="fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={120} />
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="password">{dict.auth.password}</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          showLabel={dict.auth.show}
          hideLabel={dict.auth.hide}
        />
        <PasswordChecklist value={pw} dict={dict} />
      </div>
      <Err dict={dict} code={state?.error} />
      <SubmitButton variant="navy" pendingLabel={dict.auth.signingIn} disabled={!allRulesPass(pw)}>
        {mode === "reset" ? dict.auth.updatePassword : dict.auth.createAccount}
      </SubmitButton>
    </form>
  );
}
