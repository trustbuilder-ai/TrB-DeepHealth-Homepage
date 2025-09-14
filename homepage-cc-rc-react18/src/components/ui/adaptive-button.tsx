import * as React from "react";
import { ShadcnButton, ShadcnButtonProps } from "./shadcn-button";
import { OriginUIButton, OriginUIButtonProps } from "./origin-ui-button";
import { PlainButton, PlainButtonProps } from "./plain-button";
import { TweakCNButton, TweakCNButtonProps } from "./tweakcn-button";
import { useComponentStyle } from "@/hooks/useComponentStyle";

// Union type for all possible button props
type AdaptiveButtonProps = ShadcnButtonProps &
  OriginUIButtonProps &
  PlainButtonProps &
  TweakCNButtonProps;

/**
 * Adaptive Button Component
 * Automatically renders the appropriate button component based on current style setting.
 * Now uses real components: shadcn/ui, Origin UI, Plain HTML, and TweakCN.
 */
const AdaptiveButton = React.forwardRef<HTMLButtonElement, AdaptiveButtonProps>(
  (props, ref) => {
    const { currentStyle } = useComponentStyle();

    // Select the appropriate real button component based on style
    switch (currentStyle) {
      case "enhanced":
        return <OriginUIButton ref={ref} {...props} />;
      case "minimal":
        return <PlainButton ref={ref} {...props} />;
      case "professional":
        return <TweakCNButton ref={ref} {...props} />;
      case "default":
      default:
        return <ShadcnButton ref={ref} {...props} />;
    }
  },
);

AdaptiveButton.displayName = "AdaptiveButton";

export { AdaptiveButton };
