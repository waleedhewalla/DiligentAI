import { getOffering, listOfferings } from "@/content/catalog";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Diligent AI solution";

export function generateStaticParams() {
  return listOfferings().map((o) => ({ slug: o.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const o = getOffering(params.slug);
  return renderOg({ eyebrow: o?.brand ?? "Solution", title: o?.title.en ?? "Diligent AI", footer: o?.summary.en });
}
