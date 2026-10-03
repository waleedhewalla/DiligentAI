import { cn } from "@/lib/utils";
import { VelixiMark } from "@/components/brand/mark";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} dir="ltr">
      <VelixiMark className="h-9 w-9 shrink-0" />
      <span className={cn("text-lg font-semibold tracking-[0.16em]", inverted ? "text-white" : "text-brand-navy")}>VELIXI</span>
    </span>
  );
}
