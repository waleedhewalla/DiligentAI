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
  // ─── Gap 1: Egypt mid-market entry — fixed-price EGP starter packs ────
  {
    slug: "plant-ai-starter",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "blocks",
    accent: "orange",
    title: { en: "Plant AI Starter Packs", ar: "باقات بداية الذكاء الاصطناعي للمصانع" },
    summary: {
      en: "One use case, one line, 8 weeks, a fixed EGP price — AI results before a big commitment.",
      ar: "حالة استخدام واحدة، وخط واحد، و8 أسابيع، وسعر ثابت بالجنيه — نتائج قبل أي التزام كبير.",
    },
    lead: {
      en: "Global planning suites cost six figures in dollars and take months. Our starter packs put one proven AI use case live on one line in about 8 weeks — scoped, priced in Egyptian pounds and agreed before we start.",
      ar: "أنظمة التخطيط العالمية تكلف مئات الآلاف من الدولارات وتستغرق شهوراً. باقاتنا تشغّل حالة استخدام مجرّبة على خط واحد خلال نحو 8 أسابيع — بنطاق محدد، وسعر بالجنيه المصري، متفق عليه قبل البدء.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["production-scheduling", "demand-planning", "quality-control", "predictive-maintenance"],
    problems: {
      en: ["AI budgets quoted in USD after the pound's devaluation", "No appetite for an 18-month transformation", "Leadership wants proof on one line before scaling"],
      ar: ["ميزانيات الذكاء الاصطناعي تُسعّر بالدولار بعد تخفيض الجنيه", "لا رغبة في مشروع تحول مدته 18 شهراً", "الإدارة تريد إثباتاً على خط واحد قبل التوسع"],
    },
    features: [
      { icon: "target", title: { en: "One use case, done properly", ar: "حالة استخدام واحدة، بإتقان" }, body: { en: "Scheduling, forecasting, quality or machine health — chosen with you on day one.", ar: "الجدولة أو التنبؤ أو الجودة أو صحة الماكينات — نختارها معك من اليوم الأول." } },
      { icon: "clock", title: { en: "About 8 weeks to live", ar: "نحو 8 أسابيع حتى التشغيل" }, body: { en: "Data mapping, model, integration and training inside a fixed plan.", ar: "ربط البيانات والنموذج والتكامل والتدريب ضمن خطة ثابتة." } },
      { icon: "shield", title: { en: "Fixed EGP price", ar: "سعر ثابت بالجنيه" }, body: { en: "No currency surprises, no open-ended consulting hours.", ar: "لا مفاجآت في العملة، ولا ساعات استشارية مفتوحة." } },
    ],
    // TODO(Waleed): set priceFromEGP for each pack once approved; null shows "quoted in EGP".
    packages: [
      {
        id: "assess",
        name: { en: "Assess", ar: "التقييم" },
        scope: { en: "Two-week plant and data assessment with a ranked use-case shortlist.", ar: "تقييم للمصنع والبيانات لمدة أسبوعين مع قائمة مرتبة بحالات الاستخدام." },
        duration: { en: "2 weeks", ar: "أسبوعان" },
        priceFromEGP: null,
        unit: { en: "one-off", ar: "مرة واحدة" },
        includes: {
          en: ["On-site workshop", "Data readiness check", "Business case for the top use case"],
          ar: ["ورشة عمل ميدانية", "فحص جاهزية البيانات", "دراسة جدوى لأهم حالة استخدام"],
        },
      },
      {
        id: "starter",
        name: { en: "Starter", ar: "البداية" },
        scope: { en: "One AI use case live on one line or site, integrated with your ERP.", ar: "حالة استخدام واحدة تعمل على خط أو موقع واحد، ومتكاملة مع نظام ERP." },
        duration: { en: "About 8 weeks", ar: "نحو 8 أسابيع" },
        priceFromEGP: null,
        unit: { en: "per line or site", ar: "لكل خط أو موقع" },
        includes: {
          en: ["Baseline and KPI agreed in writing", "ERP / Excel data connection", "Arabic screens and reports", "User training and 90-day review"],
          ar: ["خط أساس ومؤشر متفق عليهما كتابياً", "ربط بيانات ERP / Excel", "شاشات وتقارير عربية", "تدريب المستخدمين ومراجعة بعد 90 يوماً"],
        },
        recommended: true,
      },
      {
        id: "scale",
        name: { en: "Scale", ar: "التوسع" },
        scope: { en: "Roll the proven use case out to more lines and sites, plus a second use case.", ar: "تعميم حالة الاستخدام المثبتة على خطوط ومواقع أكثر، مع حالة استخدام ثانية." },
        duration: { en: "8–12 weeks", ar: "8–12 أسبوعاً" },
        priceFromEGP: null,
        unit: { en: "per site", ar: "لكل موقع" },
        includes: {
          en: ["Multi-site roll-out", "Second use case", "Executive dashboard in Arabic", "Support SLA"],
          ar: ["تعميم على عدة مواقع", "حالة استخدام ثانية", "لوحة تنفيذية بالعربية", "اتفاقية مستوى دعم"],
        },
      },
    ],
    demo: "roi-calculator",
    pilotToProduction: true,
    regions: ["eg"],
    caseStudy: "star-trans",
    faqs: [
      { q: { en: "Why is the price in Egyptian pounds?", ar: "لماذا السعر بالجنيه المصري؟" }, a: { en: "Because your budget is. EGP pricing removes currency risk from the decision.", ar: "لأن ميزانيتك كذلك. التسعير بالجنيه يزيل مخاطر العملة من القرار." } },
      { q: { en: "What if the pilot doesn't hit the KPI?", ar: "ماذا لو لم تحقق التجربة المؤشر؟" }, a: { en: "Go/no-go is decided on the agreed baseline. You only scale what worked.", ar: "قرار الاستمرار يُتخذ على خط الأساس المتفق عليه. لا تتوسع إلا فيما نجح." } },
    ],
    seo: {
      title: { en: "Fixed-Price AI Starter Packs for Egyptian Manufacturers (EGP)", ar: "باقات ذكاء اصطناعي بسعر ثابت بالجنيه للمصانع المصرية" },
      description: {
        en: "Put one AI use case live on one line in about 8 weeks at a fixed EGP price — scheduling, forecasting, quality or machine health.",
        ar: "شغّل حالة استخدام واحدة للذكاء الاصطناعي على خط واحد خلال نحو 8 أسابيع بسعر ثابت بالجنيه — الجدولة أو التنبؤ أو الجودة أو صحة الماكينات.",
      },
      keywords: { en: ["AI for factories Egypt price", "AI pilot manufacturing EGP", "manufacturing AI starter package"], ar: ["سعر الذكاء الاصطناعي للمصانع", "تجربة ذكاء اصطناعي للمصانع", "باقة ذكاء اصطناعي للتصنيع"] },
    },
  },
  // ─── Gap 2: pilot purgatory — a written path from pilot to production ─
  {
    slug: "pilot-to-production",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "workflow",
    accent: "teal",
    title: { en: "Pilot-to-Production Program", ar: "برنامج من التجربة إلى الإنتاج" },
    summary: {
      en: "Rescue a stalled AI pilot — or start a new one — with a written baseline and a committed go-live.",
      ar: "أنقذ تجربة ذكاء اصطناعي متعثرة — أو ابدأ واحدة جديدة — بخط أساس مكتوب والتزام بالتشغيل.",
    },
    lead: {
      en: "Across the Gulf, most companies use AI somewhere but few see financial returns. The gap is the step from proof-of-concept to production. This program is built around that step: a KPI agreed in writing, a fixed-scope pilot, a go/no-go on the numbers and a real hand-over.",
      ar: "في الخليج، تستخدم معظم الشركات الذكاء الاصطناعي في مكان ما، لكن قلة ترى عائداً مالياً. الفجوة هي الانتقال من إثبات المفهوم إلى الإنتاج. هذا البرنامج مبني حول هذه الخطوة: مؤشر متفق عليه كتابياً، وتجربة بنطاق محدد، وقرار بالأرقام، وتسليم حقيقي.",
    },
    serviceModels: ["consult", "build", "integrate"],
    capabilities: ["production-scheduling", "demand-planning", "production-forecasting", "quality-control", "predictive-maintenance"],
    problems: {
      en: ["Pilots that impressed in a demo but never reached the floor", "No agreed baseline, so no one can prove value", "Models built outside the ERP that users ignore"],
      ar: ["تجارب أبهرت في العرض ولم تصل أبداً إلى المصنع", "لا خط أساس متفق عليه، فلا أحد يستطيع إثبات القيمة", "نماذج بُنيت خارج ERP فتجاهلها المستخدمون"],
    },
    features: [
      { icon: "clipboard", title: { en: "Pilot health check", ar: "فحص صحة التجربة" }, body: { en: "For stalled pilots: we review data, model and adoption and tell you what it takes to go live — or to stop.", ar: "للتجارب المتعثرة: نراجع البيانات والنموذج والاستخدام ونخبرك بما يلزم للتشغيل — أو للتوقف." } },
      { icon: "target", title: { en: "KPI contract", ar: "عقد المؤشر" }, body: { en: "Baseline, target and measurement method signed before work starts.", ar: "خط الأساس والهدف وطريقة القياس موقعة قبل بدء العمل." } },
      { icon: "plug", title: { en: "Built inside your systems", ar: "مبني داخل أنظمتك" }, body: { en: "Results land in the ERP and the screens people already use.", ar: "النتائج تصل إلى ERP والشاشات التي يستخدمها الناس فعلاً." } },
    ],
    pilotToProduction: true,
    caseStudy: "star-trans",
    seo: {
      title: { en: "AI Pilot-to-Production Program for Manufacturers", ar: "برنامج نقل تجارب الذكاء الاصطناعي إلى الإنتاج للمصانع" },
      description: {
        en: "Move AI from proof-of-concept to production with a written baseline, fixed-scope pilot and committed go-live — or rescue a stalled pilot.",
        ar: "انقل الذكاء الاصطناعي من إثبات المفهوم إلى الإنتاج بخط أساس مكتوب وتجربة بنطاق محدد والتزام بالتشغيل — أو أنقذ تجربة متعثرة.",
      },
      keywords: { en: ["AI pilot to production", "AI proof of concept manufacturing", "scale AI factory"], ar: ["من التجربة إلى الإنتاج", "إثبات مفهوم الذكاء الاصطناعي", "توسيع الذكاء الاصطناعي في المصانع"] },
    },
  },
  // ─── Gap 3: compliance-driven demand (CBAM, PDPL, ESG) ─────────────────
  {
    slug: "cbam-emissions-reporting",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "gauge",
    accent: "navy",
    title: { en: "CBAM & Emissions Reporting", ar: "تقارير الانبعاثات وآلية CBAM" },
    summary: {
      en: "Verified plant emissions for EU CBAM and ESG filings, captured automatically from your meters, SCADA and ERP.",
      ar: "انبعاثات موثقة للمصنع لآلية CBAM وتقارير الاستدامة، تُلتقط تلقائياً من العدادات وSCADA وERP.",
    },
    lead: {
      en: "The EU's carbon border mechanism entered its definitive period on 1 January 2026. Importers of steel, cement, aluminium and fertilisers need verified emissions — or pay on default values that can overstate yours. We connect your plant data and produce verifier-ready reports.",
      ar: "دخلت آلية تعديل حدود الكربون الأوروبية مرحلتها النهائية في 1 يناير 2026. مستوردو الصلب والأسمنت والألومنيوم والأسمدة يحتاجون انبعاثات موثقة — أو يدفعون وفق قيم افتراضية قد تبالغ في انبعاثاتك. نحن نربط بيانات مصنعك ونُعد تقارير جاهزة للتحقق.",
    },
    serviceModels: ["consult", "build", "integrate"],
    capabilities: ["energy-carbon-reporting"],
    problems: {
      en: ["EU buyers asking for embedded emissions per shipment", "Default values that make your product look dirtier than it is", "ESG and TCFD disclosures compiled by hand"],
      ar: ["مشترون أوروبيون يطلبون الانبعاثات المضمنة لكل شحنة", "قيم افتراضية تُظهر منتجك أكثر تلويثاً مما هو عليه", "إفصاحات الاستدامة وTCFD تُجمع يدوياً"],
    },
    features: [
      { icon: "cable", title: { en: "Automatic data capture", ar: "التقاط تلقائي للبيانات" }, body: { en: "Meters, SCADA, MES and ERP connected once — no spreadsheets to chase.", ar: "ربط العدادات وSCADA وMES وERP مرة واحدة — دون ملاحقة الجداول." } },
      { icon: "clipboard", title: { en: "Verifier-ready reports", ar: "تقارير جاهزة للتحقق" }, body: { en: "Emissions per installation, product and shipment with a full audit trail.", ar: "الانبعاثات لكل منشأة ومنتج وشحنة مع سجل تدقيق كامل." } },
      { icon: "languages", title: { en: "Arabic & English disclosures", ar: "إفصاحات بالعربية والإنجليزية" }, body: { en: "FRA ESG and climate reports alongside your EU customer data.", ar: "تقارير الاستدامة والمناخ للهيئة إلى جانب بيانات عملائك الأوروبيين." } },
      { icon: "trending", title: { en: "Energy savings", ar: "توفير الطاقة" }, body: { en: "The same data flags energy waste, so compliance pays for itself.", ar: "البيانات نفسها تكشف هدر الطاقة، فيسدد الامتثال تكلفته." } },
    ],
    sovereignModels: true,
    regions: ["eg"],
    integrations: ["SCADA", "OPC UA", "Energy meters", "SAP", "Oracle", "Odoo", "Excel"],
    deployment: {
      en: ["Plant data audit in 2 weeks", "First verified report in about 8 weeks", "Egypt-hosted option", "Annual reporting support"],
      ar: ["تدقيق بيانات المصنع خلال أسبوعين", "أول تقرير موثق خلال نحو 8 أسابيع", "خيار الاستضافة داخل مصر", "دعم التقارير السنوية"],
    },
    faqs: [
      { q: { en: "Which products does CBAM cover?", ar: "ما المنتجات التي تشملها آلية CBAM؟" }, a: { en: "Iron and steel, cement, aluminium, fertilisers, electricity and hydrogen imported into the EU.", ar: "الحديد والصلب والأسمنت والألومنيوم والأسمدة والكهرباء والهيدروجين المستوردة إلى الاتحاد الأوروبي." } },
      { q: { en: "Do you replace our accredited verifier?", ar: "هل تحلون محل جهة التحقق المعتمدة لدينا؟" }, a: { en: "No. We produce the data and reports your verifier needs; verification stays independent.", ar: "لا. نحن نُعد البيانات والتقارير التي تحتاجها جهة التحقق؛ ويبقى التحقق مستقلاً." } },
    ],
    seo: {
      title: { en: "EU CBAM Emissions Reporting for Egyptian Steel, Cement & Fertiliser Exporters", ar: "تقارير انبعاثات CBAM للمصدّرين المصريين للصلب والأسمنت والأسمدة" },
      description: {
        en: "Automatic, verifier-ready plant emissions data for EU CBAM and FRA ESG disclosures. Connected to meters, SCADA and ERP. Egypt-hosted option.",
        ar: "بيانات انبعاثات تلقائية وجاهزة للتحقق لآلية CBAM وإفصاحات الاستدامة. متصلة بالعدادات وSCADA وERP. خيار استضافة داخل مصر.",
      },
      keywords: { en: ["CBAM reporting Egypt", "embedded emissions steel", "CBAM cement exporter"], ar: ["تقارير CBAM", "الانبعاثات المضمنة للصلب", "مصدري الأسمنت CBAM"] },
    },
  },
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
    pilotToProduction: true,
    seo: {
      title: { en: "AI Production Scheduling Software for MENA Manufacturers", ar: "برنامج جدولة الإنتاج بالذكاء الاصطناعي للمصانع في مصر والخليج" },
      description: {
        en: "Automated production schedules in under 60 seconds. Built for Egyptian and Gulf manufacturers. Arabic-native, SAP-integrated, 8-week deployment.",
        ar: "جداول إنتاج تلقائية في أقل من 60 ثانية. مصمم للمصانع المصرية والخليجية. عربي أصيل، متكامل مع SAP، وتشغيل خلال 8 أسابيع.",
      },
      keywords: { en: ["production scheduling software Egypt", "APS software MENA", "AI production planning"], ar: ["برنامج جدولة الإنتاج", "تخطيط الإنتاج بالذكاء الاصطناعي", "برنامج تخطيط المصانع مصر"] },
    },
  },
  // ─── Gap 8: plant-wide vision & machine health, priced per site in EGP ─
  {
    slug: "vision-quality-control",
    category: "ai-solutions",
    kind: "product",
    status: "available",
    icon: "scan",
    accent: "teal",
    title: { en: "Vision Quality Control", ar: "ضبط الجودة بالرؤية الحاسوبية" },
    summary: {
      en: "Camera-based defect detection priced per station or per site in EGP — results written back to MES and ERP.",
      ar: "اكتشاف العيوب بالكاميرات بسعر لكل محطة أو لكل موقع بالجنيه — مع كتابة النتائج في MES وERP.",
    },
    lead: {
      en: "Self-service vision tools leave cameras, integration and model upkeep to you, and per-device dollar pricing adds up fast. We deliver inspection end to end — cameras, models, operator alerts and root-cause links — at a fixed price per station or per site.",
      ar: "أدوات الرؤية ذاتية الخدمة تترك لك الكاميرات والتكامل وصيانة النماذج، والتسعير بالدولار لكل جهاز يتراكم بسرعة. نحن نقدم الفحص من البداية للنهاية — الكاميرات والنماذج وتنبيهات المشغلين وربط الأسباب الجذرية — بسعر ثابت لكل محطة أو لكل موقع.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["quality-control"],
    problems: {
      en: ["Visual inspection that varies by shift and inspector", "Defects found by the customer, not the line", "Vision pilots that never connected to MES or ERP"],
      ar: ["فحص بصري يختلف حسب الوردية والمفتش", "العيوب يكتشفها العميل لا الخط", "تجارب رؤية لم تتصل أبداً بـ MES أو ERP"],
    },
    features: [
      { icon: "scan", title: { en: "Trained on your defects", ar: "مدرب على عيوبك" }, body: { en: "Models built from your own images and defect catalogue.", ar: "نماذج مبنية من صورك وكتالوج عيوبك." } },
      { icon: "plug", title: { en: "Closed loop", ar: "حلقة مغلقة" }, body: { en: "Rejects, alerts and NCRs flow into MES, QMS and ERP.", ar: "الرفض والتنبيهات وتقارير عدم المطابقة تتدفق إلى MES ونظام الجودة وERP." } },
      { icon: "shield", title: { en: "Runs at the edge", ar: "يعمل على الطرف" }, body: { en: "On-premise inference — images never need to leave the plant.", ar: "استدلال داخل المصنع — لا حاجة لخروج الصور من المصنع." } },
    ],
    // TODO(Waleed): per-site EGP prices; null shows "quoted in EGP".
    packages: [
      {
        id: "one-station",
        name: { en: "One inspection station", ar: "محطة فحص واحدة" },
        scope: { en: "Camera-based defect detection on one station of one line.", ar: "اكتشاف العيوب بالكاميرا على محطة واحدة في خط واحد." },
        duration: { en: "6–8 weeks", ar: "6–8 أسابيع" },
        priceFromEGP: null,
        unit: { en: "per station", ar: "لكل محطة" },
        includes: {
          en: ["Camera & lighting spec (or use yours)", "Model trained on your defects", "Alerts to operators", "Results written to MES / ERP"],
          ar: ["مواصفات الكاميرا والإضاءة (أو استخدم كاميراتك)", "نموذج مدرب على عيوبك", "تنبيهات للمشغلين", "كتابة النتائج في MES / ERP"],
        },
      },
      {
        id: "site",
        name: { en: "Whole site", ar: "الموقع بالكامل" },
        scope: { en: "Inspection across the site's critical stations with one dashboard.", ar: "فحص عبر المحطات الحرجة في الموقع مع لوحة واحدة." },
        duration: { en: "8–12 weeks", ar: "8–12 أسبوعاً" },
        priceFromEGP: null,
        unit: { en: "per site", ar: "لكل موقع" },
        includes: {
          en: ["Up to an agreed number of stations", "Root-cause links to batch, shift and machine", "Arabic quality dashboard", "Model monitoring and retraining"],
          ar: ["حتى عدد متفق عليه من المحطات", "ربط السبب الجذري بالتشغيلة والوردية والماكينة", "لوحة جودة بالعربية", "مراقبة النموذج وإعادة تدريبه"],
        },
        recommended: true,
      },
    ],
    pilotToProduction: true,
    integrations: ["MES", "QMS", "SAP", "Odoo", "OPC UA"],
    seo: {
      title: { en: "AI Visual Inspection & Quality Control — Priced per Site in EGP", ar: "الفحص البصري وضبط الجودة بالذكاء الاصطناعي — بسعر لكل موقع بالجنيه" },
      description: {
        en: "End-to-end AI visual inspection for manufacturers: cameras, defect models, operator alerts and MES/ERP write-back, at a fixed price per station or site.",
        ar: "فحص بصري بالذكاء الاصطناعي من البداية للنهاية للمصانع: كاميرات ونماذج عيوب وتنبيهات للمشغلين وربط بـ MES وERP، بسعر ثابت لكل محطة أو موقع.",
      },
      keywords: { en: ["AI visual inspection Egypt", "defect detection camera factory", "quality control AI price"], ar: ["الفحص البصري بالذكاء الاصطناعي", "اكتشاف العيوب بالكاميرا", "سعر ضبط الجودة بالذكاء الاصطناعي"] },
    },
  },
  {
    slug: "machine-health",
    category: "ai-solutions",
    kind: "product",
    status: "available",
    icon: "wrench",
    accent: "orange",
    title: { en: "Machine Health", ar: "صحة الماكينات" },
    summary: {
      en: "Predict failures on critical machines and schedule repairs around production — priced per site, not per machine.",
      ar: "تنبأ بأعطال الماكينات الحرجة وجدول الإصلاحات حول الإنتاج — بسعر لكل موقع، لا لكل ماكينة.",
    },
    lead: {
      en: "Per-machine monitoring subscriptions priced in dollars get expensive across a whole plant. Machine Health uses the PLC and sensor data you already have first, predicts failure risk and turns it into work orders in your maintenance system — at a fixed price per site.",
      ar: "اشتراكات المراقبة لكل ماكينة بالدولار تصبح مكلفة عبر مصنع كامل. «صحة الماكينات» يستخدم بيانات PLC والحساسات الموجودة لديك أولاً، ويتنبأ بمخاطر الأعطال ويحولها إلى أوامر عمل في نظام الصيانة — بسعر ثابت لكل موقع.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["predictive-maintenance"],
    problems: {
      en: ["Bottleneck machines failing without warning", "Per-machine USD subscriptions that don't scale", "Alerts that never become work orders"],
      ar: ["ماكينات الاختناق تتعطل دون إنذار", "اشتراكات بالدولار لكل ماكينة لا تتوسع", "تنبيهات لا تتحول أبداً إلى أوامر عمل"],
    },
    features: [
      { icon: "cpu", title: { en: "Existing data first", ar: "البيانات الموجودة أولاً" }, body: { en: "Starts from PLC and SCADA signals; adds sensors only where they pay back.", ar: "يبدأ من إشارات PLC وSCADA؛ ويضيف حساسات فقط حيث تسترد تكلفتها." } },
      { icon: "calendar", title: { en: "Planned with production", ar: "مخطط مع الإنتاج" }, body: { en: "Maintenance windows proposed around the production schedule.", ar: "نوافذ الصيانة مقترحة حول جدول الإنتاج." } },
      { icon: "clipboard", title: { en: "Into your CMMS", ar: "داخل نظام الصيانة" }, body: { en: "Predictions become work orders in your CMMS or ERP.", ar: "التنبؤات تصبح أوامر عمل في نظام الصيانة أو ERP." } },
    ],
    // TODO(Waleed): per-site EGP prices; null shows "quoted in EGP".
    packages: [
      {
        id: "critical-assets",
        name: { en: "Critical assets", ar: "الأصول الحرجة" },
        scope: { en: "Failure-risk monitoring on your bottleneck machines.", ar: "مراقبة مخاطر الأعطال على ماكينات الاختناق لديك." },
        duration: { en: "6–8 weeks", ar: "6–8 أسابيع" },
        priceFromEGP: null,
        unit: { en: "per site", ar: "لكل موقع" },
        includes: {
          en: ["Sensor plan (existing PLC data first)", "Failure-risk models", "Alerts in Arabic", "Work orders into your CMMS / ERP"],
          ar: ["خطة الحساسات (بيانات PLC الموجودة أولاً)", "نماذج مخاطر الأعطال", "تنبيهات بالعربية", "أوامر عمل في نظام الصيانة / ERP"],
        },
        recommended: true,
      },
      {
        id: "plant",
        name: { en: "Whole plant", ar: "المصنع بالكامل" },
        scope: { en: "Machine health across the plant, scheduled around production.", ar: "صحة الماكينات عبر المصنع، مجدولة حول الإنتاج." },
        duration: { en: "10–14 weeks", ar: "10–14 أسبوعاً" },
        priceFromEGP: null,
        unit: { en: "per site", ar: "لكل موقع" },
        includes: {
          en: ["All agreed asset classes", "Maintenance windows planned with the schedule", "Spare-parts forecast", "Monthly reliability review"],
          ar: ["كل فئات الأصول المتفق عليها", "نوافذ صيانة مخططة مع الجدول", "تنبؤ بقطع الغيار", "مراجعة شهرية للاعتمادية"],
        },
      },
    ],
    pilotToProduction: true,
    integrations: ["OPC UA", "Modbus", "SCADA", "SAP PM", "CMMS"],
    seo: {
      title: { en: "Predictive Maintenance (Machine Health) — Priced per Site in EGP", ar: "الصيانة التنبؤية (صحة الماكينات) — بسعر لكل موقع بالجنيه" },
      description: {
        en: "Predict failures on critical machines from PLC and sensor data, plan repairs around production and create work orders — at a fixed price per site.",
        ar: "تنبأ بأعطال الماكينات الحرجة من بيانات PLC والحساسات، وخطط الإصلاحات حول الإنتاج وأنشئ أوامر العمل — بسعر ثابت لكل موقع.",
      },
      keywords: { en: ["predictive maintenance Egypt price", "machine health monitoring", "PdM per site"], ar: ["الصيانة التنبؤية مصر", "مراقبة صحة الماكينات", "سعر الصيانة التنبؤية"] },
    },
  },
  // ─── Gap 6: Saudi demand funded by public programmes ───────────────────
  {
    slug: "ksa-smart-factory-assessment",
    category: "ai-solutions",
    kind: "service",
    status: "available",
    icon: "clipboard",
    accent: "navy",
    // Say "SIRI-aligned" until accredited — see funding.ts → siriCertified.
    title: { en: "Smart Factory Readiness Assessment (KSA)", ar: "تقييم جاهزية المصنع الذكي (السعودية)" },
    summary: {
      en: "A SIRI-aligned readiness assessment and funded roadmap for Saudi factories — the first step of the Future Factories journey.",
      ar: "تقييم جاهزية متوافق مع مؤشر SIRI وخارطة طريق قابلة للتمويل للمصانع السعودية — الخطوة الأولى في رحلة مصانع المستقبل.",
    },
    lead: {
      en: "Saudi Arabia is moving thousands of factories toward automation, and the journey starts with a Smart Industry Readiness Index (SIRI) assessment. We assess your plant against that framework, prioritise AI and automation use cases, and prepare a roadmap you can take to the funding programmes.",
      ar: "تنقل المملكة آلاف المصانع نحو الأتمتة، وتبدأ الرحلة بتقييم مؤشر جاهزية الصناعة الذكية (SIRI). نقيّم مصنعك وفق هذا الإطار، ونرتب أولويات حالات استخدام الذكاء الاصطناعي والأتمتة، ونُعد خارطة طريق تقدمها لبرامج التمويل.",
    },
    serviceModels: ["consult"],
    capabilities: ["production-scheduling", "quality-control", "predictive-maintenance", "energy-carbon-reporting"],
    problems: {
      en: ["Unsure where your factory stands on Industry 4.0", "Funding programmes need a credible, prioritised plan", "Vendors pitching technology before the assessment"],
      ar: ["غير متأكد من موقع مصنعك في الصناعة 4.0", "برامج التمويل تحتاج خطة موثوقة ومرتبة الأولويات", "موردون يعرضون تقنيات قبل التقييم"],
    },
    features: [
      { icon: "gauge", title: { en: "SIRI-aligned assessment", ar: "تقييم متوافق مع SIRI" }, body: { en: "Process, technology and organisation dimensions scored with your team on site.", ar: "تقييم أبعاد العمليات والتقنية والتنظيم مع فريقك ميدانياً." } },
      { icon: "target", title: { en: "Prioritised use cases", ar: "حالات استخدام مرتبة" }, body: { en: "AI and automation opportunities ranked by value, readiness and fundability.", ar: "فرص الذكاء الاصطناعي والأتمتة مرتبة حسب القيمة والجاهزية وقابلية التمويل." } },
      { icon: "file", title: { en: "Funding-ready roadmap", ar: "خارطة طريق جاهزة للتمويل" }, body: { en: "Business cases and a phased plan in Arabic and English for programme applications.", ar: "دراسات جدوى وخطة مرحلية بالعربية والإنجليزية لطلبات البرامج." } },
    ],
    regions: ["sa"],
    fundingRoutes: ["future-factories", "sidf", "modon"],
    sovereignModels: true,
    deployment: {
      en: ["Typically 3–4 weeks", "On-site in Saudi Arabia", "Arabic and English deliverables"],
      ar: ["عادةً 3–4 أسابيع", "ميدانياً في المملكة", "مخرجات بالعربية والإنجليزية"],
    },
    seo: {
      title: { en: "Smart Factory Readiness Assessment in Saudi Arabia (SIRI-aligned)", ar: "تقييم جاهزية المصنع الذكي في السعودية (متوافق مع SIRI)" },
      description: {
        en: "A SIRI-aligned smart-factory assessment and funding-ready AI roadmap for Saudi manufacturers — the first step toward Future Factories and SIDF financing.",
        ar: "تقييم للمصنع الذكي متوافق مع SIRI وخارطة طريق للذكاء الاصطناعي جاهزة للتمويل للمصانع السعودية — الخطوة الأولى نحو مصانع المستقبل وتمويل الصندوق الصناعي.",
      },
      keywords: { en: ["SIRI assessment Saudi", "Future Factories program", "smart factory Saudi Arabia"], ar: ["تقييم SIRI", "برنامج مصانع المستقبل", "المصنع الذكي السعودية"] },
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
      en: "Bespoke forecasting, vision and maintenance models for problems the packaged products don't cover.",
      ar: "نماذج مخصصة للتنبؤ والرؤية والصيانة للمشكلات التي لا تغطيها المنتجات الجاهزة.",
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
    pilotToProduction: true,
    seo: {
      title: { en: "Custom AI & Machine-Learning Development for Manufacturing", ar: "تطوير نماذج ذكاء اصطناعي وتعلم آلي مخصصة للتصنيع" },
      description: {
        en: "Custom forecasting, computer-vision and predictive-maintenance models trained on your plant data and run in production with monitoring.",
        ar: "نماذج مخصصة للتنبؤ والرؤية الحاسوبية والصيانة التنبؤية مدربة على بيانات مصنعك وتعمل إنتاجياً مع المراقبة.",
      },
      keywords: { en: ["custom AI manufacturing", "machine learning development Egypt", "computer vision factory"], ar: ["تطوير ذكاء اصطناعي مخصص", "تعلم آلي للمصانع", "رؤية حاسوبية للمصانع"] },
    },
  },
  // ─── Gap 5: Arabic manufacturing workflows (model-agnostic) ───────────
  {
    slug: "shop-floor-arabic-copilot",
    category: "ai-solutions",
    kind: "product",
    status: "pilot",
    icon: "languages",
    accent: "teal",
    title: { en: "Shop-Floor Arabic Copilot", ar: "المساعد العربي لأرض المصنع" },
    summary: {
      en: "Supervisors ask in Arabic — “why is line 3 behind?” — and get answers from your MES, ERP and maintenance data.",
      ar: "المشرفون يسألون بالعربية — «لماذا تأخر الخط 3؟» — ويحصلون على إجابات من بيانات MES وERP والصيانة.",
    },
    lead: {
      en: "Global AI copilots are English-first. Your supervisors and operators aren't. This copilot answers questions, drafts shift reports and explains downtime in Arabic, using the model and hosting you choose — Egypt-hosted, in-Kingdom or on-premise.",
      ar: "مساعدو الذكاء الاصطناعي العالميون يبدؤون بالإنجليزية. ومشرفوك ومشغلوك لا. هذا المساعد يجيب عن الأسئلة ويكتب تقارير الورديات ويشرح أسباب التوقف بالعربية، باستخدام النموذج والاستضافة التي تختارها — داخل مصر أو داخل المملكة أو داخل المصنع.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["production-forecasting", "predictive-maintenance", "quality-control"],
    problems: {
      en: ["Shift handovers lost in WhatsApp messages", "Supervisors can't query systems built in English", "Downtime reasons recorded inconsistently"],
      ar: ["تسليم الورديات يضيع في رسائل واتساب", "المشرفون لا يستطيعون الاستعلام من أنظمة مبنية بالإنجليزية", "أسباب التوقف تُسجل بشكل غير متسق"],
    },
    features: [
      { icon: "brain", title: { en: "Ask in Arabic", ar: "اسأل بالعربية" }, body: { en: "Egyptian, Gulf or Modern Standard Arabic questions answered from live plant data, with sources.", ar: "أسئلة باللهجة المصرية أو الخليجية أو الفصحى تُجاب من بيانات المصنع اللحظية، مع المصادر." } },
      { icon: "file", title: { en: "Shift reports written for you", ar: "تقارير الورديات تُكتب لك" }, body: { en: "Output, scrap, downtime and open issues summarised at every handover.", ar: "الإنتاج والهالك والتوقف والمشكلات المفتوحة ملخصة عند كل تسليم." } },
      { icon: "shield", title: { en: "Your model, your hosting", ar: "نموذجك واستضافتك" }, body: { en: "Runs on the Arabic model and in the location your data rules require.", ar: "يعمل على النموذج العربي وفي المكان الذي تتطلبه قواعد بياناتك." } },
    ],
    sovereignModels: true,
    pilotToProduction: true,
    integrations: ["MES", "SCADA", "SAP", "Odoo", "CMMS", "Microsoft Teams"],
    deployment: {
      en: ["Pilot on one plant", "Egypt-hosted or on-premise", "Read-only access to plant systems"],
      ar: ["تجربة على مصنع واحد", "استضافة داخل مصر أو داخل المصنع", "صلاحية قراءة فقط لأنظمة المصنع"],
    },
    seo: {
      title: { en: "Arabic AI Copilot for the Shop Floor — Egypt-Hosted or On-Premise", ar: "مساعد ذكاء اصطناعي عربي لأرض المصنع — مستضاف في مصر أو داخل المصنع" },
      description: {
        en: "An Arabic copilot for supervisors and operators: ask about output, downtime and quality, and get shift reports — on the Arabic model and hosting you choose.",
        ar: "مساعد عربي للمشرفين والمشغلين: اسأل عن الإنتاج والتوقف والجودة، واحصل على تقارير الورديات — على النموذج العربي والاستضافة التي تختارها.",
      },
      keywords: { en: ["Arabic AI copilot manufacturing", "shop floor copilot Arabic", "Karnak ALLaM Jais factory"], ar: ["مساعد ذكاء اصطناعي عربي للمصانع", "مساعد أرض المصنع", "نماذج عربية للمصانع"] },
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
    pilotToProduction: true,
    sovereignModels: true,
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
    sovereignModels: true,
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
    integrations: ["SAP S/4HANA", "SAP ECC", "Oracle Fusion", "Oracle E-Business Suite", "Microsoft Dynamics 365", "Odoo"],
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
  // ─── Gap 7: Odoo & Dynamics mid-market plants ────────────────────────
  {
    slug: "odoo-dynamics-connectors",
    category: "system-integration",
    kind: "product",
    status: "pilot",
    icon: "cable",
    accent: "teal",
    title: { en: "AI Connectors for Odoo & Dynamics 365", ar: "موصلات الذكاء الاصطناعي لـ Odoo وDynamics 365" },
    summary: {
      en: "Add AI scheduling and forecasting to the Odoo or Dynamics 365 you already run — no re-implementation.",
      ar: "أضف الجدولة والتنبؤ بالذكاء الاصطناعي إلى Odoo أو Dynamics 365 لديك — دون إعادة تطبيق.",
    },
    lead: {
      en: "Many mid-size manufacturers in Egypt and the Gulf run Odoo or Dynamics 365. Add-ons marketed as “AI” rarely go beyond reports. Our connectors read orders, stock and routings, and write optimised schedules and forecasts back into the ERP your team already uses.",
      ar: "كثير من المصانع متوسطة الحجم في مصر والخليج تعمل على Odoo أو Dynamics 365. والإضافات التي تُسوّق على أنها «ذكاء اصطناعي» نادراً ما تتجاوز التقارير. موصلاتنا تقرأ الطلبيات والمخزون ومسارات التشغيل، وتعيد الجداول والتوقعات المُحسّنة إلى نظام ERP الذي يستخدمه فريقك.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["production-scheduling", "demand-planning", "supply-chain-optimization"],
    problems: {
      en: ["ERP runs the books, planning still runs in Excel", "“AI” add-ons that are really dashboards", "No budget to move to a tier-one ERP"],
      ar: ["ERP يدير الحسابات والتخطيط ما زال على Excel", "إضافات «ذكاء اصطناعي» هي في الحقيقة لوحات معلومات", "لا ميزانية للانتقال إلى ERP من الفئة الأولى"],
    },
    features: [
      { icon: "database", title: { en: "Reads your ERP", ar: "يقرأ نظامك" }, body: { en: "Sales and manufacturing orders, stock, BOMs and work centres through the ERP's API.", ar: "أوامر البيع والتصنيع والمخزون وقوائم المواد ومراكز العمل عبر واجهة النظام." } },
      { icon: "refresh", title: { en: "Writes decisions back", ar: "يعيد القرارات" }, body: { en: "Approved schedules and forecasts appear inside the ERP screens.", ar: "الجداول والتوقعات المعتمدة تظهر داخل شاشات النظام." } },
      { icon: "users", title: { en: "Partner-friendly", ar: "مناسب للشركاء" }, body: { en: "Your Odoo or Dynamics partner keeps the ERP scope; we add the AI.", ar: "شريك Odoo أو Dynamics لديك يحتفظ بنطاق ERP؛ ونحن نضيف الذكاء الاصطناعي." } },
    ],
    pilotToProduction: true,
    integrations: ["Odoo", "Microsoft Dynamics 365", "Excel"],
    deployment: {
      en: ["Connector in pilot — early customers welcome", "No ERP customisation", "Works with your ERP partner"],
      ar: ["الموصل في مرحلة تجريبية — نرحب بالعملاء الأوائل", "دون تخصيص لنظام ERP", "يعمل مع شريك ERP لديك"],
    },
    seo: {
      title: { en: "AI Scheduling & Forecasting for Odoo and Dynamics 365 Manufacturers", ar: "الجدولة والتنبؤ بالذكاء الاصطناعي لمصانع Odoo وDynamics 365" },
      description: {
        en: "AI connectors that add production scheduling and demand forecasting to Odoo and Dynamics 365 — decisions written back into your ERP.",
        ar: "موصلات ذكاء اصطناعي تضيف جدولة الإنتاج والتنبؤ بالطلب إلى Odoo وDynamics 365 — مع إعادة القرارات إلى نظامك.",
      },
      keywords: { en: ["Odoo AI scheduling", "Dynamics 365 manufacturing AI", "Odoo manufacturing Egypt"], ar: ["جدولة Odoo بالذكاء الاصطناعي", "ذكاء اصطناعي Dynamics 365", "Odoo للمصانع مصر"] },
    },
  },
  // ─── Gap 4: incumbents' AI agents need data plumbing ──────────────────
  {
    slug: "ai-agent-readiness",
    category: "system-integration",
    kind: "service",
    status: "available",
    icon: "network",
    accent: "orange",
    title: { en: "AI Agent Readiness for SAP, Siemens & Planning Suites", ar: "تجهيز وكلاء الذكاء الاصطناعي لأنظمة SAP وSiemens والتخطيط" },
    summary: {
      en: "Make the AI agents in your SAP, Siemens or planning suite work — with clean, connected plant data.",
      ar: "اجعل وكلاء الذكاء الاصطناعي في SAP أو Siemens أو نظام التخطيط يعملون فعلاً — ببيانات مصنع نظيفة ومتصلة.",
    },
    lead: {
      en: "Your vendors are shipping AI agents: SAP Joule planning and shop-floor agents, Siemens Industrial Copilots, agent studios in planning suites. Every one of them is only as good as the ERP and shop-floor data it can reach. We connect, clean and govern that data — and add Arabic where the agent doesn't speak it.",
      ar: "مورّدوك يطلقون وكلاء ذكاء اصطناعي: وكلاء التخطيط وأرض المصنع في SAP Joule، ومساعدو Siemens الصناعيون، واستوديوهات الوكلاء في أنظمة التخطيط. كل منهم لا يكون أفضل من بيانات ERP وأرض المصنع التي يصل إليها. نحن نربط هذه البيانات وننقيها ونحكمها — ونضيف العربية حيث لا يتحدثها الوكيل.",
    },
    serviceModels: ["consult", "integrate"],
    capabilities: ["production-scheduling", "predictive-maintenance", "executive-decision-intelligence"],
    problems: {
      en: ["You licensed the AI features but they return poor answers", "Master data and shop-floor data don't match", "Agents that don't support Arabic for your users"],
      ar: ["اشتريت ميزات الذكاء الاصطناعي لكن إجاباتها ضعيفة", "البيانات الرئيسية وبيانات أرض المصنع غير متطابقة", "وكلاء لا يدعمون العربية لمستخدميك"],
    },
    features: [
      { icon: "clipboard", title: { en: "Agent readiness assessment", ar: "تقييم جاهزية الوكلاء" }, body: { en: "Which agents you own, which data they need and what's missing.", ar: "ما الوكلاء الذين تملكهم، وما البيانات التي يحتاجونها، وما الناقص." } },
      { icon: "database", title: { en: "Data layer for agents", ar: "طبقة بيانات للوكلاء" }, body: { en: "Governed master data and live shop-floor feeds the agents can trust.", ar: "بيانات رئيسية محكومة وتدفقات لحظية من أرض المصنع يثق بها الوكلاء." } },
      { icon: "languages", title: { en: "Arabic front end", ar: "واجهة عربية" }, body: { en: "Arabic summaries and reports on top of vendor agents.", ar: "ملخصات وتقارير عربية فوق وكلاء الموردين." } },
    ],
    integrations: ["SAP Joule", "SAP S/4HANA", "Siemens Industrial Copilot", "Siemens Opcenter", "Kinaxis", "o9", "Blue Yonder"],
    deployment: {
      en: ["Assessment in 2–3 weeks", "No change to vendor licences", "Works alongside your SI", "Arabic and English"],
      ar: ["تقييم خلال 2–3 أسابيع", "دون تغيير تراخيص الموردين", "يعمل إلى جانب شريك التنفيذ لديك", "بالعربية والإنجليزية"],
    },
    seo: {
      title: { en: "AI Agent Readiness: Make SAP Joule & Siemens Industrial Copilot Work", ar: "تجهيز وكلاء الذكاء الاصطناعي: اجعل SAP Joule ومساعد Siemens يعملان" },
      description: {
        en: "Connect, clean and govern the ERP and shop-floor data your SAP, Siemens and planning-suite AI agents need — with Arabic reporting on top.",
        ar: "اربط ونقِّ واحكم بيانات ERP وأرض المصنع التي يحتاجها وكلاء الذكاء الاصطناعي في SAP وSiemens وأنظمة التخطيط — مع تقارير عربية.",
      },
      keywords: { en: ["SAP Joule integration", "Siemens Industrial Copilot data", "AI agents manufacturing"], ar: ["تكامل SAP Joule", "بيانات مساعد Siemens", "وكلاء الذكاء الاصطناعي للتصنيع"] },
    },
  },
  {
    slug: "aws-lookout-migration",
    category: "system-integration",
    kind: "service",
    status: "available",
    icon: "refresh",
    accent: "teal",
    title: { en: "AWS Lookout Migration", ar: "الترحيل من AWS Lookout" },
    summary: {
      en: "Move vision inspection and equipment monitoring off retired AWS Lookout services — without losing your history.",
      ar: "انقل الفحص البصري ومراقبة المعدات من خدمات AWS Lookout المتوقفة — دون فقدان سجلك.",
    },
    lead: {
      en: "AWS retired Lookout for Vision in October 2025 and Lookout for Equipment in October 2026. If your inspection or anomaly models ran there, we rebuild them on supported services or on-premise, and wire the results back into your MES and ERP.",
      ar: "أوقفت AWS خدمة Lookout for Vision في أكتوبر 2025 وLookout for Equipment في أكتوبر 2026. إذا كانت نماذج الفحص أو اكتشاف الشذوذ لديك تعمل عليها، نعيد بناءها على خدمات مدعومة أو داخل المصنع، ونربط النتائج بأنظمة MES وERP.",
    },
    serviceModels: ["build", "integrate"],
    capabilities: ["quality-control", "predictive-maintenance"],
    problems: {
      en: ["Inspection or anomaly models running on a retired service", "Training data and labels locked in the old setup", "Results never reached the MES or ERP anyway"],
      ar: ["نماذج فحص أو اكتشاف شذوذ تعمل على خدمة متوقفة", "بيانات التدريب والتصنيفات حبيسة الإعداد القديم", "النتائج لم تكن تصل إلى MES أو ERP أصلاً"],
    },
    features: [
      { icon: "database", title: { en: "Data & label recovery", ar: "استعادة البيانات والتصنيفات" }, body: { en: "Export images, sensor history and labels before access ends.", ar: "تصدير الصور وسجل الحساسات والتصنيفات قبل انتهاء الوصول." } },
      { icon: "cpu", title: { en: "Model rebuild", ar: "إعادة بناء النماذج" }, body: { en: "Retrain on supported cloud services or on-premise edge devices.", ar: "إعادة التدريب على خدمات سحابية مدعومة أو أجهزة طرفية داخل المصنع." } },
      { icon: "plug", title: { en: "Close the loop", ar: "إغلاق الحلقة" }, body: { en: "Defects and alerts written back to MES, CMMS and ERP.", ar: "كتابة العيوب والتنبيهات في MES ونظام الصيانة وERP." } },
    ],
    integrations: ["AWS", "Microsoft Azure", "On-premise edge", "MES", "CMMS"],
    deployment: {
      en: ["Fixed-scope migration", "Parallel run before cut-over", "Typically 4–8 weeks"],
      ar: ["ترحيل بنطاق محدد", "تشغيل متوازٍ قبل التحويل", "عادةً 4–8 أسابيع"],
    },
    seo: {
      title: { en: "AWS Lookout for Vision & Equipment Migration Service", ar: "خدمة الترحيل من AWS Lookout for Vision وLookout for Equipment" },
      description: {
        en: "Migrate vision inspection and equipment anomaly models off retired AWS Lookout services, with data recovery and MES/ERP write-back.",
        ar: "رحّل نماذج الفحص البصري واكتشاف شذوذ المعدات من خدمات AWS Lookout المتوقفة، مع استعادة البيانات والربط بـ MES وERP.",
      },
      keywords: { en: ["AWS Lookout for Vision alternative", "Lookout for Equipment migration", "visual inspection migration"], ar: ["بديل AWS Lookout", "ترحيل Lookout for Equipment", "ترحيل الفحص البصري"] },
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
