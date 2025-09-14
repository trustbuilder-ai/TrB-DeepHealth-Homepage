import { useState, useEffect } from "react";
import { themes, type Theme } from "@/styles/themes";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("coastalBreeze");
  const [isLoading, setIsLoading] = useState(false);

  const theme = themes[currentTheme] || themes.coastalBreeze;

  const updateCSSVariables = (theme: Theme, themeName: string) => {
    const root = document.documentElement;

    // Clear all previous theme classes
    root.className = root.className.replace(/theme-\S+/g, "").trim();

    // Add new theme class
    root.classList.add(`theme-${themeName}`);

    // Set data attributes for CSS selectors
    root.setAttribute("data-theme", theme.name);
    root.setAttribute("data-theme-dark", theme.isDark ? "true" : "false");
  };

  const changeTheme = async (newTheme: string) => {
    if (newTheme === currentTheme || !themes[newTheme]) return;
    setIsLoading(true);

    // Update immediately without waiting
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Update CSS attributes
    const root = document.documentElement;
    root.className = root.className.replace(/theme-\S+/g, "").trim();
    root.classList.add(`theme-${newTheme}`);
    root.setAttribute("data-theme", themes[newTheme].name);
    root.setAttribute(
      "data-theme-dark",
      themes[newTheme].isDark ? "true" : "false",
    );

    await new Promise((resolve) => setTimeout(resolve, 150));
    setIsLoading(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      updateCSSVariables(themes[savedTheme], savedTheme);
    } else {
      updateCSSVariables(themes.coastalBreeze, "coastalBreeze");
    }
  }, []); // Only run on mount

  return { theme, currentTheme, changeTheme, isLoading };
};
