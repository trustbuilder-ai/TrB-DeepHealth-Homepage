import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      "inline-flex items-center justify-center rounded-md text-sm font-medium",
      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      // Ensure minimum contrast
      "contrast-[1.1] dark:contrast-[1.2]",
      // Enhanced focus indicators for accessibility
      "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
      // Component Style System - Apply CSS variables
      "[box-shadow:var(--cs-button-shadow)]",
      "transition-[all,transform] duration-[var(--cs-animation-duration)]",
    );

    const themeStyles = theme ? getButtonStyles(theme, variant) : "";

    const fallbackVariants = {
      default: cn(
        "bg-primary text-primary-foreground hover:bg-primary/90",
        // Enhanced style - Origin UI patterns
        "[body[data-component-style='enhanced']_&]:bg-gradient-to-r",
        "[body[data-component-style='enhanced']_&]:from-blue-500",
        "[body[data-component-style='enhanced']_&]:to-purple-600",
        "[body[data-component-style='enhanced']_&]:hover:from-blue-600",
        "[body[data-component-style='enhanced']_&]:hover:to-purple-700",
        "[body[data-component-style='enhanced']_&]:hover:scale-105",
        "[body[data-component-style='enhanced']_&]:active:scale-95",
      ),
      outline: cn(
        "border border-input hover:bg-accent hover:text-accent-foreground",
        // Enhanced style - glassmorphism effect
        "[body[data-component-style='enhanced']_&]:bg-white/10",
        "[body[data-component-style='enhanced']_&]:backdrop-blur-sm",
        "[body[data-component-style='enhanced']_&]:border-white/20",
        "[body[data-component-style='enhanced']_&]:hover:bg-white/20",
      ),
      ghost: cn(
        "hover:bg-accent hover:text-accent-foreground",
        "[body[data-component-style='enhanced']_&]:hover:bg-gradient-to-r",
        "[body[data-component-style='enhanced']_&]:hover:from-blue-50",
        "[body[data-component-style='enhanced']_&]:hover:to-purple-50",
        "[body[data-component-style='enhanced']_&]:hover:text-blue-700",
      ),
      destructive: cn(
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "[body[data-component-style='enhanced']_&]:bg-gradient-to-r",
        "[body[data-component-style='enhanced']_&]:from-red-500",
        "[body[data-component-style='enhanced']_&]:to-pink-600",
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "[body[data-component-style='enhanced']_&]:bg-gradient-to-r",
        "[body[data-component-style='enhanced']_&]:from-gray-100",
        "[body[data-component-style='enhanced']_&]:to-gray-200",
        "[body[data-component-style='enhanced']_&]:hover:from-gray-200",
        "[body[data-component-style='enhanced']_&]:hover:to-gray-300",
      ),
    };

    const variantStyle = theme ? themeStyles : fallbackVariants[variant];

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseClasses, variantStyle, sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
