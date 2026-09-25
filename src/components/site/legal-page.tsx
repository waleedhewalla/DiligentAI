import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { LegalDoc } from "@/content/legal";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "./sections";

export function LegalPage({ doc, path, locale }: { doc: LegalDoc; path: string; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <article className="container max-w-3xl py-12 md:py-16">
      <div className="text-brand-navy">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: dict.breadcrumbs.home, path: "/" },
            { name: doc.title[locale], path },
          ]}
        />
      </div>
      <h1 className="mt-8 text-4xl font-bold text-brand-navy">{doc.title[locale]}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {dict.common.updated} <time dateTime={doc.updated}>{formatDate(doc.updated, locale)}</time>
      </p>
      <div className="prose prose-lg mt-10 max-w-none prose-headings:text-brand-navy">
        {doc.sections.map((s) => (
          <section key={s.h.en}>
            <h2>{s.h[locale]}</h2>
            {s.p[locale].map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
