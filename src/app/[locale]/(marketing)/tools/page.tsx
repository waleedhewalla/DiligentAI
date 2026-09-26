import Link from "next/link";
import { ArrowRight, ClipboardCheck, Gauge, Calculator } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { tools, toolsCopy } from "@/content/tools";
import { href, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, FinalCta, PageHero } from "@/components/site/sections";


export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/tools", title: toolsCopy.title[l], description: toolsCopy.lead[l] });
}

export default function ToolsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const cards = [
    ...tools.map((t, i) => ({ href: href(locale, `/tools/${t.slug}`), title: t.title[locale], body: t.summary[locale], icon: i === 0 ? Gauge : ClipboardCheck })),
    { href: href(locale, "/#try"), title: toolsCopy.roi[locale], body: toolsCopy.roiBody[locale], icon: Calculator },
  ];
  return (
    <>
      <JsonLd data={itemListSchema(tools.map((t) => ({ name: t.title[locale], path: `/tools/${t.slug}` })), locale)} />
      <PageHero
        title={toolsCopy.title[locale]}
        lead={toolsCopy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: toolsCopy.title[locale], path: "/tools" },
            ]}
          />
        }
      />
      <section className="section">
        <h2 className="sr-only">{toolsCopy.title[locale]}</h2>
        <div className="container grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md">
              <c.icon className="h-8 w-8 text-brand-teal-dark" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-brand-navy group-hover:underline">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark">
                {toolsCopy.start[locale]} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta locale={locale} dict={dict} title={dict.cta.bookDemo} location="tools_hub" />
    </>
  );
}
