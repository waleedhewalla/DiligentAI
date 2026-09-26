"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Real-user Core Web Vitals (LCP, INP, CLS, FCP, TTFB) sent to GA4 as events,
 * so the "good on every page" launch target is measured on real devices, not
 * only in Lighthouse. Uses gtag's queue; nothing is sent when GA isn't set up,
 * and GA itself respects Consent Mode.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;
    if (!gtag) return;
    gtag("event", metric.name, {
      // CLS is a small decimal; GA values must be integers.
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: (metric as { rating?: string }).rating,
      page_path: window.location.pathname,
      non_interaction: true,
    });
  });
  return null;
}
