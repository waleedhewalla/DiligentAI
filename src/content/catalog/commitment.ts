/**
 * CONFIGURABLE — the Pilot-to-Production commitment (gap 2).
 *
 * Shown on every offering with `pilotToProduction: true`, on /services and
 * on the homepage. Keep every line contractually true.
 */
import type { L10n } from "@/i18n/config";

export const commitment = {
  title: { en: "Pilot to production, in writing", ar: "من التجربة إلى الإنتاج، بالتزام مكتوب" } as L10n,
  lead: {
    en: "Most AI pilots never reach the factory floor. Ours are scoped to go live: the success metric, the baseline and the go-live plan are agreed before we start.",
    ar: "معظم تجارب الذكاء الاصطناعي لا تصل أبداً إلى أرض المصنع. تجاربنا مصممة لتعمل فعلياً: مؤشر النجاح وخط الأساس وخطة التشغيل يُتفق عليها قبل البدء.",
  } as L10n,
  steps: [
    { title: { en: "Baseline in writing", ar: "خط أساس مكتوب" }, body: { en: "We measure today's performance with you and sign off the KPI the pilot must move.", ar: "نقيس الأداء الحالي معك ونعتمد المؤشر الذي يجب أن تحسّنه التجربة." } },
    { title: { en: "Fixed-scope pilot", ar: "تجربة بنطاق محدد" }, body: { en: "One line or one site, a fixed timeline and a fixed price.", ar: "خط واحد أو موقع واحد، بجدول زمني وسعر ثابتين." } },
    { title: { en: "Go / no-go on the numbers", ar: "قرار الاستمرار بالأرقام" }, body: { en: "A joint review against the baseline decides the roll-out — not a slide deck.", ar: "مراجعة مشتركة مقابل خط الأساس تقرر التعميم — لا عرض تقديمي." } },
    { title: { en: "Production hand-over", ar: "التسليم للإنتاج" }, body: { en: "Integrated with your ERP/MES, users trained, monitored, with a 30/60/90-day review.", ar: "متكامل مع ERP/MES، مع تدريب المستخدمين والمراقبة ومراجعة بعد 30/60/90 يوماً." } },
  ],
  /**
   * TODO(Waleed): share of the pilot fee tied to hitting the agreed KPI (e.g. 20).
   * While null, the site says "part of the fee can be tied to the KPI" without a number.
   */
  feeAtRiskPercent: null as number | null,
};
