/**
 * CONFIGURABLE — public funding programmes an offering can be financed through (gap 6).
 * Describe programmes, never promise eligibility; link to the official source.
 */
import type { L10n } from "@/i18n/config";
import type { Region } from "./types";

export type FundingRoute = { id: string; region: Region; name: L10n; body: L10n; url: string };

export const fundingRoutes: FundingRoute[] = [
  {
    id: "future-factories",
    region: "sa",
    name: { en: "Future Factories Program", ar: "برنامج مصانع المستقبل" },
    body: {
      en: "Ministry of Industry programme moving factories toward automation, starting with a Smart Industry Readiness Index (SIRI) assessment.",
      ar: "برنامج وزارة الصناعة لنقل المصانع نحو الأتمتة، ويبدأ بتقييم مؤشر جاهزية الصناعة الذكية (SIRI).",
    },
    url: "https://www.mim.gov.sa/en/initiatives-programs/industrial-sector-initiatives/future-factories-program-initiative",
  },
  {
    id: "sidf",
    region: "sa",
    name: { en: "SIDF financing for automation & digitisation", ar: "تمويل صندوق التنمية الصناعية للأتمتة والرقمنة" },
    body: {
      en: "Saudi Industrial Development Fund initiatives that finance factory automation and digitisation projects.",
      ar: "مبادرات صندوق التنمية الصناعية السعودي لتمويل مشاريع أتمتة ورقمنة المصانع.",
    },
    url: "https://www.sidf.gov.sa/Initiatives/Industrial-Sector-Support-Initiative/Future-Factories",
  },
  {
    id: "modon",
    region: "sa",
    name: { en: "MODON productivity programme", ar: "برنامج الإنتاجية من مدن" },
    body: {
      en: "Saudi industrial-cities authority programme converting factories in its cities to smart factories.",
      ar: "برنامج الهيئة السعودية للمدن الصناعية لتحويل المصانع في مدنها إلى مصانع ذكية.",
    },
    url: "https://modon.gov.sa/en",
  },
];

/** TODO(Waleed): flip to true only once accredited; the site says "SIRI-aligned" until then. */
export const siriCertified = false;
