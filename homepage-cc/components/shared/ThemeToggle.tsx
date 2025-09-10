import { useState } from "react";
import { Palette, Check, Moon, Stethoscope, Heart } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: {
    id: Theme;
    name: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      id: "clinical-trust",
      name: "Clinical Trust",
      icon: <Stethoscope className="h-4 w-4" />,
      description: "Professional medical interface",
    },
    {
      id: "warm-community",
      name: "Warm Community",
      icon: <Heart className="h-4 w-4" />,
      description: "Approachable community feel",
    },
    {
      id: "dark",
      name: "Dark Mode",
      icon: <Moon className="h-4 w-4" />,
      description: "Dark professional interface",
    },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-sm transition-all duration-200 hover:bg-accent"
        aria-label="Change theme"
        title="Change theme"
      >
        <Palette className="h-4 w-4" />
        <span className="sr-only">Theme selector</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-card border border-border rounded-xl shadow-xl z-50 animate-fade-in">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Palette className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Choose Theme
              </h3>
            </div>
            <div className="space-y-2">
              {themes.map((themeOption) => {
                const isActive = theme === themeOption.id;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`w-full flex items-center justify-between p-3 text-sm rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      isActive
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-background hover:bg-accent hover:text-accent-foreground border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1.5 rounded-md ${
                          isActive ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        {themeOption.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{themeOption.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {themeOption.description}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          Active
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Themes optimize the interface for different professional
                contexts
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
