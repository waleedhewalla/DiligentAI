import type { L10n } from "@/i18n/config";

export const home = {
  seo: {
    title: {
      en: "Diligent AI Transformation | AI Operating System for MENA Manufacturers",
      ar: "Diligent AI | برنامج ذكاء اصطناعي للصناعة المصرية والخليجية",
    },
    description: {
      en: "IPE + CEO OS + Nexus AI: the first Arabic-native AI Operating System for Egyptian and Gulf manufacturers. Deployed. Proven. Book a demo today.",
      ar: "IPE وCEO OS وNexus AI: أول نظام تشغيل بالذكاء الاصطناعي عربي أصيل للمصانع المصرية والخليجية. مُطبّق. مُثبت. احجز عرضاً توضيحياً اليوم.",
    },
    keywords: {
      en: ["AI manufacturing software Egypt", "AI operating system MENA", "production scheduling AI", "Arabic AI"],
      ar: ["برنامج ذكاء اصطناعي للصناعة المصرية", "نظام تشغيل ذكاء اصطناعي", "جدولة الإنتاج بالذكاء الاصطناعي", "ذكاء اصطناعي عربي"],
    },
  },
  badges: {
    en: ["Deployed at Star Trans", "Arabic-native", "8-week go-live"],
    ar: ["مُطبّق في ستار ترانس", "عربي أصيل", "تشغيل خلال 8 أسابيع"],
  } as L10n<string[]>,
  h1: {
    en: ["Your Factory Plans Itself.", "Your CEO Always Knows.", "Your Arabic Content Writes Itself."],
    ar: ["مصنعك يخطط لنفسه.", "رئيسك التنفيذي يعرف دائماً.", "محتواك العربي يكتب نفسه."],
  } as L10n<string[]>,
  h2: {
    en: "Diligent AI — the first AI Operating System built for Egyptian and MENA manufacturers.",
    ar: "Diligent AI — أول نظام تشغيل بالذكاء الاصطناعي مصمم للمصانع في مصر والمنطقة العربية.",
  },
  trustedBy: { en: "Trusted by", ar: "موثوق من" },
  trustFacts: {
    en: ["Cairo-based", "24 years' experience", "3 products live"],
    ar: ["مقرنا القاهرة", "خبرة 24 عاماً", "3 منتجات قيد التشغيل"],
  } as L10n<string[]>,
  problem: {
    eyebrow: { en: "The pain you already know", ar: "الألم الذي تعرفه جيداً" },
    title: { en: "Your company runs on yesterday's information.", ar: "شركتك تُدار بمعلومات الأمس." },
    cards: [
      {
        persona: { en: "Operations", ar: "العمليات" },
        title: { en: "Your schedule: built in 3 days. Wrong by Tuesday.", ar: "جدولك: يُبنى في 3 أيام. خاطئ يوم الثلاثاء." },
        body: {
          en: "One machine stops or one shipment slips, and the plan your team spent half the week building is obsolete. OTD misses target again.",
          ar: "تتوقف ماكينة أو تتأخر شحنة، فتصبح الخطة التي قضى فريقك نصف الأسبوع في بنائها بلا قيمة. ويفوت هدف التسليم في الموعد مرة أخرى.",
        },
      },
      {
        persona: { en: "CEO", ar: "الرئيس التنفيذي" },
        title: { en: "Your CEO intelligence: a PDF on Monday morning.", ar: "معلومات الرئيس التنفيذي: ملف PDF صباح الاثنين." },
        body: {
          en: "By the time the weekly report reaches you, the decisions it should have informed are already made. And the board wants AI ROI proof.",
          ar: "حين يصلك التقرير الأسبوعي، تكون القرارات التي كان يجب أن يدعمها قد اتُخذت بالفعل. ومجلس الإدارة يريد دليلاً على عائد الذكاء الاصطناعي.",
        },
      },
      {
        persona: { en: "Commercial", ar: "التجاري" },
        title: { en: "Arabic content: 3 agencies, 2 weeks, EGP 50K per campaign.", ar: "المحتوى العربي: 3 وكالات، أسبوعان، 50 ألف جنيه للحملة." },
        body: {
          en: "Scaling your Arabic presence means scaling the agency bill — and the ROI is still impossible to measure.",
          ar: "توسيع حضورك العربي يعني مضاعفة فاتورة الوكالة — ويبقى قياس العائد مستحيلاً.",
        },
      },
    ],
  },
  products: {
    eyebrow: { en: "One operating system. Three products.", ar: "نظام تشغيل واحد. ثلاثة منتجات." },
    title: { en: "The MENA Intelligence Ecosystem", ar: "منظومة ذكاء المنطقة" },
    lead: {
      en: "Start with the pain that costs you most. Each product stands alone — together they share one login, one data layer and one Arabic-first team.",
      ar: "ابدأ بالمشكلة الأكثر تكلفة. كل منتج يعمل مستقلاً — ومعاً يتشاركون دخولاً واحداً وطبقة بيانات واحدة وفريقاً عربياً واحداً.",
    },
  },
  proof: {
    eyebrow: { en: "Case study", ar: "دراسة حالة" },
    quote: {
      en: "From 3-day manual planning to automated schedules in 8 weeks.",
      ar: "من تخطيط يدوي يستغرق 3 أيام إلى جداول تلقائية خلال 8 أسابيع.",
    },
  },
  why: {
    eyebrow: { en: "Why Diligent AI", ar: "لماذا Diligent AI" },
    title: { en: "Built for how MENA companies actually work", ar: "مصمم لطريقة عمل شركات المنطقة فعلاً" },
    items: [
      {
        title: { en: "Arabic-native, not translated", ar: "عربي أصيل، لا مترجم" },
        body: {
          en: "Western software offers an Arabic UI. We built Arabic reasoning, reports and content from day one.",
          ar: "البرمجيات الغربية تقدم واجهة عربية. نحن بنينا التحليل والتقارير والمحتوى بالعربية منذ اليوم الأول.",
        },
      },
      {
        title: { en: "8 weeks, not 18 months", ar: "8 أسابيع، لا 18 شهراً" },
        body: {
          en: "Global APS suites take 12–18 months and a large SI partner. IPE goes live in 8 weeks with our Cairo team.",
          ar: "أنظمة APS العالمية تحتاج 12–18 شهراً وشريك تنفيذ كبير. IPE يعمل خلال 8 أسابيع مع فريقنا في القاهرة.",
        },
      },
      {
        title: { en: "Your ERP stays the system of record", ar: "نظام ERP يبقى المرجع" },
        body: {
          en: "SAP-aware by design — our founder has delivered 55+ SAP projects. We integrate; we don't rip and replace.",
          ar: "متوافق مع SAP بالتصميم — مؤسسنا نفّذ أكثر من 55 مشروع SAP. نحن نتكامل ولا نستبدل.",
        },
      },
      {
        title: { en: "Local data, local contract, EGP pricing", ar: "بيانات محلية، عقد محلي، تسعير بالجنيه" },
        body: {
          en: "Egypt-hosted option for data sovereignty, an Egyptian company behind the contract, and pricing that ignores currency swings.",
          ar: "خيار استضافة داخل مصر لسيادة البيانات، وشركة مصرية وراء العقد، وتسعير لا يتأثر بتقلبات العملة.",
        },
      },
    ],
  },
  founder: {
    eyebrow: { en: "Who you call if something goes wrong", ar: "من تتصل به إذا حدثت مشكلة" },
    creds: {
      en: ["24 years in enterprise transformation", "55+ SAP projects", "PMP", "SAP Activate"],
      ar: ["24 عاماً في التحول المؤسسي", "أكثر من 55 مشروع SAP", "PMP", "SAP Activate"],
    } as L10n<string[]>,
    quote: {
      en: "We are not an agency. We are not a platform. We are your operating partner.",
      ar: "لسنا وكالة. ولسنا منصة. نحن شريكك في التشغيل.",
    },
    role: { en: "Founder & CEO", ar: "المؤسس والرئيس التنفيذي" },
  },
  finalCta: {
    title: { en: "Ready to see your factory plan itself?", ar: "مستعد لترى مصنعك يخطط لنفسه؟" },
    body: {
      en: "30 minutes. Your industry, your constraints, Arabic or English. No contract required.",
      ar: "30 دقيقة. قطاعك وقيودك، بالعربية أو الإنجليزية. دون أي التزام تعاقدي.",
    },
  },
};
