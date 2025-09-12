import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/utils/themes";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: Theme;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, theme, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

Textarea.displayName = "Textarea";

export { Textarea };
