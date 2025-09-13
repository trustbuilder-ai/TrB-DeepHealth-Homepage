import { useState, useRef } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useFont } from '@/hooks/useFont';
import { useIcon } from '@/hooks/useIcon';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useModalClose } from '@/hooks/useModalClose';
import { cn } from '@/utils/cn';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FontSwitcher } from './FontSwitcher';
import { IconSwitcher } from './IconSwitcher';

/**
 * Settings dropdown component that organizes all customization options
 * including theme switcher, font switcher, and accessibility toggles.
 */
export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, currentTheme, changeTheme, isLoading: themeLoading } = useTheme();
  const { currentFont, changeFont, fontLoading, loadedFonts } = useFont();
  const { currentIconSet, changeIconSet, iconLoading, loadedIconSets } = useIcon();
  const { settings, toggleEnhancedReadability, toggleDyslexiaFriendly, toggleHighContrast, toggleReducedMotion } = useAccessibility();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useModalClose(
    isOpen,
    () => setIsOpen(false),
    triggerRef
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          theme.isDark
            ? `${theme.surface} ${theme.text} hover:${theme.accent} hover:bg-opacity-10 focus:ring-blue-400`
            : `bg-white ${theme.text} hover:${theme.accent} hover:bg-opacity-10 focus:ring-blue-500 border ${theme.border}`
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Settings menu"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Settings</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
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
            className={cn(
              "absolute right-0 top-full mt-2 w-80 rounded-lg shadow-lg z-50",
              "border backdrop-blur-sm transition-all duration-200",
              theme.isDark
                ? `${theme.surface} ${theme.border} shadow-black/20`
                : `bg-white ${theme.border} shadow-gray-200/50`
            )}
          >
            <div className="p-4 space-y-6">
              {/* Accessibility Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-3", theme.text)}>
                  Accessibility
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
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
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                      )}
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
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
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                      )}
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
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
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                      )}
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
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
                          : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                      )}
                    />
                  </label>
                </div>
              </div>

              {/* Theme Section */}
              <div>
                <h3 className={cn("text-sm font-semibold mb-3", theme.text)}>
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
                <h3 className={cn("text-sm font-semibold mb-3", theme.text)}>
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
                <h3 className={cn("text-sm font-semibold mb-3", theme.text)}>
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