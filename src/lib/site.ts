export const site = {
  name: "Diligent AI",
  legalName: "Diligent AI Transformation",
  email: "hello@diligentai.com",
  supportEmail: "support@diligentai.com",
  city: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  founder: "Waleed Hewalla",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/waleedhewalla",
  // Company channels — each icon appears only once its URL is set (TODO(Waleed): create the company page).
  social: {
    linkedinCompany: process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
  },
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  calendlyCeo: process.env.NEXT_PUBLIC_CALENDLY_CEO_URL ?? process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
} as const;

// TODO(Waleed): confirm the Arabic spelling of your name.
export const founderName = { en: "Waleed Hewalla", ar: "وليد حوالة" };

// TODO(Waleed): add a professional photo at /public/images/waleed.jpg (no stock photos), then set this path.
export const founderPhoto: string | null = null;

// Optional 3-minute overview video (YouTube/Vimeo/hosted). Hidden until set.
export const overviewVideoUrl = process.env.NEXT_PUBLIC_OVERVIEW_VIDEO_URL ?? "";

export function whatsappHref(text?: string) {
  if (!site.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}${q}`;
}
