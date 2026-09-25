import type { L10n } from "@/i18n/config";
import { ipeMetrics, type Metric } from "./proof";

export type ProductSlug = "ipe" | "ceo-os" | "nexus";
export type ProductKey = "ipe" | "ceo_os" | "nexus";
export type ProductColor = "orange" | "navy" | "teal";

export type IconName =
  | "factory"
  | "gauge"
  | "languages"
  | "plug"
  | "refresh"
  | "server"
  | "layout"
  | "brain"
  | "file"
  | "pen"
  | "target"
  | "briefcase"
  | "clock"
  | "shield"
  | "users"
  | "chart";

export type Product = {
  slug: ProductSlug;
  key: ProductKey;
  color: ProductColor;
  icon: IconName;
  name: L10n;
  category: L10n;
  tagline: L10n;
  benefits: L10n<string[]>;
  cardCta: L10n;
  seo: { title: L10n; description: L10n; keywords: L10n<string[]> };
  hero: { eyebrow: L10n; title: L10n; lead: L10n; primaryCta: L10n; secondaryCta?: L10n };
  metrics: Metric[];
  steps?: { title: L10n; body: L10n }[];
  capabilities: { icon: IconName; title: L10n; body: L10n }[];
  modules?: { id: string; title: L10n; body: L10n; points: L10n<string[]> }[];
  useCases: { title: L10n; body: L10n }[];
  roi: { title: L10n; rows: { label: L10n; before: L10n; after: L10n }[] };
  faqs: { q: L10n; a: L10n }[];
  stickyCta: L10n;
  finalCta: { title: L10n; body: L10n };
  integrations?: string[];
  deployment: L10n<string[]>;
};

export const products: Record<ProductSlug, Product> = {
  ipe: {
    slug: "ipe",
    key: "ipe",
    color: "orange",
    icon: "factory",
    name: { en: "IPE", ar: "IPE" },
    category: { en: "Operations Intelligence", ar: "ذكاء العمليات" },
    tagline: {
      en: "Your factory plans its own production schedule.",
      ar: "مصنعك يخطط جدول إنتاجه بنفسه.",
    },
    benefits: {
      en: [
        "Optimised schedules in under 60 seconds",
        "Re-plans instantly when a machine or material slips",
        "Arabic-native UI, SAP-aware integration",
      ],
      ar: [
        "جداول إنتاج مُحسّنة في أقل من 60 ثانية",
        "إعادة تخطيط فورية عند تعطل ماكينة أو تأخر خامة",
        "واجهة عربية أصيلة وتكامل مع SAP",
      ],
    },
    cardCta: { en: "Explore IPE", ar: "اكتشف IPE" },
    seo: {
      title: {
        en: "IPE — AI Production Scheduling Software for MENA Manufacturers",
        ar: "IPE — برنامج جدولة الإنتاج بالذكاء الاصطناعي للمصانع في مصر والخليج",
      },
      description: {
        en: "IPE generates automated production schedules in under 60 seconds. Built for Egyptian and Gulf manufacturers. Arabic-native. SAP-integrated. 8-week deployment.",
        ar: "IPE يُنتج جداول إنتاج تلقائية في أقل من 60 ثانية. مصمم للمصانع المصرية والخليجية. عربي أصيل، متكامل مع SAP، وتشغيل خلال 8 أسابيع.",
      },
      keywords: {
        en: ["production scheduling software Egypt", "APS software MENA", "AI production planning", "SAP production scheduling"],
        ar: ["برنامج جدولة الإنتاج", "تخطيط الإنتاج بالذكاء الاصطناعي", "برنامج تخطيط المصانع مصر", "جدولة الإنتاج SAP"],
      },
    },
    hero: {
      eyebrow: { en: "IPE · Intelligent Planning Engine", ar: "IPE · محرك التخطيط الذكي" },
      title: {
        en: "Your Factory Plans Its Own Production Schedule",
        ar: "مصنعك يخطط جدول إنتاجه بنفسه",
      },
      lead: {
        en: "Eliminate 3-day manual scheduling cycles. IPE generates optimised production schedules in under 60 seconds — in Arabic, for your factory's exact constraints.",
        ar: "ودّع دورات الجدولة اليدوية التي تستغرق 3 أيام. يُنتج IPE جداول إنتاج مُحسّنة في أقل من 60 ثانية — بالعربية، ووفق قيود مصنعك الفعلية.",
      },
      primaryCta: { en: "Book an IPE Demo", ar: "احجز عرض IPE" },
      secondaryCta: { en: "Download the Technical Brief", ar: "حمّل الملخص التقني" },
    },
    metrics: ipeMetrics,
    steps: [
      {
        title: { en: "Load your factory data", ar: "حمّل بيانات مصنعك" },
        body: {
          en: "Orders, routings, machines, shifts and materials — pulled from SAP, your ERP, or Excel.",
          ar: "الطلبيات ومسارات التشغيل والماكينات والورديات والخامات — من SAP أو نظام ERP أو حتى Excel.",
        },
      },
      {
        title: { en: "IPE optimises", ar: "IPE يُحسّن" },
        body: {
          en: "A constraint-programming engine (OR-Tools CP-SAT) balances due dates, capacity, changeovers and priorities.",
          ar: "محرك برمجة القيود (OR-Tools CP-SAT) يوازن بين مواعيد التسليم والطاقة وأوقات التحويل والأولويات.",
        },
      },
      {
        title: { en: "Schedule goes live in Arabic", ar: "الجدول يعمل بالعربية" },
        body: {
          en: "Planners and supervisors see the plan in Arabic on the floor, and IPE re-plans the moment reality changes.",
          ar: "المخططون والمشرفون يرون الخطة بالعربية في أرض المصنع، ويعيد IPE التخطيط لحظة تغيّر الواقع.",
        },
      },
    ],
    capabilities: [
      {
        icon: "gauge",
        title: { en: "Constraint-based scheduling", ar: "جدولة قائمة على القيود" },
        body: {
          en: "Finite capacity, sequence-dependent setups, labour and material availability — all modelled.",
          ar: "طاقة محدودة، أوقات تجهيز حسب التسلسل، وتوفر العمالة والخامات — كلها في النموذج.",
        },
      },
      {
        icon: "chart",
        title: { en: "Factory Health Score", ar: "مؤشر صحة المصنع" },
        body: {
          en: "One score across OTD, capacity utilisation and quality, so issues surface before customers notice.",
          ar: "مؤشر واحد يجمع التسليم في الموعد واستغلال الطاقة والجودة، لتظهر المشكلات قبل أن يلاحظها العميل.",
        },
      },
      {
        icon: "languages",
        title: { en: "Arabic-native UI & reports", ar: "واجهة وتقارير عربية أصيلة" },
        body: {
          en: "Designed in Arabic first — not a translated English screen. Every report ready for the shop floor.",
          ar: "مُصمم بالعربية أولاً — وليس شاشة إنجليزية مترجمة. كل تقرير جاهز لأرض المصنع.",
        },
      },
      {
        icon: "plug",
        title: { en: "SAP / ERP integration", ar: "تكامل مع SAP وأنظمة ERP" },
        body: {
          en: "Built by a team with 55+ SAP projects. Reads orders and master data, writes back confirmed plans.",
          ar: "بناه فريق نفّذ أكثر من 55 مشروع SAP. يقرأ الطلبيات والبيانات الرئيسية ويعيد الخطط المعتمدة.",
        },
      },
      {
        icon: "refresh",
        title: { en: "Real-time re-planning", ar: "إعادة تخطيط لحظية" },
        body: {
          en: "Machine down? Material late? A new valid schedule in under a minute, not next Monday.",
          ar: "ماكينة متوقفة؟ خامة متأخرة؟ جدول جديد صالح في أقل من دقيقة، وليس يوم الاثنين القادم.",
        },
      },
      {
        icon: "server",
        title: { en: "Enterprise-grade platform", ar: "منصة بمستوى المؤسسات" },
        body: {
          en: "Microservice architecture with a 99.5% uptime SLA, row-level data isolation and an Egypt-hosted option.",
          ar: "بنية خدمات مصغّرة مع ضمان تشغيل 99.5%، وعزل بيانات على مستوى الصف، وخيار استضافة داخل مصر.",
        },
      },
    ],
    useCases: [
      {
        title: { en: "Discrete manufacturing", ar: "التصنيع المتقطع" },
        body: {
          en: "Job shops and assembly lines with high product mix and frequent rush orders.",
          ar: "ورش التشغيل وخطوط التجميع ذات تنوع المنتجات العالي والطلبيات العاجلة المتكررة.",
        },
      },
      {
        title: { en: "FMCG & food", ar: "السلع الاستهلاكية والأغذية" },
        body: {
          en: "Changeover-heavy lines where sequencing by allergen, colour or size drives OEE.",
          ar: "خطوط كثيرة التحويل حيث يحدد التسلسل حسب المكونات أو اللون أو الحجم كفاءة المعدات.",
        },
      },
      {
        title: { en: "Logistics & fleet operations", ar: "اللوجستيات وتشغيل الأساطيل" },
        body: {
          en: "Resource and slot planning across depots, vehicles and crews — the Star Trans pattern.",
          ar: "تخطيط الموارد والمواعيد عبر المستودعات والمركبات والأطقم — نموذج ستار ترانس.",
        },
      },
    ],
    roi: {
      title: { en: "What changes in the first 8 weeks", ar: "ما الذي يتغير في أول 8 أسابيع" },
      rows: [
        {
          label: { en: "Weekly planning cycle", ar: "دورة التخطيط الأسبوعية" },
          before: { en: "2–3 days in Excel", ar: "2–3 أيام على Excel" },
          after: { en: "Under 60 seconds", ar: "أقل من 60 ثانية" },
        },
        {
          label: { en: "Reacting to a breakdown", ar: "الاستجابة لعطل مفاجئ" },
          before: { en: "Schedule broken until next cycle", ar: "الجدول معطّل حتى الدورة التالية" },
          after: { en: "Re-planned in minutes", ar: "إعادة تخطيط خلال دقائق" },
        },
        {
          label: { en: "Implementation", ar: "مدة التنفيذ" },
          before: { en: "12–18 months (global APS)", ar: "12–18 شهراً (أنظمة APS العالمية)" },
          after: { en: "8 weeks, local team", ar: "8 أسابيع، بفريق محلي" },
        },
        {
          label: { en: "Annual cost", ar: "التكلفة السنوية" },
          before: { en: "$300K–$2M (enterprise APS)", ar: "300 ألف – 2 مليون دولار (APS للمؤسسات)" },
          after: { en: "A fraction — EGP pricing available", ar: "جزء بسيط — مع خيار التسعير بالجنيه" },
        },
      ],
    },
    faqs: [
      {
        q: { en: "Will IPE break our SAP or ERP?", ar: "هل سيؤثر IPE على نظام SAP أو ERP لدينا؟" },
        a: {
          en: "No. IPE reads master data and orders through standard interfaces and writes back only approved plans. Your ERP stays the system of record. Our founder has delivered 55+ SAP projects.",
          ar: "لا. يقرأ IPE البيانات الرئيسية والطلبيات عبر واجهات قياسية ولا يعيد إلا الخطط المعتمدة. يظل نظام ERP هو المرجع الأساسي. مؤسسنا نفّذ أكثر من 55 مشروع SAP.",
        },
      },
      {
        q: { en: "How long does deployment take?", ar: "كم تستغرق مدة التشغيل؟" },
        a: {
          en: "Eight weeks from kickoff to live schedules, including data mapping, constraint modelling and planner training.",
          ar: "ثمانية أسابيع من البداية حتى تشغيل الجداول، شاملة ربط البيانات ونمذجة القيود وتدريب المخططين.",
        },
      },
      {
        q: { en: "Does our data leave Egypt?", ar: "هل تخرج بياناتنا من مصر؟" },
        a: {
          en: "Only if you want it to. The default region is EU (Frankfurt); an Egypt-hosted deployment is available for data-sovereignty requirements.",
          ar: "فقط إذا أردت ذلك. المنطقة الافتراضية هي الاتحاد الأوروبي (فرانكفورت)، ويتوفر خيار الاستضافة داخل مصر لمتطلبات سيادة البيانات.",
        },
      },
      {
        q: { en: "Who supports the system after go-live?", ar: "من يدعم النظام بعد التشغيل؟" },
        a: {
          en: "Our Cairo-based team, in Arabic or English, under a written SLA. You never need to maintain the platform yourselves.",
          ar: "فريقنا في القاهرة، بالعربية أو الإنجليزية، وفق اتفاقية مستوى خدمة مكتوبة. لن تحتاجوا لصيانة المنصة بأنفسكم.",
        },
      },
      {
        q: { en: "Can we pay in Egyptian pounds?", ar: "هل يمكن الدفع بالجنيه المصري؟" },
        a: {
          en: "Yes. EGP pricing is available to protect you from currency volatility.",
          ar: "نعم. يتوفر التسعير بالجنيه المصري لحمايتكم من تقلبات العملة.",
        },
      },
    ],
    integrations: ["SAP S/4HANA", "SAP ECC", "Oracle", "Microsoft Dynamics", "PostgreSQL", "Excel"],
    deployment: {
      en: ["8-week deployment", "Planner training included", "Arabic & English support", "99.5% uptime SLA"],
      ar: ["تشغيل خلال 8 أسابيع", "تدريب المخططين مشمول", "دعم بالعربية والإنجليزية", "ضمان تشغيل 99.5%"],
    },
    stickyCta: { en: "Ready to eliminate manual scheduling?", ar: "مستعد للتخلص من الجدولة اليدوية؟" },
    finalCta: {
      title: { en: "See your factory plan itself.", ar: "شاهد مصنعك يخطط لنفسه." },
      body: {
        en: "Bring a real week of orders to a 30-minute demo. We'll schedule it live.",
        ar: "أحضر طلبيات أسبوع حقيقي إلى عرض مدته 30 دقيقة، وسنجدولها أمامك مباشرة.",
      },
    },
  },

  "ceo-os": {
    slug: "ceo-os",
    key: "ceo_os",
    color: "navy",
    icon: "briefcase",
    name: { en: "CEO OS", ar: "CEO OS" },
    category: { en: "Executive Intelligence", ar: "الذكاء التنفيذي" },
    tagline: { en: "Every decision. Fully informed.", ar: "كل قرار. بمعلومات كاملة." },
    benefits: {
      en: [
        "Real-time company performance in Arabic",
        "Board report generated in under 5 minutes",
        "Decision briefs with risks and options, not raw charts",
      ],
      ar: [
        "أداء الشركة لحظياً وبالعربية",
        "تقرير مجلس الإدارة جاهز في أقل من 5 دقائق",
        "ملخصات قرار بالمخاطر والبدائل، لا رسوم بيانية خام",
      ],
    },
    cardCta: { en: "Explore CEO OS", ar: "اكتشف CEO OS" },
    seo: {
      title: {
        en: "CEO OS — Executive Intelligence Platform for MENA CEOs",
        ar: "CEO OS — منصة الذكاء التنفيذي للرؤساء التنفيذيين في مصر والخليج",
      },
      description: {
        en: "CEO OS gives MENA CEOs real-time Arabic strategic intelligence and board-ready reports in under 5 minutes. 4-week deployment. Training included.",
        ar: "CEO OS يمنح الرؤساء التنفيذيين ذكاءً استراتيجياً لحظياً بالعربية وتقارير مجلس إدارة جاهزة في أقل من 5 دقائق. تشغيل خلال 4 أسابيع مع التدريب.",
      },
      keywords: {
        en: ["executive dashboard Arabic", "CEO dashboard Egypt", "board reporting software", "decision intelligence MENA"],
        ar: ["لوحة تحكم تنفيذية بالعربية", "تقارير مجلس الإدارة", "منصة ذكاء القرار", "لوحة معلومات الرئيس التنفيذي"],
      },
    },
    hero: {
      eyebrow: { en: "CEO OS · Executive Intelligence", ar: "CEO OS · الذكاء التنفيذي" },
      title: { en: "Every Decision. Fully Informed.", ar: "كل قرار. بمعلومات كاملة." },
      lead: {
        en: "The AI operating system for MENA CEOs who refuse to run their company on Monday-morning PDF reports.",
        ar: "نظام التشغيل الذكي للرؤساء التنفيذيين في المنطقة الذين يرفضون إدارة شركاتهم بتقارير PDF صباح كل اثنين.",
      },
      primaryCta: { en: "Book a CEO OS Demo", ar: "احجز عرض CEO OS" },
      secondaryCta: { en: "Watch the 2-min overview", ar: "شاهد العرض في دقيقتين" },
    },
    metrics: [
      { id: "board", value: "<5 min", label: { en: "Board report generation", ar: "لإعداد تقرير المجلس" } },
      { id: "deploy", value: "4", label: { en: "Weeks to deploy", ar: "أسابيع للتشغيل" } },
      { id: "support", value: "24h", label: { en: "Support response", ar: "للاستجابة للدعم" } },
      { id: "lang", value: "AR / EN", label: { en: "Native bilingual", ar: "ثنائي اللغة أصيل" } },
    ],
    capabilities: [
      {
        icon: "layout",
        title: { en: "One screen, whole company", ar: "شاشة واحدة، الشركة كلها" },
        body: {
          en: "Finance, operations, sales and people KPIs unified from ERP, CRM and spreadsheets.",
          ar: "مؤشرات المالية والعمليات والمبيعات والموارد البشرية موحّدة من ERP وCRM والجداول.",
        },
      },
      {
        icon: "brain",
        title: { en: "Arabic reasoning, not translation", ar: "تحليل بالعربية، لا ترجمة" },
        body: {
          en: "Ask “why did margin drop in Alexandria?” in Arabic and get a sourced answer.",
          ar: "اسأل «لماذا انخفض الهامش في الإسكندرية؟» بالعربية واحصل على إجابة موثّقة المصدر.",
        },
      },
      {
        icon: "shield",
        title: { en: "Board-grade governance", ar: "حوكمة بمستوى مجلس الإدارة" },
        body: {
          en: "Role-based access, full audit trail and data isolation per company and business unit.",
          ar: "صلاحيات حسب الدور، وسجل تدقيق كامل، وعزل للبيانات لكل شركة ووحدة أعمال.",
        },
      },
    ],
    modules: [
      {
        id: "dashboard",
        title: { en: "Strategic Dashboard", ar: "اللوحة الاستراتيجية" },
        body: {
          en: "Live KPIs against plan, with exceptions flagged before your Monday meeting — not during it.",
          ar: "مؤشرات لحظية مقارنة بالخطة، مع تنبيه للاستثناءات قبل اجتماع الاثنين — وليس أثناءه.",
        },
        points: {
          en: ["Revenue, margin, cash and OTD in one view", "Drill down by site, product or customer", "Mobile-first for the CEO on the move"],
          ar: ["الإيرادات والهامش والسيولة والتسليم في عرض واحد", "تفصيل حسب الموقع أو المنتج أو العميل", "مصمم للجوال أولاً للرئيس التنفيذي المتنقل"],
        },
      },
      {
        id: "decisions",
        title: { en: "Decision Intelligence", ar: "ذكاء القرار" },
        body: {
          en: "For every major decision, a one-page brief: the options, the numbers behind each, and the risks.",
          ar: "لكل قرار مهم، ملخص من صفحة واحدة: البدائل، والأرقام وراء كل منها، والمخاطر.",
        },
        points: {
          en: ["Scenario comparison in plain Arabic", "Leading indicators, not just lagging", "Every figure linked to its source"],
          ar: ["مقارنة السيناريوهات بلغة عربية واضحة", "مؤشرات استباقية لا متأخرة فقط", "كل رقم مرتبط بمصدره"],
        },
      },
      {
        id: "board",
        title: { en: "Board Reporting", ar: "تقارير مجلس الإدارة" },
        body: {
          en: "Your board asks for data. You spend 2 days collecting it. CEO OS generates the board pack in under 5 minutes — in Arabic.",
          ar: "مجلس الإدارة يطلب البيانات، وأنت تقضي يومين في جمعها. CEO OS يُعد حزمة المجلس في أقل من 5 دقائق — بالعربية.",
        },
        points: {
          en: ["Branded Arabic & English packs", "Consistent structure every quarter", "Export to PDF and PowerPoint"],
          ar: ["حزم بالعربية والإنجليزية بهوية شركتك", "هيكل ثابت كل ربع سنة", "تصدير إلى PDF وPowerPoint"],
        },
      },
    ],
    useCases: [
      {
        title: { en: "Family-owned groups", ar: "المجموعات العائلية" },
        body: {
          en: "One view across subsidiaries for the chairman and the next generation of leaders.",
          ar: "رؤية موحدة عبر الشركات التابعة لرئيس المجلس والجيل القادم من القادة.",
        },
      },
      {
        title: { en: "Manufacturing & logistics CEOs", ar: "رؤساء شركات التصنيع واللوجستيات" },
        body: {
          en: "Operational KPIs from IPE flow straight into the executive view.",
          ar: "مؤشرات العمليات من IPE تتدفق مباشرة إلى الرؤية التنفيذية.",
        },
      },
      {
        title: { en: "Boards demanding AI ROI", ar: "مجالس تطالب بعائد الذكاء الاصطناعي" },
        body: {
          en: "Show measured impact of digital investments in the board's own language.",
          ar: "اعرض الأثر المقاس لاستثمارات التحول الرقمي بلغة المجلس نفسه.",
        },
      },
    ],
    roi: {
      title: { en: "Your week, before and after", ar: "أسبوعك قبل وبعد" },
      rows: [
        {
          label: { en: "Board pack preparation", ar: "إعداد حزمة المجلس" },
          before: { en: "2 days of collecting", ar: "يومان من التجميع" },
          after: { en: "Under 5 minutes", ar: "أقل من 5 دقائق" },
        },
        {
          label: { en: "Knowing performance", ar: "معرفة الأداء" },
          before: { en: "Weekly PDF, already stale", ar: "PDF أسبوعي متأخر أصلاً" },
          after: { en: "Live, on your phone", ar: "لحظياً على هاتفك" },
        },
        {
          label: { en: "Deployment", ar: "مدة التشغيل" },
          before: { en: "Months of BI consulting", ar: "شهور من استشارات BI" },
          after: { en: "4 weeks, training included", ar: "4 أسابيع مع التدريب" },
        },
      ],
    },
    faqs: [
      {
        q: { en: "Is this another BI tool my team has to build?", ar: "هل هذه أداة BI أخرى على فريقي بناؤها؟" },
        a: {
          en: "No. CEO OS arrives configured for the questions CEOs actually ask. We connect your sources and set it up in 4 weeks.",
          ar: "لا. يصل CEO OS مهيأً للأسئلة التي يطرحها الرؤساء التنفيذيون فعلاً. نحن نربط مصادرك ونجهزه خلال 4 أسابيع.",
        },
      },
      {
        q: { en: "Who can see what?", ar: "من يرى ماذا؟" },
        a: {
          en: "Access is role-based and every view is logged. Board members can receive read-only packs without system accounts.",
          ar: "الوصول حسب الدور وكل عرض مسجّل. يمكن لأعضاء المجلس استلام حزم للقراءة فقط دون حسابات في النظام.",
        },
      },
      {
        q: { en: "How long is the demo?", ar: "كم مدة العرض التوضيحي؟" },
        a: {
          en: "15 minutes, one-on-one with Waleed. We generate a live board report during the call.",
          ar: "15 دقيقة، مباشرة مع وليد. نُعد تقرير مجلس إدارة حياً أثناء المكالمة.",
        },
      },
    ],
    deployment: {
      en: ["4-week deployment", "Executive training included", "24h support response", "Arabic & English"],
      ar: ["تشغيل خلال 4 أسابيع", "تدريب تنفيذي مشمول", "استجابة للدعم خلال 24 ساعة", "بالعربية والإنجليزية"],
    },
    stickyCta: { en: "See a live board report in 15 minutes.", ar: "شاهد تقرير مجلس إدارة حياً في 15 دقيقة." },
    finalCta: {
      title: { en: "Book a CEO OS demo.", ar: "احجز عرض CEO OS." },
      body: {
        en: "We'll show you a live board report generated in real time during our call.",
        ar: "سنعرض عليك تقرير مجلس إدارة يُعد أمامك مباشرة أثناء المكالمة.",
      },
    },
  },

  nexus: {
    slug: "nexus",
    key: "nexus",
    color: "teal",
    icon: "pen",
    name: { en: "Nexus AI", ar: "Nexus AI" },
    category: { en: "Commercial Intelligence", ar: "الذكاء التجاري" },
    tagline: { en: "Your Arabic content. At scale.", ar: "محتواك العربي. على نطاق واسع." },
    benefits: {
      en: [
        "Professional Arabic content in seconds, not weeks",
        "Conceived in Arabic — never translated from English",
        "Proposals, campaigns and posts from one platform",
      ],
      ar: [
        "محتوى عربي احترافي في ثوانٍ لا أسابيع",
        "مكتوب بالعربية من الأساس — لا مترجم عن الإنجليزية",
        "العروض والحملات والمنشورات من منصة واحدة",
      ],
    },
    cardCta: { en: "Try Nexus AI", ar: "جرّب Nexus AI" },
    seo: {
      title: {
        en: "Nexus AI — Arabic Marketing AI for B2B Companies in MENA",
        ar: "Nexus AI — ذكاء اصطناعي للتسويق بالعربية للشركات في مصر والخليج",
      },
      description: {
        en: "Nexus AI generates professional Arabic marketing content, campaigns and sales proposals in seconds. Arabic conceived, not translated. 30-day free trial.",
        ar: "Nexus AI يكتب محتوى تسويقياً عربياً احترافياً وحملات وعروض مبيعات في ثوانٍ. عربي من الأساس لا مترجم. تجربة مجانية 30 يوماً.",
      },
      keywords: {
        en: ["Arabic content generator", "Arabic marketing AI", "Arabic copywriting AI", "B2B marketing Egypt"],
        ar: ["كتابة محتوى عربي بالذكاء الاصطناعي", "تسويق بالذكاء الاصطناعي", "مولد محتوى عربي", "كتابة إعلانات بالعربية"],
      },
    },
    hero: {
      eyebrow: { en: "Nexus AI · Commercial Intelligence", ar: "Nexus AI · الذكاء التجاري" },
      title: { en: "Your Arabic Content. At Scale. Without Agencies.", ar: "محتواك العربي. على نطاق واسع. بلا وكالات." },
      lead: {
        en: "Generate professional Arabic marketing content in seconds — not weeks. Arabic conceived, not translated.",
        ar: "اكتب محتوى تسويقياً عربياً احترافياً في ثوانٍ — لا أسابيع. عربي في أصله، لا مترجم.",
      },
      primaryCta: { en: "Try the Arabic Generator Free", ar: "جرّب المولّد العربي مجاناً" },
      secondaryCta: { en: "Book a Demo", ar: "احجز عرضاً توضيحياً" },
    },
    metrics: [
      { id: "speed", value: "60s", label: { en: "Per campaign draft", ar: "لكل مسودة حملة" } },
      { id: "cost", value: "−90%", label: { en: "Cost per content piece", ar: "تكلفة قطعة المحتوى" } },
      { id: "trial", value: "30", label: { en: "Day free trial", ar: "يوم تجربة مجانية" } },
      { id: "dialects", value: "3", label: { en: "Arabic registers: MSA, Egyptian, Gulf", ar: "مستويات عربية: فصحى، مصري، خليجي" } },
    ],
    capabilities: [
      {
        icon: "languages",
        title: { en: "Arabic-first models", ar: "نماذج عربية أولاً" },
        body: {
          en: "Tuned for Modern Standard Arabic, Egyptian and Gulf registers — you choose the voice.",
          ar: "مضبوطة للفصحى المعاصرة واللهجتين المصرية والخليجية — أنت تختار الصوت.",
        },
      },
      {
        icon: "target",
        title: { en: "Campaign optimisation", ar: "تحسين الحملات" },
        body: {
          en: "Variant testing and performance feedback so every campaign learns from the last.",
          ar: "اختبار البدائل وقياس الأداء لتتعلم كل حملة من سابقتها.",
        },
      },
      {
        icon: "file",
        title: { en: "Sales proposals", ar: "عروض المبيعات" },
        body: {
          en: "Bilingual proposals built from your product data and past wins, in your brand voice.",
          ar: "عروض ثنائية اللغة مبنية على بيانات منتجاتك ونجاحاتك السابقة، بصوت علامتك.",
        },
      },
    ],
    modules: [
      {
        id: "content",
        title: { en: "Arabic Content Generation", ar: "توليد المحتوى العربي" },
        body: {
          en: "LinkedIn posts, emails, landing pages and ads — written in Arabic from the first word.",
          ar: "منشورات لينكدإن ورسائل بريد وصفحات هبوط وإعلانات — مكتوبة بالعربية من أول كلمة.",
        },
        points: {
          en: ["Brand-voice memory", "Industry glossaries (manufacturing, logistics, FMCG)", "Human review workflow"],
          ar: ["ذاكرة لصوت العلامة", "مسارد قطاعية (تصنيع، لوجستيات، سلع استهلاكية)", "مسار مراجعة بشرية"],
        },
      },
      {
        id: "campaigns",
        title: { en: "Campaign Optimisation", ar: "تحسين الحملات" },
        body: {
          en: "Plan, generate and measure multi-channel Arabic campaigns from one calendar.",
          ar: "خطط وولّد وقِس حملات عربية متعددة القنوات من تقويم واحد.",
        },
        points: {
          en: ["A/B variants in seconds", "Engagement tracking per post", "Weekly performance brief"],
          ar: ["بدائل A/B في ثوانٍ", "تتبع التفاعل لكل منشور", "ملخص أداء أسبوعي"],
        },
      },
      {
        id: "proposals",
        title: { en: "Sales Proposals", ar: "عروض المبيعات" },
        body: {
          en: "Turn a discovery call into a polished Arabic and English proposal the same afternoon.",
          ar: "حوّل مكالمة استكشافية إلى عرض أنيق بالعربية والإنجليزية في نفس اليوم.",
        },
        points: {
          en: ["Pulls from your case studies", "Consistent pricing tables", "Export to Word and PDF"],
          ar: ["يستفيد من دراسات الحالة لديك", "جداول تسعير متسقة", "تصدير إلى Word وPDF"],
        },
      },
    ],
    useCases: [
      {
        title: { en: "B2B manufacturers", ar: "المصنّعون في قطاع الأعمال" },
        body: {
          en: "Keep a steady Arabic LinkedIn presence without a full-time copywriting team.",
          ar: "حافظ على حضور عربي منتظم على لينكدإن دون فريق كتابة متفرغ.",
        },
      },
      {
        title: { en: "Commercial teams", ar: "الفرق التجارية" },
        body: {
          en: "Proposals and follow-ups in Arabic that sound like your best salesperson.",
          ar: "عروض ومتابعات بالعربية تبدو كأنها من أفضل مندوب مبيعات لديك.",
        },
      },
      {
        title: { en: "Marketing heads", ar: "مديرو التسويق" },
        body: {
          en: "Finally measure ROI on Arabic content — cost per piece and engagement per post.",
          ar: "قِس أخيراً عائد المحتوى العربي — التكلفة لكل قطعة والتفاعل لكل منشور.",
        },
      },
    ],
    roi: {
      title: { en: "Before and after Nexus AI", ar: "قبل Nexus AI وبعده" },
      rows: [
        {
          label: { en: "Time to campaign", ar: "الوقت حتى الحملة" },
          before: { en: "2 weeks", ar: "أسبوعان" },
          after: { en: "60 seconds to first draft", ar: "60 ثانية لأول مسودة" },
        },
        {
          label: { en: "Who writes it", ar: "من يكتب" },
          before: { en: "3 agencies", ar: "3 وكالات" },
          after: { en: "Nexus AI + your reviewer", ar: "Nexus AI + مراجعك" },
        },
        {
          label: { en: "Cost", ar: "التكلفة" },
          before: { en: "EGP 50K per campaign", ar: "50 ألف جنيه للحملة" },
          after: { en: "~EGP 2K per month (subscription)", ar: "حوالي 2 ألف جنيه شهرياً (اشتراك)" },
        },
      ],
    },
    faqs: [
      {
        q: { en: "Is the Arabic actually good?", ar: "هل العربية جيدة فعلاً؟" },
        a: {
          en: "Try the generator on this page. Nexus AI writes in Arabic first, with native reviewers shaping its style guides.",
          ar: "جرّب المولّد في هذه الصفحة. يكتب Nexus AI بالعربية أولاً، مع مراجعين من أهل اللغة يضبطون أدلة الأسلوب.",
        },
      },
      {
        q: { en: "Do we need a credit card for the trial?", ar: "هل نحتاج بطاقة ائتمان للتجربة؟" },
        a: {
          en: "No. The first 30 days are free with no credit card required.",
          ar: "لا. أول 30 يوماً مجانية دون الحاجة لبطاقة ائتمان.",
        },
      },
      {
        q: { en: "Who owns the content?", ar: "لمن تعود ملكية المحتوى؟" },
        a: {
          en: "You do. Your prompts and outputs are isolated to your organisation and never used to train shared models.",
          ar: "لكم. مدخلاتكم ومخرجاتكم معزولة داخل مؤسستكم ولا تُستخدم لتدريب نماذج مشتركة.",
        },
      },
    ],
    deployment: {
      en: ["Live in 1 day", "30-day free trial", "No credit card", "Arabic & English support"],
      ar: ["يعمل خلال يوم واحد", "تجربة مجانية 30 يوماً", "بلا بطاقة ائتمان", "دعم بالعربية والإنجليزية"],
    },
    stickyCta: { en: "Your first 30 days are free.", ar: "أول 30 يوماً مجاناً." },
    finalCta: {
      title: { en: "Free for your first 30 days.", ar: "مجاناً لأول 30 يوماً." },
      body: { en: "No credit card required. Cancel anytime.", ar: "بلا بطاقة ائتمان. ألغِ في أي وقت." },
    },
  },
};

export const productList: Product[] = [products.ipe, products["ceo-os"], products.nexus];

export const productColorClasses: Record<
  ProductColor,
  { text: string; bg: string; border: string; softBg: string; button: string; ring: string }
> = {
  orange: {
    text: "text-brand-orange",
    bg: "bg-brand-orange",
    border: "border-brand-orange",
    softBg: "bg-brand-orange/10",
    button: "bg-brand-orange hover:bg-brand-orange-dark text-white",
    ring: "ring-brand-orange/30",
  },
  navy: {
    text: "text-brand-navy",
    bg: "bg-brand-navy",
    border: "border-brand-navy",
    softBg: "bg-brand-navy/10",
    button: "bg-brand-navy hover:bg-brand-navy-dark text-white",
    ring: "ring-brand-navy/30",
  },
  teal: {
    text: "text-brand-teal-dark",
    bg: "bg-brand-teal",
    border: "border-brand-teal",
    softBg: "bg-brand-teal/10",
    button: "bg-brand-teal-dark hover:bg-brand-teal text-white",
    ring: "ring-brand-teal/30",
  },
};
