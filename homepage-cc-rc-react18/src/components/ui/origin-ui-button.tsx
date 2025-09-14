import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";

export interface OriginUIButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

/**
 * Origin UI Button Component
 * Based on actual Origin UI styling patterns from originui.com
 * Features enhanced visual design with smooth transitions and modern aesthetics
 */
const OriginUIButton = React.forwardRef<HTMLButtonElement, OriginUIButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled = false,
      children,
      theme,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
      "transition-[color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "active:scale-[0.98] hover:shadow-md transition-all duration-200",
    );

    const variants = {
      default: cn(
        "bg-primary text-primary-foreground shadow-sm",
        "hover:bg-primary/90 hover:shadow-lg",
        "active:bg-primary/95",
      ),
      outline: cn(
        "border border-input bg-background shadow-xs",
        "hover:bg-accent hover:text-accent-foreground hover:border-border/60",
        "active:bg-accent/50",
      ),
      ghost: cn(
        "shadow-none",
        "hover:bg-accent hover:text-accent-foreground",
        "active:bg-accent/50",
      ),
      destructive: cn(
        "bg-destructive text-destructive-foreground shadow-sm",
        "hover:bg-destructive/90 hover:shadow-lg",
        "active:bg-destructive/95",
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground shadow-xs",
        "hover:bg-secondary/80 hover:shadow-md",
        "active:bg-secondary/70",
      ),
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    };

    // Add theme classes for color overrides while keeping Origin UI styling
    const themeClasses = theme ? getButtonStyles(theme, variant) : "";

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          themeClasses,
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin opacity-60"
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
      </button>
    );
  },
);

OriginUIButton.displayName = "OriginUIButton";

export { OriginUIButton };
