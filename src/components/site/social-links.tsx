import type { Locale } from "@/i18n/config";
import { socialHandle, socialProfiles, type SocialNetwork } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, XIcon, YouTubeIcon } from "./icons";

const ICONS: Record<SocialNetwork, (p: { className?: string }) => JSX.Element> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

// Each network's own color on hover/focus, so the row stays on-brand at rest.
const HOVER: Record<SocialNetwork, string> = {
  linkedin: "hover:bg-[#0A66C2] focus-visible:bg-[#0A66C2]",
  facebook: "hover:bg-[#1877F2] focus-visible:bg-[#1877F2]",
  instagram: "hover:bg-[#E1306C] focus-visible:bg-[#E1306C]",
  x: "hover:bg-black focus-visible:bg-black",
  tiktok: "hover:bg-black focus-visible:bg-black",
  youtube: "hover:bg-[#FF0000] focus-visible:bg-[#FF0000]",
};

const label = (name: string, locale: Locale) => (locale === "ar" ? `Diligent AI على ${name}` : `Diligent AI on ${name}`);

/**
 * Company social profiles. `icons`: a row of round buttons (footer, team
 * section). `cards`: a labelled grid with handles (contact page).
 */
export function SocialLinks({ locale, variant = "icons", className }: { locale: Locale; variant?: "icons" | "cards"; className?: string }) {
  const profiles = socialProfiles();
  if (variant === "cards") {
    return (
      <ul className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
        {profiles.map((p) => {
          const Icon = ICONS[p.network];
          return (
            <li key={p.network}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label(p.name, locale)}
                className="group flex items-center gap-2.5 rounded-xl border bg-background p-3 transition-colors hover:border-brand-teal hover:bg-brand-teal/5"
              >
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-navy text-white transition-colors", HOVER[p.network].replace(/hover:/g, "group-hover:"))}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-brand-navy">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground" dir="ltr">
                    {socialHandle(p.url)}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {profiles.map((p) => {
        const Icon = ICONS[p.network];
        return (
          <li key={p.network}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label(p.name, locale)}
              title={p.name}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full bg-brand-navy text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
                HOVER[p.network],
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
