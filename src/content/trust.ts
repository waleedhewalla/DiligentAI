import type { L10n } from "@/i18n/config";

/**
 * Trust-page assurances (assessment Track 1 #13). Keep every line true:
 * `status` is what exists today, `target` is shown only when set.
 * TODO(Waleed): set target quarters once the audits are scheduled.
 */
export type Assurance = { id: string; name: string; status: "planned" | "in-progress" | "certified"; target: L10n | null; body: L10n };

export const certifications: Assurance[] = [
  {
    id: "iso27001",
    name: "ISO/IEC 27001",
    status: "planned",
    target: null,
    body: {
      en: "Information-security management system. Controls on this page are designed to map to Annex A.",
      ar: "نظام إدارة أمن المعلومات. الضوابط في هذه الصفحة مصممة لتتوافق مع الملحق A.",
    },
  },
  {
    id: "siri",
    name: "SIRI (Smart Industry Readiness Index)",
    status: "planned",
    target: null,
    body: {
      en: "Our readiness assessments follow the SIRI framework today (SIRI-aligned); accreditation as an assessor is planned.",
      ar: "تقييمات الجاهزية لدينا تتبع إطار SIRI اليوم؛ والاعتماد كمقيّم مخطط.",
    },
  },
  {
    id: "pdpl",
    name: "Egypt PDPL (Law 151/2020)",
    status: "in-progress",
    target: null,
    body: {
      en: "Hosting and processing options designed around the law's cross-border transfer rules; see the regulations section.",
      ar: "خيارات استضافة ومعالجة مصممة حول قواعد النقل عبر الحدود في القانون؛ راجع قسم اللوائح.",
    },
  },
];

/**
 * Service commitments. Only hosted-product uptime is a published figure (see ipeMetrics).
 * TODO(Waleed): confirm support hours and the export/deletion terms match the MSA.
 */
export const serviceCommitments: { title: L10n; body: L10n }[] = [
  {
    title: { en: "Uptime", ar: "وقت التشغيل" },
    body: { en: "99.5% monthly uptime SLA on hosted products.", ar: "ضمان تشغيل شهري 99.5% للمنتجات المستضافة." },
  },
  {
    title: { en: "Support", ar: "الدعم" },
    body: { en: "Arabic and English support during Cairo business hours; critical-incident contacts named in the contract.", ar: "دعم بالعربية والإنجليزية خلال ساعات العمل بتوقيت القاهرة؛ مع جهات اتصال للحوادث الحرجة في العقد." },
  },
  {
    title: { en: "Your data, your exit", ar: "بياناتك ومغادرتك" },
    body: { en: "Full export of your data in open formats on request and at contract end, then deletion.", ar: "تصدير كامل لبياناتك بصيغ مفتوحة عند الطلب وعند انتهاء العقد، ثم الحذف." },
  },
];
