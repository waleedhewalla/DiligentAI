"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

/**
 * Calendly inline embed. The widget script loads only when the embed scrolls
 * into view, keeping the demo page fast. Bookings fire the `demo_booked` KPI.
 */
export function CalendlyEmbed({ url, locale, product }: { url: string; locale: Locale; product?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load || document.getElementById("calendly-widget")) return;
    const s = document.createElement("script");
    s.id = "calendly-widget";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [load]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string };
      if (data?.event === "calendly.event_scheduled") track("demo_booked", { source: "calendly", product });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [product]);

  const src = `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&locale=${locale}${
    product ? `&utm_content=${encodeURIComponent(product)}` : ""
  }`;

  return (
    <div ref={ref} className="min-h-[700px] overflow-hidden rounded-2xl border bg-background">
      {load ? (
        <div className="calendly-inline-widget h-[700px] w-full" data-url={src} />
      ) : (
        <div className="flex h-[700px] items-center justify-center text-muted-foreground">…</div>
      )}
    </div>
  );
}
