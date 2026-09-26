import type { Locale } from "@/i18n/config";
import { Variant } from "./variant";

const labels = {
  long: {
    a: { en: "Book a 30-min plant review", ar: "احجز مراجعة لمصنعك (30 دقيقة)" },
    b: { en: "Get my plant review", ar: "احصل على مراجعة لمصنعي" },
  },
  short: {
    a: { en: "Book a plant review", ar: "احجز مراجعة لمصنعك" },
    b: { en: "Get my review", ar: "احصل على مراجعتي" },
  },
};

/** Primary-button wording under the "cta" A/B test. Version A matches the dictionary. */
export function CtaLabel({ locale, size = "long" }: { locale: Locale; size?: "long" | "short" }) {
  const l = labels[size];
  return (
    <>
      <Variant exp="cta" v="a">
        {l.a[locale]}
      </Variant>
      <Variant exp="cta" v="b">
        {l.b[locale]}
      </Variant>
    </>
  );
}
