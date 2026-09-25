import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPost, getPosts, type Block } from "@/content/blog";
import { products } from "@/content/products";
import { getCaseStudy } from "@/content/case-studies";
import { href, pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/sections";
import { TrackedLink } from "@/components/site/tracked-link";

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  const l = params.locale;
  return pageMetadata({
    locale: l,
    path: `/blog/${post.slug}`,
    title: post.title[l],
    description: post.excerpt[l],
    keywords: post.keywords[l],
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

function RenderBlock({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "cta": {
      const p = products[block.product];
      return (
        <aside className="not-prose my-10 rounded-2xl bg-brand-navy p-7 text-white">
          <p className="text-sm font-semibold text-brand-teal">
            <span className="ltr-run">{p.name[locale]}</span> · {p.category[locale]}
          </p>
          <p className="mt-2 text-xl font-bold">{p.tagline[locale]}</p>
          <p className="mt-2 text-white/80">
            {locale === "ar" ? "نطبّق هذا في ستار ترانس — احجز عرضاً توضيحياً." : "We deploy this at Star Trans — book a demo."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <TrackedLink
                href={href(locale, "/demo") + `?product=${p.key}`}
                event={{ name: "cta_click", params: { cta: "book_demo", location: "blog_inline", product: p.key } }}
              >
                {locale === "ar" ? "احجز عرضاً" : "Book a demo"}
                <ArrowRight className="btn-icon" />
              </TrackedLink>
            </Button>
            <Button asChild variant="inverse">
              <Link href={href(locale, `/${p.slug}`)}>{p.cardCta[locale]}</Link>
            </Button>
          </div>
        </aside>
      );
    }
  }
}

export default async function BlogPost({ params }: { params: { locale: Locale; slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const more = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post, locale)} />
      <article>
        <header className="border-b bg-surface-subtle">
          <div className="container max-w-3xl py-12 md:py-16">
            <div className="text-brand-navy">
              <Breadcrumbs
                locale={locale}
                items={[
                  { name: dict.breadcrumbs.home, path: "/" },
                  { name: dict.nav.blog, path: "/blog" },
                  { name: post.title[locale], path: `/blog/${post.slug}` },
                ]}
              />
            </div>
            <p className="mt-8 text-sm font-semibold text-brand-teal-dark">{post.category[locale]}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-navy md:text-5xl">{post.title[locale]}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{post.excerpt[locale]}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              {dict.common.by} <span className="font-semibold text-foreground">{post.author[locale]}</span> ·{" "}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {post.readingMinutes}{" "}
              {dict.common.minutesRead}
            </p>
          </div>
        </header>
        <div className="container max-w-3xl py-12">
          <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-teal-dark prose-blockquote:border-brand-orange prose-blockquote:text-brand-navy prose-blockquote:not-italic">
            {post.body[locale].map((b, i) => (
              <RenderBlock key={i} block={b} locale={locale} />
            ))}
          </div>

          {/* Internal links: related case studies and articles */}
          <footer className="mt-14 grid gap-8 border-t pt-10 sm:grid-cols-2">
            {post.related.caseStudies.map((slug) => {
              const cs = getCaseStudy(slug);
              return cs ? (
                <div key={slug}>
                  <p className="text-sm font-semibold text-muted-foreground">{dict.nav.caseStudies}</p>
                  <Link href={href(locale, `/case-studies/${slug}`)} className="mt-2 block font-bold text-brand-navy hover:text-brand-teal-dark">
                    {cs.title[locale]}
                  </Link>
                </div>
              ) : null;
            })}
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{dict.common.related}</p>
              <ul className="mt-2 space-y-2">
                {more.map((m) => (
                  <li key={m.slug}>
                    <Link href={href(locale, `/blog/${m.slug}`)} className="font-bold text-brand-navy hover:text-brand-teal-dark">
                      {m.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
