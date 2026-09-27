"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const R = 20;
const C = 2 * Math.PI * R;

/**
 * Floating "back to top" button with a reading-progress ring. Appears after
 * the first screen and a half, sits above any visible bottom bar (mobile
 * action bar, sticky CTA), and respects reduced motion.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const [lift, setLift] = useState(0);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ring.current?.style.setProperty("stroke-dashoffset", String(C * (1 - p)));
      setVisible(window.scrollY > window.innerHeight * 1.5);
      let h = 0;
      document.querySelectorAll<HTMLElement>("[data-bottom-bar]").forEach((el) => {
        if (el.getAttribute("aria-hidden") !== "true" && getComputedStyle(el).display !== "none") h = Math.max(h, el.offsetHeight);
      });
      setLift(h);
    };
    // Bottom bars toggle on their own scroll handlers, so re-measure once scrolling settles.
    let settle = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      window.clearTimeout(settle);
      settle = window.setTimeout(update, 350);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      style={{ bottom: `${lift + 16}px` }}
      className={cn(
        "back-to-top group fixed end-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white shadow-lg shadow-brand-navy/25 transition-[opacity,transform,bottom] duration-300 hover:bg-brand-navy-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 md:end-6 print:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        <circle ref={ring} cx="24" cy="24" r={R} fill="none" stroke="#5CC8C6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <ArrowUp className="relative h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden />
    </button>
  );
}
