import { caseStudies } from "@/content/case-studies";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Diligent AI case study";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  return renderOg({ eyebrow: `Case study · ${c?.client ?? ""}`, title: c?.title.en ?? "Diligent AI case study" });
}
