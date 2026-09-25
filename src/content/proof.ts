import type { L10n } from "@/i18n/config";

/**
 * Single source of truth for customer proof points.
 *
 * Every number rendered on the site comes from here, so the "all claims
 * accurate" launch gate (spec §10.1) is reviewed in one file.
 *
 * - `value: null` means the metric is still being measured; it is hidden
 *   everywhere until a verified number is filled in.
 * - Testimonials render only when `approved: true` (written permission from
 *   the named person). Never publish a quote that has not been approved.
 */

export type Metric = {
  id: string;
  value: string | null;
  label: L10n;
};

export const starTransMetrics: Metric[] = [
  { id: "planning-time", value: "−80%", label: { en: "Planning time", ar: "وقت التخطيط" } },
  { id: "go-live", value: "8", label: { en: "Weeks to go-live", ar: "أسابيع حتى التشغيل" } },
  { id: "products", value: "3", label: { en: "Products deployed", ar: "منتجات قيد التشغيل" } },
  // TODO(Waleed): fill with the verified OTD delta from Star Trans' 90-day review.
  { id: "otd", value: null, label: { en: "On-time delivery", ar: "التسليم في الموعد" } },
];

export const ipeMetrics: Metric[] = [
  { id: "schedule", value: "<60s", label: { en: "To generate a full schedule", ar: "لإنتاج جدول كامل" } },
  { id: "deploy", value: "8", label: { en: "Weeks to deploy", ar: "أسابيع للتشغيل" } },
  { id: "sla", value: "99.5%", label: { en: "Uptime SLA", ar: "ضمان التشغيل" } },
  { id: "otd", value: null, label: { en: "OTD improvement", ar: "تحسّن التسليم في الموعد" } },
];

export type Testimonial = {
  id: string;
  approved: boolean;
  quote: L10n;
  name: L10n;
  role: L10n;
};

export const testimonials: Record<"operations" | "ceo", Testimonial> = {
  operations: {
    id: "star-trans-operations",
    approved: false, // TODO(Waleed): set true once Eng. Mohamed approves the wording.
    quote: { en: "", ar: "" },
    name: { en: "Eng. Mohamed", ar: "م. محمد" },
    role: { en: "Operations, Star Trans", ar: "العمليات، ستار ترانس" },
  },
  ceo: {
    id: "star-trans-ceo",
    approved: false, // TODO(Waleed): set true once Eng. Hamdy approves the wording.
    quote: { en: "", ar: "" },
    name: { en: "Eng. Hamdy", ar: "م. حمدي" },
    role: { en: "CEO, Star Trans", ar: "الرئيس التنفيذي، ستار ترانس" },
  },
};

export function visibleMetrics(metrics: Metric[]) {
  return metrics.filter((m): m is Metric & { value: string } => m.value !== null);
}
