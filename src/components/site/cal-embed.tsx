"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

const CAL_ORIGINS = ["https://cal.com", "https://app.cal.com"];

/**
 * Cal.com inline booking (iframe, no third-party script). Loads when scrolled
 * into view. Interest/area are passed as booking metadata so they show up on
 * the booking in Cal.com; a completed booking fires the `demo_booked` KPI.
 */
export function CalEmbed({ url, locale, interest, area, title }: { url: string; locale: Locale; interest?: string; area?: string; title: string }) {
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
    const onMessage = (e: MessageEvent) => {
      if (!CAL_ORIGINS.includes(e.origin)) return;
      const data = e.data as { type?: string; originator?: string };
      if (data?.type === "bookingSuccessful" || data?.type === "bookingSuccessfulV2") track("demo_booked", { source: "cal", interest, area });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [interest, area]);

  const q = new URLSearchParams({ embed: "true", layout: "month_view", theme: "light", locale });
  if (interest) q.set("metadata[interest]", interest);
  if (area) q.set("metadata[area]", area);
  const src = `${url}${url.includes("?") ? "&" : "?"}${q.toString()}`;

  return (
    <div ref={ref} className="min-h-[700px] overflow-hidden rounded-2xl border bg-background">
      {load ? (
        <iframe src={src} title={title} className="h-[700px] w-full" loading="lazy" allow="payment" />
      ) : (
        <div className="flex h-[700px] items-center justify-center text-muted-foreground">…</div>
      )}
    </div>
  );
}
