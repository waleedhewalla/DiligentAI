import { getPosts } from "@/content/blog";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Diligent AI insights";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const p = (await getPosts()).find((x) => x.slug === params.slug);
  return renderOg({ eyebrow: `Insights · ${p?.category.en ?? ""}`, title: p?.title.en ?? "Diligent AI insights" });
}
