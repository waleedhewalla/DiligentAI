"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrackedLink } from "./tracked-link";

export function StickyCta({
  label,
  text,
  cta,
  href,
  product,
}: {
  label: string;
  text: string;
  cta: string;
  href: string;
  product: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur transition-transform duration-300 print:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        <p className="hidden text-sm sm:block">
          <span className="font-bold text-brand-navy ltr-run">{label}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          {text}
        </p>
        <Button asChild size="sm" className="w-full sm:w-auto" tabIndex={visible ? 0 : -1}>
          <TrackedLink href={href} event={{ name: "cta_click", params: { cta: "book_demo", location: "sticky_bar", product } }}>
            {cta}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
      </div>
    </div>
  );
}
