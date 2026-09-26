import type { Locale } from "@/i18n/config";
import { MIN_LOGOS, approvedTestimonials, customerLogos, videoTestimonials } from "@/content/proof";
import { asset } from "@/lib/utils";

const t = {
  logos: { en: "Manufacturers working with us", ar: "مصانع تعمل معنا" },
  voices: { en: "In their words", ar: "بكلماتهم" },
};

/**
 * Social proof block: logo strip, approved quotes and video testimonials.
 * Each part renders only when content/proof.ts has approved data, so nothing
 * unverified ever reaches the page. Returns null when there is nothing to show.
 */
export function ProofStrip({ locale }: { locale: Locale }) {
  const logos = customerLogos.filter((l) => l.approved);
  const quotes = approvedTestimonials();
  const videos = videoTestimonials.filter((v) => v.approved);
  const showLogos = logos.length >= MIN_LOGOS;
  if (!showLogos && !quotes.length && !videos.length) return null;
  return (
    <section className="section pt-0">
      <div className="container">
        {showLogos ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">{t.logos[locale]}</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {logos.map((l) => (
                <li key={l.name} className="text-lg font-bold uppercase tracking-wide text-brand-navy/70" dir="ltr">
                  {l.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(l.src)} alt={l.name} className="h-8 w-auto grayscale" loading="lazy" />
                  ) : (
                    l.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {quotes.length || videos.length ? (
          <div className={showLogos ? "mt-14" : ""}>
            <h2 className="text-center text-2xl font-bold text-brand-navy">{t.voices[locale]}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {quotes.map((q) => (
                <figure key={q.id} className="rounded-2xl border bg-surface-subtle p-6">
                  <blockquote className="text-lg font-medium text-brand-navy">“{q.quote[locale]}”</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">{q.name[locale]}</span> · {q.role[locale]}
                  </figcaption>
                </figure>
              ))}
              {videos.map((v) => (
                <figure key={v.id} className="overflow-hidden rounded-2xl border">
                  <div className="aspect-video">
                    <iframe src={v.embedUrl} title={v.title[locale]} loading="lazy" allowFullScreen className="h-full w-full" />
                  </div>
                  <figcaption className="p-4 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">{v.name[locale]}</span> · {v.role[locale]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
