import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/utils/themes";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "critical" | "info";
  theme?: Theme;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", theme, ...props }, ref) => {
    const variants = theme ? {
      default: `${theme.primarySolid} text-white`,
      secondary: `${theme.surface} ${theme.text}`,
      destructive: "bg-red-600 text-white",
      outline: `${theme.text} border ${theme.border}`,
      success: "badge-success",
      warning: "badge-warning", 
      critical: "badge-critical",
      info: "badge-info",
    } : {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
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
