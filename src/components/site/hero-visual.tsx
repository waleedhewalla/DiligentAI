import type { Locale } from "@/i18n/config";

/**
 * Lightweight, image-free mock of the IPE scheduling board (Arabic/English).
 * Pure markup keeps LCP fast on 4G — no hero image download.
 */
const copy = {
  ar: {
    title: "جدول الإنتاج — الأسبوع 39",
    status: "تم التحسين في 42 ثانية",
    lines: ["خط البثق 1", "خط البثق 2", "التعبئة", "التغليف"],
    health: "مؤشر صحة المصنع",
    otd: "التسليم في الموعد",
    util: "استغلال الطاقة",
    quality: "الجودة",
    sample: "بيانات توضيحية",
  },
  en: {
    title: "Production schedule — Week 39",
    status: "Optimised in 42 seconds",
    lines: ["Extrusion 1", "Extrusion 2", "Filling", "Packing"],
    health: "Factory Health Score",
    otd: "On-time delivery",
    util: "Utilisation",
    quality: "Quality",
    sample: "Illustrative data",
  },
};

const bars = [
  [
    { s: 0, w: 28, c: "bg-brand-orange" },
    { s: 31, w: 22, c: "bg-brand-teal" },
    { s: 56, w: 34, c: "bg-brand-orange/70" },
  ],
  [
    { s: 4, w: 36, c: "bg-brand-teal" },
    { s: 44, w: 18, c: "bg-white/60" },
    { s: 65, w: 30, c: "bg-brand-teal/70" },
  ],
  [
    { s: 10, w: 20, c: "bg-brand-orange/80" },
    { s: 34, w: 40, c: "bg-brand-orange" },
  ],
  [
    { s: 18, w: 26, c: "bg-brand-teal/80" },
    { s: 48, w: 24, c: "bg-brand-orange/70" },
    { s: 76, w: 20, c: "bg-brand-teal" },
  ],
];

export function HeroVisual({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <div
      role="img"
      aria-label={locale === "ar" ? "لوحة جدولة الإنتاج في IPE بالعربية" : "IPE production scheduling dashboard"}
      className="relative rounded-2xl border border-white/15 bg-white/5 p-5 shadow-2xl backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{c.title}</p>
        <span className="rounded-full bg-brand-teal/20 px-2.5 py-1 text-xs font-medium text-brand-teal">● {c.status}</span>
      </div>
      <div className="mt-5 space-y-3">
        {c.lines.map((line, i) => (
          <div key={line} className="grid grid-cols-[88px_1fr] items-center gap-3">
            <span className="truncate text-xs text-white/70">{line}</span>
            <div className="relative h-7 rounded-md bg-white/5">
              {bars[i].map((b, j) => (
                <span
                  key={j}
                  className={`absolute top-1 h-5 rounded ${b.c}`}
                  style={{ insetInlineStart: `${b.s}%`, width: `${b.w}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-brand-navy-deep/60 p-4">
        <p className="text-xs text-white/60">{c.health}</p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          {[
            { k: c.otd, v: 94 },
            { k: c.util, v: 87 },
            { k: c.quality, v: 98 },
          ].map((m) => (
            <div key={m.k}>
              <p className="text-xl font-bold text-white">
                <span className="ltr-run">{m.v}%</span>
              </p>
              <p className="text-[11px] text-white/60">{m.k}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-brand-teal" style={{ width: `${m.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-end text-[10px] text-white/40">{c.sample}</p>
    </div>
  );
}
