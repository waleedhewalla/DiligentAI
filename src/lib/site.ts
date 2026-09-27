export const site = {
  name: "Diligent AI",
  legalName: "Diligent AI Transformation",
  email: "hello@diligentai.com",
  supportEmail: "support@diligentai.com",
  city: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  founder: "Waleed Hewalla",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/waleedhewalla",
  // Company channels. Until the real pages exist these default to the planned
  // @diligentai handles (brand/SOCIAL-MEDIA-SETUP-GUIDE.md); set the env vars to
  // the live URLs at go-live. TODO(Waleed): replace with the real page URLs.
  social: {
    linkedinCompany: process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL || "https://www.linkedin.com/company/diligentai",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/diligentai",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/diligentai",
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/diligentai",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@diligentai",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@diligentai",
  },
  // Business WhatsApp (international format). Override per environment with NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201065307007",
  // Booking: public Cal.com event (preferred over Calendly). Override per environment with NEXT_PUBLIC_BOOKING_URL.
  // TODO(Waleed): the site promises a 30-minute review – switch this to the 30-min Cal.com event once created.
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/waleed-hewalla-trzjna/15min",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  calendlyCeo: process.env.NEXT_PUBLIC_CALENDLY_CEO_URL ?? process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
} as const;

// TODO(Waleed): confirm the Arabic spelling of your name.
export const founderName = { en: "Waleed Hewalla", ar: "وليد حوالة" };

// Optional 3-minute overview video (YouTube/Vimeo/hosted). Hidden until set.
export const overviewVideoUrl = process.env.NEXT_PUBLIC_OVERVIEW_VIDEO_URL ?? "";

/** Human-readable phone for display, e.g. "+20 106 530 7007" (Egyptian mobile grouping). */
export function whatsappDisplay() {
  const d = site.whatsapp.replace(/\D/g, "");
  if (!d) return "";
  return d.startsWith("20") && d.length === 12 ? `+20 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}` : `+${d}`;
}

export function whatsappHref(text?: string) {
  if (!site.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}${q}`;
}

export type SocialNetwork = "linkedin" | "facebook" | "instagram" | "x" | "tiktok" | "youtube";

/** Company social profiles in display order. `confirmed` is false while a sample URL is in use. */
export function socialProfiles(): { network: SocialNetwork; name: string; url: string; confirmed: boolean }[] {
  return [
    { network: "linkedin", name: "LinkedIn", url: site.social.linkedinCompany, confirmed: !!process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL },
    { network: "facebook", name: "Facebook", url: site.social.facebook, confirmed: !!process.env.NEXT_PUBLIC_FACEBOOK_URL },
    { network: "instagram", name: "Instagram", url: site.social.instagram, confirmed: !!process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { network: "x", name: "X", url: site.social.x, confirmed: !!process.env.NEXT_PUBLIC_X_URL },
    { network: "tiktok", name: "TikTok", url: site.social.tiktok, confirmed: !!process.env.NEXT_PUBLIC_TIKTOK_URL },
    { network: "youtube", name: "YouTube", url: site.social.youtube, confirmed: !!process.env.NEXT_PUBLIC_YOUTUBE_URL },
  ];
}

/** "@diligentai"-style handle for display, taken from the profile URL. */
export function socialHandle(url: string) {
  const last = url.replace(/\/+$/, "").split("/").pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
}
