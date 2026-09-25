"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

// Client component so the 404 boundary doesn't force every route to render dynamically.
const copy = {
  ar: { title: "الصفحة غير موجودة", body: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.", home: "العودة للرئيسية" },
  en: { title: "Page not found", body: "The page you're looking for doesn't exist or has moved.", home: "Back to home" },
};

export default function NotFound() {
  const locale = usePathname()?.startsWith("/en") ? "en" : "ar";
  const c = copy[locale];
  return (
    <main id="main" className="container flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
      <Link href={`/${locale}`}>
        <Logo />
      </Link>
      <p className="mt-10 text-7xl font-bold text-brand-teal">404</p>
      <h1 className="mt-4 text-3xl font-bold text-brand-navy">{c.title}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{c.body}</p>
      <Button asChild className="mt-8">
        <Link href={`/${locale}`}>{c.home}</Link>
      </Button>
    </main>
  );
}
