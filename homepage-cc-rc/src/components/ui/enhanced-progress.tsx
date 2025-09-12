import React from "react";
import { cn } from "@/utils/cn";

export interface EnhancedProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "success" | "warning" | "critical";
  showValue?: boolean;
  className?: string;
  [key: string]: unknown;
}

export const EnhancedProgress = React.memo<EnhancedProgressProps>(
  ({
    value = 0,
    max = 100,
    size = "default",
    variant = "default",
    showValue = false,
    className,
    ...props
  }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: "h-2",
      default: "h-3",
      lg: "h-4",
    };

    const variants = {
      default: "bg-primary",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      critical: "bg-red-500",
    };

    return (
      <div className="space-y-1">
        <div
          className={cn(
            "w-full bg-secondary rounded-full overflow-hidden",
            sizes[size],
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              variants[variant],
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>

        {showValue && (
          <div className="text-xs text-muted-foreground text-right">
            {value}/{max} ({Math.round(percentage)}%)
          </div>
        )}
      </div>
    );
  },
);

EnhancedProgress.displayName = "EnhancedProgress";
