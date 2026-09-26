import type { L10n } from "@/i18n/config";
import { starTransMetrics, type Metric } from "./proof";

export type CaseStudy = {
  slug: string;
  /**
   * Publish gate. Drafts (false) never render, never enter the sitemap and are
   * never linked — flip to true only when the customer has signed off the
   * text and every number (see the pilot measurement sheet in the content kit).
   */
  published: boolean;
  client: string;
  clientAr: string;
  industry: L10n;
  location: L10n;
  /** Offering slugs used (CONFIGURABLE — must exist in catalog/offerings.ts). */
  offerings: string[];
  /** Capability slugs this story demonstrates; drives links from /capabilities pages. */
  capabilities: string[];
  title: L10n;
  summary: L10n;
  publishedAt: string;
  updatedAt: string;
  /** Path under /public. The PDF download is tracked as a KPI conversion. */
  pdf?: string;
  metrics: Metric[];
  challenge: L10n<string[]>;
  solution: { offering: string; body: L10n }[];
  results: { period: L10n; body: L10n }[];
};

const allCaseStudies: CaseStudy[] = [
  {
    slug: "star-trans",
    published: true,
    client: "Star Trans",
    clientAr: "ستار ترانس",
    industry: { en: "Logistics & Transport", ar: "اللوجستيات والنقل" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    offerings: ["ai-production-scheduling", "executive-intelligence", "arabic-commercial-content"],
    capabilities: ["production-scheduling", "executive-decision-intelligence"],
    title: {
      en: "How Star Trans Eliminated Manual Planning in 8 Weeks",
      ar: "كيف تخلّصت ستار ترانس من التخطيط اليدوي خلال 8 أسابيع",
    },
    summary: {
      en: "From a 3-day manual planning cycle in Excel to automated schedules, a live executive view and an Arabic content engine — three Diligent AI solutions live in one company.",
      ar: "من دورة تخطيط يدوية على Excel تستغرق 3 أيام إلى جداول تلقائية، ورؤية تنفيذية لحظية، ومحرك محتوى عربي — ثلاثة حلول من Diligent AI تعمل في شركة واحدة.",
    },
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-25",
    pdf: "/downloads/star-trans-case-study.pdf",
    metrics: starTransMetrics,
    challenge: {
      en: [
        "Every week, the planning team spent two to three days building the schedule by hand in Excel. By the time it was published, reality had already moved: a vehicle was down, a shipment was late, a customer changed priority.",
        "Leadership saw performance in a weekly PDF, days after the fact. Commercial teams relied on agencies for Arabic content, waiting weeks for each campaign.",
        "Global planning suites were quoted at 12–18 months of implementation with English-only interfaces and no local support.",
      ],
      ar: [
        "كل أسبوع، كان فريق التخطيط يقضي من يومين إلى ثلاثة أيام في بناء الجدول يدوياً على Excel. وعند نشره كان الواقع قد تغيّر: مركبة معطلة، شحنة متأخرة، عميل غيّر أولوياته.",
        "كانت الإدارة ترى الأداء في ملف PDF أسبوعي، بعد وقوع الأحداث بأيام. واعتمدت الفرق التجارية على الوكالات في المحتوى العربي، منتظرةً أسابيع لكل حملة.",
        "أما أنظمة التخطيط العالمية فكانت عروضها تتطلب 12–18 شهراً للتنفيذ بواجهات إنجليزية فقط ودون دعم محلي.",
      ],
    },
    solution: [
      {
        offering: "ai-production-scheduling",
        body: {
          en: "IPE was connected to Star Trans' order and resource data and modelled their real constraints. The planning team now generates a full schedule in under a minute and re-plans on the spot when something changes.",
          ar: "رُبط IPE ببيانات الطلبيات والموارد في ستار ترانس ونُمذجت قيودهم الفعلية. أصبح فريق التخطيط يُنتج جدولاً كاملاً في أقل من دقيقة، ويعيد التخطيط فوراً عند أي تغيير.",
        },
      },
      {
        offering: "executive-intelligence",
        body: {
          en: "CEO OS brought operational KPIs from IPE together with finance and commercial data into a single Arabic executive view, replacing the Monday PDF.",
          ar: "جمع CEO OS مؤشرات العمليات من IPE مع البيانات المالية والتجارية في رؤية تنفيذية عربية واحدة، بدلاً من ملف PDF يوم الاثنين.",
        },
      },
      {
        offering: "arabic-commercial-content",
        body: {
          en: "Nexus AI took over first drafts of Arabic LinkedIn content and proposals, with the commercial team reviewing instead of writing from scratch.",
          ar: "تولّى Nexus AI كتابة المسودات الأولى لمحتوى لينكدإن والعروض بالعربية، وأصبح دور الفريق التجاري المراجعة بدلاً من الكتابة من الصفر.",
        },
      },
    ],
    results: [
      {
        period: { en: "Day 30", ar: "اليوم 30" },
        body: {
          en: "Planning cycle cut from days to minutes. Planners shift their time from building schedules to managing exceptions.",
          ar: "تقلصت دورة التخطيط من أيام إلى دقائق. تحوّل وقت المخططين من بناء الجداول إلى إدارة الاستثناءات.",
        },
      },
      {
        period: { en: "Day 60", ar: "اليوم 60" },
        body: {
          en: "Leadership reviews live KPIs instead of weekly reports; exceptions are raised before the weekly meeting.",
          ar: "تراجع الإدارة المؤشرات لحظياً بدلاً من التقارير الأسبوعية، وتُرفع الاستثناءات قبل الاجتماع الأسبوعي.",
        },
      },
      {
        period: { en: "Day 90", ar: "اليوم 90" },
        body: {
          en: "80% reduction in planning time, with all three solutions in daily use across operations, leadership and commercial teams.",
          ar: "انخفاض وقت التخطيط بنسبة 80%، مع استخدام الحلول الثلاثة يومياً في العمليات والإدارة والفرق التجارية.",
        },
      },
    ],
  },
  // ─── Pilot drafts (Track 3) — hidden until published: true ───────────────
  // TODO(Waleed): replace the bracketed fields with signed pilot data at day 90.
  {
    slug: "pilot-vision-quality",
    published: false,
    client: "[Pilot customer — quality]",
    clientAr: "[عميل تجريبي — الجودة]",
    industry: { en: "[Industry]", ar: "[القطاع]" },
    location: { en: "Egypt", ar: "مصر" },
    offerings: ["vision-quality-control"],
    capabilities: ["quality-control"],
    title: { en: "[How <customer> raised first-pass yield on <line> in 90 days]", ar: "[كيف رفعت <العميل> نسبة النجاح من أول مرة على <الخط> خلال 90 يوماً]" },
    summary: { en: "[One sentence: the line, the defect, the result.]", ar: "[جملة واحدة: الخط والعيب والنتيجة.]" },
    publishedAt: "2026-12-20",
    updatedAt: "2026-12-20",
    metrics: [
      { id: "fpy", value: null, label: { en: "First-pass yield", ar: "نسبة النجاح من أول مرة" } },
      { id: "scrap", value: null, label: { en: "Scrap rate", ar: "نسبة الهالك" } },
      { id: "golive", value: null, label: { en: "Weeks to go-live", ar: "أسابيع حتى التشغيل" } },
    ],
    challenge: { en: ["[Baseline and pain, from the pilot sheet.]"], ar: ["[الخط الأساسي والمشكلة من ورقة القياس.]"] },
    solution: [{ offering: "vision-quality-control", body: { en: "[What was installed and connected.]", ar: "[ما الذي رُكّب ورُبط.]" } }],
    results: [
      { period: { en: "Day 30", ar: "اليوم 30" }, body: { en: "[Signed day-30 result.]", ar: "[نتيجة اليوم 30 الموقّعة.]" } },
      { period: { en: "Day 90", ar: "اليوم 90" }, body: { en: "[Signed day-90 result.]", ar: "[نتيجة اليوم 90 الموقّعة.]" } },
    ],
  },
  {
    slug: "pilot-cost-margin",
    published: false,
    client: "[Pilot customer — costing]",
    clientAr: "[عميل تجريبي — التكاليف]",
    industry: { en: "[Industry]", ar: "[القطاع]" },
    location: { en: "Egypt", ar: "مصر" },
    offerings: ["erp-ai-integration", "executive-intelligence"],
    capabilities: ["executive-decision-intelligence"],
    title: { en: "[How <customer> found the margin hidden in its standard costs]", ar: "[كيف وجدت <العميل> الهامش المختفي في تكاليفها المعيارية]" },
    summary: { en: "[One sentence: products covered, the gap found, the decision taken.]", ar: "[جملة واحدة: المنتجات والفجوة والقرار.]" },
    publishedAt: "2026-12-20",
    updatedAt: "2026-12-20",
    metrics: [
      { id: "gap", value: null, label: { en: "Cost-per-unit gap found", ar: "فجوة تكلفة الوحدة المكتشفة" } },
      { id: "skus", value: null, label: { en: "Products costed on actuals", ar: "منتجات بتكلفة فعلية" } },
      { id: "close", value: null, label: { en: "Days to close", ar: "أيام الإقفال" } },
    ],
    challenge: { en: ["[Baseline and pain, from the pilot sheet.]"], ar: ["[الخط الأساسي والمشكلة من ورقة القياس.]"] },
    solution: [{ offering: "erp-ai-integration", body: { en: "[Data connected and how actual cost is computed.]", ar: "[البيانات المربوطة وطريقة حساب التكلفة الفعلية.]" } }],
    results: [
      { period: { en: "Day 30", ar: "اليوم 30" }, body: { en: "[Signed day-30 result.]", ar: "[نتيجة اليوم 30 الموقّعة.]" } },
      { period: { en: "Day 90", ar: "اليوم 90" }, body: { en: "[Signed day-90 result.]", ar: "[نتيجة اليوم 90 الموقّعة.]" } },
    ],
  },
];

/** Published case studies only — the single list every page, link and sitemap uses. */
export const caseStudies: CaseStudy[] = allCaseStudies.filter((c) => c.published);

/** Drafts waiting for customer sign-off (for the team; never rendered). */
export const draftCaseStudies: CaseStudy[] = allCaseStudies.filter((c) => !c.published);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
