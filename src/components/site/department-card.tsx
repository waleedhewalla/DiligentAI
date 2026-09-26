import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { accentClasses, offeringsForDepartment, type Department } from "@/content/catalog";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

export const departmentCopy = {
  hubTitle: { en: "Solutions by department", ar: "الحلول حسب الإدارة" },
  hubLead: {
    en: "Start with the team that owns the problem. Every department page shows the pains we remove, the KPIs we report against and what is live today.",
    ar: "ابدأ بالفريق صاحب المشكلة. كل صفحة إدارة تعرض المشكلات التي نحلها ومؤشرات الأداء التي نقيس عليها وما يعمل اليوم.",
  },
  solutions: { en: "solutions", ar: "حلول" },
  roadmap: { en: "on the roadmap", ar: "على خارطة الطريق" },
  explore: { en: "Explore", ar: "استكشف" },
};

/** Department tile — used on the hub, the home picker fallback and cross-links. */
export function DepartmentCard({ department: d, locale }: { department: Department; locale: Locale }) {
  const c = accentClasses[d.accent];
  const count = offeringsForDepartment(d).length;
  return (
    <article className={cn("group relative flex flex-col rounded-2xl border-t-4 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md", c.border)}>
      <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", c.softBg, c.text)}>
        <Icon name={d.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-brand-navy">
        <Link href={href(locale, `/departments/${d.slug}`)} className="after:absolute after:inset-0">
          {d.title[locale]}
        </Link>
      </h3>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{d.owner[locale]}</p>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{d.summary[locale]}</p>
      <p className="mt-4 text-xs font-semibold text-foreground/80">
        {count} {departmentCopy.solutions[locale]}
        {d.roadmap?.length ? ` · ${d.roadmap.length} ${departmentCopy.roadmap[locale]}` : ""}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-dark">
        {departmentCopy.explore[locale]} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
      </span>
    </article>
  );
}
