import { useState, useCallback, useEffect, useMemo } from "react";
import { themes, type Theme } from "@/styles/themes";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("coastalBreeze");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMemo(
    () => themes[currentTheme] || themes.coastalBreeze,
    [currentTheme],
  );

  const updateCSSVariables = useCallback(
    (theme: Theme) => {
      const root = document.documentElement;

      // Clear all previous theme classes
      root.className = root.className.replace(/theme-\S+/g, "").trim();

      // Add new theme class
      root.classList.add(`theme-${currentTheme}`);

      // Set data attributes for CSS selectors
      root.setAttribute("data-theme", theme.name);
      root.setAttribute("data-theme-dark", theme.isDark ? "true" : "false");
    },
    [currentTheme],
  );

  const changeTheme = useCallback(
    async (newTheme: string) => {
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
    },
    [currentTheme],
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      updateCSSVariables(themes[savedTheme]);
    } else {
      updateCSSVariables(themes.coastalBreeze);
    }
  }, [updateCSSVariables]);

  return { theme, currentTheme, changeTheme, isLoading };
};
