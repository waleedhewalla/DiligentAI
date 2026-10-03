/**
 * VELIXI mark: an asymmetric V whose rising stroke reaches for a signal node –
 * data in, intelligence out. One source of truth for the logo, favicon, app
 * icon and social cards (plain SVG shapes, so it also renders in next/og).
 */
export const MARK = {
  navy: "#1F3864",
  teal: "#2CA6A4",
  orange: "#E97730",
  white: "#FFFFFF",
} as const;

/** The V and node, drawn in a 36×36 box. */
export function MarkGlyph() {
  return (
    <g transform="translate(0 0.6)">
      <path d="M10 11.4 L17.6 26" fill="none" stroke={MARK.teal} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M17.6 26 L23.8 13.4" fill="none" stroke={MARK.white} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="26.2" cy="8.6" r="2.4" fill={MARK.orange} />
    </g>
  );
}

/** Rounded-square app icon (navy tile + glyph). */
export function VelixiMark({ className, size }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} className={className} aria-hidden>
      <rect width="36" height="36" rx="9" fill={MARK.navy} />
      <MarkGlyph />
    </svg>
  );
}

/** Standalone SVG source of the app icon (favicon, public/logo.svg, next/og cards). */
export const MARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect width="36" height="36" rx="9" fill="#1F3864"/><g transform="translate(0 0.6)"><path d="M10 11.4 L17.6 26" fill="none" stroke="#2CA6A4" stroke-width="3.4" stroke-linecap="round"/><path d="M17.6 26 L23.8 13.4" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round"/><circle cx="26.2" cy="8.6" r="2.4" fill="#E97730"/></g></svg>';

/** The mark as an <img> for next/og, which does not expand nested SVG components. */
export function OgMark({ size }: { size: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK_SVG)}`} width={size} height={size} alt="" />;
}
