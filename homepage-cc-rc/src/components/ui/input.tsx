import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/utils/themes";
import { getInputStyles } from "@/utils/themeUtils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: Theme;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          theme ? getInputStyles(theme) : "",
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
