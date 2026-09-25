"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductKey } from "@/content/catalog";

/** Requests a scoped launch token and hands the user to the product app (spec §9.2). */
export function LaunchButton({
  product,
  label,
  launchingLabel,
  errorLabel,
  auto = false,
}: {
  product: ProductKey;
  label: string;
  launchingLabel: string;
  errorLabel: string;
  auto?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const started = useRef(false);

  async function launch() {
    setBusy(true);
    setError(false);
    try {
      const res = await fetch(`/api/v1/portal/launch/${product}`, { method: "POST" });
      const json = (await res.json()) as { productUrl?: string };
      if (!res.ok || !json.productUrl) throw new Error();
      window.location.assign(json.productUrl);
    } catch {
      setError(true);
      setBusy(false);
    }
  }

  useEffect(() => {
    if (auto && !started.current) {
      started.current = true;
      void launch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  return (
    <div className="grid gap-2">
      <Button variant="portal" size="sm" onClick={launch} disabled={busy}>
        {busy ? launchingLabel : label}
        <ArrowRight className="btn-icon" />
      </Button>
      {error ? (
        <p role="alert" className="text-xs text-brand-red">
          {errorLabel}
        </p>
      ) : null}
    </div>
  );
}
