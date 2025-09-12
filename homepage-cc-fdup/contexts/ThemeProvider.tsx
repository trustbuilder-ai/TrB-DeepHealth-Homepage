import React, { useState, useEffect, ReactNode } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("trb-theme-storage");
    return stored
      ? JSON.parse(stored).theme || "warm-community"
      : "warm-community";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(
      "trb-theme-storage",
      JSON.stringify({ theme: newTheme }),
    );
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = [
      "clinical-trust",
      "warm-community",
      "mental-health",
      "dark",
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(theme: Theme) {
  // Remove existing theme classes
  document.documentElement.classList.remove(
    "theme-clinical-trust",
    "theme-warm-community",
    "theme-mental-health",
    "dark",
  );

  // Apply new theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.add(`theme-${theme}`);
  }

  // Load theme-specific CSS variables
  loadThemeCSS(theme);
}

async function loadThemeCSS(theme: Theme) {
  // All themes are already imported in globals.css from src/styles/themes/
  // The theme switching is handled by CSS class selectors:
  // .theme-clinical-trust, .theme-warm-community, .dark
  const themeMap = {
    "clinical-trust": "styles/themes/clinical-trust.css",
    "warm-community": "styles/themes/warm-community.css",
    "mental-health": "styles/themes/mental-health.css",
    dark: "styles/themes/dark-mode.css",
  };

  // eslint-disable-next-line no-console
  console.log(`Active theme: ${theme} (${themeMap[theme]})`);
}
