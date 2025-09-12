import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/utils/themes";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: Theme;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          theme
            ? `${theme.bg} ${theme.border} ${theme.text} placeholder:${theme.textMuted} focus-visible:ring-2`
            : "bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
