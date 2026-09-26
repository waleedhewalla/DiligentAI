"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    __daExp?: Record<string, "a" | "b">;
  }
}

/**
 * Tags every GA4 event with the visitor's test versions (user properties
 * exp_<id>) and logs one experiment_impression per test per session.
 */
export function ExperimentTracker() {
  useEffect(() => {
    const exp = window.__daExp;
    if (!exp || !Object.keys(exp).length) return;
    const props = Object.fromEntries(Object.entries(exp).map(([k, v]) => [`exp_${k}`, v]));
    try {
      window.gtag?.("set", "user_properties", props);
    } catch {
      // Analytics must never break the page.
    }
    for (const [id, variant] of Object.entries(exp)) {
      const key = `da_exp_seen_${id}`;
      try {
        if (sessionStorage.getItem(key)) continue;
        sessionStorage.setItem(key, "1");
      } catch {
        // Storage blocked: still report once for this page view.
      }
      track("experiment_impression", { experiment: id, variant });
    }
  }, []);
  return null;
}
