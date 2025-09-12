import { useState, useCallback, useEffect, useMemo } from "react";
import { themes } from "@/utils/themes";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("coastalBreeze");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMemo(
    () => themes[currentTheme] || themes.coastalBreeze,
    [currentTheme],
  );

  const changeTheme = useCallback(
    async (newTheme: string) => {
      if (newTheme === currentTheme || !themes[newTheme]) return;
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 150));
      setCurrentTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      setIsLoading(false);
    },
    [currentTheme],
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return { theme, currentTheme, changeTheme, isLoading };
};
