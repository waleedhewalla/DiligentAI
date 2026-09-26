"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Accent, IconName } from "@/content/catalog/types";
import { accentClasses } from "@/content/catalog/accents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "./icons";
import { TrackedLink } from "./tracked-link";
import { track } from "@/lib/analytics";

/** Serializable department summary built on the server (keeps the catalog out of the bundle). */
export type PickerDepartment = {
  slug: string;
  title: string;
  owner: string;
  pains: string[];
  icon: IconName;
  accent: Accent;
  href: string;
  bookHref: string;
  offerings: { slug: string; title: string; summary: string; href: string; badge: string }[];
};

/**
 * "What's your problem?" — the visitor picks a department and sees the pains
 * we remove and the 2–3 most relevant solutions, then books with the
 * department pre-filled. Accessible tabs (arrow keys move between tabs).
 */
export function DepartmentPicker({
  departments,
  labels,
}: {
  departments: PickerDepartment[];
  labels: { pains: string; solutions: string; seeAll: string; book: string; tablist: string };
}) {
  const [active, setActive] = useState(0);
  const d = departments[active];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const next = e.key === (rtl ? "ArrowLeft" : "ArrowRight") ? 1 : e.key === (rtl ? "ArrowRight" : "ArrowLeft") ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const n = (i + next + departments.length) % departments.length;
    setActive(n);
    document.getElementById(`dept-tab-${departments[n].slug}`)?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label={labels.tablist} className="flex flex-wrap justify-center gap-2">
        {departments.map((x, i) => (
          <button
            key={x.slug}
            id={`dept-tab-${x.slug}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="dept-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => {
              setActive(i);
              track("department_pick", { department: x.slug });
            }}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              i === active ? "border-brand-navy bg-brand-navy text-white" : "bg-background text-brand-navy hover:bg-muted",
            )}
          >
            <Icon name={x.icon} className="h-4 w-4" />
            {x.title}
          </button>
        ))}
      </div>

      <div id="dept-panel" role="tabpanel" aria-labelledby={`dept-tab-${d.slug}`} className="mt-8 grid gap-6 rounded-3xl border bg-surface-subtle p-6 md:p-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.owner}</p>
          <h3 className="mt-2 text-2xl font-bold text-brand-navy">{d.title}</h3>
          <p className="mt-4 text-sm font-semibold text-brand-red">{labels.pains}</p>
          <ul className="mt-2 space-y-2">
            {d.pains.map((p) => (
              <li key={p} className="text-sm">
                “{p}”
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button asChild>
              <TrackedLink href={d.bookHref} event={{ name: "cta_click", params: { cta: "book_demo", location: "home_picker", solution: d.slug } }}>
                {labels.book}
                <ArrowRight className="btn-icon" />
              </TrackedLink>
            </Button>
            <Button asChild variant="secondary">
              <Link href={d.href}>{labels.seeAll}</Link>
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-navy">{labels.solutions}</p>
          <ul className="mt-3 grid gap-3">
            {d.offerings.map((o) => (
              <li key={o.slug}>
                <Link href={o.href} className={cn("group block rounded-2xl border-s-4 bg-background p-4 shadow-sm hover:shadow-md", accentClasses[d.accent].border)}>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-brand-navy group-hover:underline">{o.title}</span>
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-bold text-foreground/80">{o.badge}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{o.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
