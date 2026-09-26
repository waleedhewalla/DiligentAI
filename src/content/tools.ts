import type { L10n } from "@/i18n/config";

/**
 * Free self-assessment tools (assessment Track 3: lead magnets). Everything
 * runs in the visitor's browser; nothing is stored unless they book a review.
 */

export type ScoreQuestion = { id: string; title: L10n; levels: L10n[]; advice: L10n };

export const sopScorecard = {
  slug: "sop-scorecard",
  department: "sop",
  title: { en: "S&OP Maturity Scorecard", ar: "مقياس نضج تخطيط المبيعات والعمليات" },
  summary: {
    en: "Eight questions, three minutes. See where your S&OP process stands and the two changes that would help most.",
    ar: "ثمانية أسئلة في ثلاث دقائق. اعرف مستوى عملية S&OP لديك والتغييرين الأكثر فائدة.",
  },
  seo: {
    title: { en: "Free S&OP Maturity Scorecard for Manufacturers", ar: "مقياس مجاني لنضج تخطيط المبيعات والعمليات للمصانع" },
    description: {
      en: "Score your sales and operations planning in 3 minutes across forecasting, capacity, data, finance and KPIs — with practical next steps.",
      ar: "قيّم تخطيط المبيعات والعمليات في 3 دقائق عبر التوقع والطاقة والبيانات والمالية والمؤشرات — مع خطوات عملية تالية.",
    },
  },
  questions: [
    {
      id: "forecast",
      title: { en: "How is the demand forecast built?", ar: "كيف يُبنى توقع الطلب؟" },
      levels: [
        { en: "Each team has its own number", ar: "لكل فريق رقمه الخاص" },
        { en: "Sales forecast in Excel", ar: "توقع المبيعات على Excel" },
        { en: "Statistical baseline, adjusted by sales", ar: "توقع إحصائي أساسي تعدّله المبيعات" },
        { en: "Consensus forecast with measured accuracy", ar: "توقع توافقي بدقة مُقاسة" },
      ],
      advice: {
        en: "Start from a statistical baseline built on order history and let sales adjust it with written reasons. Measure forecast accuracy monthly.",
        ar: "ابدأ من توقع إحصائي مبني على تاريخ الطلبات ودع المبيعات تعدّله بأسباب مكتوبة. قِس دقة التوقع شهرياً.",
      },
    },
    {
      id: "capacity",
      title: { en: "When do you find capacity problems?", ar: "متى تكتشفون مشكلات الطاقة؟" },
      levels: [
        { en: "On the line, when it happens", ar: "على الخط، عند حدوثها" },
        { en: "From the planner's experience", ar: "من خبرة المخطط" },
        { en: "In a monthly rough-cut check", ar: "في فحص مبدئي شهري" },
        { en: "Before every order commitment", ar: "قبل الالتزام بكل طلب" },
      ],
      advice: {
        en: "Run a rough-cut capacity check of the demand plan against lines, shifts and critical materials every month, then move to checking before each commitment.",
        ar: "أجرِ فحصاً مبدئياً شهرياً لخطة الطلب مقابل الخطوط والورديات والخامات الحرجة، ثم انتقل إلى الفحص قبل كل التزام.",
      },
    },
    {
      id: "meeting",
      title: { en: "What happens in the S&OP meeting?", ar: "ماذا يحدث في اجتماع S&OP؟" },
      levels: [
        { en: "There is no regular meeting", ar: "لا يوجد اجتماع منتظم" },
        { en: "Mostly reconciling numbers", ar: "معظمه مطابقة أرقام" },
        { en: "Monthly, with pre-work done", ar: "شهري مع تحضير مسبق" },
        { en: "Decisions logged with owners and dates", ar: "قرارات مسجلة بمسؤولين ومواعيد" },
      ],
      advice: {
        en: "Do the reconciling before the meeting. Bring only the gaps between demand and supply, and end with a logged decision and an owner for each.",
        ar: "أنهِ المطابقة قبل الاجتماع. اعرض الفجوات بين الطلب والإمداد فقط، واختم بقرار مسجل ومسؤول لكل فجوة.",
      },
    },
    {
      id: "data",
      title: { en: "Where does planning data come from?", ar: "من أين تأتي بيانات التخطيط؟" },
      levels: [
        { en: "Many separate Excel files", ar: "ملفات Excel متفرقة" },
        { en: "Manual ERP extracts", ar: "استخراج يدوي من ERP" },
        { en: "ERP data refreshed weekly", ar: "بيانات ERP تُحدّث أسبوعياً" },
        { en: "One integrated dataset, refreshed daily", ar: "مجموعة بيانات موحدة تُحدّث يومياً" },
      ],
      advice: {
        en: "Automate the extract of orders, stock, routings and capacity from the ERP into one planning dataset. Manual copying is where most errors start.",
        ar: "أتمت استخراج الطلبات والمخزون ومسارات التصنيع والطاقة من ERP إلى مجموعة بيانات تخطيط واحدة. النسخ اليدوي هو مصدر معظم الأخطاء.",
      },
    },
    {
      id: "finance",
      title: { en: "How is finance involved?", ar: "كيف تشارك الإدارة المالية؟" },
      levels: [
        { en: "Finance is not involved", ar: "المالية غير مشاركة" },
        { en: "Budget is separate from the plan", ar: "الموازنة منفصلة عن الخطة" },
        { en: "The plan is priced monthly", ar: "الخطة تُسعّر شهرياً" },
        { en: "Scenarios are priced before decisions", ar: "السيناريوهات تُسعّر قبل القرار" },
      ],
      advice: {
        en: "Put a price on every gap: revenue at risk, overtime, extra inventory. Decisions get faster when the options have numbers.",
        ar: "ضع سعراً لكل فجوة: الإيراد المعرض للخطر والعمل الإضافي والمخزون الزائد. تتسارع القرارات حين تكون للخيارات أرقام.",
      },
    },
    {
      id: "scenarios",
      title: { en: "How long does a what-if scenario take?", ar: "كم يستغرق سيناريو «ماذا لو»؟" },
      levels: [
        { en: "We don't run scenarios", ar: "لا نجري سيناريوهات" },
        { en: "Days, in spreadsheets", ar: "أياماً على الجداول" },
        { en: "A few standard scenarios", ar: "بضعة سيناريوهات قياسية" },
        { en: "Any scenario in minutes", ar: "أي سيناريو في دقائق" },
      ],
      advice: {
        en: "Prepare three standard scenarios (demand +20%, a key line down, a late supplier) so the meeting can compare options instead of guessing.",
        ar: "جهّز ثلاثة سيناريوهات قياسية (زيادة الطلب 20%، توقف خط رئيسي، تأخر مورد) ليقارن الاجتماع الخيارات بدل التخمين.",
      },
    },
    {
      id: "inventory",
      title: { en: "How are stock levels set?", ar: "كيف تُحدد مستويات المخزون؟" },
      levels: [
        { en: "By gut feel", ar: "بالحدس" },
        { en: "Fixed min/max, rarely updated", ar: "حد أدنى وأقصى ثابت نادراً ما يُحدّث" },
        { en: "Safety stock reviewed quarterly", ar: "مخزون أمان يُراجع ربع سنوياً" },
        { en: "Dynamic, from forecast error and lead times", ar: "ديناميكي من خطأ التوقع ومهل التوريد" },
      ],
      advice: {
        en: "Set safety stock from measured forecast error and actual supplier lead times, and review it at least quarterly for your top items.",
        ar: "حدد مخزون الأمان من خطأ التوقع المقاس ومهل التوريد الفعلية، وراجعه ربع سنوياً على الأقل للأصناف الرئيسية.",
      },
    },
    {
      id: "kpis",
      title: { en: "How is performance tracked?", ar: "كيف يُتابع الأداء؟" },
      levels: [
        { en: "Not measured", ar: "غير مقاس" },
        { en: "On-time delivery, monthly", ar: "التسليم في الموعد شهرياً" },
        { en: "OTD and forecast accuracy", ar: "التسليم في الموعد ودقة التوقع" },
        { en: "KPIs reviewed in S&OP with root causes", ar: "مؤشرات تُراجع في S&OP مع الأسباب الجذرية" },
      ],
      advice: {
        en: "Track on-time delivery, forecast accuracy and plan adherence together, and review the misses in the S&OP meeting — not just the averages.",
        ar: "تابع التسليم في الموعد ودقة التوقع والالتزام بالخطة معاً، وراجع الإخفاقات في اجتماع S&OP لا المتوسطات فقط.",
      },
    },
  ] satisfies ScoreQuestion[],
  bands: [
    { min: 0, title: { en: "Reactive", ar: "تفاعلي" }, body: { en: "Plans are made after problems appear. The quickest win is one shared demand number and a monthly capacity check.", ar: "الخطط تُوضع بعد ظهور المشكلات. أسرع مكسب هو رقم طلب موحد وفحص طاقة شهري." } },
    { min: 1.75, title: { en: "Planned", ar: "مخطط" }, body: { en: "The basics exist but live in spreadsheets. Automating the data flow frees the meeting to make decisions.", ar: "الأساسيات موجودة لكنها في جداول. أتمتة تدفق البيانات تحرر الاجتماع لاتخاذ القرارات." } },
    { min: 2.5, title: { en: "Integrated", ar: "متكامل" }, body: { en: "A real monthly cycle. The next step is fast scenarios and pricing every option before deciding.", ar: "دورة شهرية حقيقية. الخطوة التالية سيناريوهات سريعة وتسعير كل خيار قبل القرار." } },
    { min: 3.25, title: { en: "Orchestrated", ar: "منسق" }, body: { en: "Best-in-class discipline. AI adds value here through better baselines and continuous re-planning.", ar: "انضباط من الطراز الأول. يضيف الذكاء الاصطناعي هنا قيمة عبر توقعات أساسية أفضل وإعادة تخطيط مستمرة." } },
  ],
};

export type ChecklistGroup = { title: L10n; items: { id: string; text: L10n }[] };

export const cbamChecklist = {
  slug: "cbam-checklist",
  department: "finance-costing",
  title: { en: "CBAM Readiness Checklist", ar: "قائمة الجاهزية لآلية CBAM" },
  summary: {
    en: "Thirteen checks for exporters of steel, aluminium, cement, fertilisers and hydrogen to the EU. Tick what you already have and see your gaps.",
    ar: "ثلاثة عشر بنداً لمصدّري الصلب والألومنيوم والأسمنت والأسمدة والهيدروجين إلى الاتحاد الأوروبي. حدّد ما لديك واعرف الفجوات.",
  },
  seo: {
    title: { en: "Free CBAM Readiness Checklist for Egyptian Exporters", ar: "قائمة مجانية للجاهزية لآلية CBAM للمصدّرين المصريين" },
    description: {
      en: "Check your CBAM readiness in 5 minutes: scope, plant data, calculation method and verification. Printable, no sign-up.",
      ar: "افحص جاهزيتك لآلية CBAM في 5 دقائق: النطاق وبيانات المصنع وطريقة الحساب والتحقق. قابلة للطباعة ودون تسجيل.",
    },
  },
  disclaimer: {
    en: "A practical readiness aid, not legal advice. Check obligations against the current EU CBAM regulation and guidance with your EU customers.",
    ar: "أداة عملية للجاهزية وليست استشارة قانونية. راجع الالتزامات وفق لائحة CBAM الأوروبية الحالية وإرشاداتها مع عملائك في الاتحاد الأوروبي.",
  },
  groups: [
    {
      title: { en: "Scope", ar: "النطاق" },
      items: [
        { id: "cn", text: { en: "We know which of our exported products fall under CBAM (by CN code).", ar: "نعرف أي منتجاتنا المصدّرة تخضع لآلية CBAM (حسب رمز التعريفة)." } },
        { id: "customers", text: { en: "We have listed the EU customers and importers who will ask for our emissions data.", ar: "حصرنا العملاء والمستوردين الأوروبيين الذين سيطلبون بيانات انبعاثاتنا." } },
        { id: "installations", text: { en: "We know which installations and production routes make each product.", ar: "نعرف المنشآت ومسارات الإنتاج التي تصنع كل منتج." } },
      ],
    },
    {
      title: { en: "Plant data", ar: "بيانات المصنع" },
      items: [
        { id: "energy", text: { en: "Fuel and energy use is metered per installation, not only per site.", ar: "استهلاك الوقود والطاقة مقاس لكل منشأة لا للموقع فقط." } },
        { id: "production", text: { en: "Production quantities are recorded per product and per period.", ar: "كميات الإنتاج مسجلة لكل منتج ولكل فترة." } },
        { id: "electricity", text: { en: "We know our electricity consumption and its source.", ar: "نعرف استهلاكنا من الكهرباء ومصدرها." } },
        { id: "precursors", text: { en: "We can get embedded-emissions data for key precursors from our suppliers.", ar: "نستطيع الحصول على بيانات الانبعاثات المضمنة للمواد الأولية الرئيسية من الموردين." } },
      ],
    },
    {
      title: { en: "Calculation method", ar: "طريقة الحساب" },
      items: [
        { id: "boundaries", text: { en: "System boundaries and production processes are defined for each installation.", ar: "حدود النظام وعمليات الإنتاج محددة لكل منشأة." } },
        { id: "method", text: { en: "Our monitoring and calculation method is documented, following the EU rules.", ar: "طريقة الرصد والحساب موثقة وفق القواعد الأوروبية." } },
        { id: "per-product", text: { en: "We can calculate direct and indirect embedded emissions per tonne of product.", ar: "نستطيع حساب الانبعاثات المضمنة المباشرة وغير المباشرة لكل طن منتج." } },
      ],
    },
    {
      title: { en: "Evidence and reporting", ar: "الأدلة والإبلاغ" },
      items: [
        { id: "trail", text: { en: "Every reported figure traces back to meters, SCADA or ERP records.", ar: "كل رقم مُبلغ عنه يمكن تتبعه إلى العدادات أو SCADA أو سجلات ERP." } },
        { id: "verifier", text: { en: "We have a plan for verification by an accredited verifier.", ar: "لدينا خطة للتحقق من قبل جهة تحقق معتمدة." } },
        { id: "sharing", text: { en: "We have a repeatable way to send emissions data to EU customers in the format they need.", ar: "لدينا طريقة متكررة لإرسال بيانات الانبعاثات لعملائنا الأوروبيين بالصيغة المطلوبة." } },
      ],
    },
  ] satisfies ChecklistGroup[],
};

/** Tools hub copy. */
export const toolsCopy = {
  title: { en: "Free tools for plant leaders", ar: "أدوات مجانية لقادة المصانع" },
  lead: {
    en: "Self-assessments you can finish in minutes. They run in your browser — nothing is stored unless you choose to book a review.",
    ar: "تقييمات ذاتية تنهيها في دقائق. تعمل في متصفحك — لا يُخزّن شيء إلا إذا اخترت حجز مراجعة.",
  },
  roi: { en: "Planning savings calculator", ar: "حاسبة وفر التخطيط" },
  roiBody: { en: "Estimate the hours and money automated scheduling could return.", ar: "قدّر الساعات والأموال التي قد توفرها الجدولة الآلية." },
  start: { en: "Start", ar: "ابدأ" },
};

export const tools = [sopScorecard, cbamChecklist];
