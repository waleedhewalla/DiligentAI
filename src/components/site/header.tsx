"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productList, productColorClasses } from "@/content/products";
import { href } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Icon } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";
import { TrackedLink } from "./tracked-link";

// The static GitHub Pages preview has no auth pages.
const showLogin = process.env.NEXT_PUBLIC_PREVIEW !== "1";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductsOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  const links = [
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
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((v) => !v)}
              >
                {dict.nav.products}
                <ChevronDown className={cn("h-4 w-4 transition-transform", productsOpen && "rotate-180")} aria-hidden />
              </button>
              {productsOpen ? (
                <div
                  id="products-menu"
                  className="absolute start-0 top-full mt-2 grid w-[640px] grid-cols-2 gap-2 rounded-xl border bg-background p-3 shadow-xl animate-fade-up"
                >
                  {productList.map((p) => (
                    <Link
                      key={p.slug}
                      href={href(locale, `/${p.slug}`)}
                      className="group flex gap-3 rounded-lg p-3 hover:bg-muted"
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          productColorClasses[p.color].softBg,
                          productColorClasses[p.color].text,
                        )}
                      >
                        <Icon name={p.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">
                          <span className="ltr-run">{p.name[locale]}</span> — {p.category[locale]}
                        </span>
                        <span className="block text-sm text-muted-foreground">{p.tagline[locale]}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={href(locale, "/demo")}
                    className="flex flex-col justify-center rounded-lg bg-brand-navy p-3 text-white hover:bg-brand-navy-dark"
                  >
                    <span className="font-semibold">{dict.nav.bookDemo}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/80">
                      {dict.cta.bookDemo} <ArrowRight className="btn-icon h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
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
            {productList.map((p) => (
              <Link
                key={p.slug}
                href={href(locale, `/${p.slug}`)}
                className="flex items-center gap-3 rounded-md px-3 py-3 font-medium hover:bg-muted"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", productColorClasses[p.color].bg)} />
                <span className="ltr-run">{p.name[locale]}</span>
                <span className="text-sm text-muted-foreground">{p.category[locale]}</span>
              </Link>
            ))}
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
