import type { Accent } from "./types";

/**
 * Tailwind classes per brand accent. Kept literal so Tailwind's scanner sees
 * them, and in its own module so client components can import it without
 * pulling the catalog data into the browser bundle.
 */
export const accentClasses: Record<Accent, { text: string; bg: string; border: string; softBg: string; button: string }> = {
  orange: {
    text: "text-brand-orange",
    bg: "bg-brand-orange",
    border: "border-brand-orange",
    softBg: "bg-brand-orange/10",
    button: "bg-brand-orange hover:bg-brand-orange-dark text-white",
  },
  navy: {
    text: "text-brand-navy",
    bg: "bg-brand-navy",
    border: "border-brand-navy",
    softBg: "bg-brand-navy/10",
    button: "bg-brand-navy hover:bg-brand-navy-dark text-white",
  },
  teal: {
    text: "text-brand-teal-dark",
    bg: "bg-brand-teal",
    border: "border-brand-teal",
    softBg: "bg-brand-teal/10",
    button: "bg-brand-teal-dark hover:bg-brand-teal text-white",
  },
};
