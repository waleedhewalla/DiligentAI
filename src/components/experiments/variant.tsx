import { renderedVariants, type Variant as V } from "@/content/experiments";

/**
 * One version of an A/B test. Both versions are in the HTML while a test is
 * live; a tiny script in <head> marks <html data-exp-<id>="a|b"> before first
 * paint and CSS hides the other version — no flicker, works on static pages.
 * When the test is off or ended, only the control / winner is rendered.
 * Hook-free, so it works in server and client components.
 */
export function Variant({ exp, v, children, as: Tag = "span" }: { exp: string; v: V; children: React.ReactNode; as?: "span" | "div" }) {
  const shown = renderedVariants(exp);
  if (!shown.includes(v)) return null;
  if (shown.length === 1) return <>{children}</>;
  return <Tag className={`exp-${exp}-${v}`}>{children}</Tag>;
}
