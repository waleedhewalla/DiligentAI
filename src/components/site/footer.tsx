import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { listDepartments, listServiceModels } from "@/content/catalog";
import { href } from "@/lib/seo";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { LinkedInIcon, XIcon, YouTubeIcon } from "./icons";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  // Company channels first; the founder's LinkedIn stays as a personal contact.
  const socials = [
    { href: site.social.linkedinCompany, label: "Diligent AI on LinkedIn", icon: <LinkedInIcon className="h-5 w-5" /> },
    { href: site.social.youtube, label: "Diligent AI on YouTube", icon: <YouTubeIcon className="h-5 w-5" /> },
    { href: site.social.x, label: "Diligent AI on X", icon: <XIcon className="h-5 w-5" /> },
    { href: site.linkedin, label: locale === "ar" ? "وليد حوالة على LinkedIn" : "Waleed Hewalla on LinkedIn", icon: <LinkedInIcon className="h-5 w-5 opacity-70" /> },
  ].filter((s) => s.href);
  const columns = [
    // Dynamic: solution categories and service models come from the catalog.
    {
      title: dict.footer.solutions,
      links: [
        ...listDepartments().map((d) => ({ href: href(locale, `/departments/${d.slug}`), label: d.title[locale] })),
        { href: href(locale, "/solutions"), label: dict.nav.allSolutions },
      ],
    },
    {
      title: dict.footer.services,
      links: listServiceModels().map((m) => ({ href: href(locale, `/services#${m.id}`), label: m.title[locale] })),
    },
    {
      title: dict.footer.company,
      links: [
        { href: href(locale, "/about"), label: dict.nav.about },
        { href: href(locale, "/pricing"), label: dict.nav.pricing },
        { href: href(locale, "/integrations"), label: dict.nav.integrations },
        { href: href(locale, "/partners"), label: dict.nav.partners },
        { href: href(locale, "/ksa"), label: dict.nav.ksa },
        { href: href(locale, "/trust"), label: dict.nav.trust },
        { href: href(locale, "/case-studies"), label: dict.nav.caseStudies },
        {
          href: href(locale, "/case-studies/star-trans"),
          label: locale === "ar" ? "دراسة حالة ستار ترانس" : "Star Trans case study",
        },
        { href: href(locale, "/blog"), label: dict.nav.blog },
        { href: href(locale, "/demo"), label: dict.nav.bookDemo },
        { href: href(locale, "/contact"), label: dict.nav.contact },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: href(locale, "/privacy-policy"), label: dict.footer.privacy },
        { href: href(locale, "/terms-of-service"), label: dict.footer.terms },
        ...(process.env.NEXT_PUBLIC_PREVIEW === "1" ? [] : [{ href: href(locale, "/login"), label: dict.footer.portal }]),
      ],
    },
  ];

  return (
    <footer className="border-t bg-surface-subtle">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{dict.footer.blurb}</p>
          <p className="mt-4 text-sm font-medium">{site.city[locale]}</p>
          <div className="mt-4 flex flex-wrap items-center gap-1">
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="rounded-md p-2 text-brand-navy hover:bg-muted">
                {s.icon}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="text-sm text-muted-foreground hover:text-foreground">
              {site.email}
            </a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-brand-navy">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <p>{dict.brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
