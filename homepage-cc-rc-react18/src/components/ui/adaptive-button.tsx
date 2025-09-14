import * as React from "react";
import {
  DefaultButton,
  EnhancedButton,
  MinimalButton,
  ProfessionalButton,
  ButtonProps,
} from "./button-variants";
import { useComponentStyle } from "@/hooks/useComponentStyle";

/**
 * Adaptive Button Component
 * Automatically renders the appropriate button variant based on current component style setting.
 * This provides a seamless way to switch between Default, Enhanced, Minimal, and Professional styles.
 */
const AdaptiveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { currentStyle } = useComponentStyle();

    // Select the appropriate button component based on style
    switch (currentStyle) {
      case "enhanced":
        return (
          <EnhancedButton ref={ref} {...props} componentStyle={currentStyle} />
        );
      case "minimal":
        return (
          <MinimalButton ref={ref} {...props} componentStyle={currentStyle} />
        );
      case "professional":
        return (
          <ProfessionalButton
            ref={ref}
            {...props}
            componentStyle={currentStyle}
          />
        );
      case "default":
      default:
        return (
          <DefaultButton ref={ref} {...props} componentStyle={currentStyle} />
        );
    }
  },
);

AdaptiveButton.displayName = "AdaptiveButton";

export { AdaptiveButton };
