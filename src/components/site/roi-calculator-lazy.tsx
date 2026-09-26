"use client";

import dynamic from "next/dynamic";

/**
 * Home-page copy of the ROI calculator, loaded after the page is interactive
 * (it sits well below the fold). Keeps hydration work off the critical path;
 * offering pages still render the calculator server-side.
 */
export const RoiCalculatorLazy = dynamic(() => import("./roi-calculator").then((m) => m.RoiCalculator), {
  ssr: false,
  loading: () => <div className="min-h-[420px] rounded-3xl border bg-card" aria-hidden />,
});
