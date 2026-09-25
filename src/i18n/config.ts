export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

// Arabic-first: Arabic is the default for new visitors without a preference.
export const defaultLocale: Locale = "ar";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const ogLocale: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };
export const htmlLang: Record<Locale, string> = { ar: "ar-EG", en: "en" };

/** A bilingual string. Every piece of user-facing copy is authored in both languages. */
export type L10n<T = string> = Record<Locale, T>;

export function t<T>(value: L10n<T>, locale: Locale): T {
  return value[locale];
}
