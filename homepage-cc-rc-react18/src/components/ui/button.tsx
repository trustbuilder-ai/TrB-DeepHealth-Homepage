import * as React from "react";
import { AdaptiveButton } from "./adaptive-button";
import { Theme } from "@/styles/themes";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

/**
 * Button Component
 * Now uses the adaptive system to automatically switch between component styles.
 * Maintains full backwards compatibility with existing usage.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <AdaptiveButton ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export { Button };
