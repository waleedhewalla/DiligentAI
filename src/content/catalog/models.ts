/**
 * CONFIGURABLE — Arabic model and hosting choices (gap 5, gap 3/PDPL).
 * `status` must reflect what we can deliver today:
 *   "available"  — deployed for at least one customer or ready to deploy now
 *   "on-request" — supported by design, set up per project
 */
import type { L10n } from "@/i18n/config";

export type ModelOption = { id: string; name: string; origin: L10n; note: L10n; status: "available" | "on-request" };
export type HostingOption = { id: string; name: L10n; note: L10n; status: "available" | "on-request" };

export const arabicModels: ModelOption[] = [
  // TODO(Waleed): confirm status for each model.
  { id: "karnak", name: "Karnak", origin: { en: "Egypt · national LLM (MCIT/ITIDA)", ar: "مصر · النموذج الوطني (وزارة الاتصالات/إيتيدا)" }, note: { en: "Egyptian dialect and MSA; Egypt-hosted", ar: "اللهجة المصرية والفصحى؛ استضافة داخل مصر" }, status: "on-request" },
  { id: "allam", name: "ALLaM", origin: { en: "Saudi Arabia · HUMAIN / SDAIA", ar: "السعودية · هيوماين / سدايا" }, note: { en: "For in-Kingdom deployments", ar: "للتطبيقات داخل المملكة" }, status: "on-request" },
  { id: "jais", name: "Jais", origin: { en: "UAE · G42 Inception", ar: "الإمارات · جي 42 إنسبشن" }, note: { en: "For UAE deployments", ar: "للتطبيقات في الإمارات" }, status: "on-request" },
  { id: "frontier", name: "Frontier models", origin: { en: "Global cloud APIs", ar: "واجهات سحابية عالمية" }, note: { en: "Highest quality where data may leave the country", ar: "أعلى جودة حين يُسمح بخروج البيانات" }, status: "available" },
];

export const hostingOptions: HostingOption[] = [
  { id: "eu", name: { en: "EU cloud (Frankfurt)", ar: "سحابة الاتحاد الأوروبي (فرانكفورت)" }, note: { en: "Default region", ar: "المنطقة الافتراضية" }, status: "available" },
  { id: "egypt", name: { en: "Egypt-hosted", ar: "استضافة داخل مصر" }, note: { en: "For PDPL data-residency needs", ar: "لمتطلبات إقامة البيانات وفق قانون حماية البيانات" }, status: "available" },
  { id: "on-prem", name: { en: "On-premise in your plant", ar: "داخل مصنعك" }, note: { en: "Nothing leaves your network", ar: "لا يخرج شيء من شبكتك" }, status: "on-request" },
  { id: "ksa", name: { en: "In-Kingdom (KSA)", ar: "داخل المملكة" }, note: { en: "Saudi cloud regions", ar: "مناطق سحابية سعودية" }, status: "on-request" },
];
