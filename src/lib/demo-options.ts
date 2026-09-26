import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { listCapabilities, listDepartments, listOfferings } from "@/content/catalog";
import type { AreaOptionGroup } from "@/components/site/demo-form";

/** Demo-form "area of interest" options, generated from the catalog (server-side). */
export function demoAreaOptions(locale: Locale, dict: Dictionary): AreaOptionGroup[] {
  return [
    {
      label: dict.nav.departments,
      options: listDepartments().map((d) => ({ value: d.slug, label: d.title[locale] })),
    },
    {
      label: dict.demoForm.areaGroupCapabilities,
      options: listCapabilities().map((c) => ({ value: c.slug, label: c.title[locale] })),
    },
    {
      label: dict.demoForm.areaGroupSolutions,
      options: listOfferings().map((o) => ({ value: o.slug, label: o.title[locale] })),
    },
  ];
}
