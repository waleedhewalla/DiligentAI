"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Gap 1 — planning-savings estimator. Pure client-side arithmetic on the
 * visitor's own inputs; nothing is sent anywhere. Defaults are editable.
 */
export function RoiCalculator({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.sections;
  const [planners, setPlanners] = useState(3);
  const [hours, setHours] = useState(16);
  const [cost, setCost] = useState(350);
  const [reduction, setReduction] = useState(50);
  const tracked = useRef(false);

  const { hoursSaved, value } = useMemo(() => {
    const h = Math.max(0, planners) * Math.max(0, hours) * 48 * (Math.min(100, Math.max(0, reduction)) / 100);
    return { hoursSaved: Math.round(h), value: Math.round(h * Math.max(0, cost)) };
  }, [planners, hours, cost, reduction]);

  useEffect(() => {
    if (!tracked.current && (planners !== 3 || hours !== 16 || cost !== 350 || reduction !== 50)) {
      tracked.current = true;
      track("roi_calc", { planners, hours });
    }
  }, [planners, hours, cost, reduction]);

  const fmt = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 0 });
  const num = (setter: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => setter(Number(e.target.value) || 0);

  return (
    <div className="grid gap-8 rounded-3xl border bg-card p-6 shadow-sm md:p-8 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="text-xl font-bold text-brand-navy">{s.roiTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{s.roiLead}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="roi-planners">{s.roiPlanners}</Label>
            <Input id="roi-planners" type="number" min={1} max={200} value={planners} onChange={num(setPlanners)} dir="ltr" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roi-hours">{s.roiHours}</Label>
            <Input id="roi-hours" type="number" min={0} max={80} value={hours} onChange={num(setHours)} dir="ltr" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roi-cost">{s.roiCost}</Label>
            <Input id="roi-cost" type="number" min={0} value={cost} onChange={num(setCost)} dir="ltr" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roi-reduction">
              {s.roiReduction}: <span className="tabular-nums">{reduction}%</span>
            </Label>
            <input
              id="roi-reduction"
              type="range"
              min={10}
              max={90}
              step={5}
              value={reduction}
              onChange={num(setReduction)}
              className="h-12 accent-[#E97730]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 rounded-2xl bg-brand-navy p-6 text-white" aria-live="polite">
        <div>
          <p className="text-sm text-white/70">{s.roiHoursSaved}</p>
          <p className="text-4xl font-bold tabular-nums">{fmt.format(hoursSaved)}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">{s.roiValue}</p>
          <p className="text-4xl font-bold tabular-nums">
            {fmt.format(value)} <span className="text-lg font-semibold">{s.egp}</span>
          </p>
        </div>
        <p className="text-xs text-white/60">{s.roiNote}</p>
      </div>
    </div>
  );
}
