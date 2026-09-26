"use client";

/**
 * First-touch + last-touch lead attribution (assessment Track 1 #11).
 * Stored in localStorage only (no cookies, no third parties) and sent with
 * form submissions so every lead arrives with its source. Values are
 * truncated and restricted to what the API schema accepts.
 */
export type Touch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing?: string;
  at?: string;
};
export type Attribution = { first?: Touch; last?: Touch; pages?: string[] };

const KEY = "da_attr";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const clip = (v: string | null | undefined, n = 120) => (v ? v.slice(0, n) : undefined);

function read(): Attribution {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

function write(a: Attribution) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Storage blocked (private mode): attribution is best-effort.
  }
}

/** Call on every page view. */
export function recordTouch(pathname: string) {
  const a = read();
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM.some((k) => params.get(k));
  const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
  if (hasUtm || ref || !a.first) {
    const touch: Touch = { landing: clip(pathname, 200), referrer: clip(ref, 200), at: new Date().toISOString() };
    for (const k of UTM) touch[k] = clip(params.get(k));
    if (!a.first) a.first = touch;
    if (hasUtm || ref) a.last = touch;
  }
  // Last 10 distinct pages viewed — what the lead read before converting.
  a.pages = [...(a.pages ?? []).filter((p) => p !== pathname), clip(pathname, 200)!].slice(-10);
  write(a);
}

export function getAttribution(): Attribution {
  return typeof window === "undefined" ? {} : read();
}
