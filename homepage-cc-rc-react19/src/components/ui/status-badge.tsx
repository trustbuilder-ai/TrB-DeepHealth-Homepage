import * as React from "react";
import { cn } from "@/utils/cn";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "critical"
    | "info"
    | "accessibility"
    | "therapeutic";
  size?: "sm" | "default" | "lg";
  children: React.ReactNode;
}

export const StatusBadge = ({
  variant = "default",
  children,
  size = "default",
  className,
  ...props
}: StatusBadgeProps) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    success: "badge-success",
    warning: "badge-warning",
    critical: "badge-critical",
    info: "badge-info",
    accessibility:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    therapeutic:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    default: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
