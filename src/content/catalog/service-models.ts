/**
 * CONFIGURABLE — the three primary ways clients engage us.
 * Order here is the order shown on the homepage and /services.
 */
import type { ServiceModel } from "./types";

export const serviceModels: ServiceModel[] = [
  {
    id: "consult",
    icon: "compass",
    accent: "navy",
    title: { en: "Consult", ar: "الاستشارة" },
    tagline: {
      en: "Find the AI use cases that pay back first.",
      ar: "حدّد حالات استخدام الذكاء الاصطناعي الأسرع عائداً.",
    },
    description: {
      en: "We walk your plant, map your data and systems, and rank AI opportunities by value and feasibility — so the first project pays for the next.",
      ar: "نزور مصنعك، ونرسم خريطة بياناتك وأنظمتك، ونرتّب فرص الذكاء الاصطناعي حسب القيمة وقابلية التنفيذ — ليموّل المشروع الأول ما بعده.",
    },
    deliverables: {
      en: ["AI readiness & data assessment", "Ranked use-case roadmap with business cases", "Architecture and integration plan", "Board-ready summary in Arabic and English"],
      ar: ["تقييم الجاهزية والبيانات", "خارطة طريق مرتبة لحالات الاستخدام مع دراسات جدوى", "خطة البنية والتكامل", "ملخص جاهز لمجلس الإدارة بالعربية والإنجليزية"],
    },
    duration: { en: "Typically 2–4 weeks", ar: "عادةً 2–4 أسابيع" },
    steps: [
      { title: { en: "Discover", ar: "الاستكشاف" }, body: { en: "Workshops with operations, IT and finance; site walk.", ar: "ورش عمل مع العمليات وتقنية المعلومات والمالية؛ وزيارة ميدانية." } },
      { title: { en: "Assess", ar: "التقييم" }, body: { en: "Data quality, systems landscape, quick-win candidates.", ar: "جودة البيانات، خريطة الأنظمة، والفرص السريعة." } },
      { title: { en: "Prioritise", ar: "تحديد الأولويات" }, body: { en: "Value × feasibility ranking with a business case each.", ar: "ترتيب حسب القيمة وقابلية التنفيذ مع دراسة جدوى لكل فرصة." } },
      { title: { en: "Roadmap", ar: "خارطة الطريق" }, body: { en: "Phased plan, budget and KPIs you can take to the board.", ar: "خطة مرحلية وميزانية ومؤشرات أداء تعرضها على مجلس الإدارة." } },
    ],
    cta: { en: "Book an AI assessment", ar: "احجز تقييماً للذكاء الاصطناعي" },
  },
  {
    id: "build",
    icon: "blocks",
    accent: "orange",
    title: { en: "Build", ar: "البناء" },
    tagline: {
      en: "Deploy proven AI tools — or build models on your own data.",
      ar: "طبّق أدوات ذكاء اصطناعي مجرّبة — أو ابنِ نماذج على بياناتك.",
    },
    description: {
      en: "Start from our pre-built tools for scheduling, executive intelligence and content, or have us build custom models for forecasting, quality and maintenance — Arabic-first and production-grade.",
      ar: "ابدأ من أدواتنا الجاهزة للجدولة والذكاء التنفيذي والمحتوى، أو دعنا نبني نماذج مخصصة للتنبؤ والجودة والصيانة — بالعربية أولاً وبجودة إنتاجية.",
    },
    deliverables: {
      en: ["Configured pre-built tool or custom model", "Arabic-native user interface and reports", "User training and hand-over", "Measured baseline and 30/60/90-day review"],
      ar: ["أداة جاهزة مهيأة أو نموذج مخصص", "واجهة وتقارير عربية أصيلة", "تدريب المستخدمين والتسليم", "خط أساس مُقاس ومراجعة بعد 30/60/90 يوماً"],
    },
    duration: { en: "Typically 4–12 weeks", ar: "عادةً 4–12 أسبوعاً" },
    steps: [
      { title: { en: "Scope", ar: "تحديد النطاق" }, body: { en: "Success metric and baseline agreed up front.", ar: "الاتفاق على مؤشر النجاح وخط الأساس مسبقاً." } },
      { title: { en: "Model", ar: "النمذجة" }, body: { en: "Configure a pre-built tool or train on your history.", ar: "تهيئة أداة جاهزة أو التدريب على بياناتك التاريخية." } },
      { title: { en: "Pilot", ar: "التجربة" }, body: { en: "Run beside the current process on one line or site.", ar: "التشغيل بجانب العملية الحالية على خط أو موقع واحد." } },
      { title: { en: "Scale", ar: "التوسع" }, body: { en: "Roll out, train users, measure against the baseline.", ar: "التعميم وتدريب المستخدمين والقياس مقابل خط الأساس." } },
    ],
    cta: { en: "Discuss a build", ar: "ناقش مشروع بناء" },
  },
  {
    id: "integrate",
    icon: "cable",
    accent: "teal",
    title: { en: "Integrate", ar: "التكامل" },
    tagline: {
      en: "Connect AI to the ERP, MES and legacy systems you already run.",
      ar: "اربط الذكاء الاصطناعي بأنظمة ERP وMES والأنظمة القديمة لديك.",
    },
    description: {
      en: "AI is only as good as the data it sees and the systems it can act on. We connect SAP, Oracle, Dynamics, shop-floor systems and spreadsheets into reliable data pipelines — your ERP stays the system of record.",
      ar: "الذكاء الاصطناعي لا يكون أفضل من البيانات التي يراها والأنظمة التي يعمل عليها. نربط SAP وOracle وDynamics وأنظمة أرض المصنع والجداول في مسارات بيانات موثوقة — ويبقى نظام ERP هو المرجع.",
    },
    deliverables: {
      en: ["ERP / MES connectors (read and write-back)", "Governed data pipelines and a clean data layer", "Monitoring, alerting and runbooks", "Documentation your IT team can own"],
      ar: ["موصلات ERP / MES (قراءة وإعادة كتابة)", "مسارات بيانات محكومة وطبقة بيانات نظيفة", "مراقبة وتنبيهات وأدلة تشغيل", "توثيق يستطيع فريق تقنية المعلومات امتلاكه"],
    },
    duration: { en: "Typically 3–10 weeks", ar: "عادةً 3–10 أسابيع" },
    steps: [
      { title: { en: "Map", ar: "رسم الخريطة" }, body: { en: "Systems, interfaces, data owners and security constraints.", ar: "الأنظمة والواجهات ومالكو البيانات وقيود الأمان." } },
      { title: { en: "Connect", ar: "الربط" }, body: { en: "Standard connectors first; custom adapters where needed.", ar: "الموصلات القياسية أولاً؛ ومحولات مخصصة عند الحاجة." } },
      { title: { en: "Validate", ar: "التحقق" }, body: { en: "Reconcile against source systems before anything goes live.", ar: "المطابقة مع الأنظمة المصدر قبل أي تشغيل." } },
      { title: { en: "Operate", ar: "التشغيل" }, body: { en: "Monitoring, SLAs and hand-over to your team.", ar: "مراقبة واتفاقيات مستوى خدمة وتسليم لفريقك." } },
    ],
    cta: { en: "Plan an integration", ar: "خطط لمشروع تكامل" },
  },
];
