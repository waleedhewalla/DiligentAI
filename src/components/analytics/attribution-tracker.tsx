"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordTouch } from "@/lib/attribution";

/** Records UTM / referrer / pages viewed for lead attribution. Renders nothing. */
export function AttributionTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) recordTouch(pathname);
  }, [pathname]);
  return null;
}
