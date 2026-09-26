"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveals for every <main> section. Sections already on screen are
 * marked visible first, so nothing blinks; the rest rise in as they scroll
 * into view. Skipped entirely when the visitor prefers reduced motion, and
 * without JavaScript the page is simply static and complete.
 */
export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let io: IntersectionObserver | undefined;
    // Set up after the page is idle so it never competes with first render or hydration.
    const setup = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io!.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      // Read all positions first, then write, to avoid layout thrashing.
      const onScreen = sections.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      sections.forEach((s, i) => {
        s.setAttribute("data-reveal", "");
        if (onScreen[i]) s.classList.add("is-visible");
        else io!.observe(s);
      });
      document.documentElement.classList.add("motion");
    };
    // Safari has no requestIdleCallback; fall back to a short timeout.
    const idle = "requestIdleCallback" in window;
    const id = idle ? window.requestIdleCallback(setup, { timeout: 1500 }) : window.setTimeout(setup, 300);
    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}
