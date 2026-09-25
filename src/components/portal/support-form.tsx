"use client";

import { useFormState } from "react-dom";
import type { Dictionary } from "@/i18n/dictionaries";
import { submitTicket, type PortalActionState } from "@/lib/portal-actions";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";


export function SupportForm({
  dict,
  defaultProduct,
  products,
}: {
  dict: Dictionary;
  defaultProduct?: string;
  /** Supportable products (launchable catalog offerings), built on the server. */
  products: { value: string; label: string }[];
}) {
  const s = dict.portal.support;
  const [state, action] = useFormState<PortalActionState, FormData>(submitTicket, null);
  if (state?.ok) {
    return (
      <p role="status" className="rounded-lg bg-brand-green/10 p-4 text-sm text-brand-green">
        {s.sent}
      </p>
    );
  }
  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="product">{s.product}</Label>
          <NativeSelect id="product" name="product" defaultValue={defaultProduct ?? "general"}>
            <option value="general">—</option>
            {products.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priority">{s.priority}</Label>
          <NativeSelect id="priority" name="priority" defaultValue="normal">
            {Object.entries(s.priorities).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">{s.subject}</Label>
        <Input id="subject" name="subject" required minLength={3} maxLength={200} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{s.message}</Label>
        <Textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} />
      </div>
      {state?.error ? (
        <p role="alert" className="text-sm text-brand-red">
          {dict.auth.errors.generic}
        </p>
      ) : null}
      <SubmitButton variant="portal" className="w-fit" pendingLabel="…">
        {s.send}
      </SubmitButton>
    </form>
  );
}
