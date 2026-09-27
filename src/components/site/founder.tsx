import { Check, Mail, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { home } from "@/content/home";
import { site, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./icons";
import { SocialLinks } from "./social-links";

/** "Who you call if something goes wrong": the delivery team behind every engagement. */
export function TeamSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = home.founder;
  const wa = whatsappHref(
    locale === "ar"
      ? "مرحباً فريق Diligent AI، أود التحدث مع أحد المستشارين"
      : "Hello Diligent AI team, I'd like to speak with a consultant",
  );
  return (
    <section className="section bg-surface-subtle">
      <div className="container grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        <div className="mx-auto w-56 md:w-full">
          <div
            role="img"
            aria-label={f.team[locale]}
            className="relative flex aspect-[7/8] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-brand-navy text-white shadow-lg"
          >
            <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden />
            <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Users className="h-11 w-11 text-brand-teal-light" aria-hidden />
            </span>
            <span className="relative text-lg font-bold" dir="ltr">
              Diligent AI
            </span>
          </div>
        </div>
        <div>
          <p className="eyebrow">{f.eyebrow[locale]}</p>
          <blockquote className="mt-3 text-2xl font-bold leading-snug text-brand-navy md:text-3xl">
            “{f.quote[locale]}”
          </blockquote>
          <p className="mt-4 font-semibold">
            {f.team[locale]} <span className="font-normal text-muted-foreground">· {f.role[locale]}</span>
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {f.creds[locale].map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-brand-teal-dark" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild variant="secondary">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  {dict.cta.whatsapp}
                </a>
              ) : (
                <a href={`mailto:${site.email}`}>
                  <Mail className="h-4 w-4" />
                  {site.email}
                </a>
              )}
            </Button>
            <SocialLinks locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
