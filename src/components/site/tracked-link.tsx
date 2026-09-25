"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { event: AnalyticsEvent };

/** A Next.js Link that fires an analytics event on click. */
export function TrackedLink({ event, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event.name, event.params as never);
        onClick?.(e);
      }}
    />
  );
}

type AnchorProps = ComponentProps<"a"> & { event: AnalyticsEvent };

export function TrackedAnchor({ event, onClick, ...props }: AnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event.name, event.params as never);
        onClick?.(e);
      }}
    />
  );
}
