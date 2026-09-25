import { ImageResponse } from "next/og";
import { locales, type Locale } from "@/i18n/config";

export const alt = "Diligent AI — AI solutions for manufacturing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Latin-only text: the default OG font has no Arabic glyphs, so both locales
// share the English wordmark and product line.
export default function OgImage({ params }: { params: { locale: Locale } }) {
  const tagline = params.locale === "ar" ? "Arabic-first AI for manufacturers · Egypt & GCC" : "AI solutions & system integration for MENA manufacturers";
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#2CA6A4", display: "flex" }} />
          <div style={{ fontSize: 44, fontWeight: 700 }}>Diligent AI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>AI for Manufacturing.</div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#2CA6A4" }}>Built on Your Data.</div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#E97730" }}>Inside Your ERP.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.75)" }}>{`${tagline} — Consult · Build · Integrate`}</div>
      </div>
    ),
    size,
  );
}
