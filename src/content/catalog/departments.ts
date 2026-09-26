import type { Department } from "./types";

/**
 * Solutions by department — the primary way into the catalog.
 * Order = menu order. Every slug is validated at build time (see index.ts).
 * TODO(Waleed): move roadmap items into `offerings` as each product goes live.
 */
export const departments: Department[] = [
  {
    slug: "production",
    icon: "factory",
    accent: "orange",
    title: { en: "Production & Planning", ar: "الإنتاج والتخطيط" },
    owner: { en: "Plant manager · Production planner", ar: "مدير المصنع · مخطط الإنتاج" },
    summary: {
      en: "Feasible schedules in minutes, constraints visible before they bite, and a shop floor that can ask questions in Arabic.",
      ar: "جداول قابلة للتنفيذ في دقائق، وقيود ظاهرة قبل أن تؤثر، وأرضية مصنع تسأل بالعربية.",
    },
    pains: {
      en: ["The weekly plan takes three days in Excel and is stale by Tuesday", "Material shortages surface on the line, not in the plan", "Nobody sees which orders are really at risk"],
      ar: ["الخطة الأسبوعية تستغرق ثلاثة أيام على Excel وتتقادم يوم الثلاثاء", "نقص الخامات يظهر على الخط لا في الخطة", "لا أحد يرى الطلبات المعرّضة للتأخير فعلاً"],
    },
    outcomes: {
      en: ["Schedules generated and re-generated in under a minute", "An at-risk order queue with the constraint behind each order", "Planners spend time deciding, not copying data"],
      ar: ["جداول تُنشأ ويُعاد إنشاؤها في أقل من دقيقة", "قائمة بالطلبات المعرّضة للخطر مع القيد وراء كل طلب", "المخططون يقررون بدل نسخ البيانات"],
    },
    kpis: { en: ["On-time delivery", "Schedule adherence", "Planning cycle time"], ar: ["التسليم في الموعد", "الالتزام بالجدول", "زمن دورة التخطيط"] },
    offerings: ["ai-production-scheduling", "shop-floor-arabic-copilot", "plant-ai-starter", "legacy-shopfloor-connectivity", "pilot-to-production"],
    capabilities: ["production-scheduling", "production-forecasting"],
    seo: {
      title: { en: "AI for Production Planning & Scheduling in Manufacturing", ar: "الذكاء الاصطناعي لتخطيط وجدولة الإنتاج في المصانع" },
      description: {
        en: "AI production scheduling, at-risk order queues and an Arabic shop-floor copilot for manufacturers in Egypt and the Gulf.",
        ar: "جدولة إنتاج بالذكاء الاصطناعي وقائمة طلبات معرضة للخطر ومساعد عربي لأرضية المصنع للمصانع في مصر والخليج.",
      },
      keywords: { en: ["AI production scheduling", "production planning software", "APS Egypt"], ar: ["برنامج تخطيط الإنتاج", "جدولة الإنتاج بالذكاء الاصطناعي", "تخطيط الإنتاج"] },
    },
  },
  {
    slug: "sop",
    icon: "calendar",
    accent: "navy",
    title: { en: "S&OP & Demand Planning", ar: "تخطيط المبيعات والعمليات والطلب" },
    owner: { en: "Supply chain director · S&OP lead", ar: "مدير سلسلة الإمداد · مسؤول S&OP" },
    summary: {
      en: "One demand number, one supply plan and a monthly S&OP meeting that ends in decisions instead of reconciling spreadsheets.",
      ar: "رقم طلب واحد وخطة إمداد واحدة واجتماع S&OP شهري ينتهي بقرارات بدل مطابقة الجداول.",
    },
    pains: {
      en: ["Sales, finance and production each bring a different forecast", "Capacity problems are discovered after orders are accepted", "The S&OP meeting is spent reconciling numbers"],
      ar: ["المبيعات والمالية والإنتاج لكل منها توقع مختلف", "مشكلات الطاقة تُكتشف بعد قبول الطلبات", "اجتماع S&OP يُستهلك في مطابقة الأرقام"],
    },
    outcomes: {
      en: ["A statistical baseline forecast every team starts from", "Rough-cut capacity checks before commitments", "Scenario answers (+20% demand, a line down) in minutes"],
      ar: ["توقع أساسي إحصائي تبدأ منه كل الفرق", "فحص مبدئي للطاقة قبل الالتزام", "إجابات للسيناريوهات (+20% طلب، توقف خط) في دقائق"],
    },
    kpis: { en: ["Forecast accuracy", "Plan coverage", "Inventory days"], ar: ["دقة التوقع", "تغطية الخطة", "أيام المخزون"] },
    offerings: ["ai-production-scheduling", "erp-ai-integration", "data-pipelines", "custom-ai-models"],
    capabilities: ["demand-planning", "production-forecasting", "production-scheduling"],
    roadmap: [
      {
        title: { en: "S&OP Command", ar: "مركز قيادة S&OP" },
        body: {
          en: "Demand, supply and financial plans in one monthly cycle, built on the IPE planning engine. Co-developing with pilot customers.",
          ar: "خطط الطلب والإمداد والمالية في دورة شهرية واحدة، مبنية على محرك تخطيط IPE. نطوّرها مع عملاء تجريبيين.",
        },
      },
    ],
    seo: {
      title: { en: "AI for S&OP and Demand Planning in Manufacturing", ar: "الذكاء الاصطناعي لتخطيط المبيعات والعمليات والطلب" },
      description: {
        en: "Demand forecasting, capacity checks and scenario planning that give manufacturers one S&OP number.",
        ar: "توقع الطلب وفحص الطاقة وتخطيط السيناريوهات لرقم S&OP واحد في المصنع.",
      },
      keywords: { en: ["S&OP software", "demand planning AI", "sales and operations planning Egypt"], ar: ["تخطيط المبيعات والعمليات", "توقع الطلب", "S&OP"] },
    },
  },
  {
    slug: "quality",
    icon: "scan",
    accent: "teal",
    title: { en: "Quality", ar: "الجودة" },
    owner: { en: "Quality manager · QC inspector", ar: "مدير الجودة · مفتش الجودة" },
    summary: {
      en: "Camera-based inspection on the line, defects traced to their cause, and fewer customer complaints.",
      ar: "فحص بالكاميرا على الخط، وتتبع العيوب لأسبابها، وشكاوى عملاء أقل.",
    },
    pains: {
      en: ["Manual inspection misses defects on fast lines", "Scrap and rework are counted at month-end, too late to act", "Root-cause analysis relies on memory"],
      ar: ["الفحص اليدوي يفوّت عيوباً على الخطوط السريعة", "الهالك وإعادة التشغيل تُحسب آخر الشهر بعد فوات الأوان", "تحليل السبب الجذري يعتمد على الذاكرة"],
    },
    outcomes: {
      en: ["Every unit inspected, not a sample", "Defect trends by line, shift and material in real time", "Faster, evidence-based CAPA"],
      ar: ["فحص كل وحدة لا عينة فقط", "اتجاهات العيوب حسب الخط والوردية والخامة لحظياً", "إجراءات تصحيحية أسرع ومبنية على الدليل"],
    },
    kpis: { en: ["First-pass yield", "Scrap rate", "Customer complaints"], ar: ["نسبة النجاح من أول مرة", "نسبة الهالك", "شكاوى العملاء"] },
    offerings: ["vision-quality-control", "plant-ai-starter", "custom-ai-models"],
    capabilities: ["quality-control"],
    seo: {
      title: { en: "AI Quality Control & Visual Inspection for Factories", ar: "الذكاء الاصطناعي لمراقبة الجودة والفحص البصري في المصانع" },
      description: {
        en: "Vision AI inspection and defect analytics for manufacturers in Egypt and the Gulf, priced per site in EGP.",
        ar: "فحص بصري بالذكاء الاصطناعي وتحليلات للعيوب للمصانع في مصر والخليج، بسعر لكل موقع بالجنيه.",
      },
      keywords: { en: ["AI quality control", "visual inspection AI", "defect detection"], ar: ["مراقبة الجودة بالذكاء الاصطناعي", "الفحص البصري", "اكتشاف العيوب"] },
    },
  },
  {
    slug: "maintenance",
    icon: "wrench",
    accent: "orange",
    title: { en: "Maintenance & Reliability", ar: "الصيانة والاعتمادية" },
    owner: { en: "Maintenance manager · Reliability engineer", ar: "مدير الصيانة · مهندس الاعتمادية" },
    summary: {
      en: "Know which machine will fail before it stops the line, using the sensors and PLCs you already have.",
      ar: "اعرف أي ماكينة ستتعطل قبل أن توقف الخط، باستخدام الحساسات وPLC الموجودة لديك.",
    },
    pains: {
      en: ["Unplanned stops cost more than the repair", "Preventive schedules replace parts that were fine", "Older machines have no data connection"],
      ar: ["التوقفات غير المخططة تكلف أكثر من الإصلاح", "الصيانة الوقائية تستبدل قطعاً سليمة", "الماكينات القديمة بلا اتصال بيانات"],
    },
    outcomes: {
      en: ["Early warnings ranked by risk and production impact", "Maintenance planned around the production schedule", "Legacy machines connected without replacement"],
      ar: ["إنذارات مبكرة مرتبة حسب الخطر وأثرها على الإنتاج", "صيانة مخططة حول جدول الإنتاج", "ربط الماكينات القديمة دون استبدالها"],
    },
    kpis: { en: ["Unplanned downtime", "MTBF", "Maintenance cost per unit"], ar: ["التوقف غير المخطط", "متوسط الوقت بين الأعطال", "تكلفة الصيانة لكل وحدة"] },
    offerings: ["machine-health", "legacy-shopfloor-connectivity", "aws-lookout-migration"],
    capabilities: ["predictive-maintenance"],
    seo: {
      title: { en: "Predictive Maintenance AI for Manufacturers", ar: "الصيانة التنبؤية بالذكاء الاصطناعي للمصانع" },
      description: {
        en: "Machine health monitoring and predictive maintenance on existing sensors and PLCs, including legacy equipment.",
        ar: "مراقبة صحة الماكينات والصيانة التنبؤية على الحساسات وPLC الحالية، بما فيها المعدات القديمة.",
      },
      keywords: { en: ["predictive maintenance", "machine health monitoring", "condition monitoring"], ar: ["الصيانة التنبؤية", "مراقبة صحة الماكينات", "مراقبة الحالة"] },
    },
  },
  {
    slug: "supply-chain",
    icon: "truck",
    accent: "teal",
    title: { en: "Supply Chain & Procurement", ar: "سلسلة الإمداد والمشتريات" },
    owner: { en: "Supply chain manager · Buyer", ar: "مدير سلسلة الإمداد · مسؤول المشتريات" },
    summary: {
      en: "See shortages weeks ahead, buy against the real plan and connect suppliers, ERP and the shop floor.",
      ar: "رؤية النقص قبل أسابيع، والشراء وفق الخطة الفعلية، وربط الموردين وERP وأرضية المصنع.",
    },
    pains: {
      en: ["Buyers expedite what the line is already waiting for", "Supplier lead times live in people's heads", "Too much stock of the wrong items, too little of the right ones"],
      ar: ["المشتريات تستعجل ما ينتظره الخط بالفعل", "مهل الموردين في رؤوس الأشخاص", "مخزون زائد من الأصناف الخطأ وقليل من الصحيحة"],
    },
    outcomes: {
      en: ["Material exceptions flagged against the schedule", "Lead times learned from actual receipts", "Replenishment tied to forecast and plan"],
      ar: ["تنبيه باستثناءات الخامات مقابل الجدول", "مهل توريد مستنتجة من الاستلامات الفعلية", "إعادة طلب مرتبطة بالتوقع والخطة"],
    },
    kpis: { en: ["Material availability", "Supplier on-time delivery", "Inventory turns"], ar: ["توفر الخامات", "التزام الموردين بالمواعيد", "معدل دوران المخزون"] },
    offerings: ["erp-ai-integration", "odoo-dynamics-connectors", "data-pipelines", "custom-ai-models"],
    capabilities: ["supply-chain-optimization", "demand-planning"],
    roadmap: [
      {
        title: { en: "Supply & Procurement Control Tower", ar: "برج مراقبة الإمداد والمشتريات" },
        body: {
          en: "Shortage prediction, supplier risk and PO recommendations on top of your ERP. Co-developing with pilot customers.",
          ar: "توقع النقص ومخاطر الموردين وتوصيات أوامر الشراء فوق نظام ERP. نطوّره مع عملاء تجريبيين.",
        },
      },
    ],
    seo: {
      title: { en: "AI for Supply Chain & Procurement in Manufacturing", ar: "الذكاء الاصطناعي لسلسلة الإمداد والمشتريات في المصانع" },
      description: {
        en: "Shortage prediction, lead-time learning and ERP integration (SAP, Odoo, Dynamics) for manufacturers.",
        ar: "توقع النقص وتعلم مهل التوريد والتكامل مع ERP (SAP وOdoo وDynamics) للمصانع.",
      },
      keywords: { en: ["supply chain AI", "procurement AI", "inventory optimization"], ar: ["سلسلة الإمداد بالذكاء الاصطناعي", "المشتريات", "تحسين المخزون"] },
    },
  },
  {
    slug: "finance-costing",
    icon: "chart",
    accent: "navy",
    title: { en: "Finance & Costing", ar: "المالية والتكاليف" },
    owner: { en: "CFO · Cost accountant", ar: "المدير المالي · محاسب التكاليف" },
    summary: {
      en: "Know the real cost and margin of every product, order and line — and the carbon cost EU customers now ask for.",
      ar: "اعرف التكلفة والهامش الحقيقي لكل منتج وطلب وخط — وتكلفة الكربون التي يطلبها عملاء أوروبا الآن.",
    },
    pains: {
      en: ["Standard costs are months out of date", "Margin by customer or order is guessed, not measured", "Month-end close is a spreadsheet marathon"],
      ar: ["التكاليف المعيارية متأخرة شهوراً", "الهامش حسب العميل أو الطلب تقديري لا مقاس", "إقفال نهاية الشهر ماراثون جداول"],
    },
    outcomes: {
      en: ["Actual cost per unit from ERP, energy and production data", "Margin leaks flagged by product, customer and line", "A narrated month-end pack for the board"],
      ar: ["تكلفة فعلية للوحدة من بيانات ERP والطاقة والإنتاج", "تنبيه بتسرب الهامش حسب المنتج والعميل والخط", "ملف نهاية شهر مشروح لمجلس الإدارة"],
    },
    kpis: { en: ["Gross margin", "Cost per unit", "Days to close"], ar: ["الهامش الإجمالي", "تكلفة الوحدة", "أيام الإقفال"] },
    offerings: ["executive-intelligence", "cbam-emissions-reporting", "erp-ai-integration", "data-pipelines"],
    capabilities: ["executive-decision-intelligence", "energy-carbon-reporting"],
    roadmap: [
      {
        title: { en: "Cost & Margin Intelligence", ar: "ذكاء التكلفة والهامش" },
        body: {
          en: "Actual product costing and margin analytics from ERP, production and energy data. Co-developing with pilot customers.",
          ar: "تكاليف فعلية للمنتجات وتحليلات الهامش من بيانات ERP والإنتاج والطاقة. نطوّره مع عملاء تجريبيين.",
        },
      },
    ],
    seo: {
      title: { en: "AI for Manufacturing Finance, Product Costing & Margin", ar: "الذكاء الاصطناعي للمالية وتكاليف المنتجات والهامش في المصانع" },
      description: {
        en: "Actual product costing, margin analytics, CBAM carbon reporting and board-ready finance packs for manufacturers.",
        ar: "تكاليف فعلية للمنتجات وتحليلات الهامش وتقارير الكربون CBAM وملفات مالية جاهزة لمجلس الإدارة.",
      },
      keywords: { en: ["product costing software", "manufacturing margin analysis", "CBAM reporting"], ar: ["حساب تكلفة المنتج", "تحليل الهامش", "تقارير CBAM"] },
    },
  },
  {
    slug: "sales-marketing",
    icon: "trending",
    accent: "orange",
    title: { en: "Sales & Marketing", ar: "المبيعات والتسويق" },
    owner: { en: "Commercial director · Marketing manager", ar: "المدير التجاري · مدير التسويق" },
    summary: {
      en: "Arabic-first commercial content at scale, quotes that respect capacity, and pricing grounded in real margins.",
      ar: "محتوى تجاري عربي أولاً على نطاق واسع، وعروض أسعار تحترم الطاقة، وتسعير مبني على هوامش حقيقية.",
    },
    pains: {
      en: ["Arabic content is translated, late and expensive", "Sales promises dates production cannot hit", "Discounts are given without seeing margin"],
      ar: ["المحتوى العربي مترجم ومتأخر ومكلف", "المبيعات تعد بمواعيد لا يحققها الإنتاج", "الخصومات تُمنح دون رؤية الهامش"],
    },
    outcomes: {
      en: ["Brochures, posts and tenders drafted in Arabic and English in minutes", "Delivery dates checked against the plan (ATP/CTP)", "Customer demand signals feed the forecast"],
      ar: ["كتيبات ومنشورات ومناقصات بالعربية والإنجليزية في دقائق", "مواعيد التسليم مُتحقق منها مقابل الخطة", "إشارات طلب العملاء تغذي التوقع"],
    },
    kpis: { en: ["Win rate", "Quote turnaround", "Content cost"], ar: ["نسبة الفوز بالصفقات", "سرعة إعداد العروض", "تكلفة المحتوى"] },
    offerings: ["arabic-commercial-content", "odoo-dynamics-connectors", "custom-ai-models"],
    capabilities: ["demand-planning"],
    roadmap: [
      {
        title: { en: "Sales & Pricing Intelligence", ar: "ذكاء المبيعات والتسعير" },
        body: {
          en: "Margin-aware pricing and quote support linked to the production plan. Co-developing with pilot customers.",
          ar: "تسعير وعروض أسعار مدركة للهامش ومرتبطة بخطة الإنتاج. نطوّره مع عملاء تجريبيين.",
        },
      },
    ],
    seo: {
      title: { en: "AI for Manufacturing Sales & Arabic Marketing Content", ar: "الذكاء الاصطناعي لمبيعات المصانع والمحتوى التسويقي العربي" },
      description: {
        en: "Arabic-first AI content generation, capacity-aware quoting and CRM integration for industrial sales teams.",
        ar: "توليد محتوى عربي أولاً بالذكاء الاصطناعي، وعروض أسعار مدركة للطاقة، وتكامل CRM لفرق المبيعات الصناعية.",
      },
      keywords: { en: ["Arabic AI content", "B2B marketing AI", "industrial sales AI"], ar: ["محتوى عربي بالذكاء الاصطناعي", "تسويق صناعي", "مبيعات المصانع"] },
    },
  },
  {
    slug: "hr",
    icon: "users",
    accent: "teal",
    title: { en: "HR & Workforce", ar: "الموارد البشرية والقوى العاملة" },
    owner: { en: "HR director · Shift supervisor", ar: "مدير الموارد البشرية · مشرف الوردية" },
    summary: {
      en: "Shifts planned around the production schedule, skills where they are needed, and operators who can get answers in Arabic.",
      ar: "ورديات مخططة حول جدول الإنتاج، ومهارات حيث الحاجة، ومشغلون يحصلون على إجاباتهم بالعربية.",
    },
    pains: {
      en: ["Overtime is the default fix for poor planning", "Critical skills sit with a few people", "New operators wait days for answers from experts"],
      ar: ["العمل الإضافي هو الحل الافتراضي لسوء التخطيط", "المهارات الحرجة عند أشخاص قليلين", "المشغلون الجدد ينتظرون أياماً لإجابات الخبراء"],
    },
    outcomes: {
      en: ["Labour demand derived from the production plan", "Operator know-how captured in an Arabic copilot", "Teams ready for AI before it is rolled out"],
      ar: ["احتياج العمالة مشتق من خطة الإنتاج", "خبرة المشغلين محفوظة في مساعد عربي", "فرق مستعدة للذكاء الاصطناعي قبل تعميمه"],
    },
    kpis: { en: ["Overtime hours", "Labour productivity", "Time to competence"], ar: ["ساعات العمل الإضافي", "إنتاجية العمالة", "زمن الوصول للكفاءة"] },
    offerings: ["shop-floor-arabic-copilot", "ai-readiness-assessment", "ai-agent-readiness"],
    capabilities: [],
    roadmap: [
      {
        title: { en: "Workforce Planner", ar: "مخطط القوى العاملة" },
        body: {
          en: "Shift and skills planning linked to the IPE schedule to cut overtime. Co-developing with pilot customers.",
          ar: "تخطيط الورديات والمهارات مرتبط بجدول IPE لتقليل العمل الإضافي. نطوّره مع عملاء تجريبيين.",
        },
      },
    ],
    seo: {
      title: { en: "AI for Manufacturing HR & Workforce Planning", ar: "الذكاء الاصطناعي للموارد البشرية وتخطيط القوى العاملة في المصانع" },
      description: {
        en: "Shift planning linked to production, an Arabic shop-floor copilot and AI readiness for factory teams.",
        ar: "تخطيط ورديات مرتبط بالإنتاج ومساعد عربي لأرضية المصنع وجاهزية الفرق للذكاء الاصطناعي.",
      },
      keywords: { en: ["workforce planning manufacturing", "shift planning AI", "shop floor copilot"], ar: ["تخطيط القوى العاملة", "تخطيط الورديات", "مساعد أرضية المصنع"] },
    },
  },
  {
    slug: "executive",
    icon: "briefcase",
    accent: "navy",
    title: { en: "Executive & Strategy", ar: "الإدارة العليا والاستراتيجية" },
    owner: { en: "CEO · Board · Transformation lead", ar: "الرئيس التنفيذي · مجلس الإدارة · قائد التحول" },
    summary: {
      en: "One view of the whole business, a governed AI programme, and decisions made on this week's numbers.",
      ar: "رؤية واحدة لكل الأعمال، وبرنامج ذكاء اصطناعي محوكم، وقرارات مبنية على أرقام هذا الأسبوع.",
    },
    pains: {
      en: ["Board packs take a week and are out of date when read", "AI pilots start everywhere and scale nowhere", "Decisions are not tracked to outcomes"],
      ar: ["ملفات مجلس الإدارة تستغرق أسبوعاً وتتقادم عند قراءتها", "تجارب الذكاء الاصطناعي تبدأ في كل مكان ولا تتوسع", "القرارات لا تُتابع حتى نتائجها"],
    },
    outcomes: {
      en: ["A live cockpit across departments with a weekly brief", "Every AI use case tracked by value, risk and stage gate", "Decision log with owners, quorum and follow-up"],
      ar: ["لوحة قيادة حية عبر الإدارات مع ملخص أسبوعي", "كل حالة استخدام للذكاء الاصطناعي متابعة بالقيمة والمخاطر ومراحل الاعتماد", "سجل قرارات بالمسؤولين والنصاب والمتابعة"],
    },
    kpis: { en: ["Value delivered by AI", "Decision cycle time", "Portfolio health"], ar: ["القيمة المحققة من الذكاء الاصطناعي", "زمن دورة القرار", "صحة المحفظة"] },
    offerings: ["executive-intelligence", "ai-readiness-assessment", "ai-agent-readiness", "ksa-smart-factory-assessment", "cbam-emissions-reporting"],
    capabilities: ["executive-decision-intelligence", "energy-carbon-reporting"],
    seo: {
      title: { en: "AI for Manufacturing Executives: CEO Cockpit & AI Governance", ar: "الذكاء الاصطناعي لقيادات المصانع: لوحة الرئيس التنفيذي وحوكمة الذكاء الاصطناعي" },
      description: {
        en: "A live executive cockpit, weekly AI brief and AI programme governance for manufacturing leadership.",
        ar: "لوحة قيادة تنفيذية حية وملخص أسبوعي وحوكمة لبرنامج الذكاء الاصطناعي لقيادات المصانع.",
      },
      keywords: { en: ["CEO dashboard manufacturing", "AI governance", "executive decision intelligence"], ar: ["لوحة الرئيس التنفيذي", "حوكمة الذكاء الاصطناعي", "ذكاء القرار"] },
    },
  },
];
