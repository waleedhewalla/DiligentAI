/**
 * CONFIGURABLE — every product and service we sell.
 *
 * To add an offering, append an object below. Required fields drive the
 * card, menu and hero; every optional field (metrics, steps, roi, faqs,
 * integrations, deployment, caseStudy, demo) adds its own page section only
 * when present — so a thin new service and a mature product both render well.
 *
 * `brand` and `launch` are optional: the former products (IPE, CEO OS,
 * Nexus AI) keep their names as badges and remain launchable from the
 * portal, but the site is organised by what they solve, not what they're called.
 */
import { ipeMetrics } from "../proof";
import type { Offering } from "./types";

export const offerings: Offering[] = [
  // ─── AI Products & Solutions ──────────────────────────────────────────
  {
    slug: "ai-readiness-assessment",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "compass",
    accent: "navy",
    title: { en: "AI Readiness & Use-Case Assessment", ar: "تقييم الجاهزية وحالات استخدام الذكاء الاصطناعي" },
    summary: {
      en: "Find, size and rank the AI opportunities in your plant before you spend on software.",
      ar: "اكتشف فرص الذكاء الاصطناعي في مصنعك وقدّرها ورتّبها قبل أن تنفق على البرمجيات.",
    },
    lead: {
      en: "Your board wants an AI plan; your team wants to know where to start. In a few weeks we map your processes, data and systems, and hand you a ranked roadmap with a business case for each use case.",
      ar: "مجلس إدارتك يريد خطة للذكاء الاصطناعي، وفريقك يريد أن يعرف من أين يبدأ. خلال أسابيع قليلة نرسم خريطة عملياتك وبياناتك وأنظمتك، ونسلّمك خارطة طريق مرتبة مع دراسة جدوى لكل حالة استخدام.",
    },
    serviceModels: ["consult"],
    capabilities: ["production-scheduling", "demand-planning", "production-forecasting", "quality-control", "supply-chain-optimization", "predictive-maintenance", "executive-decision-intelligence"],
    problems: {
      en: ["Board pressure to “do AI” with no clear starting point", "Vendors pitching tools before anyone has looked at the data", "No baseline to prove ROI afterwards"],
      ar: ["ضغط مجلس الإدارة لتطبيق الذكاء الاصطناعي دون نقطة بداية واضحة", "موردون يعرضون أدوات قبل أن ينظر أحد إلى البيانات", "لا خط أساس لإثبات العائد لاحقاً"],
    },
    features: [
      { icon: "clipboard", title: { en: "Process & data assessment", ar: "تقييم العمليات والبيانات" }, body: { en: "On-site review of planning, quality, maintenance and supply processes, plus the data behind them.", ar: "مراجعة ميدانية لعمليات التخطيط والجودة والصيانة والإمداد، والبيانات التي تقف خلفها." } },
      { icon: "target", title: { en: "Ranked use cases", ar: "حالات استخدام مرتبة" }, body: { en: "Every opportunity scored on value, feasibility and time-to-impact.", ar: "كل فرصة مقيّمة حسب القيمة وقابلية التنفيذ والوقت حتى الأثر." } },
      { icon: "network", title: { en: "Architecture plan", ar: "خطة البنية" }, body: { en: "How AI will connect to your ERP, MES and data — and what it will cost.", ar: "كيف سيتصل الذكاء الاصطناعي بأنظمة ERP وMES وبياناتك — وكم سيكلف." } },
    ],
    deployment: {
      en: ["Typically 2–4 weeks", "On-site workshops in Arabic or English", "Board-ready roadmap", "Fixed fee"],
      ar: ["عادةً 2–4 أسابيع", "ورش عمل ميدانية بالعربية أو الإنجليزية", "خارطة طريق جاهزة لمجلس الإدارة", "أتعاب ثابتة"],
    },
    seo: {
      title: { en: "AI Readiness Assessment for Manufacturers in Egypt & the Gulf", ar: "تقييم جاهزية الذكاء الاصطناعي للمصانع في مصر والخليج" },
      description: {
        en: "A 2–4 week AI assessment for manufacturers: process and data review, ranked use cases with business cases, and an integration plan.",
        ar: "تقييم للذكاء الاصطناعي للمصانع خلال 2–4 أسابيع: مراجعة العمليات والبيانات، وحالات استخدام مرتبة بدراسات جدوى، وخطة تكامل.",
      },
      keywords: { en: ["AI consulting manufacturing", "AI readiness assessment", "AI roadmap Egypt"], ar: ["استشارات الذكاء الاصطناعي للتصنيع", "تقييم الجاهزية للذكاء الاصطناعي", "خارطة طريق الذكاء الاصطناعي"] },
    },
  },
  {
    slug: "ai-production-scheduling",
    category: "ai-solutions",
    kind: "product",
    status: "available",
    icon: "factory",
    accent: "orange",
    brand: "IPE",
    launch: "ipe",
    title: { en: "AI Production Scheduling", ar: "جدولة الإنتاج بالذكاء الاصطناعي" },
    summary: {
      en: "Pre-built planning engine: optimised schedules in under 60 seconds, re-planned instantly.",
      ar: "محرك تخطيط جاهز: جداول مُحسّنة في أقل من 60 ثانية، وإعادة تخطيط فورية.",
    },
    lead: {
      en: "Eliminate 3-day manual scheduling cycles. Our planning engine generates optimised production schedules in under 60 seconds — in Arabic, for your factory's exact constraints.",
      ar: "ودّع دورات الجدولة اليدوية التي تستغرق 3 أيام. يُنتج محرك التخطيط جداول إنتاج مُحسّنة في أقل من 60 ثانية — بالعربية، ووفق قيود مصنعك الفعلية.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["production-scheduling", "production-forecasting"],
    problems: {
      en: ["Weekly schedule takes 2–3 days in Excel", "The plan breaks when one machine or material slips", "On-time delivery misses target"],
      ar: ["الجدول الأسبوعي يستغرق 2–3 أيام على Excel", "الخطة تنكسر عند تعطل ماكينة أو تأخر خامة", "هدف التسليم في الموعد يفوت"],
    },
    features: [
      { icon: "gauge", title: { en: "Constraint-based scheduling", ar: "جدولة قائمة على القيود" }, body: { en: "Finite capacity, sequence-dependent setups, labour and material availability — all modelled.", ar: "طاقة محدودة، أوقات تجهيز حسب التسلسل، وتوفر العمالة والخامات — كلها في النموذج." } },
      { icon: "chart", title: { en: "Factory Health Score", ar: "مؤشر صحة المصنع" }, body: { en: "One score across OTD, capacity utilisation and quality.", ar: "مؤشر واحد يجمع التسليم في الموعد واستغلال الطاقة والجودة." } },
      { icon: "languages", title: { en: "Arabic-native UI & reports", ar: "واجهة وتقارير عربية أصيلة" }, body: { en: "Designed in Arabic first for the shop floor — not a translated screen.", ar: "مُصمم بالعربية أولاً لأرض المصنع — وليس شاشة مترجمة." } },
      { icon: "plug", title: { en: "SAP / ERP integration", ar: "تكامل مع SAP وأنظمة ERP" }, body: { en: "Reads orders and master data, writes back confirmed plans.", ar: "يقرأ الطلبيات والبيانات الرئيسية ويعيد الخطط المعتمدة." } },
      { icon: "refresh", title: { en: "Real-time re-planning", ar: "إعادة تخطيط لحظية" }, body: { en: "Machine down or material late? A new valid schedule in under a minute.", ar: "ماكينة متوقفة أو خامة متأخرة؟ جدول جديد صالح في أقل من دقيقة." } },
      { icon: "server", title: { en: "Enterprise-grade platform", ar: "منصة بمستوى المؤسسات" }, body: { en: "99.5% uptime SLA, row-level data isolation and an Egypt-hosted option.", ar: "ضمان تشغيل 99.5%، وعزل بيانات على مستوى الصف، وخيار استضافة داخل مصر." } },
    ],
    metrics: ipeMetrics,
    steps: [
      { title: { en: "Load your factory data", ar: "حمّل بيانات مصنعك" }, body: { en: "Orders, routings, machines, shifts and materials — from SAP, your ERP or Excel.", ar: "الطلبيات ومسارات التشغيل والماكينات والورديات والخامات — من SAP أو ERP أو Excel." } },
      { title: { en: "The engine optimises", ar: "المحرك يُحسّن" }, body: { en: "OR-Tools CP-SAT balances due dates, capacity, changeovers and priorities.", ar: "محرك OR-Tools CP-SAT يوازن مواعيد التسليم والطاقة وأوقات التحويل والأولويات." } },
      { title: { en: "Schedule goes live in Arabic", ar: "الجدول يعمل بالعربية" }, body: { en: "Planners see the plan in Arabic, and it re-plans the moment reality changes.", ar: "المخططون يرون الخطة بالعربية، ويُعاد التخطيط لحظة تغيّر الواقع." } },
    ],
    roi: {
      title: { en: "What changes in the first 8 weeks", ar: "ما الذي يتغير في أول 8 أسابيع" },
      rows: [
        { label: { en: "Weekly planning cycle", ar: "دورة التخطيط الأسبوعية" }, before: { en: "2–3 days in Excel", ar: "2–3 أيام على Excel" }, after: { en: "Under 60 seconds", ar: "أقل من 60 ثانية" } },
        { label: { en: "Reacting to a breakdown", ar: "الاستجابة لعطل مفاجئ" }, before: { en: "Schedule broken until next cycle", ar: "الجدول معطّل حتى الدورة التالية" }, after: { en: "Re-planned in minutes", ar: "إعادة تخطيط خلال دقائق" } },
        { label: { en: "Implementation", ar: "مدة التنفيذ" }, before: { en: "12–18 months (global APS)", ar: "12–18 شهراً (أنظمة APS العالمية)" }, after: { en: "8 weeks, local team", ar: "8 أسابيع، بفريق محلي" } },
      ],
    },
    integrations: ["SAP S/4HANA", "SAP ECC", "Oracle", "Microsoft Dynamics", "Odoo", "Excel"],
    deployment: {
      en: ["8-week deployment", "Planner training included", "Arabic & English support", "99.5% uptime SLA"],
      ar: ["تشغيل خلال 8 أسابيع", "تدريب المخططين مشمول", "دعم بالعربية والإنجليزية", "ضمان تشغيل 99.5%"],
    },
    faqs: [
      { q: { en: "Will this break our SAP or ERP?", ar: "هل سيؤثر ذلك على نظام SAP أو ERP لدينا؟" }, a: { en: "No. It reads master data and orders through standard interfaces and writes back only approved plans. Your ERP stays the system of record.", ar: "لا. يقرأ البيانات الرئيسية والطلبيات عبر واجهات قياسية ولا يعيد إلا الخطط المعتمدة. يظل نظام ERP هو المرجع." } },
      { q: { en: "Does our data leave Egypt?", ar: "هل تخرج بياناتنا من مصر؟" }, a: { en: "Only if you want it to. EU (Frankfurt) is the default region; an Egypt-hosted deployment is available.", ar: "فقط إذا أردت. المنطقة الافتراضية هي الاتحاد الأوروبي (فرانكفورت)، ويتوفر خيار الاستضافة داخل مصر." } },
      { q: { en: "Can we pay in Egyptian pounds?", ar: "هل يمكن الدفع بالجنيه المصري؟" }, a: { en: "Yes. EGP pricing is available.", ar: "نعم. يتوفر التسعير بالجنيه المصري." } },
    ],
    caseStudy: "star-trans",
    download: { path: "/downloads/ipe-technical-brief.pdf", label: { en: "Download the Technical Brief", ar: "حمّل الملخص التقني" } },
    seo: {
      title: { en: "AI Production Scheduling Software for MENA Manufacturers", ar: "برنامج جدولة الإنتاج بالذكاء الاصطناعي للمصانع في مصر والخليج" },
      description: {
        en: "Automated production schedules in under 60 seconds. Built for Egyptian and Gulf manufacturers. Arabic-native, SAP-integrated, 8-week deployment.",
        ar: "جداول إنتاج تلقائية في أقل من 60 ثانية. مصمم للمصانع المصرية والخليجية. عربي أصيل، متكامل مع SAP، وتشغيل خلال 8 أسابيع.",
      },
      keywords: { en: ["production scheduling software Egypt", "APS software MENA", "AI production planning"], ar: ["برنامج جدولة الإنتاج", "تخطيط الإنتاج بالذكاء الاصطناعي", "برنامج تخطيط المصانع مصر"] },
    },
  },
  {
    slug: "custom-ai-models",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "cpu",
    accent: "teal",
    title: { en: "Custom AI Models", ar: "نماذج ذكاء اصطناعي مخصصة" },
    summary: {
      en: "Forecasting, vision inspection and maintenance models trained on your plant's own data.",
      ar: "نماذج للتنبؤ والفحص البصري والصيانة مدربة على بيانات مصنعك.",
    },
    lead: {
      en: "When no off-the-shelf tool fits, we build one. Our team designs, trains and deploys machine-learning models on your history — and runs them in production with monitoring, not in a slide deck.",
      ar: "حين لا تناسبك أداة جاهزة، نبنيها. يصمم فريقنا نماذج التعلم الآلي ويدربها وينشرها على بياناتك التاريخية — ويشغلها إنتاجياً مع المراقبة، لا في عرض تقديمي.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["demand-planning", "production-forecasting", "quality-control", "predictive-maintenance", "supply-chain-optimization"],
    problems: {
      en: ["Your process is too specific for generic software", "Data sits in historians and spreadsheets, unused", "Pilots that never make it to production"],
      ar: ["عمليتك خاصة جداً على البرمجيات العامة", "البيانات حبيسة الأنظمة والجداول دون استخدام", "تجارب لا تصل أبداً إلى الإنتاج"],
    },
    features: [
      { icon: "trending", title: { en: "Forecasting models", ar: "نماذج التنبؤ" }, body: { en: "Demand, output, yield and lead-time forecasts with regional calendars built in.", ar: "توقعات الطلب والإنتاج والعائد ومهل التوريد مع التقويم المحلي." } },
      { icon: "scan", title: { en: "Computer vision", ar: "الرؤية الحاسوبية" }, body: { en: "Defect detection, counting and label checks on your cameras.", ar: "اكتشاف العيوب والعد والتحقق من الملصقات على كاميراتك." } },
      { icon: "wrench", title: { en: "Predictive maintenance", ar: "الصيانة التنبؤية" }, body: { en: "Failure-risk models from sensor, PLC and maintenance history.", ar: "نماذج مخاطر الأعطال من الحساسات وPLC وسجل الصيانة." } },
      { icon: "shield", title: { en: "MLOps included", ar: "تشغيل النماذج مشمول" }, body: { en: "Monitoring, drift alerts and retraining so models stay accurate.", ar: "مراقبة وتنبيهات الانحراف وإعادة التدريب لتبقى النماذج دقيقة." } },
    ],
    steps: [
      { title: { en: "Baseline", ar: "خط الأساس" }, body: { en: "Agree the metric and measure today's performance.", ar: "نتفق على المؤشر ونقيس الأداء الحالي." } },
      { title: { en: "Prototype", ar: "النموذج الأولي" }, body: { en: "A working model on your historical data within weeks.", ar: "نموذج يعمل على بياناتك التاريخية خلال أسابيع." } },
      { title: { en: "Production", ar: "الإنتاج" }, body: { en: "Integrated, monitored and handed over — or run by us.", ar: "متكامل ومراقب ومُسلّم — أو نشغله نحن." } },
    ],
    deployment: {
      en: ["Typically 6–12 weeks to production", "You own the model and data", "Arabic dashboards", "Optional managed operation"],
      ar: ["عادةً 6–12 أسبوعاً حتى الإنتاج", "تملك النموذج والبيانات", "لوحات عربية", "تشغيل مُدار اختياري"],
    },
    seo: {
      title: { en: "Custom AI & Machine-Learning Development for Manufacturing", ar: "تطوير نماذج ذكاء اصطناعي وتعلم آلي مخصصة للتصنيع" },
      description: {
        en: "Custom forecasting, computer-vision and predictive-maintenance models trained on your plant data and run in production with monitoring.",
        ar: "نماذج مخصصة للتنبؤ والرؤية الحاسوبية والصيانة التنبؤية مدربة على بيانات مصنعك وتعمل إنتاجياً مع المراقبة.",
      },
      keywords: { en: ["custom AI manufacturing", "machine learning development Egypt", "computer vision factory"], ar: ["تطوير ذكاء اصطناعي مخصص", "تعلم آلي للمصانع", "رؤية حاسوبية للمصانع"] },
    },
  },
  {
    slug: "executive-intelligence",
    category: "ai-solutions",
    kind: "product",
    status: "available",
    icon: "briefcase",
    accent: "navy",
    brand: "CEO OS",
    launch: "ceo_os",
    title: { en: "Executive Intelligence Platform", ar: "منصة الذكاء التنفيذي" },
    summary: {
      en: "Pre-built Arabic executive cockpit: live KPIs and board packs in under 5 minutes.",
      ar: "لوحة قيادة تنفيذية عربية جاهزة: مؤشرات لحظية وحزم مجلس إدارة في أقل من 5 دقائق.",
    },
    lead: {
      en: "For manufacturing CEOs who refuse to run their company on Monday-morning PDF reports. One Arabic view across plant, finance and sales — with the board pack generated for you.",
      ar: "لرؤساء شركات التصنيع الذين يرفضون إدارة شركاتهم بتقارير PDF صباح كل اثنين. رؤية عربية واحدة عبر المصنع والمالية والمبيعات — مع حزمة مجلس الإدارة جاهزة.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["executive-decision-intelligence", "production-forecasting"],
    problems: {
      en: ["Two days collecting data before every board meeting", "Departments report different numbers", "Performance seen a week late"],
      ar: ["يومان لجمع البيانات قبل كل اجتماع مجلس", "الأقسام تقدم أرقاماً مختلفة", "الأداء يُرى متأخراً أسبوعاً"],
    },
    features: [
      { icon: "layout", title: { en: "Strategic dashboard", ar: "اللوحة الاستراتيجية" }, body: { en: "Revenue, margin, cash and OTD against plan, by site, product and customer.", ar: "الإيرادات والهامش والسيولة والتسليم مقابل الخطة حسب الموقع والمنتج والعميل." } },
      { icon: "brain", title: { en: "Decision intelligence", ar: "ذكاء القرار" }, body: { en: "Ask in Arabic; get a sourced answer with options and risks.", ar: "اسأل بالعربية واحصل على إجابة موثقة المصدر مع البدائل والمخاطر." } },
      { icon: "file", title: { en: "Board reporting", ar: "تقارير مجلس الإدارة" }, body: { en: "Branded Arabic and English board packs in under 5 minutes.", ar: "حزم مجلس إدارة بالعربية والإنجليزية بهوية شركتك في أقل من 5 دقائق." } },
    ],
    metrics: [
      { id: "board", value: "<5 min", label: { en: "Board report generation", ar: "لإعداد تقرير المجلس" } },
      { id: "deploy", value: "4", label: { en: "Weeks to deploy", ar: "أسابيع للتشغيل" } },
      { id: "support", value: "24h", label: { en: "Support response", ar: "للاستجابة للدعم" } },
    ],
    deployment: {
      en: ["4-week deployment", "Executive training included", "24h support response", "Arabic & English"],
      ar: ["تشغيل خلال 4 أسابيع", "تدريب تنفيذي مشمول", "استجابة للدعم خلال 24 ساعة", "بالعربية والإنجليزية"],
    },
    caseStudy: "star-trans",
    seo: {
      title: { en: "Executive Intelligence & Board Reporting for Manufacturing CEOs", ar: "منصة الذكاء التنفيذي وتقارير مجلس الإدارة لرؤساء شركات التصنيع" },
      description: {
        en: "Real-time Arabic executive intelligence and board-ready reports in under 5 minutes. 4-week deployment, training included.",
        ar: "ذكاء تنفيذي لحظي بالعربية وتقارير مجلس إدارة جاهزة في أقل من 5 دقائق. تشغيل خلال 4 أسابيع مع التدريب.",
      },
      keywords: { en: ["executive dashboard Arabic", "board reporting software", "CEO dashboard Egypt"], ar: ["لوحة تحكم تنفيذية بالعربية", "تقارير مجلس الإدارة", "لوحة معلومات الرئيس التنفيذي"] },
    },
  },
  {
    slug: "arabic-commercial-content",
    category: "ai-solutions",
    kind: "product",
    status: "available",
    icon: "pen",
    accent: "teal",
    brand: "Nexus AI",
    launch: "nexus",
    demo: "arabic-content-generator",
    title: { en: "Arabic Commercial Content AI", ar: "ذكاء المحتوى التجاري العربي" },
    summary: {
      en: "Proposals, campaigns and LinkedIn content for industrial B2B — written in Arabic, not translated.",
      ar: "عروض وحملات ومحتوى لينكدإن للشركات الصناعية — مكتوب بالعربية لا مترجم.",
    },
    lead: {
      en: "Manufacturers sell to Arabic-speaking buyers with translated brochures. Generate professional Arabic proposals, emails and posts in seconds — Arabic conceived, not translated.",
      ar: "المصانع تبيع لمشترين عرب بكتيبات مترجمة. اكتب عروضاً ورسائل ومنشورات عربية احترافية في ثوانٍ — عربية في أصلها، لا مترجمة.",
    },
    serviceModels: ["build"],
    capabilities: [],
    problems: {
      en: ["Arabic campaigns take 2 weeks and 3 agencies", "EGP 50K per campaign with no measurable ROI", "Sales proposals copied from old English templates"],
      ar: ["الحملات العربية تستغرق أسبوعين و3 وكالات", "50 ألف جنيه للحملة دون عائد قابل للقياس", "عروض مبيعات منسوخة من قوالب إنجليزية قديمة"],
    },
    features: [
      { icon: "languages", title: { en: "Arabic-first models", ar: "نماذج عربية أولاً" }, body: { en: "Modern Standard, Egyptian and Gulf registers — you choose the voice.", ar: "الفصحى المعاصرة واللهجتان المصرية والخليجية — أنت تختار الصوت." } },
      { icon: "file", title: { en: "Sales proposals", ar: "عروض المبيعات" }, body: { en: "Bilingual proposals from your product data and past wins.", ar: "عروض ثنائية اللغة من بيانات منتجاتك ونجاحاتك السابقة." } },
      { icon: "target", title: { en: "Campaign optimisation", ar: "تحسين الحملات" }, body: { en: "Variant testing and engagement tracking per post.", ar: "اختبار البدائل وتتبع التفاعل لكل منشور." } },
    ],
    metrics: [
      { id: "speed", value: "60s", label: { en: "Per campaign draft", ar: "لكل مسودة حملة" } },
      { id: "cost", value: "−90%", label: { en: "Cost per content piece", ar: "تكلفة قطعة المحتوى" } },
      { id: "trial", value: "30", label: { en: "Day free trial", ar: "يوم تجربة مجانية" } },
    ],
    deployment: {
      en: ["Live in 1 day", "30-day free trial", "No credit card", "Arabic & English support"],
      ar: ["يعمل خلال يوم واحد", "تجربة مجانية 30 يوماً", "بلا بطاقة ائتمان", "دعم بالعربية والإنجليزية"],
    },
    seo: {
      title: { en: "Arabic Marketing & Proposal AI for Industrial B2B Companies", ar: "ذكاء اصطناعي للتسويق والعروض بالعربية للشركات الصناعية" },
      description: {
        en: "Generate professional Arabic proposals, campaigns and posts for industrial B2B in seconds. Arabic conceived, not translated. 30-day free trial.",
        ar: "اكتب عروضاً وحملات ومنشورات عربية احترافية للشركات الصناعية في ثوانٍ. عربية في أصلها لا مترجمة. تجربة مجانية 30 يوماً.",
      },
      keywords: { en: ["Arabic content generator", "Arabic marketing AI", "B2B marketing Egypt"], ar: ["كتابة محتوى عربي بالذكاء الاصطناعي", "مولد محتوى عربي", "التسويق بين الشركات"] },
    },
  },

  // ─── System Integration ───────────────────────────────────────────────
  {
    slug: "erp-ai-integration",
    category: "system-integration",
    kind: "service",
    status: "available",
    icon: "plug",
    accent: "teal",
    title: { en: "AI-to-ERP Integration", ar: "تكامل الذكاء الاصطناعي مع ERP" },
    summary: {
      en: "Connect AI to SAP, Oracle, Dynamics or Odoo — read master data, write back decisions.",
      ar: "اربط الذكاء الاصطناعي بـ SAP أو Oracle أو Dynamics أو Odoo — اقرأ البيانات الرئيسية وأعد القرارات.",
    },
    lead: {
      en: "AI that can't see your ERP is a demo. We connect models and tools to your ERP through standard, supportable interfaces — built by a team with 55+ SAP projects behind it. Your ERP stays the system of record.",
      ar: "الذكاء الاصطناعي الذي لا يرى نظام ERP مجرد عرض توضيحي. نربط النماذج والأدوات بنظامك عبر واجهات قياسية قابلة للدعم — بفريق نفّذ أكثر من 55 مشروع SAP. ويبقى ERP هو المرجع.",
    },
    serviceModels: ["integrate"],
    capabilities: ["production-scheduling", "demand-planning", "supply-chain-optimization", "executive-decision-intelligence"],
    problems: {
      en: ["IT fears AI will break the ERP", "Data exported to Excel by hand every week", "Recommendations nobody can act on in the system"],
      ar: ["تقنية المعلومات تخشى أن يعطّل الذكاء الاصطناعي نظام ERP", "تصدير البيانات يدوياً إلى Excel كل أسبوع", "توصيات لا يستطيع أحد تنفيذها داخل النظام"],
    },
    features: [
      { icon: "database", title: { en: "Standard connectors", ar: "موصلات قياسية" }, body: { en: "OData, BAPI/RFC, IDoc, REST and database views — no core modifications.", ar: "OData وBAPI/RFC وIDoc وREST وعروض قواعد البيانات — دون تعديل النواة." } },
      { icon: "refresh", title: { en: "Write-back with approval", ar: "إعادة الكتابة مع الاعتماد" }, body: { en: "AI proposals return to the ERP only after a user approves them.", ar: "مقترحات الذكاء الاصطناعي تعود إلى ERP فقط بعد اعتماد المستخدم." } },
      { icon: "shield", title: { en: "Security & audit", ar: "الأمان والتدقيق" }, body: { en: "Least-privilege service users, encrypted transport and a full audit trail.", ar: "مستخدمو خدمة بأقل صلاحيات، ونقل مشفر، وسجل تدقيق كامل." } },
    ],
    integrations: ["SAP S/4HANA", "SAP ECC", "Oracle E-Business Suite", "Oracle Fusion", "Microsoft Dynamics 365", "Odoo"],
    deployment: {
      en: ["Typically 3–8 weeks", "No ERP core modification", "Documentation for your IT team", "Support SLA"],
      ar: ["عادةً 3–8 أسابيع", "دون تعديل نواة ERP", "توثيق لفريق تقنية المعلومات", "اتفاقية مستوى دعم"],
    },
    faqs: [
      { q: { en: "Do you modify our ERP?", ar: "هل تعدلون نظام ERP لدينا؟" }, a: { en: "No core modifications. We use standard, vendor-supported interfaces and dedicated service users.", ar: "لا تعديل على النواة. نستخدم واجهات قياسية مدعومة من المورد ومستخدمي خدمة مخصصين." } },
      { q: { en: "Who supports it afterwards?", ar: "من يدعمه بعد ذلك؟" }, a: { en: "Our Cairo team under an SLA, with documentation so your IT team can own it if you prefer.", ar: "فريقنا في القاهرة وفق اتفاقية مستوى خدمة، مع توثيق يمكّن فريقك من امتلاكه إن رغبت." } },
    ],
    seo: {
      title: { en: "AI-to-ERP Integration: SAP, Oracle, Dynamics, Odoo", ar: "تكامل الذكاء الاصطناعي مع ERP: SAP وOracle وDynamics وOdoo" },
      description: {
        en: "Connect AI models and tools to SAP, Oracle, Dynamics or Odoo with standard interfaces and approved write-back. 55+ SAP projects of experience.",
        ar: "اربط نماذج وأدوات الذكاء الاصطناعي بـ SAP وOracle وDynamics وOdoo بواجهات قياسية وإعادة كتابة معتمدة. خبرة أكثر من 55 مشروع SAP.",
      },
      keywords: { en: ["SAP AI integration", "ERP integration Egypt", "AI ERP"], ar: ["تكامل SAP", "تكامل أنظمة ERP", "الذكاء الاصطناعي وERP"] },
    },
  },
  {
    slug: "legacy-shopfloor-connectivity",
    category: "system-integration",
    kind: "service",
    status: "available",
    icon: "network",
    accent: "orange",
    title: { en: "Legacy & Shop-Floor Connectivity", ar: "ربط الأنظمة القديمة وأرض المصنع" },
    summary: {
      en: "Bring MES, SCADA, PLCs, old databases and spreadsheets into one reliable data flow.",
      ar: "اجمع أنظمة MES وSCADA وPLC وقواعد البيانات القديمة والجداول في تدفق بيانات موثوق واحد.",
    },
    lead: {
      en: "Most plant data lives in machines, historians and systems older than your ERP. We connect them safely — without replacing what works — so AI sees what actually happens on the floor.",
      ar: "معظم بيانات المصنع موجودة في الماكينات وأنظمة التسجيل والأنظمة الأقدم من ERP. نربطها بأمان — دون استبدال ما يعمل — ليرى الذكاء الاصطناعي ما يحدث فعلاً في أرض المصنع.",
    },
    serviceModels: ["integrate"],
    capabilities: ["predictive-maintenance", "quality-control", "production-forecasting"],
    problems: {
      en: ["Machine data trapped in PLCs and local historians", "Legacy in-house systems nobody can change", "Operators re-typing numbers into spreadsheets"],
      ar: ["بيانات الماكينات حبيسة PLC وأنظمة التسجيل المحلية", "أنظمة داخلية قديمة لا يستطيع أحد تعديلها", "المشغلون يعيدون كتابة الأرقام في جداول"],
    },
    features: [
      { icon: "cpu", title: { en: "OT connectivity", ar: "ربط التقنيات التشغيلية" }, body: { en: "OPC UA, Modbus and MQTT gateways with read-only access by default.", ar: "بوابات OPC UA وModbus وMQTT بصلاحية قراءة فقط افتراضياً." } },
      { icon: "database", title: { en: "Legacy adapters", ar: "محولات الأنظمة القديمة" }, body: { en: "Adapters for old SQL databases, flat files and in-house applications.", ar: "محولات لقواعد SQL القديمة والملفات النصية والتطبيقات الداخلية." } },
      { icon: "shield", title: { en: "IT/OT security", ar: "أمن تقنية المعلومات والتشغيل" }, body: { en: "Segmented networks and one-way data flows where required.", ar: "شبكات مجزأة وتدفقات بيانات أحادية الاتجاه عند الحاجة." } },
    ],
    integrations: ["OPC UA", "Modbus", "MQTT", "Siemens", "Rockwell", "SQL Server", "Excel / CSV"],
    deployment: {
      en: ["Typically 4–10 weeks", "Non-intrusive, read-only first", "Site survey included", "Monitoring and alerts"],
      ar: ["عادةً 4–10 أسابيع", "غير تدخلي، قراءة فقط أولاً", "المسح الميداني مشمول", "مراقبة وتنبيهات"],
    },
    seo: {
      title: { en: "Legacy System & Shop-Floor (MES/SCADA/PLC) Integration", ar: "تكامل الأنظمة القديمة وأرض المصنع (MES/SCADA/PLC)" },
      description: {
        en: "Connect MES, SCADA, PLCs, legacy databases and spreadsheets into one secure data flow so AI sees what happens on the floor.",
        ar: "اربط أنظمة MES وSCADA وPLC وقواعد البيانات القديمة والجداول في تدفق بيانات آمن واحد ليرى الذكاء الاصطناعي ما يحدث في أرض المصنع.",
      },
      keywords: { en: ["MES integration", "SCADA data integration", "legacy system integration"], ar: ["تكامل MES", "تكامل بيانات SCADA", "تكامل الأنظمة القديمة"] },
    },
  },
  {
    slug: "data-pipelines",
    category: "system-integration",
    kind: "service",
    status: "available",
    icon: "workflow",
    accent: "navy",
    title: { en: "Data Pipeline & Platform Setup", ar: "إعداد مسارات ومنصات البيانات" },
    summary: {
      en: "Governed pipelines and a clean data layer that every AI use case can build on.",
      ar: "مسارات بيانات محكومة وطبقة بيانات نظيفة يبني عليها كل استخدام للذكاء الاصطناعي.",
    },
    lead: {
      en: "Every AI project starts with the same question: can we trust the data? We set up the pipelines, cleansing, data model and governance once — so the second and third use case cost a fraction of the first.",
      ar: "كل مشروع ذكاء اصطناعي يبدأ بالسؤال نفسه: هل نثق بالبيانات؟ نُعد المسارات والتنقية ونموذج البيانات والحوكمة مرة واحدة — لتكلف حالة الاستخدام الثانية والثالثة جزءاً من الأولى.",
    },
    serviceModels: ["consult", "integrate"],
    capabilities: ["demand-planning", "production-forecasting", "supply-chain-optimization", "executive-decision-intelligence"],
    problems: {
      en: ["Every report rebuilds the same data by hand", "Master data inconsistent across sites", "No one owns data quality"],
      ar: ["كل تقرير يعيد بناء البيانات نفسها يدوياً", "بيانات رئيسية غير متسقة بين المواقع", "لا أحد مسؤول عن جودة البيانات"],
    },
    features: [
      { icon: "workflow", title: { en: "Automated pipelines", ar: "مسارات تلقائية" }, body: { en: "Scheduled and event-driven ingestion from ERP, MES and files.", ar: "استيعاب مجدول وقائم على الأحداث من ERP وMES والملفات." } },
      { icon: "database", title: { en: "Manufacturing data model", ar: "نموذج بيانات للتصنيع" }, body: { en: "Orders, materials, assets, quality and costs in one consistent model.", ar: "الطلبيات والخامات والأصول والجودة والتكاليف في نموذج متسق واحد." } },
      { icon: "clipboard", title: { en: "Quality & governance", ar: "الجودة والحوكمة" }, body: { en: "Validation rules, lineage and ownership so numbers can be trusted.", ar: "قواعد تحقق وتتبع للمصدر ومسؤولية لتكون الأرقام موثوقة." } },
    ],
    integrations: ["PostgreSQL", "Microsoft SQL Server", "Azure", "AWS", "Egypt-hosted"],
    deployment: {
      en: ["Typically 4–8 weeks", "EU or Egypt hosting", "Row-level security", "Hand-over to your IT team"],
      ar: ["عادةً 4–8 أسابيع", "استضافة في الاتحاد الأوروبي أو مصر", "أمان على مستوى الصف", "تسليم لفريق تقنية المعلومات"],
    },
    seo: {
      title: { en: "Manufacturing Data Pipelines & Data Platform Setup", ar: "إعداد مسارات ومنصات بيانات التصنيع" },
      description: {
        en: "Governed data pipelines and a manufacturing data model that every AI and reporting use case can build on. EU or Egypt hosting.",
        ar: "مسارات بيانات محكومة ونموذج بيانات للتصنيع يبني عليه كل استخدام للذكاء الاصطناعي والتقارير. استضافة في الاتحاد الأوروبي أو مصر.",
      },
      keywords: { en: ["data pipeline manufacturing", "data platform Egypt", "data governance"], ar: ["مسارات البيانات", "منصة بيانات", "حوكمة البيانات"] },
    },
  },
];
