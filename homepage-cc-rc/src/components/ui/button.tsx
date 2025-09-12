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
    const baseClasses =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

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

Button.displayName = "Button";

export { Button };
