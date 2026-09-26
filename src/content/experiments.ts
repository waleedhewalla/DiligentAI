/**
 * A/B tests (website assessment, Track 5: month-2 growth tests).
 *
 * status:
 *  - "off"      only the control (A) is rendered; nothing else ships.
 *  - "preview"  both versions ship; every visitor sees A, and the team can
 *               check B with ?exp_<id>=b (e.g. /en?exp_hero=b). Nothing is split.
 *  - "running"  visitors are split by `weights` [A, B]; the choice sticks per browser.
 *  - "ended"    only `winner` is rendered. Move the winning copy into the page later.
 *
 * Run ONE test at a time, for at least 4 weeks or ~1,000 visitors per version.
 * Results: GA4 (user property exp_<id>, event experiment_impression) and the
 * `lead_experiments` view in Supabase. See README → "A/B tests".
 */
export type Variant = "a" | "b";
export type Experiment = {
  id: string;
  status: "off" | "preview" | "running" | "ended";
  /** Percent of visitors for [A, B] while running. */
  weights: [number, number];
  winner?: Variant;
  hypothesis: string;
  /** Primary metric used to pick the winner. */
  metric: string;
};

export const experiments: Experiment[] = [
  {
    id: "hero",
    status: "preview",
    weights: [50, 50],
    hypothesis: "A headline about one plan for the whole plant, in Arabic, live in 8 weeks, gets more bookings than the ERP-led headline.",
    metric: "Bookings (generate_lead + demo_booked) per visitor to the home page",
  },
  {
    id: "cta",
    status: "preview",
    weights: [50, 50],
    hypothesis: "“Get my plant review” gets more clicks than “Book a 30-min plant review” because it sounds like less commitment.",
    metric: "Click rate of the primary button (cta_click, cta=book_demo)",
  },
  {
    id: "homeorder",
    status: "preview",
    weights: [50, 50],
    hypothesis: "Showing real product screens before the department picker raises trust and bookings.",
    metric: "Bookings per home-page visitor; scroll depth",
  },
  {
    id: "toolcta",
    status: "preview",
    weights: [50, 50],
    hypothesis: "Offering to send the tool result to an expert on WhatsApp converts more completed tools into conversations than a booking link.",
    metric: "Leads or WhatsApp clicks per completed tool (tool_complete)",
  },
];

export function getExperiment(id: string) {
  return experiments.find((e) => e.id === id);
}

/** Which versions to render for an experiment (the rest are not shipped at all). */
export function renderedVariants(id: string): Variant[] {
  const e = getExperiment(id);
  if (!e || e.status === "off") return ["a"];
  if (e.status === "ended") return [e.winner ?? "a"];
  return ["a", "b"];
}

/** Experiments that need the assignment script and CSS (both versions in the page). */
export function liveExperiments() {
  return experiments.filter((e) => e.status === "preview" || e.status === "running");
}
