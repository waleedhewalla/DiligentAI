/**
 * CONFIGURABLE — partner programme (gap 4 & 7, /partners).
 * `signedPartners` is EMPTY on purpose: add a partner only after a signed agreement.
 */
import type { L10n } from "@/i18n/config";
import type { IconName } from "./types";

export type PartnerTrack = { id: string; icon: IconName; title: L10n; body: L10n; gives: L10n<string[]> };
export type SignedPartner = { name: string; track: string; url?: string };

export const partnerTracks: PartnerTrack[] = [
  {
    id: "erp",
    icon: "database",
    title: { en: "ERP partners (SAP, Odoo, Dynamics)", ar: "شركاء أنظمة ERP (SAP وOdoo وDynamics)" },
    body: {
      en: "You own the ERP relationship; we add the AI layer — scheduling, forecasting and quality — on top of the system you implemented.",
      ar: "أنت تملك علاقة ERP؛ ونحن نضيف طبقة الذكاء الاصطناعي — الجدولة والتنبؤ والجودة — فوق النظام الذي نفذته.",
    },
    gives: {
      en: ["Referral fee or white-label option", "Joint pre-sales in Arabic", "No competition on your ERP scope"],
      ar: ["عمولة إحالة أو خيار العلامة البيضاء", "دعم مشترك قبل البيع بالعربية", "لا منافسة على نطاق ERP الخاص بك"],
    },
  },
  {
    id: "automation",
    icon: "cpu",
    title: { en: "Automation & OEM partners", ar: "شركاء الأتمتة والمصنّعين" },
    body: {
      en: "Your machines and MES/SCADA, our data and AI layer — so your customers' new AI copilots actually have data to work with.",
      ar: "ماكيناتك وأنظمة MES/SCADA لديك، وطبقة البيانات والذكاء الاصطناعي لدينا — ليجد وكلاء الذكاء الاصطناعي لدى عملائك بيانات يعملون عليها.",
    },
    gives: {
      en: ["Integration delivery capacity", "Arabic user interfaces and reports", "Local support for your installed base"],
      ar: ["قدرة تنفيذ للتكامل", "واجهات وتقارير عربية", "دعم محلي لقاعدة عملائك"],
    },
  },
  {
    id: "cloud",
    icon: "server",
    title: { en: "Cloud & platform partners", ar: "شركاء السحابة والمنصات" },
    body: {
      en: "We build manufacturing workloads on your regional cloud — including migrations off retired services.",
      ar: "نبني أحمال عمل التصنيع على سحابتك الإقليمية — بما في ذلك الترحيل من الخدمات المتوقفة.",
    },
    gives: {
      en: ["Manufacturing use cases that consume cloud", "Migration projects", "Arabic delivery team"],
      ar: ["حالات استخدام تصنيعية تستهلك السحابة", "مشاريع ترحيل", "فريق تنفيذ عربي"],
    },
  },
  {
    id: "hardware",
    icon: "scan",
    title: { en: "Sensor & camera partners", ar: "شركاء الحساسات والكاميرات" },
    body: {
      en: "Bundle your cameras and sensors into our per-site vision and machine-health packages.",
      ar: "ادمج كاميراتك وحساساتك في باقات الفحص البصري وصحة الماكينات لدينا لكل موقع.",
    },
    gives: {
      en: ["Recurring hardware demand", "Installation and calibration work", "Software that makes the hardware pay back"],
      ar: ["طلب متكرر على الأجهزة", "أعمال تركيب ومعايرة", "برمجيات تجعل الأجهزة تسترد تكلفتها"],
    },
  },
];

export const signedPartners: SignedPartner[] = [];
