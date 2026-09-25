"use client";

import { useEffect } from "react";
import { readConsent } from "@/lib/analytics";

function inject(id: string) {
  if (document.getElementById("hotjar-script")) return;
  const w = window as unknown as { hj?: unknown; _hjSettings?: unknown };
  w.hj =
    w.hj ||
    function (...args: unknown[]) {
      const f = w.hj as { q?: unknown[] };
      (f.q = f.q || []).push(args);
    };
  w._hjSettings = { hjid: Number(id), hjsv: 6 };
  const s = document.createElement("script");
  s.id = "hotjar-script";
  s.async = true;
  s.src = `https://static.hotjar.com/c/hotjar-${id}.js?sv=6`;
  document.head.appendChild(s);
}

export function HotjarLoader({ id }: { id: string }) {
  useEffect(() => {
    if (readConsent() === "granted") inject(id);
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "granted") inject(id);
    };
    window.addEventListener("da:consent", onConsent);
    return () => window.removeEventListener("da:consent", onConsent);
  }, [id]);
  return null;
}
