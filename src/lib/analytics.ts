"use client";

/**
 * Conversion tracking. KPIs (spec): demo requests, MQLs, case-study downloads.
 * Events go to GA4 (gtag) and Hotjar (for funnel/heatmap segmentation).
 */

export type AnalyticsEvent =
  // `solution` = catalog offering/capability slug; `interest` = service model.
  | { name: "cta_click"; params: { cta: string; location: string; solution?: string; interest?: string } }
  | { name: "generate_lead"; params: { form: "demo_request" | "contact"; interest: string; area?: string; industry?: string } }
  | { name: "mql"; params: { interest: string; area?: string; industry?: string } }
  | { name: "demo_booked"; params: { source: "calendly" | "cal"; interest?: string; area?: string } }
  | { name: "case_study_download"; params: { case_study: string } }
  | { name: "tech_brief_download"; params: { solution: string } }
  | { name: "nexus_generate"; params: { content_type: string } }
  | { name: "language_switch"; params: { to: string } }
  | { name: "whatsapp_click"; params: { location: string } }
  // Gap-closure KPIs (see research report): packages, ROI estimates, partner applications.
  | { name: "package_select"; params: { solution: string; package: string } }
  | { name: "roi_calc"; params: { planners: number; hours: number } }
  | { name: "partner_apply"; params: { track: string; country?: string } }
  // Assessment Track 1: sharing and form attribution.
  | { name: "share"; params: { network: string } }
  | { name: "department_pick"; params: { department: string } }
  // Track 3 lead magnets.
  | { name: "tool_complete"; params: { tool: string; score: number; band?: string } }
  // Track 5 A/B tests.
  | { name: "experiment_impression"; params: { experiment: string; variant: string } };

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
