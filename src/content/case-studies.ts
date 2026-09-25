import type { L10n } from "@/i18n/config";
import type { ProductSlug } from "./products";
import { starTransMetrics, type Metric } from "./proof";

export type CaseStudy = {
  slug: string;
  client: string;
  clientAr: string;
  industry: L10n;
  location: L10n;
  products: ProductSlug[];
  title: L10n;
  summary: L10n;
  publishedAt: string;
  updatedAt: string;
  /** Path under /public. The PDF download is tracked as a KPI conversion. */
  pdf?: string;
  metrics: Metric[];
  challenge: L10n<string[]>;
  solution: { product: ProductSlug; body: L10n }[];
  results: { period: L10n; body: L10n }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "star-trans",
    client: "Star Trans",
    clientAr: "ستار ترانس",
    industry: { en: "Logistics & Transport", ar: "اللوجستيات والنقل" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    products: ["ipe", "ceo-os", "nexus"],
    title: {
      en: "How Star Trans Eliminated Manual Planning in 8 Weeks",
      ar: "كيف تخلّصت ستار ترانس من التخطيط اليدوي خلال 8 أسابيع",
    },
    summary: {
      en: "From a 3-day manual planning cycle in Excel to automated schedules, a live executive view and an Arabic content engine — all three Diligent AI products live in one company.",
      ar: "من دورة تخطيط يدوية على Excel تستغرق 3 أيام إلى جداول تلقائية، ورؤية تنفيذية لحظية، ومحرك محتوى عربي — منتجات Diligent AI الثلاثة تعمل في شركة واحدة.",
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
        product: "ipe",
        body: {
          en: "IPE was connected to Star Trans' order and resource data and modelled their real constraints. The planning team now generates a full schedule in under a minute and re-plans on the spot when something changes.",
          ar: "رُبط IPE ببيانات الطلبيات والموارد في ستار ترانس ونُمذجت قيودهم الفعلية. أصبح فريق التخطيط يُنتج جدولاً كاملاً في أقل من دقيقة، ويعيد التخطيط فوراً عند أي تغيير.",
        },
      },
      {
        product: "ceo-os",
        body: {
          en: "CEO OS brought operational KPIs from IPE together with finance and commercial data into a single Arabic executive view, replacing the Monday PDF.",
          ar: "جمع CEO OS مؤشرات العمليات من IPE مع البيانات المالية والتجارية في رؤية تنفيذية عربية واحدة، بدلاً من ملف PDF يوم الاثنين.",
        },
      },
      {
        product: "nexus",
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
          en: "80% reduction in planning time, with all three products in daily use across operations, leadership and commercial teams.",
          ar: "انخفاض وقت التخطيط بنسبة 80%، مع استخدام المنتجات الثلاثة يومياً في العمليات والإدارة والفرق التجارية.",
        },
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
