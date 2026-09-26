"use client";

import { useRef, useState } from "react";
import { ArrowRight, Printer } from "lucide-react";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./icons";
import { Variant } from "@/components/experiments/variant";

export type ChecklistData = { groups: { title: string; items: { id: string; text: string }[] }[] };

type Labels = { ready: string; gaps: string; allSet: string; book: string; print: string; whatsapp: string; levels: [string, string, string] };

/** CBAM readiness checklist — client-side only; shows open gaps and a readiness level. */
export function CbamChecklist({ data, labels, bookHref, whatsappNumber }: { data: ChecklistData; labels: Labels; bookHref: string; whatsappNumber: string }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const tracked = useRef(false);
  const all = data.groups.flatMap((g) => g.items);
  const count = all.filter((i) => checked[i.id]).length;
  const pct = Math.round((count / all.length) * 100);
  const level = pct >= 80 ? labels.levels[2] : pct >= 40 ? labels.levels[1] : labels.levels[0];
  const gaps = all.filter((i) => !checked[i.id]);

  const toggle = (id: string) => {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
    if (!tracked.current && count + 1 >= 3) {
      tracked.current = true;
      track("tool_complete", { tool: "cbam-checklist", score: pct });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        {data.groups.map((g) => (
          <fieldset key={g.title} className="rounded-2xl border bg-card p-5">
            <legend className="px-1 text-lg font-bold text-brand-navy">{g.title}</legend>
            <ul className="mt-2 space-y-2">
              {g.items.map((i) => (
                <li key={i.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 text-sm hover:bg-muted">
                    <input type="checkbox" checked={!!checked[i.id]} onChange={() => toggle(i.id)} className="mt-0.5 h-4 w-4 accent-[#1F7D7B]" />
                    {i.text}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-brand-navy p-6 text-white" aria-live="polite">
          <p className="text-sm text-white/70">{labels.ready}</p>
          <p className="mt-1 text-4xl font-bold" dir="ltr">
            {pct}%
          </p>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <div className="h-2 rounded-full bg-brand-teal-light transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 font-semibold">{level}</p>
          <p className="mt-6 text-sm font-semibold text-brand-teal-light">{labels.gaps}</p>
          {gaps.length ? (
            <ul tabIndex={0} aria-label={labels.gaps} className="mt-2 max-h-72 space-y-2 overflow-auto text-sm text-white/85 print:max-h-none">
              {gaps.map((g) => (
                <li key={g.id} className="rounded-lg bg-white/10 p-2">
                  {g.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/85">{labels.allSet}</p>
          )}
          <div className="mt-6 grid gap-2 print:hidden">
            {/* A/B test "toolcta": B sends the result to an expert on WhatsApp. */}
            <Variant exp="toolcta" v="a" as="div">
              <Button asChild className="w-full">
                <TrackedLink href={bookHref} event={{ name: "cta_click", params: { cta: "book_demo", location: "tool_cbam_checklist" } }}>
                  {labels.book}
                  <ArrowRight className="btn-icon" />
                </TrackedLink>
              </Button>
            </Variant>
            {whatsappNumber ? (
              <Variant exp="toolcta" v="b" as="div">
                <Button asChild variant="whatsapp" className="w-full">
                  <TrackedAnchor
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`CBAM ${labels.ready}: ${pct}% — ${level}. ${labels.gaps}: ${gaps.length}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    event={{ name: "whatsapp_click", params: { location: "tool_cbam_checklist" } }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {labels.whatsapp}
                  </TrackedAnchor>
                </Button>
              </Variant>
            ) : null}
            <Button type="button" variant="inverse" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden />
              {labels.print}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
