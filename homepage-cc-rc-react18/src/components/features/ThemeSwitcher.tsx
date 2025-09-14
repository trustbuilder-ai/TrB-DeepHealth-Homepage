import React, { useState, useRef, useMemo } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalClose } from "@/hooks/useModalClose";
import { useAccessibility } from "@/hooks/useAccessibility";
import { themes, type Theme } from "@/styles/themes";
import { cn } from "@/utils/cn";

export interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isLoading: boolean;
  theme: Theme;
}

export const ThemeSwitcher = React.memo<ThemeSwitcherProps>(
  ({ currentTheme, onThemeChange, isLoading, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const modalRef = useModalClose(isOpen, () => setIsOpen(false), triggerRef);
    const { settings } = useAccessibility();

    // Group themes by light/dark with subcategories
    const lightThemes = Object.entries(themes).filter(([, t]) => !t.isDark);
    const darkThemes = Object.entries(themes).filter(([, t]) => t.isDark);

    const themeCategories = useMemo(
      () => ({
        "Light Themes": lightThemes.filter(([, t]) => t.category === "Light"),
        "Dark Themes": darkThemes.filter(([, t]) => t.category === "Dark"),
        "Therapeutic Themes": Object.entries(themes).filter(
          ([, t]) => t.category === "Therapeutic",
        ),
        "Accessibility Themes": Object.entries(themes).filter(
          ([, t]) => t.category === "Accessibility",
        ),
      }),
      [lightThemes, darkThemes],
    );

    return (
      <div className="relative">
        <Button
          ref={triggerRef}
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          loading={isLoading}
          disabled={isLoading}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Current theme: ${theme.name}. Click to change theme.`}
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          {theme.name}
        </Button>

        {isOpen && (
          <div
            ref={modalRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto",
              "rounded-lg shadow-lg z-[9999] p-2 border transition-colors",
              theme.isDark
                ? `${theme.surface} ${theme.border}`
                : `bg-white ${theme.border}`,
              // Conditional accessibility improvements
              settings.enhancedReadability && "spacing-comfortable",
              settings.dyslexiaFriendly && "dyslexia-friendly",
              settings.highContrast && "high-contrast",
            )}
            role="listbox"
            aria-label="Theme selection"
          >
            <div className="space-y-2">
              {Object.entries(themeCategories)
                .filter(([, themeList]) => themeList.length > 0)
                .map(([categoryName, themeList]) => (
                  <div key={categoryName}>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      {categoryName}
                    </h3>
                    <div className="space-y-1">
                      {themeList.map(([key, themeData]) => (
                        <button
                          key={key}
                          onClick={() => {
                            onThemeChange(key);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full text-left p-3 rounded-md transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none",
                            currentTheme === key
                              ? `${theme.primarySolid} text-white focus:ring-blue-400`
                              : `${theme.text} hover:${theme.accent} focus:${theme.accent} focus:ring-blue-500`,
                          )}
                          role="option"
                          aria-selected={currentTheme === key}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">
                                {themeData.name}
                              </div>
                              <div
                                className={`text-xs ${currentTheme === key ? "text-white/80" : theme.textSecondary}`}
                              >
                                {themeData.category}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full border",
                                  themeData.primarySolid,
                                )}
                              />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
