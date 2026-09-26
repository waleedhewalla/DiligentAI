import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared social-card layout for per-page Open Graph images.
 * Latin text only: the built-in OG font has no Arabic glyphs, so cards use
 * the English title for both locales (the page title itself stays localized).
 */
export function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const size = title.length > 70 ? 52 : title.length > 45 ? 60 : 68;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #0d1a33 0%, #1f3864 55%, #1a4d63 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#2CA6A4", display: "flex" }} />
          <div style={{ fontSize: 36, fontWeight: 700 }}>Diligent AI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#F8A66A", textTransform: "uppercase", letterSpacing: 2 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.75)" }}>
          {footer ?? "AI for manufacturing · Egypt & the Gulf · Consult · Build · Integrate"}
        </div>
      </div>
    ),
    ogSize,
  );
}
