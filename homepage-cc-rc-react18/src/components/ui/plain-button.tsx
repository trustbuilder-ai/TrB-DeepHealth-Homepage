import * as React from "react";
import { Theme } from "@/styles/themes";
import { getButtonStyles } from "@/utils/themeUtils";

export interface PlainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

/**
 * Plain Button Component
 * Built from scratch without any component libraries (no shadcn/ui, no Radix UI, no Origin UI)
 * Uses only basic HTML button element with custom CSS classes and inline styles
 */
const PlainButton = React.forwardRef<HTMLButtonElement, PlainButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      loading = false,
      disabled = false,
      children,
      theme,
      style,
      ...props
    },
    ref,
  ) => {
    // Base styles object (no external dependencies)
    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "inherit",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      border: "1px solid transparent",
      transition: "all 0.2s ease-in-out",
      outline: "none",
      textDecoration: "none",
      userSelect: "none",
      opacity: disabled || loading ? 0.6 : 1,
      transform: "scale(1)",
      ...style,
    };

    // Variant-specific styles with theme support
    const getVariantStyles = (): React.CSSProperties => {
      // If theme is provided, use a CSS class approach for theme colors
      if (theme) {
        // For theme-aware styling, we'll apply minimal inline styles
        // and let CSS classes handle the theming
        switch (variant) {
          case "default":
            return {
              // Will be overridden by theme classes
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            };
          case "outline":
            return {
              backgroundColor: "transparent",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            };
          case "ghost":
            return {
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "var(--foreground)",
            };
          case "destructive":
            return {
              backgroundColor: "var(--destructive)",
              color: "var(--destructive-foreground)",
            };
          case "secondary":
            return {
              backgroundColor: "var(--secondary)",
              color: "var(--secondary-foreground)",
            };
          default:
            return {};
        }
      }

      // Fallback to hardcoded colors when no theme is provided
      switch (variant) {
        case "default":
          return {
            backgroundColor: "#18181b", // zinc-900
            color: "#fafafa", // zinc-50
            borderColor: "#18181b",
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: "#18181b",
            borderColor: "#e4e4e7", // zinc-200
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            color: "#18181b",
            borderColor: "transparent",
          };
        case "destructive":
          return {
            backgroundColor: "#dc2626", // red-600
            color: "#ffffff",
            borderColor: "#dc2626",
          };
        case "secondary":
          return {
            backgroundColor: "#f4f4f5", // zinc-100
            color: "#18181b",
            borderColor: "#f4f4f5",
          };
        default:
          return {};
      }
    };

    // Size-specific styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case "sm":
          return {
            height: "32px",
            padding: "0 12px",
            fontSize: "12px",
          };
        case "lg":
          return {
            height: "44px",
            padding: "0 32px",
            fontSize: "16px",
          };
        case "icon":
          return {
            height: "40px",
            width: "40px",
            padding: "0",
          };
        case "default":
        default:
          return {
            height: "40px",
            padding: "0 16px",
          };
      }
    };

    // Hover and active states (using onMouseEnter/Leave)
    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);

    const getInteractionStyles = (): React.CSSProperties => {
      if (disabled || loading) return {};

      if (isActive) {
        return { transform: "scale(0.98)" };
      } else if (isHovered) {
        const baseHoverStyles = {
          transform: "scale(1.02)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        };

        // Variant-specific hover styles
        let variantStyles: React.CSSProperties = {};
        switch (variant) {
          case "default":
            variantStyles = { backgroundColor: "#27272a" }; // zinc-800
            break;
          case "outline":
            variantStyles = { backgroundColor: "#f4f4f5" }; // zinc-100
            break;
          case "ghost":
            variantStyles = { backgroundColor: "#f4f4f5" }; // zinc-100
            break;
          case "destructive":
            variantStyles = { backgroundColor: "#b91c1c" }; // red-700
            break;
          case "secondary":
            variantStyles = { backgroundColor: "#e4e4e7" }; // zinc-200
            break;
        }

        return { ...baseHoverStyles, ...variantStyles };
      }

      return {};
    };

    // Get theme-aware class for additional styling
    const themeClasses = theme ? getButtonStyles(theme, variant) : "";

    // Combine all styles
    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...getInteractionStyles(),
    };

    // Focus styles (using onFocus/onBlur)
    const [isFocused, setIsFocused] = React.useState(false);
    if (isFocused && !disabled && !loading) {
      combinedStyles.boxShadow = "0 0 0 2px #3b82f6"; // blue-500
      combinedStyles.borderColor = "#3b82f6";
    }

    return (
      <button
        ref={ref}
        className={`${className} ${themeClasses}`.trim()}
        style={combinedStyles}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {loading && (
          <svg
            style={{
              marginRight: "8px",
              height: "16px",
              width: "16px",
              animation: "spin 1s linear infinite",
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
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

PlainButton.displayName = "PlainButton";

export { PlainButton };
