import type { L10n } from "@/i18n/config";
import { founderName } from "@/lib/site";

/**
 * Blog content layer.
 *
 * Posts are typed data so the site builds with zero external dependencies.
 * `getPosts()` / `getPost()` are the only access points — swap their bodies
 * for a Sanity or Supabase query when the CMS goes live and nothing else
 * changes.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  /** Inline call-to-action for a catalog offering (slug from catalog/offerings.ts). */
  | { type: "cta"; offering: string }
  /** Inline card for a free tool (slug from content/tools.ts). */
  | { type: "tool"; tool: string };

export type Post = {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: L10n;
  readingMinutes: number;
  category: L10n;
  /** Internal links (CONFIGURABLE): catalog offerings, capabilities and case studies for SEO silos. */
  related: { offerings: string[]; capabilities: string[]; caseStudies: string[] };
  title: L10n;
  excerpt: L10n;
  keywords: L10n<string[]>;
  body: L10n<Block[]>;
};

const author = founderName;

const posts: Post[] = [
  {
    slug: "actual-product-costing-ai",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-26",
    author,
    readingMinutes: 5,
    category: { en: "Finance & Costing", ar: "المالية والتكاليف" },
    related: { offerings: ["executive-intelligence", "erp-ai-integration"], capabilities: ["executive-decision-intelligence"], caseStudies: [] },
    title: {
      en: "Your Standard Costs Are Wrong: Actual Product Costing for Egyptian Manufacturers",
      ar: "تكاليفك المعيارية غير دقيقة: حساب التكلفة الفعلية للمنتج في المصانع المصرية",
    },
    excerpt: {
      en: "When energy, materials and the pound move every quarter, a standard cost set once a year hides which products and customers actually make money.",
      ar: "حين تتغير الطاقة والخامات والجنيه كل ربع سنة، تخفي التكلفة المعيارية المحددة مرة في العام أي المنتجات والعملاء يحققون ربحاً فعلاً.",
    },
    keywords: {
      en: ["product costing software", "actual costing manufacturing", "margin analysis Egypt"],
      ar: ["حساب تكلفة المنتج", "التكاليف الفعلية في التصنيع", "تحليل الهامش مصر"],
    },
    body: {
      en: [
        { type: "p", text: "Most plants we visit set standard costs once a year and reconcile variances at month-end. That worked when input prices were stable. With energy tariffs, imported materials and the exchange rate all moving within a quarter, the standard cost is often out of date before it is used." },
        { type: "h2", text: "Where the margin hides" },
        { type: "ul", items: ["Energy is allocated by floor area or headcount instead of by machine hours per product.", "Scrap and rework are booked to overhead, so high-defect products look cheaper than they are.", "Changeovers and small batches are not charged to the customers who order them."] },
        { type: "p", text: "None of this needs new accounting rules. It needs the production data you already have — machine hours, scrap, energy meters, batch sizes — joined to the ERP cost records every week instead of once a year." },
        { type: "h2", text: "A practical first step" },
        { type: "ul", items: ["Pick your top 20 products by revenue.", "Pull actual machine hours, scrap and energy for the last 3 months.", "Compare actual cost per unit with the standard, and rank the gaps by margin impact."] },
        { type: "quote", text: "Price the product you actually make, not the one you planned to make last January." },
        { type: "p", text: "We are co-developing a Cost & Margin Intelligence product with pilot customers on top of the ERP integration and CEO OS work described here. If your finance team is fighting the same problem, we would like to hear from you." },
        { type: "cta", offering: "erp-ai-integration" },
      ],
      ar: [
        { type: "p", text: "معظم المصانع التي نزورها تحدد التكاليف المعيارية مرة في العام وتسوي الانحرافات في نهاية الشهر. كان ذلك مناسباً حين كانت أسعار المدخلات مستقرة. أما مع تغير تعريفة الطاقة والخامات المستوردة وسعر الصرف خلال ربع واحد، فكثيراً ما تتقادم التكلفة المعيارية قبل استخدامها." },
        { type: "h2", text: "أين يختبئ الهامش" },
        { type: "ul", items: ["توزيع الطاقة حسب المساحة أو عدد العاملين بدل ساعات تشغيل الماكينة لكل منتج.", "تسجيل الهالك وإعادة التشغيل كمصروفات عامة، فتبدو المنتجات كثيرة العيوب أرخص مما هي.", "عدم تحميل وقت التغيير والدفعات الصغيرة على العملاء الذين يطلبونها."] },
        { type: "p", text: "لا يحتاج أي من ذلك قواعد محاسبية جديدة، بل يحتاج بيانات الإنتاج الموجودة لديك — ساعات الماكينات والهالك وعدادات الطاقة وأحجام الدفعات — مربوطة بسجلات التكلفة في ERP كل أسبوع بدل مرة في العام." },
        { type: "h2", text: "خطوة أولى عملية" },
        { type: "ul", items: ["اختر أعلى 20 منتجاً من حيث الإيراد.", "اجمع ساعات الماكينات الفعلية والهالك والطاقة لآخر 3 أشهر.", "قارن التكلفة الفعلية للوحدة بالمعيارية، ورتّب الفروق حسب أثرها على الهامش."] },
        { type: "quote", text: "سعّر المنتج الذي تصنعه فعلاً، لا الذي خططت لصنعه في يناير الماضي." },
        { type: "p", text: "نطوّر مع عملاء تجريبيين منتج ذكاء التكلفة والهامش فوق أعمال التكامل مع ERP ونظام CEO OS الموضحة هنا. إن كان فريقك المالي يواجه المشكلة نفسها، يسعدنا أن نسمع منك." },
        { type: "cta", offering: "erp-ai-integration" },
      ],
    },
  },
  {
    slug: "sop-for-egyptian-manufacturers",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-26",
    author,
    readingMinutes: 6,
    category: { en: "S&OP", ar: "تخطيط المبيعات والعمليات" },
    related: { offerings: ["ai-production-scheduling", "data-pipelines"], capabilities: ["demand-planning", "production-forecasting"], caseStudies: ["star-trans"] },
    title: {
      en: "S&OP Without the Spreadsheet War: A Monthly Cycle That Ends in Decisions",
      ar: "تخطيط المبيعات والعمليات دون حرب الجداول: دورة شهرية تنتهي بقرارات",
    },
    excerpt: {
      en: "Sales, finance and production each bring their own forecast to the meeting. Here is a five-step monthly cycle that gives the plant one number to act on.",
      ar: "تأتي المبيعات والمالية والإنتاج كل منها بتوقعه الخاص إلى الاجتماع. إليك دورة شهرية من خمس خطوات تمنح المصنع رقماً واحداً يعمل عليه.",
    },
    keywords: {
      en: ["S&OP process", "sales and operations planning Egypt", "demand planning manufacturing"],
      ar: ["عملية تخطيط المبيعات والعمليات", "S&OP مصر", "تخطيط الطلب في التصنيع"],
    },
    body: {
      en: [
        { type: "p", text: "In many plants the S&OP meeting is where three spreadsheets meet for the first time. Most of the hour goes to reconciling numbers, and the decisions — what to build, what to buy, which orders to delay — are made afterwards in corridors." },
        { type: "h2", text: "Five steps, one number" },
        { type: "ul", items: ["Demand review: start from a statistical baseline built from order history, then let sales adjust it with named reasons.", "Supply review: run a rough-cut capacity check of that demand against lines, shifts and materials.", "Gap review: list only the months and products where demand and supply disagree.", "Financial view: price the gaps — revenue at risk, overtime, inventory.", "Executive decision: approve one plan and record who owns each action."] },
        { type: "p", text: "The technology matters less than the discipline, but it removes the reconciling. When demand, capacity and cost come from the same data every month, the meeting can start at step three." },
        { type: "h2", text: "Where AI actually helps" },
        { type: "ul", items: ["A forecast baseline that learns seasonality and promotions, so sales adjusts instead of starting from zero.", "Scenario answers in minutes: +20% demand, a line down for two weeks, a late supplier.", "A production schedule that is regenerated from the approved plan, not re-typed."] },
        { type: "quote", text: "If the meeting spends its time agreeing the numbers, it has no time left to decide." },
        { type: "tool", tool: "sop-scorecard" },
        { type: "cta", offering: "ai-production-scheduling" },
      ],
      ar: [
        { type: "p", text: "في كثير من المصانع يكون اجتماع تخطيط المبيعات والعمليات هو المكان الذي تلتقي فيه ثلاثة جداول لأول مرة. يذهب معظم الوقت في مطابقة الأرقام، وتُتخذ القرارات — ماذا ننتج وماذا نشتري وأي الطلبات نؤجل — لاحقاً في الممرات." },
        { type: "h2", text: "خمس خطوات ورقم واحد" },
        { type: "ul", items: ["مراجعة الطلب: ابدأ من توقع أساسي إحصائي مبني على تاريخ الطلبات، ثم دع المبيعات تعدّله بأسباب واضحة.", "مراجعة الإمداد: فحص مبدئي لطاقة الخطوط والورديات والخامات مقابل هذا الطلب.", "مراجعة الفجوات: اعرض فقط الأشهر والمنتجات التي يختلف فيها الطلب عن الإمداد.", "الرؤية المالية: سعّر الفجوات — الإيراد المعرض للخطر والعمل الإضافي والمخزون.", "القرار التنفيذي: اعتمد خطة واحدة وسجّل مسؤول كل إجراء."] },
        { type: "p", text: "الانضباط أهم من التقنية، لكن التقنية تلغي المطابقة. حين يأتي الطلب والطاقة والتكلفة من البيانات نفسها كل شهر، يبدأ الاجتماع من الخطوة الثالثة." },
        { type: "h2", text: "أين يساعد الذكاء الاصطناعي فعلاً" },
        { type: "ul", items: ["توقع أساسي يتعلم الموسمية والعروض، فتعدّل المبيعات بدل البدء من الصفر.", "إجابات للسيناريوهات في دقائق: زيادة الطلب 20%، توقف خط لأسبوعين، تأخر مورد.", "جدول إنتاج يُعاد توليده من الخطة المعتمدة، لا يُعاد كتابته."] },
        { type: "quote", text: "إن قضى الاجتماع وقته في الاتفاق على الأرقام، فلن يبقى له وقت ليقرر." },
        { type: "tool", tool: "sop-scorecard" },
        { type: "cta", offering: "ai-production-scheduling" },
      ],
    },
  },
  {
    slug: "cbam-egyptian-exporters-2026",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
    author,
    readingMinutes: 5,
    category: { en: "Compliance", ar: "الامتثال" },
    related: { offerings: ["cbam-emissions-reporting"], capabilities: ["energy-carbon-reporting"], caseStudies: [] },
    title: {
      en: "CBAM Is Live: What Egyptian Steel, Cement and Fertiliser Exporters Need From Their Plant Data",
      ar: "آلية CBAM سارية: ما الذي يحتاجه مصدّرو الصلب والأسمنت والأسمدة المصريون من بيانات مصانعهم",
    },
    excerpt: {
      en: "Since 1 January 2026, EU importers need verified embedded emissions. Plants that can't provide them risk being priced on default values.",
      ar: "منذ 1 يناير 2026، يحتاج المستوردون الأوروبيون انبعاثات مضمنة موثقة. والمصانع التي لا تستطيع تقديمها تخاطر بالتسعير وفق القيم الافتراضية.",
    },
    keywords: {
      en: ["CBAM Egypt", "embedded emissions", "carbon border adjustment steel"],
      ar: ["آلية CBAM مصر", "الانبعاثات المضمنة", "تعديل حدود الكربون الصلب"],
    },
    body: {
      en: [
        { type: "p", text: "The EU Carbon Border Adjustment Mechanism (CBAM) moved from its transitional reporting phase into its definitive period on 1 January 2026. It covers iron and steel, cement, aluminium, fertilisers, electricity and hydrogen imported into the EU." },
        { type: "p", text: "The obligation sits with the EU importer, but the data has to come from you: the emissions embedded in each product you ship. Where actual, verified plant data is not available, default values can be used — and defaults are designed to be conservative." },
        { type: "h2", text: "Why this is a plant-data problem, not a paperwork problem" },
        { type: "ul", items: ["Emissions depend on the production route, fuel mix and electricity use of each installation.", "Buyers need numbers per product and per shipment, not a yearly company total.", "Verifiers need an audit trail back to meters and production records."] },
        { type: "p", text: "Egyptian producers often run cleaner routes than the defaults assume — for example, direct-reduced iron with electric-arc furnaces in steel. Proving that requires data captured continuously from meters, SCADA and the ERP, not estimated once a year in a spreadsheet." },
        { type: "h2", text: "What to do in the next 90 days" },
        { type: "ul", items: ["List which products and customers fall under CBAM.", "Map where energy, fuel and material data lives today — meters, SCADA, ERP, Excel.", "Automate the capture for one installation first, then extend."] },
        { type: "quote", text: "Verified data is the difference between your real footprint and someone else's assumption." },
        { type: "tool", tool: "cbam-checklist" },
        { type: "cta", offering: "cbam-emissions-reporting" },
      ],
      ar: [
        { type: "p", text: "انتقلت آلية تعديل حدود الكربون الأوروبية (CBAM) من مرحلة الإبلاغ الانتقالية إلى مرحلتها النهائية في 1 يناير 2026. وهي تشمل الحديد والصلب والأسمنت والألومنيوم والأسمدة والكهرباء والهيدروجين المستوردة إلى الاتحاد الأوروبي." },
        { type: "p", text: "الالتزام يقع على المستورد الأوروبي، لكن البيانات يجب أن تأتي منك: الانبعاثات المضمنة في كل منتج تشحنه. وحين لا تتوفر بيانات فعلية موثقة من المصنع، يمكن استخدام قيم افتراضية — وهي مصممة لتكون متحفظة." },
        { type: "h2", text: "لماذا هي مشكلة بيانات مصنع لا مشكلة أوراق" },
        { type: "ul", items: ["الانبعاثات تعتمد على مسار الإنتاج ومزيج الوقود واستهلاك الكهرباء لكل منشأة.", "المشترون يحتاجون أرقاماً لكل منتج ولكل شحنة، لا إجمالياً سنوياً للشركة.", "جهات التحقق تحتاج سجل تدقيق يعود إلى العدادات وسجلات الإنتاج."] },
        { type: "p", text: "كثيراً ما يستخدم المنتجون المصريون مسارات أنظف مما تفترضه القيم الافتراضية — مثل الاختزال المباشر للحديد مع أفران القوس الكهربائي في الصلب. وإثبات ذلك يحتاج بيانات تُلتقط باستمرار من العدادات وSCADA وERP، لا تقديراً سنوياً على جدول بيانات." },
        { type: "h2", text: "ما الذي تفعله خلال 90 يوماً" },
        { type: "ul", items: ["حدد المنتجات والعملاء الخاضعين لآلية CBAM.", "ارسم خريطة لمكان بيانات الطاقة والوقود والخامات اليوم — العدادات وSCADA وERP وExcel.", "أتمت الالتقاط لمنشأة واحدة أولاً، ثم وسّع."] },
        { type: "quote", text: "البيانات الموثقة هي الفرق بين بصمتك الحقيقية وافتراضات غيرك." },
        { type: "tool", tool: "cbam-checklist" },
        { type: "cta", offering: "cbam-emissions-reporting" },
      ],
    },
  },
  {
    slug: "egypt-pdpl-where-your-ai-runs",
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    author,
    readingMinutes: 4,
    category: { en: "Compliance", ar: "الامتثال" },
    related: { offerings: ["shop-floor-arabic-copilot", "data-pipelines"], capabilities: [], caseStudies: [] },
    title: {
      en: "Egypt's Data Protection Law and AI: Where Your Models Run Now Matters",
      ar: "قانون حماية البيانات المصري والذكاء الاصطناعي: مكان تشغيل نماذجك أصبح مهماً",
    },
    excerpt: {
      en: "With the executive regulations issued, moving personal data abroad needs a licence. Here is what that means for factory AI.",
      ar: "مع صدور اللائحة التنفيذية، أصبح نقل البيانات الشخصية للخارج يحتاج ترخيصاً. إليك ما يعنيه ذلك لذكاء المصانع الاصطناعي.",
    },
    keywords: {
      en: ["Egypt PDPL AI", "data residency Egypt", "Law 151 of 2020"],
      ar: ["قانون حماية البيانات المصري", "إقامة البيانات مصر", "القانون 151 لسنة 2020"],
    },
    body: {
      en: [
        { type: "p", text: "Egypt's Personal Data Protection Law (Law 151 of 2020) now has its executive regulations, and enforcement is expected to begin after the grace period in late 2026. Among other things, transferring personal data outside Egypt requires a licence." },
        { type: "h2", text: "Why factory AI touches personal data" },
        { type: "ul", items: ["Shift and operator records in scheduling and quality systems.", "Employee names in maintenance work orders.", "Customer contacts in sales and proposal tools."] },
        { type: "p", text: "Most global AI tools process data outside Egypt by default. That doesn't make them unusable, but it does make hosting a decision your legal team now needs to sign off." },
        { type: "h2", text: "Three hosting patterns that work" },
        { type: "ul", items: ["Egypt-hosted: data and models stay in-country.", "On-premise: nothing leaves your plant network; useful for shop-floor copilots.", "Hybrid: personal data stays local, anonymised production data can use global models."] },
        { type: "p", text: "The same logic applies to the language model. Egypt's national Arabic model, Karnak, and other regional models give you Arabic capability without sending data abroad." },
        { type: "cta", offering: "shop-floor-arabic-copilot" },
      ],
      ar: [
        { type: "p", text: "أصبح لقانون حماية البيانات الشخصية المصري (القانون 151 لسنة 2020) لائحة تنفيذية، ومن المتوقع أن يبدأ التطبيق بعد فترة السماح في أواخر 2026. ومن بين أحكامه، أن نقل البيانات الشخصية خارج مصر يتطلب ترخيصاً." },
        { type: "h2", text: "لماذا يلمس ذكاء المصانع البيانات الشخصية" },
        { type: "ul", items: ["سجلات الورديات والمشغلين في أنظمة الجدولة والجودة.", "أسماء الموظفين في أوامر عمل الصيانة.", "جهات اتصال العملاء في أدوات المبيعات والعروض."] },
        { type: "p", text: "معظم أدوات الذكاء الاصطناعي العالمية تعالج البيانات خارج مصر افتراضياً. هذا لا يجعلها غير قابلة للاستخدام، لكنه يجعل الاستضافة قراراً يحتاج اعتماد الفريق القانوني." },
        { type: "h2", text: "ثلاثة أنماط استضافة تنجح" },
        { type: "ul", items: ["استضافة داخل مصر: البيانات والنماذج تبقى داخل البلاد.", "داخل المصنع: لا يخرج شيء من شبكة مصنعك؛ مفيد لمساعدي أرض المصنع.", "هجين: البيانات الشخصية تبقى محلياً، وبيانات الإنتاج المجهّلة يمكنها استخدام نماذج عالمية."] },
        { type: "p", text: "المنطق نفسه ينطبق على نموذج اللغة. النموذج العربي الوطني المصري «كرنك» ونماذج إقليمية أخرى تمنحك قدرات عربية دون إرسال البيانات للخارج." },
        { type: "cta", offering: "shop-floor-arabic-copilot" },
      ],
    },
  },
  {
    slug: "egyptian-factory-otd-manual-scheduling",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-18",
    author,
    readingMinutes: 6,
    category: { en: "Operations", ar: "العمليات" },
    related: { offerings: ["ai-production-scheduling"], capabilities: ["production-scheduling"], caseStudies: ["star-trans"] },
    title: {
      en: "Why Egyptian Factories Miss On-Time Delivery — and It Isn't the Machines",
      ar: "لماذا تتأخر المصانع المصرية في التسليم؟ المشكلة ليست في الماكينات",
    },
    excerpt: {
      en: "A three-day planning cycle guarantees your schedule is wrong by Tuesday. Here is what top-quartile plants do differently.",
      ar: "دورة تخطيط مدتها ثلاثة أيام تضمن أن جدولك سيكون خاطئاً بحلول الثلاثاء. إليك ما تفعله أفضل المصانع بشكل مختلف.",
    },
    keywords: {
      en: ["on-time delivery Egypt", "production scheduling", "factory planning Excel"],
      ar: ["التسليم في الموعد", "جدولة الإنتاج", "تخطيط المصانع"],
    },
    body: {
      en: [
        { type: "p", text: "Ask an operations head in Cairo or 10th of Ramadan why on-time delivery (OTD) is below target, and you will hear about machine breakdowns, late raw materials and last-minute customer changes. All real. But none of them is the root cause." },
        { type: "p", text: "The root cause is the planning cycle itself. When building a weekly schedule takes two to three days of Excel work, the schedule is already out of date the moment it is published. The first disruption breaks it, and there is no time to rebuild it until next week." },
        { type: "h2", text: "The three-day trap" },
        { type: "ul", items: ["Day 1–3: planners gather orders, capacity and material status and build the plan by hand.", "Day 4: the plan is published — and a machine goes down.", "Day 5–7: supervisors improvise. OTD slips. The cycle repeats."] },
        { type: "p", text: "Top-quartile manufacturers globally have moved to Advanced Planning & Scheduling (APS): software that generates a feasible, optimised schedule from real constraints in seconds, and regenerates it whenever reality changes. In MENA this shift is running three to five years behind." },
        { type: "h2", text: "What changes when the plan takes 60 seconds" },
        { type: "p", text: "When a schedule takes under a minute to produce, re-planning stops being an emergency and becomes routine. Planners stop building schedules and start managing exceptions. That is the change we measured at Star Trans: an 80% reduction in planning time within eight weeks of go-live." },
        { type: "quote", text: "Your schedule: built in 3 days, wrong by Tuesday. It doesn't have to be." },
        { type: "h2", text: "Where to start" },
        { type: "ul", items: ["Measure your current planning cycle in hours, honestly.", "List the top five disruptions that broke last month's schedules.", "Check whether your ERP holds routings and capacities accurately — that is the data an APS engine needs."] },
        { type: "cta", offering: "ai-production-scheduling" },
      ],
      ar: [
        { type: "p", text: "اسأل أي مدير عمليات في القاهرة أو العاشر من رمضان عن سبب انخفاض نسبة التسليم في الموعد، وستسمع عن أعطال الماكينات وتأخر الخامات وتغييرات العملاء في اللحظة الأخيرة. كلها حقيقية، لكن أياً منها ليس السبب الجذري." },
        { type: "p", text: "السبب الجذري هو دورة التخطيط نفسها. حين يستغرق بناء الجدول الأسبوعي يومين أو ثلاثة على Excel، يكون الجدول متقادماً لحظة نشره. أول عطل يكسره، ولا وقت لإعادة بنائه حتى الأسبوع التالي." },
        { type: "h2", text: "فخ الأيام الثلاثة" },
        { type: "ul", items: ["الأيام 1–3: يجمع المخططون الطلبيات والطاقة وحالة الخامات ويبنون الخطة يدوياً.", "اليوم 4: تُنشر الخطة — وتتعطل ماكينة.", "الأيام 5–7: يرتجل المشرفون، وتنخفض نسبة التسليم، وتتكرر الدورة."] },
        { type: "p", text: "انتقلت أفضل المصانع عالمياً إلى أنظمة التخطيط والجدولة المتقدمة (APS): برمجيات تُنتج جدولاً ممكناً ومُحسّناً من القيود الفعلية في ثوانٍ، وتعيد إنتاجه كلما تغيّر الواقع. وفي منطقتنا يتأخر هذا التحول من ثلاث إلى خمس سنوات." },
        { type: "h2", text: "ما الذي يتغير حين تستغرق الخطة 60 ثانية" },
        { type: "p", text: "حين يُنتج الجدول في أقل من دقيقة، تتحول إعادة التخطيط من حالة طوارئ إلى عمل روتيني. يتوقف المخططون عن بناء الجداول ويبدؤون بإدارة الاستثناءات. هذا ما قسناه في ستار ترانس: انخفاض وقت التخطيط بنسبة 80% خلال ثمانية أسابيع من التشغيل." },
        { type: "quote", text: "جدولك: يُبنى في 3 أيام، ويصبح خاطئاً يوم الثلاثاء. لا يجب أن يكون الأمر كذلك." },
        { type: "h2", text: "من أين تبدأ" },
        { type: "ul", items: ["قِس دورة التخطيط الحالية بالساعات، بصدق.", "اكتب أكثر خمسة أعطال كسرت جداول الشهر الماضي.", "تحقق من دقة مسارات التشغيل والطاقات في نظام ERP — فهذه هي البيانات التي يحتاجها محرك APS."] },
        { type: "cta", offering: "ai-production-scheduling" },
      ],
    },
  },
  {
    slug: "ceo-ai-operating-system",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    author,
    readingMinutes: 5,
    category: { en: "Leadership", ar: "القيادة" },
    related: { offerings: ["executive-intelligence"], capabilities: ["executive-decision-intelligence"], caseStudies: ["star-trans"] },
    title: {
      en: "The CEO AI Operating System: How Forward-Thinking MENA CEOs Gain an Edge",
      ar: "نظام التشغيل الذكي للرئيس التنفيذي: كيف يتفوق القادة في منطقتنا",
    },
    excerpt: {
      en: "Your board is asking for AI ROI. The first place to prove it is your own desk.",
      ar: "مجلس إدارتك يسأل عن عائد الذكاء الاصطناعي. وأول مكان لإثباته هو مكتبك أنت.",
    },
    keywords: {
      en: ["CEO dashboard", "executive intelligence", "board reporting Arabic"],
      ar: ["لوحة الرئيس التنفيذي", "الذكاء التنفيذي", "تقارير مجلس الإدارة بالعربية"],
    },
    body: {
      en: [
        { type: "p", text: "Most CEOs in Egypt and the Gulf learn how their company performed last week from a PDF on Monday morning. By then, the decisions that mattered have already been made — or missed." },
        { type: "h2", text: "Three questions every CEO should answer in under a minute" },
        { type: "ul", items: ["Are we on plan this month — revenue, margin, cash?", "Which site, product or customer is drifting, and why?", "What will I tell the board, and can I back every number?"] },
        { type: "p", text: "Generic BI tools can answer these, eventually, after months of setup and a team to maintain them. A CEO operating system arrives configured for exactly these questions, in Arabic, with every figure linked to its source." },
        { type: "h2", text: "Board reporting is the fastest ROI" },
        { type: "p", text: "The board pack is the most expensive document most CEOs produce: two days of collecting, reconciling and formatting each quarter. Generating it in under five minutes is the quickest, most visible proof of AI value you can give your board." },
        { type: "cta", offering: "executive-intelligence" },
      ],
      ar: [
        { type: "p", text: "يعرف معظم الرؤساء التنفيذيين في مصر والخليج أداء شركاتهم في الأسبوع الماضي من ملف PDF صباح الاثنين. وحينها تكون القرارات المهمة قد اتُخذت بالفعل — أو فاتت." },
        { type: "h2", text: "ثلاثة أسئلة يجب أن يجيب عنها كل رئيس تنفيذي في أقل من دقيقة" },
        { type: "ul", items: ["هل نحن على الخطة هذا الشهر — الإيرادات والهامش والسيولة؟", "أي موقع أو منتج أو عميل ينحرف، ولماذا؟", "ماذا سأقول لمجلس الإدارة، وهل أستطيع إثبات كل رقم؟"] },
        { type: "p", text: "يمكن لأدوات BI العامة الإجابة عن هذه الأسئلة في النهاية، بعد شهور من الإعداد وفريق لصيانتها. أما نظام تشغيل الرئيس التنفيذي فيصل مهيأً لهذه الأسئلة تحديداً، بالعربية، مع ربط كل رقم بمصدره." },
        { type: "h2", text: "تقارير المجلس هي أسرع عائد" },
        { type: "p", text: "حزمة مجلس الإدارة هي أغلى وثيقة يُعدّها معظم الرؤساء التنفيذيين: يومان من التجميع والمطابقة والتنسيق كل ربع سنة. إعدادها في أقل من خمس دقائق هو أسرع وأوضح دليل على قيمة الذكاء الاصطناعي يمكنك تقديمه لمجلسك." },
        { type: "cta", offering: "executive-intelligence" },
      ],
    },
  },
  {
    slug: "arabic-content-conceived-not-translated",
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    author,
    readingMinutes: 4,
    category: { en: "Marketing", ar: "التسويق" },
    related: { offerings: ["arabic-commercial-content"], capabilities: [], caseStudies: ["star-trans"] },
    title: {
      en: "Arabic Content Should Be Conceived, Not Translated",
      ar: "المحتوى العربي يجب أن يُكتب بالعربية، لا أن يُترجم إليها",
    },
    excerpt: {
      en: "3 agencies, 2 weeks, EGP 50K per campaign. Why translated Arabic underperforms, and what to do instead.",
      ar: "3 وكالات، أسبوعان، 50 ألف جنيه للحملة. لماذا يضعف المحتوى المترجم، وما البديل.",
    },
    keywords: {
      en: ["Arabic content marketing", "Arabic copywriting", "B2B marketing Egypt"],
      ar: ["التسويق بالمحتوى العربي", "كتابة الإعلانات بالعربية", "التسويق بين الشركات"],
    },
    body: {
      en: [
        { type: "p", text: "Most Arabic B2B content in the region starts life in English. It is then translated, reviewed, corrected and approved — a two-week loop that costs tens of thousands of pounds and still reads like a translation." },
        { type: "h2", text: "Why translated Arabic underperforms" },
        { type: "ul", items: ["Sentence structure follows English rhythm, not Arabic rhetoric.", "Idioms and examples are foreign to the reader.", "Register is wrong — too formal for LinkedIn, too casual for a proposal."] },
        { type: "p", text: "Content conceived in Arabic, with the right register for the audience — Modern Standard, Egyptian or Gulf — earns attention that translated copy cannot." },
        { type: "h2", text: "Scaling without scaling the agency budget" },
        { type: "p", text: "The goal is not to remove humans. It is to move your team from writing first drafts to reviewing and sharpening them. That shift is where the cost per piece drops by around 90%." },
        { type: "cta", offering: "arabic-commercial-content" },
      ],
      ar: [
        { type: "p", text: "يبدأ معظم محتوى الشركات العربي في المنطقة حياته بالإنجليزية، ثم يُترجم ويُراجع ويُصحح ويُعتمد — دورة مدتها أسبوعان تكلّف عشرات الآلاف من الجنيهات، ويبقى النص في النهاية مترجماً." },
        { type: "h2", text: "لماذا يضعف المحتوى المترجم" },
        { type: "ul", items: ["بنية الجملة تتبع إيقاع الإنجليزية لا بلاغة العربية.", "التعبيرات والأمثلة غريبة عن القارئ.", "مستوى اللغة غير مناسب — رسمي أكثر من اللازم على لينكدإن، أو عامي أكثر من اللازم في عرض سعر."] },
        { type: "p", text: "المحتوى الذي يُكتب بالعربية من البداية، وبالمستوى اللغوي المناسب للجمهور — فصحى أو مصري أو خليجي — ينال انتباهاً لا يناله النص المترجم." },
        { type: "h2", text: "التوسع دون مضاعفة ميزانية الوكالة" },
        { type: "p", text: "الهدف ليس الاستغناء عن البشر، بل نقل فريقك من كتابة المسودات الأولى إلى مراجعتها وصقلها. في هذا التحول تنخفض تكلفة القطعة الواحدة بنحو 90%." },
        { type: "cta", offering: "arabic-commercial-content" },
      ],
    },
  },
];

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}
