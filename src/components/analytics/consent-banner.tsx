"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

const copy = {
  en: {
    body: "We use analytics cookies to understand which pages help manufacturers most. No advertising cookies.",
    accept: "Accept analytics",
    decline: "Decline",
    policy: "Privacy policy",
  },
  ar: {
    body: "نستخدم ملفات تعريف الارتباط التحليلية لنفهم أي الصفحات تفيد المصنّعين أكثر. لا نستخدم ملفات إعلانية.",
    accept: "قبول التحليلات",
    decline: "رفض",
    policy: "سياسة الخصوصية",
  },
};

export function ConsentBanner({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && !process.env.NEXT_PUBLIC_HOTJAR_ID) return;
    setOpen(readConsent() === null);
  }, []);
  if (!open) return null;
  const c = copy[locale];
  const choose = (v: "granted" | "denied") => {
    writeConsent(v);
    setOpen(false);
  };
  return (
    <div
      role="region"
      aria-label={c.policy}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border bg-background p-4 shadow-xl md:flex md:items-center md:gap-4"
    >
      <p className="text-sm text-muted-foreground md:flex-1">
        {c.body}{" "}
        <Link href={`/${locale}/privacy-policy`} className="font-medium text-brand-teal-dark underline">
          {c.policy}
        </Link>
      </p>
      <div className="mt-3 flex gap-2 md:mt-0">
        <Button size="sm" variant="outline" onClick={() => choose("denied")}>
          {c.decline}
        </Button>
        <Button size="sm" variant="navy" onClick={() => choose("granted")}>
          {c.accept}
        </Button>
      </div>
    </div>
  );
}
