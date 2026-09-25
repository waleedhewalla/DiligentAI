"use client";

import { Download, Printer } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Tracked download. When the PDF hasn't been uploaded yet, falls back to the
 * browser's "Save as PDF" of the print-optimised page, so the KPI still works.
 */
export function DownloadButton({
  file,
  label,
  event,
  variant = "inverse",
}: {
  file?: string | null;
  label: string;
  event: AnalyticsEvent;
  variant?: ButtonProps["variant"];
}) {
  const fire = () => track(event.name, event.params as never);
  if (file) {
    return (
      <Button asChild size="lg" variant={variant}>
        <a href={file} download onClick={fire}>
          <Download className="h-5 w-5" />
          {label}
        </a>
      </Button>
    );
  }
  return (
    <Button
      size="lg"
      variant={variant}
      onClick={() => {
        fire();
        window.print();
      }}
    >
      <Printer className="h-5 w-5" />
      {label}
    </Button>
  );
}
