import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPosts } from "@/content/blog";
import { href, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs, PageHero } from "@/components/site/sections";

const copy = {
  title: { en: "Insights — AI for MENA Manufacturing & Leadership", ar: "رؤى — الذكاء الاصطناعي للصناعة والقيادة في المنطقة" },
  description: {
    en: "Practical articles on production planning, executive intelligence and Arabic marketing for manufacturers in Egypt and the Gulf.",
    ar: "مقالات عملية عن تخطيط الإنتاج والذكاء التنفيذي والتسويق بالعربية لشركات التصنيع في مصر والخليج.",
  },
  h1: { en: "Insights", ar: "رؤى" },
  lead: {
    en: "Field notes on planning, leadership and Arabic content — from 24 years inside MENA enterprises.",
    ar: "ملاحظات ميدانية عن التخطيط والقيادة والمحتوى العربي — من 24 عاماً داخل مؤسسات المنطقة.",
  },
};

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  return pageMetadata({ locale: l, path: "/blog", title: copy.title[l], description: copy.description[l] });
}

export default async function BlogIndex({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const posts = await getPosts();
  return (
    <>
      <PageHero
        title={copy.h1[locale]}
        lead={copy.lead[locale]}
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            items={[
              { name: dict.breadcrumbs.home, path: "/" },
              { name: dict.nav.blog, path: "/blog" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="group relative flex flex-col rounded-2xl border p-7 transition-shadow hover:shadow-lg">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="teal">{p.category[locale]}</Badge>
                <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, locale)}</time>
              </div>
              <h2 className="mt-4 text-xl font-bold text-brand-navy group-hover:text-brand-teal-dark">
                <Link href={href(locale, `/blog/${p.slug}`)} className="after:absolute after:inset-0">
                  {p.title[locale]}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-muted-foreground">{p.excerpt[locale]}</p>
              <p className="mt-5 text-sm text-muted-foreground">
                {p.author[locale]} · {p.readingMinutes} {dict.common.minutesRead}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
