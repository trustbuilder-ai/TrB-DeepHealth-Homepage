import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Settings, ChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useFont } from "@/hooks/useFont";
import { useIcon } from "@/hooks/useIcon";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useModalClose } from "@/hooks/useModalClose";
import { cn } from "@/utils/cn";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FontSwitcher } from "./FontSwitcher";
import { IconSwitcher } from "./IconSwitcher";

/**
 * Settings dropdown component that organizes all customization options
 * including theme switcher, font switcher, and accessibility toggles.
 */
export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const {
    theme,
    currentTheme,
    changeTheme,
    isLoading: themeLoading,
  } = useTheme();
  const { currentFont, changeFont, fontLoading, loadedFonts } = useFont();
  const { currentIconSet, changeIconSet, iconLoading, loadedIconSets } =
    useIcon();
  const {
    settings,
    toggleEnhancedReadability,
    toggleDyslexiaFriendly,
    toggleHighContrast,
    toggleReducedMotion,
  } = useAccessibility();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useModalClose(isOpen, () => setIsOpen(false), triggerRef);

  // Interactive elements in the dropdown
  const interactiveElements = useCallback(
    () => [
      'input[type="checkbox"]:nth-of-type(1)', // Enhanced Readability
      'input[type="checkbox"]:nth-of-type(2)', // Dyslexia Friendly
      'input[type="checkbox"]:nth-of-type(3)', // High Contrast
      'input[type="checkbox"]:nth-of-type(4)', // Reduced Motion
    ],
    [],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      const elements = interactiveElements();
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % elements.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex(
            (prev) => (prev - 1 + elements.length) % elements.length,
          );
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "Enter":
        case " ": {
          e.preventDefault();
          // Focus the current element and trigger click
          const currentElement = dropdownRef.current?.querySelector(
            elements[focusedIndex],
          ) as HTMLElement;
          currentElement?.click();
          break;
        }
      }
    },
    [isOpen, focusedIndex, interactiveElements, dropdownRef],
  );

  // Focus management when dropdown opens/closes
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      // Focus first interactive element after a short delay
      const timer = setTimeout(() => {
        const elements = interactiveElements();
        const firstElement = dropdownRef.current?.querySelector(
          elements[0],
        ) as HTMLElement;
        firstElement?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, interactiveElements, dropdownRef]);

  // Update focus when focusedIndex changes
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const elements = interactiveElements();
      const currentElement = dropdownRef.current.querySelector(
        elements[focusedIndex],
      ) as HTMLElement;
      currentElement?.focus();
    }
  }, [focusedIndex, isOpen, interactiveElements, dropdownRef]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          theme.isDark
            ? `${theme.surface} ${theme.text} hover:${theme.accent} hover:bg-opacity-10 focus:ring-blue-400`
            : `bg-white ${theme.text} hover:${theme.accent} hover:bg-opacity-10 focus:ring-blue-500 border ${theme.border}`,
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Settings menu"
        id="settings-button"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Settings</span>
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={dropdownRef as React.RefObject<HTMLDivElement>}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="settings-button"
            onKeyDown={handleKeyDown}
            className={cn(
              "absolute right-0 top-full mt-2 w-80 rounded-lg shadow-lg z-50",
              "border backdrop-blur-sm transition-all duration-200",
              theme.isDark
                ? `${theme.surface} ${theme.border} shadow-black/20`
                : `bg-white ${theme.border} shadow-gray-200/50`,
              // Conditional accessibility improvements
              settings.enhancedReadability && "spacing-comfortable",
              settings.dyslexiaFriendly && "dyslexia-friendly",
              settings.highContrast && "high-contrast",
            )}
          >
            <div className="p-2 space-y-3">
              {/* Accessibility Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-1", theme.text)}>
                  Accessibility
                </h3>
                <div className="space-y-3">
                  <label
                    className="flex items-center justify-between cursor-pointer"
                    role="menuitem"
                  >
                    <span className={cn("text-sm", theme.textSecondary)}>
                      Enhanced Readability
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.enhancedReadability}
                      onChange={toggleEnhancedReadability}
                      className={cn(
                        "rounded focus:ring-2 focus:ring-offset-2",
                        theme.isDark
                          ? "bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400"
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500",
                      )}
                      aria-describedby="enhanced-readability-desc"
                    />
                  </label>

                  <label
                    className="flex items-center justify-between cursor-pointer"
                    role="menuitem"
                  >
                    <span className={cn("text-sm", theme.textSecondary)}>
                      Dyslexia Friendly
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.dyslexiaFriendly}
                      onChange={toggleDyslexiaFriendly}
                      className={cn(
                        "rounded focus:ring-2 focus:ring-offset-2",
                        theme.isDark
                          ? "bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400"
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500",
                      )}
                      aria-describedby="dyslexia-friendly-desc"
                    />
                  </label>

                  <label
                    className="flex items-center justify-between cursor-pointer"
                    role="menuitem"
                  >
                    <span className={cn("text-sm", theme.textSecondary)}>
                      High Contrast
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={toggleHighContrast}
                      className={cn(
                        "rounded focus:ring-2 focus:ring-offset-2",
                        theme.isDark
                          ? "bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400"
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500",
                      )}
                      aria-describedby="high-contrast-desc"
                    />
                  </label>

                  <label
                    className="flex items-center justify-between cursor-pointer"
                    role="menuitem"
                  >
                    <span className={cn("text-sm", theme.textSecondary)}>
                      Reduced Motion
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={toggleReducedMotion}
                      className={cn(
                        "rounded focus:ring-2 focus:ring-offset-2",
                        theme.isDark
                          ? "bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400"
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500",
                      )}
                      aria-describedby="reduced-motion-desc"
                    />
                  </label>
                </div>
              </div>

              {/* Theme Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-1", theme.text)}>
                  Theme
                </h3>
                <ThemeSwitcher
                  currentTheme={currentTheme}
                  onThemeChange={changeTheme}
                  isLoading={themeLoading}
                  theme={theme}
                />
              </div>

              {/* Font Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-1", theme.text)}>
                  Font
                </h3>
                <FontSwitcher
                  currentFont={currentFont}
                  onFontChange={changeFont}
                  isLoading={fontLoading}
                  loadedFonts={loadedFonts}
                  theme={theme}
                />
              </div>

              {/* Icon Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-1", theme.text)}>
                  Icons
                </h3>
                <IconSwitcher
                  currentIconSet={currentIconSet}
                  onIconSetChange={changeIconSet}
                  isLoading={iconLoading}
                  loadedIconSets={loadedIconSets}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
