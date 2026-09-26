import type { L10n } from "@/i18n/config";

// DRAFT — must be reviewed by counsel before launch (spec §10.1, owner: Omar).
// Written against Egypt's Personal Data Protection Law (No. 151 of 2020) and GDPR.

export type LegalDoc = {
  title: L10n;
  description: L10n;
  updated: string;
  sections: { h: L10n; p: L10n<string[]> }[];
};

export const privacyPolicy: LegalDoc = {
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  description: {
    en: "How Diligent AI collects, uses and protects personal data on diligentai.com and in the customer portal.",
    ar: "كيف تجمع Diligent AI البيانات الشخصية وتستخدمها وتحميها على موقعها وفي بوابة العملاء.",
  },
  updated: "2026-09-25",
  sections: [
    {
      h: { en: "Who we are", ar: "من نحن" },
      p: {
        en: ["Diligent AI Transformation (“Diligent AI”, “we”) is a company based in Cairo, Egypt. We are the controller of personal data collected through this website and the customer portal."],
        ar: ["شركة Diligent AI Transformation (\"Diligent AI\" أو \"نحن\") شركة مقرها القاهرة، مصر. ونحن المسؤولون عن البيانات الشخصية التي تُجمع عبر هذا الموقع وبوابة العملاء."],
      },
    },
    {
      h: { en: "What we collect", ar: "ما الذي نجمعه" },
      p: {
        en: [
          "Demo and contact requests: your name, work email, company, industry, product interest and preferred language — plus, when you submit, how you found us (campaign tags, referring site and up to 10 pages you viewed here), which your browser keeps locally until then.",
          "Portal accounts: name, work email, organisation, role, language preference, authentication events (time, IP address) and product usage required to operate the service.",
          "Analytics: with your consent, pseudonymous usage data via Google Analytics 4 and Hotjar. Without consent, GA4 receives only cookieless, aggregated signals.",
        ],
        ar: [
          "طلبات العروض والتواصل: الاسم، والبريد الإلكتروني للعمل، والشركة، والقطاع، والمنتج المطلوب، واللغة المفضلة — وعند الإرسال، كيف وصلت إلينا (وسوم الحملات والموقع المُحيل وحتى 10 صفحات شاهدتها هنا)، ويحتفظ بها متصفحك محلياً حتى ذلك الحين.",
          "حسابات البوابة: الاسم، والبريد الإلكتروني للعمل، والمؤسسة، والدور، واللغة المفضلة، وأحداث المصادقة (الوقت وعنوان IP)، واستخدام المنتجات اللازم لتشغيل الخدمة.",
          "التحليلات: بموافقتك، بيانات استخدام مستعارة عبر Google Analytics 4 وHotjar. ودون موافقتك، لا يتلقى GA4 سوى إشارات مجمّعة دون ملفات تعريف ارتباط.",
        ],
      },
    },
    {
      h: { en: "How we use it", ar: "كيف نستخدمها" },
      p: {
        en: ["To arrange demos and respond to enquiries; to provide, secure and support the portal and products; to measure which content helps visitors; and to meet legal obligations. We never sell personal data."],
        ar: ["لترتيب العروض التوضيحية والرد على الاستفسارات؛ ولتقديم البوابة والمنتجات وتأمينها ودعمها؛ ولقياس المحتوى الأكثر فائدة للزوار؛ وللوفاء بالالتزامات القانونية. لا نبيع البيانات الشخصية أبداً."],
      },
    },
    {
      h: { en: "Where data is stored", ar: "أين تُخزّن البيانات" },
      p: {
        en: ["Our default region is the EU (Frankfurt). Customers may choose an Egypt-hosted deployment. Customer data is isolated per organisation using row-level security and encrypted at rest (AES-256) and in transit (TLS 1.2+)."],
        ar: ["منطقتنا الافتراضية هي الاتحاد الأوروبي (فرانكفورت)، ويمكن للعملاء اختيار الاستضافة داخل مصر. بيانات العملاء معزولة لكل مؤسسة بأمان على مستوى الصف، ومشفرة أثناء التخزين (AES-256) وأثناء النقل (TLS 1.2+)."],
      },
    },
    {
      h: { en: "Retention", ar: "مدة الاحتفاظ" },
      p: {
        en: ["Demo requests: up to 24 months. Audit logs: 2 years. Account data: for the life of the contract plus the period required by law."],
        ar: ["طلبات العروض: حتى 24 شهراً. سجلات التدقيق: عامان. بيانات الحساب: طوال مدة العقد مضافاً إليها المدة التي يقتضيها القانون."],
      },
    },
    {
      h: { en: "Your rights", ar: "حقوقك" },
      p: {
        en: ["You may request access to, correction or deletion of your personal data, or withdraw consent at any time, by emailing privacy@diligentai.com. We respond within 30 days."],
        ar: ["يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها، أو سحب موافقتك في أي وقت، بمراسلة privacy@diligentai.com. نرد خلال 30 يوماً."],
      },
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: { en: "Terms of Service", ar: "شروط الخدمة" },
  description: {
    en: "The terms governing use of diligentai.com and the Diligent AI customer portal.",
    ar: "الشروط التي تحكم استخدام موقع Diligent AI وبوابة العملاء.",
  },
  updated: "2026-09-25",
  sections: [
    {
      h: { en: "Scope", ar: "النطاق" },
      p: {
        en: ["These terms govern your use of this website and the customer portal. Use of IPE, CEO OS and Nexus AI is additionally governed by your organisation's signed subscription agreement, which prevails in case of conflict."],
        ar: ["تحكم هذه الشروط استخدامك لهذا الموقع وبوابة العملاء. ويخضع استخدام IPE وCEO OS وNexus AI أيضاً لاتفاقية الاشتراك الموقعة مع مؤسستك، والتي تسود عند التعارض."],
      },
    },
    {
      h: { en: "Accounts", ar: "الحسابات" },
      p: {
        en: ["Portal accounts are created by invitation. You are responsible for keeping your credentials confidential and for enabling multi-factor authentication where your role requires it."],
        ar: ["تُنشأ حسابات البوابة بدعوة. أنت مسؤول عن سرية بيانات دخولك وعن تفعيل المصادقة متعددة العوامل حيثما يتطلب دورك ذلك."],
      },
    },
    {
      h: { en: "Acceptable use", ar: "الاستخدام المقبول" },
      p: {
        en: ["You may not attempt to access other organisations' data, probe or disrupt the service, or use it in violation of applicable law."],
        ar: ["لا يجوز لك محاولة الوصول إلى بيانات مؤسسات أخرى، أو اختبار الخدمة أو تعطيلها، أو استخدامها بما يخالف القانون المعمول به."],
      },
    },
    {
      h: { en: "Content and ownership", ar: "المحتوى والملكية" },
      p: {
        en: ["You retain ownership of your data and of content generated for you. We retain ownership of the platform, software and website content."],
        ar: ["تحتفظ بملكية بياناتك والمحتوى المولّد لك. ونحتفظ بملكية المنصة والبرمجيات ومحتوى الموقع."],
      },
    },
    {
      h: { en: "Governing law", ar: "القانون الحاكم" },
      p: {
        en: ["These terms are governed by the laws of the Arab Republic of Egypt, and the courts of Cairo have jurisdiction, unless your subscription agreement states otherwise."],
        ar: ["تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتختص محاكم القاهرة بالنظر في أي نزاع، ما لم تنص اتفاقية الاشتراك على خلاف ذلك."],
      },
    },
  ],
};
