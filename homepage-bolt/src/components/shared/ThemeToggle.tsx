import React from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className="theme-switcher">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <span className="font-medium text-theme-text">Theme Selector</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`theme-button ${
              currentTheme === theme.name ? "active" : ""
            }`}
            title={theme.description}
          >
            <div className="theme-preview">
              <div
                className="theme-color-dot primary"
                style={{ backgroundColor: theme.variables["--primary-color"] }}
              />
              <div
                className="theme-color-dot secondary"
                style={{
                  backgroundColor: theme.variables["--secondary-color"],
                }}
              />
              <div
                className="theme-color-dot accent"
                style={{ backgroundColor: theme.variables["--accent-color"] }}
              />
            </div>
            <span className="theme-name">{theme.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
