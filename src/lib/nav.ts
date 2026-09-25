import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { listCapabilities, listCategories, listOfferings, listServiceModels, type Accent, type IconName } from "@/content/catalog";
import { href } from "@/lib/seo";

/**
 * Serializable navigation model built on the server from the catalog.
 * The header (a client component) receives only this small object, so the
 * menu updates automatically when offerings/capabilities are added — without
 * shipping the whole catalog to the browser.
 */
export type NavItem = { href: string; label: string; description?: string; icon: IconName; accent: Accent; badge?: string };
export type NavGroup = { title: string; href: string; items: NavItem[] };
export type NavModel = { solutions: NavGroup[]; services: NavItem[] };

/** Max items per menu column before we rely on the "view all" link. */
const MAX_PER_GROUP = 5;

export function buildNav(locale: Locale, dict: Dictionary): NavModel {
  const solutions: NavGroup[] = listCategories().map((cat) => {
    const items: NavItem[] =
      cat.source === "capabilities"
        ? listCapabilities().map((c) => ({
            href: href(locale, `/capabilities/${c.slug}`),
            label: c.title[locale],
            icon: c.icon,
            accent: c.accent,
          }))
        : listOfferings({ category: cat.id as Exclude<typeof cat.id, "industry-capabilities"> }).map((o) => ({
            href: href(locale, `/solutions/${o.slug}`),
            label: o.title[locale],
            icon: o.icon,
            accent: o.accent,
            badge: o.brand,
          }));
    return { title: cat.title[locale], href: href(locale, cat.href), items: items.slice(0, MAX_PER_GROUP) };
  });
  const services: NavItem[] = listServiceModels().map((m) => ({
    href: href(locale, `/services#${m.id}`),
    label: m.title[locale],
    description: m.tagline[locale],
    icon: m.icon,
    accent: m.accent,
  }));
  void dict;
  return { solutions, services };
}
