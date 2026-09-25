"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LifeBuoy, LogOut, UserCog } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productList, productColorClasses } from "@/content/products";
import { cn } from "@/lib/utils";

export function PortalNav({ locale, dict, orgName }: { locale: Locale; dict: Dictionary; orgName: string }) {
  const pathname = usePathname();
  const base = `/${locale}/portal`;
  const items = [
    { href: base, label: dict.portal.nav.dashboard, icon: <LayoutDashboard className="h-4 w-4" /> },
    ...productList.map((p) => ({
      href: `${base}/${p.slug}`,
      label: p.name[locale],
      icon: <span className={cn("h-2.5 w-2.5 rounded-full", productColorClasses[p.color].bg)} />,
    })),
    { href: `${base}/support`, label: dict.portal.nav.support, icon: <LifeBuoy className="h-4 w-4" /> },
    { href: `${base}/account`, label: dict.portal.nav.account, icon: <UserCog className="h-4 w-4" /> },
  ];
  return (
    <nav aria-label="Portal" className="flex flex-col gap-1">
      <p className="mb-3 px-3 text-xs font-semibold uppercase text-muted-foreground">{orgName}</p>
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
              active && "bg-brand-purple/10 text-brand-purple",
            )}
          >
            {i.icon}
            {i.label}
          </Link>
        );
      })}
      <form action={`/auth/signout?locale=${locale}`} method="post" className="mt-4">
        <button type="submit" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-brand-red hover:bg-brand-red/5">
          <LogOut className="h-4 w-4 btn-icon" />
          {dict.portal.nav.signOut}
        </button>
      </form>
    </nav>
  );
}
