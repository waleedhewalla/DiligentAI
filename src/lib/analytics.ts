"use client";

/**
 * Conversion tracking. KPIs (spec): demo requests, MQLs, case-study downloads.
 * Events go to GA4 (gtag) and Hotjar (for funnel/heatmap segmentation).
 */

export type AnalyticsEvent =
  | { name: "cta_click"; params: { cta: string; location: string; product?: string } }
  | { name: "generate_lead"; params: { form: "demo_request" | "contact"; product: string; industry?: string } }
  | { name: "mql"; params: { product: string; industry?: string } }
  | { name: "demo_booked"; params: { source: "calendly"; product?: string } }
  | { name: "case_study_download"; params: { case_study: string } }
  | { name: "tech_brief_download"; params: { product: string } }
  | { name: "nexus_generate"; params: { content_type: string } }
  | { name: "language_switch"; params: { to: string } }
  | { name: "whatsapp_click"; params: { location: string } };

type Gtag = (...args: unknown[]) => void;
type Hotjar = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    hj?: Hotjar;
    dataLayer?: unknown[];
  }
}

export function track<E extends AnalyticsEvent>(name: E["name"], params: E["params"]) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.hj?.("event", name);
  } catch {
    // Analytics must never break the page.
  }
}

export const CONSENT_KEY = "da_consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.dispatchEvent(new CustomEvent("da:consent", { detail: value }));
}
