import { useState, useCallback, useEffect, useMemo } from "react";
import { themes, type Theme } from "@/utils/themes";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("coastalBreeze");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMemo(
    () => themes[currentTheme] || themes.coastalBreeze,
    [currentTheme],
  );

  const updateCSSVariables = useCallback((theme: Theme) => {
    const root = document.documentElement;

    // Force a re-render by toggling a data attribute
    root.setAttribute("data-theme", theme.name);
  }, []);

  const changeTheme = useCallback(
    async (newTheme: string) => {
      if (newTheme === currentTheme || !themes[newTheme]) return;
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 150));
      setCurrentTheme(newTheme);
      localStorage.setItem("theme", newTheme);

      // Update CSS variables immediately
      updateCSSVariables(themes[newTheme]);

      setIsLoading(false);
    },
    [currentTheme, updateCSSVariables],
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
