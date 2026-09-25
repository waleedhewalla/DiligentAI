/**
 * CONFIGURABLE — regulatory deadlines shown on the homepage band and /trust (gap 3).
 * Keep dates factual; use "expected" wording where timing depends on regulators.
 */
import type { L10n } from "@/i18n/config";

export type ComplianceItem = { id: string; when: L10n; title: L10n; body: L10n; href: string };

export const complianceItems: ComplianceItem[] = [
  {
    id: "cbam",
    when: { en: "Since 1 Jan 2026", ar: "منذ 1 يناير 2026" },
    title: { en: "EU CBAM — definitive period", ar: "آلية تعديل حدود الكربون الأوروبية — المرحلة النهائية" },
    body: {
      en: "Exporters of steel, cement, aluminium and fertilisers to the EU need verified plant emissions — or face costly default values.",
      ar: "مصدّرو الصلب والأسمنت والألومنيوم والأسمدة إلى الاتحاد الأوروبي يحتاجون انبعاثات موثقة لمصانعهم — أو يواجهون قيماً افتراضية مكلفة.",
    },
    href: "/capabilities/energy-carbon-reporting",
  },
  {
    id: "pdpl",
    when: { en: "Enforcement expected late 2026", ar: "التطبيق متوقع أواخر 2026" },
    title: { en: "Egypt Personal Data Protection Law", ar: "قانون حماية البيانات الشخصية المصري" },
    body: {
      en: "Executive regulations are out; transfers of personal data abroad need a licence. Where your AI runs now matters.",
      ar: "صدرت اللائحة التنفيذية؛ ونقل البيانات الشخصية للخارج يحتاج ترخيصاً. أصبح مكان تشغيل الذكاء الاصطناعي مهماً.",
    },
    href: "/trust",
  },
  {
    id: "esg",
    when: { en: "Annual", ar: "سنوي" },
    title: { en: "FRA ESG & climate disclosure", ar: "إفصاحات الاستدامة والمناخ من الهيئة العامة للرقابة المالية" },
    body: {
      en: "Listed and larger Egyptian companies file ESG reports, and the largest add TCFD climate disclosures.",
      ar: "الشركات المصرية المدرجة والكبرى تقدم تقارير الاستدامة، وأكبرها تضيف إفصاحات المناخ وفق TCFD.",
    },
    href: "/capabilities/energy-carbon-reporting",
  },
];
