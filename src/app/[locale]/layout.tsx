import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { dir, htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { metadataBase } from "@/lib/seo";
import { Analytics } from "@/components/analytics/analytics";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { AttributionTracker } from "@/components/analytics/attribution-tracker";
import { WebVitals } from "@/components/analytics/web-vitals";
import { ExperimentTracker } from "@/components/analytics/experiment-tracker";
import { ExperimentHead } from "@/components/experiments/experiment-head";
import { MotionProvider } from "@/components/site/motion-provider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  other: {
    ...(process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION
      ? { "ahrefs-site-verification": process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_SEMRUSH_SITE_VERIFICATION
      ? { "semrush-site-verification": process.env.NEXT_PUBLIC_SEMRUSH_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  return {
    metadataBase,
    title: { default: "Diligent AI", template: "%s | Diligent AI" },
    applicationName: "Diligent AI",
    authors: [{ name: "Diligent AI Transformation" }],
    creator: "Diligent AI Transformation",
    formatDetection: { telephone: false },
    verification,
    other: { "content-language": htmlLang[locale] },
  };
}

export const viewport: Viewport = {
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  return (
    <html lang={htmlLang[locale]} dir={dir(locale)} className={`${inter.variable} ${notoArabic.variable}`} suppressHydrationWarning>
      <head>
        <ExperimentHead />
      </head>
      <body className="min-h-screen font-sans">
        {children}
        <ConsentBanner locale={locale} />
        <Analytics />
        <AttributionTracker />
        <WebVitals />
        <ExperimentTracker />
        <MotionProvider />
      </body>
    </html>
  );
}
