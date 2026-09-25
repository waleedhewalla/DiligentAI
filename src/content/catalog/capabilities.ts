/**
 * CONFIGURABLE — manufacturing use cases, written problem-first.
 *
 * Each capability gets its own page at /capabilities/[slug] and is cross-linked
 * automatically to every offering that lists its slug in `offering.capabilities`.
 * Keep outcomes qualitative here; measured numbers belong in ../proof.ts.
 */
import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    slug: "energy-carbon-reporting",
    icon: "gauge",
    accent: "teal",
    title: { en: "Energy, Carbon & CBAM Reporting", ar: "تقارير الطاقة والكربون وآلية CBAM" },
    summary: {
      en: "Turn meter, MES and ERP data into verified plant emissions — for EU CBAM, ESG filings and lower energy bills.",
      ar: "حوّل بيانات العدادات وMES وERP إلى انبعاثات موثقة للمصنع — لآلية CBAM الأوروبية وتقارير الاستدامة وخفض فواتير الطاقة.",
    },
    problem: {
      en: "Your EU customers now need verified emissions per shipment, and your data lives in meters and spreadsheets.",
      ar: "عملاؤك في أوروبا يحتاجون الآن انبعاثات موثقة لكل شحنة، وبياناتك موزعة بين العدادات والجداول.",
    },
    symptoms: {
      en: ["Emissions estimated once a year in Excel", "Risk of default values that overstate your emissions", "ESG reports assembled by hand from five departments"],
      ar: ["تقدير الانبعاثات مرة سنوياً على Excel", "خطر القيم الافتراضية التي تبالغ في انبعاثاتك", "تقارير الاستدامة تُجمع يدوياً من خمسة أقسام"],
    },
    approach: {
      en: ["Automatic capture of energy, fuel and material data from meters, SCADA and ERP", "Emissions calculated per product and per shipment with a full audit trail", "Anomaly detection on energy use to cut cost as well as carbon"],
      ar: ["التقاط تلقائي لبيانات الطاقة والوقود والخامات من العدادات وSCADA وERP", "حساب الانبعاثات لكل منتج ولكل شحنة مع سجل تدقيق كامل", "اكتشاف الشذوذ في استهلاك الطاقة لخفض التكلفة والكربون معاً"],
    },
    outcomes: {
      en: ["Verifier-ready emissions data instead of defaults", "Bilingual ESG and climate disclosures", "Lower energy cost per ton"],
      ar: ["بيانات انبعاثات جاهزة للتحقق بدلاً من القيم الافتراضية", "إفصاحات استدامة ومناخ ثنائية اللغة", "تكلفة طاقة أقل لكل طن"],
    },
    dataSources: {
      en: ["Electricity, gas and fuel meters", "SCADA / MES production counts", "ERP material and shipment records"],
      ar: ["عدادات الكهرباء والغاز والوقود", "عدادات الإنتاج في SCADA / MES", "سجلات الخامات والشحنات في ERP"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "CBAM & Carbon Reporting for Egyptian Exporters — Steel, Cement, Fertiliser", ar: "تقارير CBAM والكربون للمصدّرين المصريين — الصلب والأسمنت والأسمدة" },
      description: {
        en: "Capture verified plant emissions from meters, SCADA and ERP for EU CBAM, FRA ESG disclosures and energy savings. Arabic and English reporting.",
        ar: "التقط انبعاثات موثقة للمصنع من العدادات وSCADA وERP لآلية CBAM الأوروبية وإفصاحات الاستدامة وتوفير الطاقة. تقارير بالعربية والإنجليزية.",
      },
      keywords: { en: ["CBAM Egypt", "carbon reporting steel Egypt", "ESG reporting manufacturing"], ar: ["آلية CBAM مصر", "تقارير الكربون للصلب", "تقارير الاستدامة للمصانع"] },
    },
  },
  {
    slug: "production-scheduling",
    icon: "calendar",
    accent: "orange",
    title: { en: "Production Scheduling & Capacity", ar: "جدولة الإنتاج والطاقة" },
    summary: {
      en: "Feasible, optimised schedules in minutes — and re-planned the moment reality changes.",
      ar: "جداول ممكنة ومُحسّنة في دقائق — ويُعاد تخطيطها لحظة تغيّر الواقع.",
    },
    problem: {
      en: "Your schedule takes days to build in Excel and is wrong by Tuesday.",
      ar: "جدولك يستغرق أياماً على Excel ويصبح خاطئاً يوم الثلاثاء.",
    },
    symptoms: {
      en: ["Planners spend more time planning than executing", "One breakdown or late material breaks the whole week", "On-time delivery misses target again"],
      ar: ["المخططون يقضون وقتاً في التخطيط أكثر من التنفيذ", "عطل واحد أو خامة متأخرة تكسر الأسبوع كله", "هدف التسليم في الموعد يفوت مرة أخرى"],
    },
    approach: {
      en: ["Constraint-programming engine models machines, shifts, setups and materials", "Schedules generated in under a minute from ERP orders", "Instant re-planning on breakdowns, rush orders and shortages"],
      ar: ["محرك برمجة قيود ينمذج الماكينات والورديات والتجهيزات والخامات", "جداول تُنتج في أقل من دقيقة من طلبيات ERP", "إعادة تخطيط فورية عند الأعطال والطلبيات العاجلة والنقص"],
    },
    outcomes: {
      en: ["Planning cycle cut from days to minutes", "Higher on-time delivery", "Planners managing exceptions, not spreadsheets"],
      ar: ["تقليص دورة التخطيط من أيام إلى دقائق", "تحسّن التسليم في الموعد", "مخططون يديرون الاستثناءات لا الجداول"],
    },
    dataSources: {
      en: ["Sales / production orders", "Routings and bills of materials", "Machine calendars and shifts", "Material availability"],
      ar: ["طلبيات البيع والإنتاج", "مسارات التشغيل وقوائم المواد", "تقويمات الماكينات والورديات", "توفر الخامات"],
    },
    serviceModels: ["build", "integrate"],
    seo: {
      title: { en: "AI Production Scheduling for Manufacturers in Egypt & the Gulf", ar: "جدولة الإنتاج بالذكاء الاصطناعي للمصانع في مصر والخليج" },
      description: {
        en: "Replace multi-day Excel scheduling with AI that builds feasible production schedules in minutes and re-plans instantly. Arabic-native, ERP-integrated.",
        ar: "استبدل الجدولة اليدوية على Excel بذكاء اصطناعي يبني جداول إنتاج ممكنة في دقائق ويعيد التخطيط فوراً. عربي أصيل ومتكامل مع ERP.",
      },
      keywords: { en: ["production scheduling software", "APS Egypt", "capacity planning AI"], ar: ["جدولة الإنتاج", "تخطيط الطاقة الإنتاجية", "برنامج تخطيط المصانع"] },
    },
  },
  {
    slug: "demand-planning",
    icon: "trending",
    accent: "teal",
    title: { en: "Demand Planning", ar: "تخطيط الطلب" },
    summary: {
      en: "Forecast demand by SKU, customer and region — including Ramadan, seasonality and promotions.",
      ar: "تنبؤ بالطلب حسب الصنف والعميل والمنطقة — مع رمضان والمواسم والعروض.",
    },
    problem: {
      en: "Sales forecasts live in spreadsheets, and you find out they were wrong from the warehouse.",
      ar: "توقعات المبيعات في جداول بيانات، وتكتشف خطأها من المستودع.",
    },
    symptoms: {
      en: ["Stock-outs on fast movers while slow movers pile up", "Forecasts ignore Ramadan, Eid and seasonal peaks", "Sales, finance and operations each use a different number"],
      ar: ["نفاد الأصناف سريعة الحركة بينما تتراكم البطيئة", "التوقعات تتجاهل رمضان والأعياد والمواسم", "المبيعات والمالية والعمليات لكل منها رقم مختلف"],
    },
    approach: {
      en: ["Machine-learning forecasts per SKU and channel", "Regional calendar and promotion effects modelled explicitly", "One consensus plan feeding production and procurement"],
      ar: ["توقعات بالتعلم الآلي لكل صنف وقناة", "نمذجة صريحة للتقويم المحلي وأثر العروض", "خطة توافقية واحدة تغذي الإنتاج والمشتريات"],
    },
    outcomes: {
      en: ["Better forecast accuracy", "Lower safety stock for the same service level", "A single demand number across the company"],
      ar: ["دقة أعلى في التوقعات", "مخزون أمان أقل لنفس مستوى الخدمة", "رقم طلب واحد على مستوى الشركة"],
    },
    dataSources: {
      en: ["Sales history (2+ years ideal)", "Price and promotion calendar", "Customer and channel master data"],
      ar: ["تاريخ المبيعات (سنتان أو أكثر)", "تقويم الأسعار والعروض", "البيانات الرئيسية للعملاء والقنوات"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "AI Demand Planning & Forecasting for MENA Manufacturers", ar: "تخطيط الطلب والتنبؤ بالذكاء الاصطناعي لمصانع المنطقة" },
      description: {
        en: "Machine-learning demand forecasts that understand Ramadan, seasonality and promotions — feeding one plan to production and procurement.",
        ar: "توقعات طلب بالتعلم الآلي تفهم رمضان والمواسم والعروض — وتغذي خطة واحدة للإنتاج والمشتريات.",
      },
      keywords: { en: ["demand planning AI", "sales forecasting Egypt", "S&OP"], ar: ["تخطيط الطلب", "التنبؤ بالمبيعات", "تخطيط المبيعات والعمليات"] },
    },
  },
  {
    slug: "production-forecasting",
    icon: "chart",
    accent: "navy",
    title: { en: "Production Forecasting", ar: "التنبؤ بالإنتاج" },
    summary: {
      en: "Know output, yield and capacity gaps weeks ahead — not at month-end.",
      ar: "اعرف الإنتاج والعائد وفجوات الطاقة قبلها بأسابيع — لا في نهاية الشهر.",
    },
    problem: {
      en: "You discover you'll miss the monthly plan when it's already too late to recover.",
      ar: "تكتشف أنك ستفوّت خطة الشهر حين يكون الوقت قد فات للتعويض.",
    },
    symptoms: {
      en: ["Output and yield reported after the fact", "Capacity gaps surface as overtime and late orders", "Leadership plans on last month's actuals"],
      ar: ["الإنتاج والعائد يُبلّغ عنهما بعد وقوعهما", "فجوات الطاقة تظهر كعمل إضافي وطلبيات متأخرة", "الإدارة تخطط على أرقام الشهر الماضي"],
    },
    approach: {
      en: ["Forecast output and yield per line from live production data", "Early-warning alerts when the month-end plan is at risk", "Scenario what-ifs for shifts, overtime and outsourcing"],
      ar: ["تنبؤ بالإنتاج والعائد لكل خط من بيانات الإنتاج اللحظية", "تنبيهات مبكرة عندما تكون خطة الشهر في خطر", "سيناريوهات ماذا-لو للورديات والعمل الإضافي والتعهيد"],
    },
    outcomes: {
      en: ["Plan misses caught weeks earlier", "Less emergency overtime", "Executive view of output against plan"],
      ar: ["اكتشاف الانحراف عن الخطة قبل أسابيع", "عمل إضافي طارئ أقل", "رؤية تنفيذية للإنتاج مقابل الخطة"],
    },
    dataSources: {
      en: ["Production confirmations / MES counts", "Downtime and scrap logs", "Plan and capacity data"],
      ar: ["تأكيدات الإنتاج / عدادات MES", "سجلات التوقف والهالك", "بيانات الخطة والطاقة"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "AI Production Forecasting for Factories", ar: "التنبؤ بالإنتاج بالذكاء الاصطناعي للمصانع" },
      description: {
        en: "Forecast output, yield and capacity gaps weeks ahead with AI built on your production data. Early warnings before the month-end plan slips.",
        ar: "تنبأ بالإنتاج والعائد وفجوات الطاقة قبلها بأسابيع بذكاء اصطناعي مبني على بيانات إنتاجك. تنبيهات مبكرة قبل انحراف خطة الشهر.",
      },
      keywords: { en: ["production forecasting", "yield prediction", "capacity planning"], ar: ["التنبؤ بالإنتاج", "التنبؤ بالعائد", "تخطيط الطاقة"] },
    },
  },
  {
    slug: "quality-control",
    icon: "scan",
    accent: "teal",
    title: { en: "Quality Control", ar: "ضبط الجودة" },
    summary: {
      en: "Catch defects on the line and trace them to their root cause — before customers do.",
      ar: "اكتشف العيوب على الخط وتتبعها إلى سببها الجذري — قبل أن يكتشفها العميل.",
    },
    problem: {
      en: "Defects are found at final inspection or by the customer, long after the cause has moved on.",
      ar: "العيوب تُكتشف في الفحص النهائي أو عند العميل، بعد أن يكون سببها قد مضى.",
    },
    symptoms: {
      en: ["Manual visual inspection that varies by shift", "Scrap and rework eating margin", "Root-cause analysis that takes weeks"],
      ar: ["فحص بصري يدوي يختلف من وردية لأخرى", "الهالك وإعادة التشغيل يستهلكان الهامش", "تحليل السبب الجذري يستغرق أسابيع"],
    },
    approach: {
      en: ["Computer-vision inspection on existing or low-cost cameras", "Statistical process control with AI anomaly detection", "Defects linked to machine, batch, shift and material for fast root cause"],
      ar: ["فحص بالرؤية الحاسوبية على كاميرات موجودة أو منخفضة التكلفة", "ضبط إحصائي للعمليات مع اكتشاف الشذوذ بالذكاء الاصطناعي", "ربط العيوب بالماكينة والتشغيلة والوردية والخامة لتحليل سريع للسبب"],
    },
    outcomes: {
      en: ["Consistent inspection across shifts", "Less scrap and rework", "Faster, evidence-based root-cause analysis"],
      ar: ["فحص متسق عبر الورديات", "هالك وإعادة تشغيل أقل", "تحليل أسرع للسبب الجذري قائم على الأدلة"],
    },
    dataSources: {
      en: ["Inspection images or video", "QC measurements and NCR records", "Batch and process parameters"],
      ar: ["صور أو فيديو الفحص", "قياسات الجودة وسجلات عدم المطابقة", "بيانات التشغيلات ومعاملات العملية"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "AI Quality Control & Visual Inspection for Manufacturing", ar: "ضبط الجودة والفحص البصري بالذكاء الاصطناعي للتصنيع" },
      description: {
        en: "Computer-vision inspection and AI anomaly detection that catch defects on the line and trace them to root cause.",
        ar: "فحص بالرؤية الحاسوبية واكتشاف للشذوذ بالذكاء الاصطناعي يلتقط العيوب على الخط ويتتبعها إلى سببها الجذري.",
      },
      keywords: { en: ["AI quality control", "visual inspection AI", "defect detection"], ar: ["ضبط الجودة بالذكاء الاصطناعي", "الفحص البصري", "اكتشاف العيوب"] },
    },
  },
  {
    slug: "supply-chain-optimization",
    icon: "truck",
    accent: "orange",
    title: { en: "Supply Chain Optimisation", ar: "تحسين سلاسل الإمداد" },
    summary: {
      en: "Balance suppliers, lead times, FX and logistics so materials arrive when production needs them.",
      ar: "وازن بين الموردين ومهل التوريد وأسعار الصرف والنقل لتصل الخامات حين يحتاجها الإنتاج.",
    },
    problem: {
      en: "Imported materials, volatile FX and unreliable lead times keep stopping your lines.",
      ar: "الخامات المستوردة وتقلب أسعار الصرف وعدم انتظام مهل التوريد توقف خطوطك باستمرار.",
    },
    symptoms: {
      en: ["Lines idle waiting for imported materials", "Buying decisions made without FX or lead-time risk", "Logistics planned by phone and WhatsApp"],
      ar: ["خطوط متوقفة بانتظار خامات مستوردة", "قرارات شراء دون حساب مخاطر الصرف ومهل التوريد", "تخطيط النقل بالهاتف وواتساب"],
    },
    approach: {
      en: ["Lead-time and supplier-risk prediction from purchase history", "Procurement recommendations that weigh FX, MOQ and stock", "Route and load planning for inbound and outbound logistics"],
      ar: ["التنبؤ بمهل التوريد ومخاطر الموردين من تاريخ الشراء", "توصيات شراء تراعي الصرف والحد الأدنى للطلب والمخزون", "تخطيط المسارات والحمولات للنقل الوارد والصادر"],
    },
    outcomes: {
      en: ["Fewer material-driven stoppages", "Smarter buying under currency volatility", "Visible, planned logistics"],
      ar: ["توقفات أقل بسبب الخامات", "شراء أذكى في ظل تقلب العملة", "نقل مخطط وواضح"],
    },
    dataSources: {
      en: ["Purchase orders and receipts", "Supplier master and performance", "Inventory positions", "Shipment and transport records"],
      ar: ["أوامر الشراء والاستلام", "البيانات الرئيسية للموردين وأداؤهم", "أرصدة المخزون", "سجلات الشحن والنقل"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "AI Supply Chain Optimisation for Manufacturers in Egypt & GCC", ar: "تحسين سلاسل الإمداد بالذكاء الاصطناعي للمصانع في مصر والخليج" },
      description: {
        en: "Predict lead times, weigh FX and supplier risk, and plan logistics with AI so materials arrive when production needs them.",
        ar: "تنبأ بمهل التوريد، ووازن مخاطر الصرف والموردين، وخطط النقل بالذكاء الاصطناعي لتصل الخامات في وقتها.",
      },
      keywords: { en: ["supply chain AI", "procurement optimisation", "logistics planning Egypt"], ar: ["سلاسل الإمداد", "تحسين المشتريات", "تخطيط النقل"] },
    },
  },
  {
    slug: "predictive-maintenance",
    icon: "wrench",
    accent: "navy",
    title: { en: "Predictive Maintenance", ar: "الصيانة التنبؤية" },
    summary: {
      en: "Predict failures from sensor and maintenance history, and schedule repairs around production.",
      ar: "تنبأ بالأعطال من بيانات الحساسات وسجل الصيانة، وجدول الإصلاحات حول الإنتاج.",
    },
    problem: {
      en: "Critical machines fail without warning, and maintenance is either too early or too late.",
      ar: "الماكينات الحرجة تتعطل دون إنذار، والصيانة إما مبكرة جداً أو متأخرة جداً.",
    },
    symptoms: {
      en: ["Unplanned downtime on bottleneck machines", "Calendar-based maintenance that replaces healthy parts", "Spare parts missing when they are needed"],
      ar: ["توقف غير مخطط على ماكينات الاختناق", "صيانة حسب التقويم تستبدل قطعاً سليمة", "قطع الغيار غير متوفرة عند الحاجة"],
    },
    approach: {
      en: ["Failure-risk models from vibration, temperature and PLC signals", "Maintenance windows planned together with the production schedule", "Spare-parts forecasting tied to predicted interventions"],
      ar: ["نماذج مخاطر الأعطال من الاهتزاز والحرارة وإشارات PLC", "نوافذ صيانة مخططة مع جدول الإنتاج", "تنبؤ بقطع الغيار مرتبط بالتدخلات المتوقعة"],
    },
    outcomes: {
      en: ["Less unplanned downtime", "Longer asset life", "Maintenance that doesn't fight production"],
      ar: ["توقف غير مخطط أقل", "عمر أطول للأصول", "صيانة لا تتعارض مع الإنتاج"],
    },
    dataSources: {
      en: ["Sensor / SCADA / PLC signals", "CMMS work orders and failure history", "Production schedule"],
      ar: ["إشارات الحساسات / SCADA / PLC", "أوامر عمل الصيانة وسجل الأعطال", "جدول الإنتاج"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "AI Predictive Maintenance for Factories", ar: "الصيانة التنبؤية بالذكاء الاصطناعي للمصانع" },
      description: {
        en: "Predict machine failures from sensor and maintenance data and plan repairs around production to cut unplanned downtime.",
        ar: "تنبأ بأعطال الماكينات من بيانات الحساسات والصيانة وخطط الإصلاحات حول الإنتاج لتقليل التوقف غير المخطط.",
      },
      keywords: { en: ["predictive maintenance", "downtime reduction", "condition monitoring"], ar: ["الصيانة التنبؤية", "تقليل التوقف", "مراقبة الحالة"] },
    },
  },
  {
    slug: "executive-decision-intelligence",
    icon: "layout",
    accent: "navy",
    title: { en: "Executive Decision Intelligence", ar: "ذكاء القرار التنفيذي" },
    summary: {
      en: "Plant, finance and commercial KPIs in one Arabic view — board packs in minutes.",
      ar: "مؤشرات المصنع والمالية والتجارية في رؤية عربية واحدة — وحزم مجلس الإدارة في دقائق.",
    },
    problem: {
      en: "Leadership runs the company on a PDF that arrives every Monday, already out of date.",
      ar: "الإدارة تدير الشركة بملف PDF يصل كل اثنين، متقادماً أصلاً.",
    },
    symptoms: {
      en: ["Two days of data collection before every board meeting", "Different numbers from different departments", "No early warning when a site drifts off plan"],
      ar: ["يومان من جمع البيانات قبل كل اجتماع مجلس", "أرقام مختلفة من أقسام مختلفة", "لا إنذار مبكر عند انحراف موقع عن الخطة"],
    },
    approach: {
      en: ["Unified KPI layer across ERP, MES and CRM", "Arabic natural-language questions with sourced answers", "Automated bilingual board and management packs"],
      ar: ["طبقة مؤشرات موحدة عبر ERP وMES وCRM", "أسئلة باللغة العربية الطبيعية مع إجابات موثقة المصدر", "حزم مجلس إدارة وإدارة ثنائية اللغة تلقائياً"],
    },
    outcomes: {
      en: ["Board pack in minutes, not days", "One version of the truth", "Exceptions flagged before the weekly meeting"],
      ar: ["حزمة المجلس في دقائق لا أيام", "نسخة واحدة من الحقيقة", "رفع الاستثناءات قبل الاجتماع الأسبوعي"],
    },
    dataSources: {
      en: ["ERP finance and operations data", "Sales / CRM", "Plan and budget files"],
      ar: ["بيانات المالية والعمليات في ERP", "المبيعات / CRM", "ملفات الخطة والموازنة"],
    },
    serviceModels: ["consult", "build", "integrate"],
    seo: {
      title: { en: "Executive Dashboards & Board Reporting in Arabic for Manufacturers", ar: "لوحات تنفيذية وتقارير مجلس إدارة بالعربية للمصانع" },
      description: {
        en: "One Arabic executive view across plant, finance and sales, with board packs generated in minutes.",
        ar: "رؤية تنفيذية عربية واحدة عبر المصنع والمالية والمبيعات، مع حزم مجلس إدارة تُعد في دقائق.",
      },
      keywords: { en: ["executive dashboard Arabic", "board reporting", "manufacturing KPIs"], ar: ["لوحة تنفيذية بالعربية", "تقارير مجلس الإدارة", "مؤشرات التصنيع"] },
    },
  },
];
