import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} dir="ltr">
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="36" height="36" rx="9" fill="#1F3864" />
        <path d="M10 9h7.5a9 9 0 0 1 0 18H10z" fill="none" stroke="#2CA6A4" strokeWidth="3.2" />
        <circle cx="26" cy="11" r="3.2" fill="#E97730" />
      </svg>
      <span className={cn("text-lg font-bold tracking-tight", inverted ? "text-white" : "text-brand-navy")}>
        Diligent <span className="text-brand-teal">AI</span>
      </span>
    </span>
  );
}
