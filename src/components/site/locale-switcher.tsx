"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";
  const target = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);
  return (
    <Link
      href={target}
      hrefLang={other}
      lang={other}
      className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted", className)}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
        track("language_switch", { to: other });
      }}
    >
      <Languages className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  );
}
