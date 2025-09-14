import { useState, useEffect, useCallback } from "react";

/**
 * Available component style variants
 */
export type ComponentStyle =
  | "default"
  | "enhanced"
  | "minimal"
  | "professional";

/**
 * Component style configuration
 */
export interface ComponentStyleConfig {
  name: string;
  description: string;
  category: string;
}

/**
 * Available component styles with their configurations
 */
export const componentStyles: Record<ComponentStyle, ComponentStyleConfig> = {
  default: {
    name: "shadcn/ui",
    description: "Official shadcn/ui components with class-variance-authority",
    category: "Standard",
  },
  enhanced: {
    name: "Origin UI",
    description: "Real Origin UI components from originui.com",
    category: "Enhanced",
  },
  minimal: {
    name: "Plain HTML",
    description: "Pure HTML/CSS without any component libraries",
    category: "Minimal",
  },
  professional: {
    name: "TweakCN",
    description: "TweakCN methodology with CSS custom properties",
    category: "Professional",
  },
};

/**
 * Custom hook for managing component style preferences
 * Provides functionality to switch between different component style variants
 * and persist user preferences in localStorage.
 */
export const useComponentStyle = () => {
  const [currentStyle, setCurrentStyle] = useState<ComponentStyle>("default");
  const [styleLoading, setStyleLoading] = useState(false);

  // Initialize from localStorage on mount and apply data attribute
  useEffect(() => {
    const savedStyle = localStorage.getItem("componentStyle") as ComponentStyle;
    if (savedStyle && componentStyles[savedStyle]) {
      setCurrentStyle(savedStyle);
      // Apply the data attribute immediately
      if (typeof document !== "undefined") {
        document.body.setAttribute("data-component-style", savedStyle);
      }
    } else if (typeof document !== "undefined") {
      // Set default style attribute
      document.body.setAttribute("data-component-style", "default");
    }
  }, []);

  /**
   * Changes the current component style and persists to localStorage
   */
  const changeComponentStyle = useCallback(
    async (newStyle: ComponentStyle) => {
      if (newStyle === currentStyle || !componentStyles[newStyle]) return;

      setStyleLoading(true);

      try {
        // Simulate loading time for style switching
        await new Promise((resolve) => setTimeout(resolve, 200));

        setCurrentStyle(newStyle);
        localStorage.setItem("componentStyle", newStyle);

        // Apply any global style changes if needed
        if (typeof document !== "undefined") {
          document.body.setAttribute("data-component-style", newStyle);
        }
      } catch (error) {
        console.error(
          `Failed to change component style to ${newStyle}:`,
          error,
        );
      } finally {
        setStyleLoading(false);
      }
    },
    [currentStyle],
  );

  /**
   * Gets the configuration for the current component style
   */
  const getCurrentStyleConfig = useCallback(() => {
    return componentStyles[currentStyle];
  }, [currentStyle]);

  /**
   * Checks if a specific style variant is currently active
   */
  const isStyleActive = useCallback(
    (style: ComponentStyle) => {
      return currentStyle === style;
    },
    [currentStyle],
  );

  return {
    currentStyle,
    changeComponentStyle,
    styleLoading,
    componentStyles,
    getCurrentStyleConfig,
    isStyleActive,
  };
};
