import { z } from "zod";

const PERSONAL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "hotmail.com", "outlook.com", "live.com",
  "msn.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "gmx.com", "mail.com",
  "yandex.com", "zoho.com",
]);

export function isWorkEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return Boolean(domain) && !PERSONAL_DOMAINS.has(domain!);
}

/** Primary service models a lead can pick (mirrors catalog ServiceModelId + "unsure"). */
export const interests = ["consult", "build", "integrate", "unsure"] as const;
export const industries = ["manufacturing", "logistics", "fmcg", "other"] as const;

export const demoRequestSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email().max(254))
    .refine(isWorkEmail, { message: "work_email_required" }),
  company: z.string().trim().min(1).max(120),
  industry: z.enum(industries).default("manufacturing"),
  interest: z.enum(interests).default("unsure"),
  /** Offering or capability slug from the catalog; free of markup by construction. */
  area: z
    .string()
    .max(80)
    .regex(/^[a-z0-9-]*$/)
    .optional(),
  language: z.enum(["ar", "en"]).default("ar"),
  source: z.string().max(200).optional(),
  // Honeypot: real users never fill this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

/** Spec §5.2: 12+ chars, 1 uppercase, 1 number, 1 symbol. */
export const passwordRules = {
  length: (p: string) => p.length >= 12,
  upper: (p: string) => /[A-Z]/.test(p),
  number: (p: string) => /\d/.test(p),
  symbol: (p: string) => /[^A-Za-z0-9]/.test(p),
};

export const passwordSchema = z
  .string()
  .max(128)
  .refine((p) => Object.values(passwordRules).every((r) => r(p)), { message: "weak_password" });

/** Partner programme application (gap 4 & 7). Track ids mirror catalog/partners.ts. */
export const partnerTracksIds = ["erp", "automation", "cloud", "hardware"] as const;

export const partnerApplicationSchema = z.object({
  company: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)).refine(isWorkEmail, { message: "work_email_required" }),
  track: z.enum(partnerTracksIds),
  country: z.enum(["eg", "sa", "ae", "other"]).default("eg"),
  message: z.string().trim().max(2000).optional(),
  language: z.enum(["ar", "en"]).default("ar"),
  website: z.string().max(0).optional().or(z.literal("")),
});
