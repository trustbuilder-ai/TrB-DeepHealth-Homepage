import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { themes, getAllThemeVariables } from "../styles/themes";
import { ThemeContext } from "./ThemeContextDefinition";
import type { ThemeContextType } from "./ThemeContextDefinition";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("coastal-breeze");

  useEffect(() => {
    const applyTheme = (themeName: string) => {
      const theme = themes[themeName];
      if (!theme) return;

      const root = document.documentElement;

      // Clear all theme variables first
      const allVariables = getAllThemeVariables();
      allVariables.forEach((variable) => {
        root.style.removeProperty(variable);
      });

      // Apply new theme variables
      Object.entries(theme.variables).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    };

    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    availableThemes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

