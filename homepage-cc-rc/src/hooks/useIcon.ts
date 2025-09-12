import { useState, useCallback, useEffect } from "react";

// Icon sets configuration
const iconSets = {
  lucide: {
    name: "Lucide Icons",
    description: "Default clean SVG icons",
    strokeWidth: 2,
    type: "local",
  },
  heroicons: {
    name: "Heroicons",
    description: "Tailwind UI official icons",
    strokeWidth: 1.5,
    type: "external",
  },
  phosphor: {
    name: "Phosphor Icons",
    description: "Flexible icon family",
    strokeWidth: 2.5,
    type: "external",
  },
  feather: {
    name: "Feather Icons",
    description: "Simply beautiful icons",
    strokeWidth: 1.8,
    type: "external",
  },
  tabler: {
    name: "Tabler Icons",
    description: "Free SVG icons (3000+)",
    strokeWidth: 2,
    type: "external",
  },
  bootstrap: {
    name: "Bootstrap Icons",
    description: "Official Bootstrap SVG icons",
    strokeWidth: 0,
    type: "external",
  },
};

export const useIcon = () => {
  const [currentIconSet, setCurrentIconSet] = useState("lucide");
  const [iconLoading, setIconLoading] = useState(false);
  const [loadedIconSets] = useState(new Set(["lucide"]));

  const changeIconSet = useCallback(
    async (newIconSet: string) => {
      if (newIconSet === currentIconSet) return;
      setIconLoading(true);

      const iconConfig = iconSets[newIconSet as keyof typeof iconSets];
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(
          "--icon-stroke-width",
          iconConfig.strokeWidth.toString(),
        );
      }

      setCurrentIconSet(newIconSet);
      localStorage.setItem("iconSet", newIconSet);
      setIconLoading(false);
    },
    [currentIconSet],
  );

  useEffect(() => {
    const savedIconSet = localStorage.getItem("iconSet");
    if (savedIconSet && iconSets[savedIconSet as keyof typeof iconSets]) {
      setCurrentIconSet(savedIconSet);
    }
  }, []);

  return {
    currentIconSet,
    changeIconSet,
    iconLoading,
    loadedIconSets,
    iconSets,
  };
};
