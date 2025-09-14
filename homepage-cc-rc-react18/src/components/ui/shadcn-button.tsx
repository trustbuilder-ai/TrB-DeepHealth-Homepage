import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/utils/button-variants";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";

export interface ShadcnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  theme?: Theme;
}

/**
 * Real shadcn/ui Button Component
 * Official shadcn/ui implementation using class-variance-authority and Radix UI Slot
 */
const ShadcnButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      theme,
      ...props
    },
    ref,
  ) => {
    // Always use buttonVariants for structure, add theme classes for color overrides
    const baseClasses = buttonVariants({ variant, size });
    const themeClasses = theme
      ? getButtonStyles(theme, variant || "default")
      : "";

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(baseClasses, themeClasses, className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  },
);

ShadcnButton.displayName = "ShadcnButton";

export { ShadcnButton };
