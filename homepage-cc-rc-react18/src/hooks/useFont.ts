import { useState, useCallback } from "react";
import { fontSets } from "@/utils/fonts";

export const useFont = () => {
  const [currentFont, setCurrentFont] = useState("inter");
  const [fontLoading, setFontLoading] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState(new Set(["inter"]));

  const loadExternalFont = useCallback(
    async (fontKey: string) => {
      const font = fontSets[fontKey];
      if (!font || loadedFonts.has(fontKey)) {
        return true;
      }

      try {
        setFontLoading(true);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = font.cdnUrl;
        link.onload = () =>
          setLoadedFonts((prev) => new Set([...prev, fontKey]));
        document.head.appendChild(link);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return true;
      } catch (error) {
        console.error(`Failed to load font ${fontKey}:`, error);
        return false;
      } finally {
        setFontLoading(false);
      }
    },
    [loadedFonts],
  );

  const changeFont = useCallback(
    async (newFont: string) => {
      if (newFont === currentFont) return;
      setFontLoading(true);
      const loaded = await loadExternalFont(newFont);
      if (!loaded) {
        setFontLoading(false);
        return;
      }

      const font = fontSets[newFont];
      if (typeof document !== "undefined") {
        document.body.style.fontFamily = font.fontFamily;
      }
      setCurrentFont(newFont);
      localStorage.setItem("selectedFont", newFont);
      setFontLoading(false);
    },
    [currentFont, loadExternalFont],
  );

  return { currentFont, changeFont, fontLoading, loadedFonts };
};
