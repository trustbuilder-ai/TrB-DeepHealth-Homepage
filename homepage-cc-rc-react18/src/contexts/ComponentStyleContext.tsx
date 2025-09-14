import React, { createContext, ReactNode } from "react";
import { useComponentStyle, ComponentStyle } from "@/hooks/useComponentStyle";

interface ComponentStyleContextValue {
  currentStyle: ComponentStyle;
  changeComponentStyle: (style: ComponentStyle) => void;
  styleLoading: boolean;
  isStyleActive: (style: ComponentStyle) => boolean;
}

const ComponentStyleContext = createContext<ComponentStyleContextValue | null>(
  null,
);

interface ComponentStyleProviderProps {
  children: ReactNode;
}

/**
 * Provider component that makes component style state available throughout the app.
 * Wraps the useComponentStyle hook and provides it via React Context.
 */
export const ComponentStyleProvider: React.FC<ComponentStyleProviderProps> = ({
  children,
}) => {
  const componentStyleHook = useComponentStyle();

  return (
    <ComponentStyleContext.Provider value={componentStyleHook}>
      {children}
    </ComponentStyleContext.Provider>
  );
};
