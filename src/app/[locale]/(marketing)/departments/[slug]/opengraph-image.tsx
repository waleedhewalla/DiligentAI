import { getDepartment, listDepartments } from "@/content/catalog";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "VELIXI – solutions by department";

export function generateStaticParams() {
  return listDepartments().map((d) => ({ slug: d.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const d = getDepartment(params.slug);
  return renderOg({ eyebrow: "AI for your department", title: d ? `AI for ${d.title.en}` : "VELIXI", footer: d?.owner.en });
}
