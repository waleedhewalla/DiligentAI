"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders `proposal` when the page was opened with ?intent=proposal, otherwise
 * `children`. Lets a statically rendered page (/demo) serve both the plant
 * review and the custom-proposal request. Wrap in <Suspense fallback={children}>.
 */
export function IntentSwitch({ proposal, children }: { proposal: ReactNode; children: ReactNode }) {
  const isProposal = useSearchParams().get("intent") === "proposal";
  return <>{isProposal ? proposal : children}</>;
}
