"use client";

import { Check, Circle } from "lucide-react";
import { passwordRules } from "@/lib/validation";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function PasswordChecklist({ value, dict }: { value: string; dict: Dictionary }) {
  const rules = Object.entries(passwordRules) as [keyof typeof passwordRules, (p: string) => boolean][];
  return (
    <ul className="grid grid-cols-2 gap-1.5 text-xs" aria-live="polite">
      {rules.map(([k, test]) => {
        const ok = test(value);
        return (
          <li key={k} className={cn("flex items-center gap-1.5", ok ? "text-brand-green" : "text-muted-foreground")}>
            {ok ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Circle className="h-3.5 w-3.5" aria-hidden />}
            {dict.auth.passwordRules[k]}
          </li>
        );
      })}
    </ul>
  );
}

export function allRulesPass(value: string) {
  return Object.values(passwordRules).every((r) => r(value));
}
