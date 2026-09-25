"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { accentClasses } from "@/content/catalog/accents";
import type { NavModel } from "@/lib/nav";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Icon } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";
import { TrackedLink } from "./tracked-link";

// The static GitHub Pages preview has no auth pages.
const showLogin = process.env.NEXT_PUBLIC_PREVIEW !== "1";

export function Header({ locale, dict, nav }: { locale: Locale; dict: Dictionary; nav: NavModel }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const links = [
    { href: href(locale, "/services"), label: dict.nav.services },
    { href: href(locale, "/capabilities"), label: dict.nav.capabilities },
    { href: href(locale, "/pricing"), label: dict.nav.pricing },
    { href: href(locale, "/case-studies"), label: dict.nav.caseStudies },
    { href: href(locale, "/about"), label: dict.nav.about },
    { href: href(locale, "/blog"), label: dict.nav.blog },
  ];

  const isActive = (h: string) => pathname === h || pathname?.startsWith(`${h}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.nav.skip}
        </a>
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href={href(locale)} aria-label={`${dict.brand.name} — ${dict.nav.home}`}>
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                aria-expanded={menuOpen}
                aria-controls="solutions-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {dict.nav.solutions}
                <ChevronDown className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")} aria-hidden />
              </button>
              {menuOpen ? (
                // Mega menu: one column per catalog category, then the service models.
                // Content is data-driven (see lib/nav.ts) — nothing here is hardcoded.
                <div
                  id="solutions-menu"
                  className="fixed inset-x-0 top-[calc(100%+0.5rem)] mx-auto grid w-[min(1100px,calc(100vw-2rem))] grid-cols-4 gap-4 rounded-xl border bg-background p-5 shadow-xl animate-fade-up"
                >
                  {nav.solutions.map((group) => (
                    <div key={group.title}>
                      <Link
                        href={group.href}
                        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
                      >
                        {group.title}
                      </Link>
                      <ul className="mt-3 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="flex items-start gap-2 rounded-md p-2 text-sm hover:bg-muted">
                              <Icon name={item.icon} className={cn("mt-0.5 h-4 w-4 shrink-0", accentClasses[item.accent].text)} />
                              <span className="font-medium leading-snug">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {group.total > group.items.length ? (
                        <Link
                          href={group.href}
                          className="mt-1 block px-2 text-xs font-semibold text-brand-teal-dark hover:underline"
                        >
                          {dict.common.viewAll} ({group.total})
                        </Link>
                      ) : null}
                    </div>
                  ))}
                  <div className="rounded-lg bg-brand-navy p-4 text-white">
                    <Link
                      href={href(locale, "/services")}
                      className="text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-white"
                    >
                      {dict.nav.services}
                    </Link>
                    <ul className="mt-3 space-y-3">
                      {nav.services.map((m) => (
                        <li key={m.href}>
                          <Link href={m.href} className="block rounded-md hover:text-brand-teal">
                            <span className="flex items-center gap-2 font-semibold">
                              <Icon name={m.icon} className="h-4 w-4" />
                              {m.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-white/70">{m.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-4 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-sm">
                    {nav.quickLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="font-medium text-muted-foreground hover:text-brand-teal-dark">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-2 text-sm font-medium hover:bg-muted xl:px-3",
                  isActive(l.href) && "text-brand-teal-dark",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LocaleSwitcher locale={locale} label={dict.locale.switchTo} />
            {showLogin ? (
              <Link href={href(locale, "/login")} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                {dict.nav.login}
              </Link>
            ) : null}
            <Button asChild size="sm">
              <TrackedLink
                href={href(locale, "/demo")}
                event={{
                  name: "cta_click",
                  params: { cta: "book_demo", location: "header" },
                }}
              >
                {dict.nav.bookDemo}
              </TrackedLink>
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <LocaleSwitcher locale={locale} label={dict.locale.switchTo} />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted"
              aria-label={mobileOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      {mobileOpen ? (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background lg:hidden">
          <nav aria-label="Mobile" className="container flex flex-col gap-1 py-6 text-lg">
            <Link href={href(locale)} className="rounded-md px-3 py-3 font-medium hover:bg-muted">
              {dict.nav.home}
            </Link>
            {/* Mobile: catalog categories (data-driven), then the fixed site links. */}
            <p className="mt-2 px-3 text-xs font-semibold uppercase text-muted-foreground">{dict.nav.solutions}</p>
            {nav.solutions.map((g) => (
              <Link key={g.href} href={g.href} className="rounded-md px-3 py-3 font-medium hover:bg-muted">
                {g.title}
              </Link>
            ))}
            {nav.quickLinks.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-md px-3 py-3 font-medium hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <hr className="my-2" />
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-md px-3 py-3 font-medium hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <Link href={href(locale, "/contact")} className="rounded-md px-3 py-3 font-medium hover:bg-muted">
              {dict.nav.contact}
            </Link>
            <hr className="my-4" />
            <div className="grid gap-3">
              <Button asChild size="lg">
                <TrackedLink
                  href={href(locale, "/demo")}
                  event={{
                    name: "cta_click",
                    params: { cta: "book_demo", location: "mobile_menu" },
                  }}
                >
                  {dict.cta.bookDemo}
                  <ArrowRight className="btn-icon" />
                </TrackedLink>
              </Button>
              {showLogin ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={href(locale, "/login")}>{dict.nav.login}</Link>
                </Button>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
