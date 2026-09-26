import type { L10n } from "@/i18n/config";

/**
 * Homepage copy. Structural lists (service models, categories, capabilities)
 * are NOT here — the homepage renders them straight from the catalog, so new
 * offerings appear without touching this file. Only editorial copy lives here.
 */
export const home = {
  seo: {
    title: {
      en: "Diligent AI | AI Solutions & System Integration for Manufacturers in Egypt & the Gulf",
      ar: "Diligent AI | حلول الذكاء الاصطناعي وتكامل الأنظمة للمصانع في مصر والخليج",
    },
    description: {
      en: "AI consulting, pre-built AI tools, custom models and ERP integration for manufacturers — production planning, forecasting, quality and supply chain. Arabic-first. Book a 30-minute call.",
      ar: "استشارات وأدوات ذكاء اصطناعي جاهزة ونماذج مخصصة وتكامل مع ERP للمصانع — تخطيط الإنتاج والتنبؤ والجودة وسلاسل الإمداد. بالعربية أولاً. احجز مكالمة مدتها 30 دقيقة.",
    },
    keywords: {
      en: ["AI manufacturing software Egypt", "AI consulting manufacturing", "ERP AI integration", "production planning AI", "AI quality control"],
      ar: ["برنامج ذكاء اصطناعي للصناعة المصرية", "استشارات الذكاء الاصطناعي للتصنيع", "تكامل الذكاء الاصطناعي مع ERP", "تخطيط الإنتاج بالذكاء الاصطناعي", "ضبط الجودة بالذكاء الاصطناعي"],
    },
  },
  badges: {
    en: ["Deployed at Star Trans", "Arabic-native", "SAP-experienced team"],
    ar: ["مُطبّق في ستار ترانس", "عربي أصيل", "فريق بخبرة SAP"],
  } as L10n<string[]>,
  // Three coloured headline lines (white / teal / orange), same visual as before.
  h1: {
    en: ["AI for Manufacturing.", "Built on Your Data.", "Inside Your ERP."],
    ar: ["ذكاء اصطناعي للتصنيع.", "مبني على بياناتك.", "داخل نظام ERP."],
  } as L10n<string[]>,
  h2: {
    en: "We consult, build and integrate AI for manufacturers in Egypt and the Gulf — from production planning and quality to supply chain and the boardroom.",
    ar: "نقدم الاستشارات ونبني ونُكامل حلول الذكاء الاصطناعي للمصانع في مصر والخليج — من تخطيط الإنتاج والجودة إلى سلاسل الإمداد ومجلس الإدارة.",
  },
  trustedBy: { en: "Trusted by", ar: "موثوق من" },
  trustFacts: {
    en: ["Cairo-based", "24 years' experience", "55+ SAP projects"],
    ar: ["مقرنا القاهرة", "خبرة 24 عاماً", "أكثر من 55 مشروع SAP"],
  } as L10n<string[]>,
  problem: {
    eyebrow: { en: "The pain you already know", ar: "الألم الذي تعرفه جيداً" },
    title: { en: "Your plant runs on yesterday's information.", ar: "مصنعك يُدار بمعلومات الأمس." },
    lead: {
      en: "The same problems show up in every factory we walk into. Each one is a use case AI now solves reliably.",
      ar: "المشكلات نفسها تظهر في كل مصنع نزوره. وكل واحدة منها حالة استخدام يحلها الذكاء الاصطناعي اليوم بموثوقية.",
    },
    /** Capability slugs whose `problem` line is shown as a pain card (CONFIGURABLE). */
    capabilities: ["production-scheduling", "quality-control", "supply-chain-optimization"],
  },
  picker: {
    tablist: { en: "Choose your department", ar: "اختر إدارتك" },
    pains: { en: "Sound familiar?", ar: "هل يبدو هذا مألوفاً؟" },
    solutions: { en: "Where to start", ar: "من أين تبدأ" },
    seeAll: { en: "See all for this department", ar: "كل حلول هذه الإدارة" },
  },
  showcase: {
    eyebrow: { en: "See the product", ar: "شاهد المنتج" },
    title: { en: "Real software your teams use every day", ar: "برمجيات حقيقية تستخدمها فرقك كل يوم" },
    lead: {
      en: "IPE runs the plan; CEO OS runs the programme. Screens below are from the live products with sample data.",
      ar: "IPE يدير الخطة، وCEO OS يدير البرنامج. الشاشات أدناه من المنتجين الفعليين ببيانات تجريبية.",
    },
    /** Offering slugs with `media` to feature (CONFIGURABLE). */
    offerings: ["ai-production-scheduling", "executive-intelligence"],
  },
  tryIt: {
    eyebrow: { en: "Try it now", ar: "جرّبه الآن" },
    title: { en: "Estimate your savings, or generate Arabic content — no sign-up", ar: "احسب وفرك أو أنشئ محتوى عربياً — دون تسجيل" },
    lead: {
      en: "Two tools you can use right now, no sign-up. The savings calculator runs entirely in your browser.",
      ar: "أداتان يمكنك استخدامهما الآن دون تسجيل. حاسبة الوفر تعمل بالكامل في متصفحك.",
    },
    nexusTitle: { en: "Arabic content in seconds", ar: "محتوى عربي في ثوانٍ" },
    nexusBody: {
      en: "Generate a product post, brochure paragraph or tender summary in Arabic and English from one brief.",
      ar: "أنشئ منشوراً عن منتج أو فقرة كتيب أو ملخص مناقصة بالعربية والإنجليزية من وصف واحد.",
    },
  },
  insightsTitle: { en: "Insights for plant leaders", ar: "رؤى لقادة المصانع" },
  services: {
    eyebrow: { en: "How we work", ar: "كيف نعمل" },
    title: { en: "Consult. Build. Integrate.", ar: "نستشير. نبني. نُكامل." },
    lead: {
      en: "Engage us for one step or all three. Most clients start with a short assessment and move to build and integration once the business case is proven.",
      ar: "تعامل معنا في خطوة واحدة أو في الثلاث. يبدأ معظم عملائنا بتقييم قصير ثم ينتقلون إلى البناء والتكامل بعد إثبات الجدوى.",
    },
  },
  catalog: {
    eyebrow: { en: "What we deliver", ar: "ما الذي نقدمه" },
    title: { en: "AI solutions for the whole plant", ar: "حلول ذكاء اصطناعي للمصنع كله" },
  },
  capabilities: {
    eyebrow: { en: "Manufacturing use cases", ar: "حالات استخدام في التصنيع" },
    title: { en: "Start from the problem, not the product", ar: "ابدأ من المشكلة، لا من المنتج" },
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
    title: { en: "Built for how MENA manufacturers actually work", ar: "مصمم لطريقة عمل مصانع المنطقة فعلاً" },
    items: [
      {
        title: { en: "Arabic-native, not translated", ar: "عربي أصيل، لا مترجم" },
        body: {
          en: "Screens, reports and AI reasoning built in Arabic for the shop floor and the boardroom.",
          ar: "شاشات وتقارير وتحليل بالذكاء الاصطناعي مبنية بالعربية لأرض المصنع ولمجلس الإدارة.",
        },
      },
      {
        title: { en: "Weeks, not 18 months", ar: "أسابيع، لا 18 شهراً" },
        body: {
          en: "Global suites take 12–18 months and a large SI partner. We deliver in phases measured in weeks, with a local team.",
          ar: "الأنظمة العالمية تحتاج 12–18 شهراً وشريك تنفيذ كبير. نحن نسلّم على مراحل تُقاس بالأسابيع، بفريق محلي.",
        },
      },
      {
        title: { en: "Integration is our home ground", ar: "التكامل هو ملعبنا" },
        body: {
          en: "55+ SAP projects behind the team. We connect AI to the systems you run — we don't rip and replace.",
          ar: "خلف الفريق أكثر من 55 مشروع SAP. نربط الذكاء الاصطناعي بأنظمتك — ولا نستبدلها.",
        },
      },
      {
        title: { en: "Local data, contract and pricing", ar: "بيانات وعقد وتسعير محلي" },
        body: {
          en: "Egypt-hosted option, an Egyptian company behind the contract, and EGP pricing.",
          ar: "خيار استضافة داخل مصر، وشركة مصرية وراء العقد، وتسعير بالجنيه.",
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
      en: "We are not an agency, and not just a platform. We are your operating partner.",
      ar: "لسنا وكالة، ولسنا مجرد منصة. نحن شريكك في التشغيل.",
    },
    role: { en: "Founder & CEO", ar: "المؤسس والرئيس التنفيذي" },
  },
  finalCta: {
    title: { en: "Tell us the problem. We'll show you the AI.", ar: "أخبرنا بالمشكلة. وسنريك الحل." },
    body: {
      en: "30 minutes with a senior consultant. Your plant, your systems, Arabic or English. No contract required.",
      ar: "30 دقيقة مع مستشار أول. مصنعك وأنظمتك، بالعربية أو الإنجليزية. دون أي التزام تعاقدي.",
    },
  },
};
