import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants follow spec §7.2 (Primary orange, Secondary navy outline, Ghost teal, Portal purple, Destructive red).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-orange-dark text-white shadow-sm hover:bg-brand-orange-deep",
        secondary: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
        inverse: "border-2 border-white/70 text-white hover:bg-white hover:text-brand-navy",
        navy: "bg-brand-navy text-white hover:bg-brand-navy-dark",
        teal: "bg-brand-teal-dark text-white hover:bg-brand-teal",
        ghost: "text-brand-teal-dark font-medium underline-offset-4 hover:underline px-0",
        portal: "bg-brand-purple text-white rounded-md font-medium hover:bg-brand-purple/90",
        destructive: "bg-brand-red text-white rounded-md font-medium hover:bg-brand-red/90",
        outline: "border border-input bg-background hover:bg-muted",
        // WhatsApp green darkened for 4.5:1 contrast with white text.
        whatsapp: "bg-[#0E7A40] text-white hover:bg-[#0B6535]",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
