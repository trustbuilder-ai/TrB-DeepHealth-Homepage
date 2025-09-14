import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "critical"
    | "info";
  theme?: Theme;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", theme, ...props }, ref) => {
    const variants = theme
      ? {
          default: `${theme.primarySolid} text-white`,
          secondary: `${theme.surface} ${theme.text}`,
          destructive: "bg-red-600 text-white",
          outline: `${theme.text} border ${theme.border}`,
          success: "badge-success",
          warning: "badge-warning",
          critical: "badge-critical",
          info: "badge-info",
        }
      : {
          default: "bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/80",
          outline: "text-foreground border border-input",
          success: "badge-success",
          warning: "badge-warning",
          critical: "badge-critical",
          info: "badge-info",
        };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-[all,transform] duration-[var(--cs-animation-duration)]",
          // Component Style System - Apply CSS variables for border radius
          "rounded-[var(--cs-badge-radius)]",
          // Enhanced style - Origin UI pill variant with animated borders
          "[body[data-component-style='enhanced']_&]:rounded-full",
          "[body[data-component-style='enhanced']_&]:px-3",
          "[body[data-component-style='enhanced']_&]:py-1.5",
          "[body[data-component-style='enhanced']_&]:border-2",
          "[body[data-component-style='enhanced']_&]:border-transparent",
          "[body[data-component-style='enhanced']_&]:bg-gradient-to-r",
          "[body[data-component-style='enhanced']_&]:from-blue-100",
          "[body[data-component-style='enhanced']_&]:to-purple-100",
          "[body[data-component-style='enhanced']_&]:hover:from-blue-200",
          "[body[data-component-style='enhanced']_&]:hover:to-purple-200",
          "[body[data-component-style='enhanced']_&]:hover:scale-110",
          "[body[data-component-style='enhanced']_&]:shadow-lg",
          // Dark mode enhanced
          "dark:[body[data-component-style='enhanced']_&]:from-blue-900/50",
          "dark:[body[data-component-style='enhanced']_&]:to-purple-900/50",
          "dark:[body[data-component-style='enhanced']_&]:hover:from-blue-800/50",
          "dark:[body[data-component-style='enhanced']_&]:hover:to-purple-800/50",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
