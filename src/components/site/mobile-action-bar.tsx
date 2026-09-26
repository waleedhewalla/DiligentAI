"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./icons";

/**
 * Phone-only bottom bar: the primary CTA plus WhatsApp (when a number is set),
 * shown once the visitor scrolls past the hero. Hidden on the booking page itself.
 * Desktop uses the per-offering StickyCta instead.
 */
export function MobileActionBar({
  bookHref,
  bookLabel,
  whatsappHref,
  whatsappLabel,
}: {
  bookHref: string;
  bookLabel: string;
  whatsappHref: string | null;
  whatsappLabel: string;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname?.includes("/demo") || pathname?.includes("/contact")) return null;
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden print:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex gap-2">
        <Button asChild size="default" className="flex-1" tabIndex={visible ? 0 : -1}>
          <TrackedLink href={bookHref} event={{ name: "cta_click", params: { cta: "book_demo", location: "mobile_bar" } }}>
            {bookLabel}
            <ArrowRight className="btn-icon" />
          </TrackedLink>
        </Button>
        {whatsappHref ? (
          <Button asChild variant="whatsapp" size="icon" className="h-12 w-12" tabIndex={visible ? 0 : -1}>
            <TrackedAnchor
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsappLabel}
              event={{ name: "whatsapp_click", params: { location: "mobile_bar" } }}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </TrackedAnchor>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
