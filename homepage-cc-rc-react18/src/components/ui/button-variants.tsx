import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";
import { ComponentStyle } from "@/hooks/useComponentStyle";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
  componentStyle?: ComponentStyle;
}

/**
 * Default Button - Standard shadcn/ui styling
 */
const DefaultButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
    );

    const themeStyles = theme ? getButtonStyles(theme, variant) : "";

    const fallbackVariants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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

/**
 * Enhanced Button - Origin UI inspired styling with animations and gradients
 */
const EnhancedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled = false,
      children,
      // theme is not used in enhanced button
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-bold",
      "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "hover:scale-105 active:scale-95 transform-gpu",
      "focus-visible:ring-blue-400/50 focus-visible:ring-offset-2",
      "shadow-2xl hover:shadow-3xl backdrop-blur-sm",
      "relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
    );

    const enhancedVariants = {
      default: cn(
        "bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white",
        "hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800",
        "shadow-blue-500/50 hover:shadow-purple-500/60",
        "border-2 border-blue-400/30 hover:border-purple-400/40",
        "animate-gradient-x",
      ),
      outline: cn(
        "bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border-2 border-white/30 text-gray-900 dark:text-white",
        "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/30 hover:border-white/50",
        "shadow-white/10 hover:shadow-white/20",
        "backdrop-saturate-150",
      ),
      ghost: cn(
        "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-purple-50/80 hover:to-indigo-50/80",
        "dark:hover:from-blue-950/30 dark:hover:via-purple-950/30 dark:hover:to-indigo-950/30",
        "hover:text-blue-700 dark:hover:text-blue-300",
        "shadow-none hover:shadow-lg hover:shadow-blue-500/20",
      ),
      destructive: cn(
        "bg-gradient-to-br from-red-500 via-pink-600 to-rose-700 text-white",
        "hover:from-red-600 hover:via-pink-700 hover:to-rose-800",
        "shadow-red-500/50 hover:shadow-pink-500/60",
        "border-2 border-red-400/30 hover:border-pink-400/40",
      ),
      secondary: cn(
        "bg-gradient-to-br from-slate-100 via-gray-200 to-zinc-300 text-gray-900",
        "dark:from-slate-800 dark:via-gray-700 dark:to-zinc-600 dark:text-gray-100",
        "hover:from-slate-200 hover:via-gray-300 hover:to-zinc-400",
        "dark:hover:from-slate-700 dark:hover:via-gray-600 dark:hover:to-zinc-500",
        "shadow-slate-500/20 hover:shadow-gray-500/30",
        "border border-gray-300/50 dark:border-gray-600/50",
      ),
    };

    const sizes = {
      default: "h-12 px-8 py-3",
      sm: "h-10 px-5 text-xs",
      lg: "h-14 px-10 text-base",
      icon: "h-12 w-12",
    };

    return (
      <button
        className={cn(
          baseClasses,
          enhancedVariants[variant],
          sizes[size],
          className,
        )}
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

/**
 * Minimal Button - Ultra-clean, borderless styling
 */
const MinimalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      "inline-flex items-center justify-center text-sm font-light",
      "transition-all duration-100 focus-visible:outline-none",
      "disabled:opacity-30 disabled:pointer-events-none",
      "hover:opacity-70 active:opacity-50",
      "focus-visible:opacity-70",
    );

    const themeStyles = theme ? getButtonStyles(theme, variant) : "";

    const fallbackMinimalVariants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
    };

    const sizes = {
      default: "h-8 px-2 py-1",
      sm: "h-7 px-1.5 text-xs",
      lg: "h-9 px-3",
      icon: "h-8 w-8",
    };

    const variantStyle = theme ? themeStyles : fallbackMinimalVariants[variant];

    return (
      <button
        className={cn(baseClasses, variantStyle, sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
        {children}
      </button>
    );
  },
);

/**
 * Professional Button - Corporate, structured styling
 */
const ProfessionalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      "inline-flex items-center justify-center rounded-sm text-sm font-semibold tracking-wider uppercase",
      "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-60 disabled:pointer-events-none",
      "focus-visible:ring-slate-600 focus-visible:ring-offset-2",
      "shadow-inner hover:shadow-lg",
      "border-2",
    );

    const themeStyles = theme ? getButtonStyles(theme, variant) : "";

    const fallbackProfessionalVariants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-primary/20 hover:shadow-primary/30",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      ghost: "text-primary hover:bg-primary/10 hover:text-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive/50 shadow-destructive/20 hover:shadow-destructive/30",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/50",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-8 text-base",
      icon: "h-11 w-11",
    };

    const variantStyle = theme
      ? themeStyles
      : fallbackProfessionalVariants[variant];

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

DefaultButton.displayName = "DefaultButton";
EnhancedButton.displayName = "EnhancedButton";
MinimalButton.displayName = "MinimalButton";
ProfessionalButton.displayName = "ProfessionalButton";

export { DefaultButton, EnhancedButton, MinimalButton, ProfessionalButton };
