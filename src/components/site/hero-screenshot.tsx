import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/utils";

const alt = {
  en: "IPE planning cockpit: plan coverage, the attention queue and the weekly horizon",
  ar: "لوحة تخطيط IPE: تغطية الخطة وقائمة التنبيهات والأفق الأسبوعي",
};
const caption = { en: "IPE · real product screen, sample data", ar: "IPE · شاشة حقيقية من المنتج ببيانات تجريبية" };

/** Home hero visual: the real IPE cockpit in a browser frame, gently floating. */
export function HeroScreenshot({ locale }: { locale: Locale }) {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-brand-teal/20 blur-3xl" aria-hidden />
      <div className="float-soft relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/40">
        <div className="flex items-center gap-1.5 border-b bg-surface-subtle px-3 py-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/products/ipe-cockpit.webp")}
          srcSet={`${asset("/images/products/ipe-cockpit-640.webp")} 640w, ${asset("/images/products/ipe-cockpit.webp")} 1045w`}
          sizes="(min-width: 1024px) 560px, 100vw"
          width={1045}
          height={655}
          alt={alt[locale]}
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="relative mt-3 text-center text-xs text-white/70">{caption[locale]}</figcaption>
    </figure>
  );
}
