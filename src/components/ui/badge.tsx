import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-brand-navy/10 text-brand-navy",
      orange: "bg-brand-orange/15 text-brand-orange-dark",
      teal: "bg-brand-teal/15 text-brand-teal-dark",
      glass: "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur",
      success: "bg-brand-green/10 text-brand-green",
      muted: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
