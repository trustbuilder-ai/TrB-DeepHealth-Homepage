import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";

export interface TweakCNButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

/**
 * TweakCN Button Component
 * Implements the TweakCN methodology using OKLCH color system and CSS custom properties
 * Based on the TweakCN approach from tweakcn.com for visual customization
 */
const TweakCNButton = React.forwardRef<HTMLButtonElement, TweakCNButtonProps>(
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
      "transition-[color,background-color,border-color,box-shadow] duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // TweakCN-style CSS custom properties
      "focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
    );

    const variants = {
      default: cn(
        // Using TweakCN methodology with CSS custom properties
        "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        "hover:bg-[hsl(var(--primary)/0.9)] shadow-sm hover:shadow-md",
        "border border-[hsl(var(--primary)/0.2)]",
      ),
      outline: cn(
        "border border-[hsl(var(--border))] bg-[hsl(var(--background))]",
        "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
        "text-[hsl(var(--foreground))]",
      ),
      ghost: cn(
        "bg-transparent text-[hsl(var(--foreground))]",
        "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
      ),
      destructive: cn(
        "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
        "hover:bg-[hsl(var(--destructive)/0.9)] shadow-sm hover:shadow-md",
        "border border-[hsl(var(--destructive)/0.2)]",
      ),
      secondary: cn(
        "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        "hover:bg-[hsl(var(--secondary)/0.8)] shadow-xs hover:shadow-sm",
        "border border-[hsl(var(--secondary)/0.3)]",
      ),
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    // TweakCN-style custom properties for additional customization
    const tweakCNStyles = {
      "--tweakcn-button-radius": "var(--radius)",
      "--tweakcn-button-shadow": "var(--shadow-sm)",
      "--tweakcn-button-transition": "all 200ms ease",
    } as React.CSSProperties;

    // Add theme classes for color overrides while keeping TweakCN methodology
    const themeClasses = theme ? getButtonStyles(theme, variant) : "";

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          // TweakCN methodology: use CSS custom properties for fine-grained control
          "[&:not(:disabled)]:hover:shadow-[var(--tweakcn-button-shadow)]",
          "rounded-[var(--tweakcn-button-radius)]",
          "transition-[var(--tweakcn-button-transition)]",
          themeClasses,
          className,
        )}
        style={tweakCNStyles}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin opacity-70"
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

TweakCNButton.displayName = "TweakCNButton";

export { TweakCNButton };
