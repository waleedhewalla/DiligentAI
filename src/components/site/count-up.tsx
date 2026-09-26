"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";

/**
 * A number that counts up when it scrolls into view. The server renders the
 * final value (correct without JS and for search engines); the animation only
 * runs for visitors who allow motion.
 */
export function CountUp({ value, prefix = "", suffix = "", locale }: { value: number; prefix?: string; suffix?: string; locale: Locale }) {
  const fmt = (n: number) => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 0 }).format(n);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    setShown(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {fmt(shown)}
      {suffix}
    </span>
  );
}
