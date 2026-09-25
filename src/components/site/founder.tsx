import Image from "next/image";
import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { home } from "@/content/home";
import { founderName, founderPhoto, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "./icons";

export function FounderSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = home.founder;
  return (
    <section className="section bg-surface-subtle">
      <div className="container grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        <div className="mx-auto w-56 md:w-full">
          {founderPhoto ? (
            <Image
              src={founderPhoto}
              alt={locale === "ar" ? `صورة ${founderName.ar}، مؤسس Diligent AI` : `${founderName.en}, founder of Diligent AI`}
              width={560}
              height={640}
              className="aspect-[7/8] w-full rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div
              role="img"
              aria-label={founderName[locale]}
              className="flex aspect-[7/8] w-full items-center justify-center rounded-2xl bg-brand-navy text-6xl font-bold text-white shadow-lg"
            >
              <span dir="ltr">WH</span>
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow">{f.eyebrow[locale]}</p>
          <blockquote className="mt-3 text-2xl font-bold leading-snug text-brand-navy md:text-3xl">“{f.quote[locale]}”</blockquote>
          <p className="mt-4 font-semibold">
            {founderName[locale]} <span className="font-normal text-muted-foreground">· {f.role[locale]}</span>
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {f.creds[locale].map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-brand-teal-dark" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <Button asChild variant="secondary" className="mt-8">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="h-4 w-4" />
              {dict.cta.connectLinkedIn}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
