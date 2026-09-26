"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Printer } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "./tracked-link";

export type ScorecardData = {
  questions: { id: string; title: string; levels: string[]; advice: string }[];
  bands: { min: number; title: string; body: string }[];
};

type Labels = {
  progress: string;
  result: string;
  score: string;
  focus: string;
  book: string;
  print: string;
  reset: string;
  answerAll: string;
};

/**
 * S&OP maturity self-assessment. Pure client-side: answers never leave the
 * browser. Shows a maturity band and the two weakest areas with advice.
 */
export function SopScorecard({ data, labels, bookHref }: { data: ScorecardData; labels: Labels; bookHref: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const tracked = useRef(false);
  const done = Object.keys(answers).length === data.questions.length;

  const result = useMemo(() => {
    if (!done) return null;
    const avg = data.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0) + 1, 0) / data.questions.length;
    const band = [...data.bands].reverse().find((b) => avg >= b.min) ?? data.bands[0];
    const weakest = [...data.questions].sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0)).slice(0, 2);
    return { avg, band, weakest };
  }, [answers, data, done]);

  useEffect(() => {
    if (!result || tracked.current) return;
    tracked.current = true;
    track("tool_complete", { tool: "sop-scorecard", score: Math.round(result.avg * 10) / 10, band: result.band.title });
  }, [result]);

  const answered = Object.keys(answers).length;
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <ol className="space-y-5">
        {data.questions.map((q, i) => (
          <li key={q.id} className="rounded-2xl border bg-card p-5">
            <fieldset>
              <legend className="font-bold text-brand-navy">
                <span className="me-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs text-foreground/80">{i + 1}</span>
                {q.title}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.levels.map((l, n) => (
                  <label
                    key={l}
                    className={cn(
                      "flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm transition-colors",
                      answers[q.id] === n ? "border-brand-navy bg-brand-navy/5 font-medium" : "hover:bg-muted",
                    )}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={n}
                      checked={answers[q.id] === n}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: n }))}
                      className="mt-0.5 accent-[#1F3864]"
                    />
                    {l}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-brand-navy p-6 text-white" aria-live="polite">
          <p className="text-sm text-white/70">
            {labels.progress}: {answered}/{data.questions.length}
          </p>
          <div className="mt-2 h-2 rounded-full bg-white/15">
            <div className="h-2 rounded-full bg-brand-teal-light transition-all" style={{ width: `${(answered / data.questions.length) * 100}%` }} />
          </div>
          {result ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-brand-teal-light">{labels.result}</p>
              <p className="mt-1 text-3xl font-bold">{result.band.title}</p>
              <p className="mt-1 text-sm text-white/70">
                {labels.score}: <span dir="ltr">{result.avg.toFixed(1)} / 4</span>
              </p>
              <p className="mt-4 text-white/90">{result.band.body}</p>
              <p className="mt-6 text-sm font-semibold text-brand-teal-light">{labels.focus}</p>
              <ul className="mt-2 space-y-3">
                {result.weakest.map((q) => (
                  <li key={q.id} className="rounded-xl bg-white/10 p-3 text-sm">
                    <span className="font-bold">{q.title}</span>
                    <span className="mt-1 block text-white/85">{q.advice}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2 print:hidden">
                <Button asChild>
                  <TrackedLink href={bookHref} event={{ name: "cta_click", params: { cta: "book_demo", location: "tool_sop_scorecard" } }}>
                    {labels.book}
                    <ArrowRight className="btn-icon" />
                  </TrackedLink>
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="inverse" size="sm" className="flex-1" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" aria-hidden />
                    {labels.print}
                  </Button>
                  <Button
                    type="button"
                    variant="inverse"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setAnswers({});
                      tracked.current = false;
                    }}
                  >
                    {labels.reset}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-white/80">{labels.answerAll}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
