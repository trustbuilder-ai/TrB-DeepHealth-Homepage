import React, { useState, useRef, useCallback } from "react";
import {
  Brain,
  Sparkles,
  Target,
  BarChart3,
  Menu,
  X,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ThemeSwitcher,
  FontSwitcher,
  IconSwitcher,
} from "@/components/features";
import { useModalClose } from "@/hooks/useModalClose";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useTheme } from "@/hooks/useTheme";
import { useFont } from "@/hooks/useFont";
import { useIcon } from "@/hooks/useIcon";
import { cn } from "@/utils/cn";

const navigationItems = [
  { label: "Features", id: "features", icon: Sparkles },
  { label: "Scenarios", id: "scenarios", icon: Target },
  { label: "Research", id: "conversations", icon: BarChart3 },
];

export const Navigation = () => {
  const {
    theme,
    currentTheme,
    changeTheme,
    isLoading: themeLoading,
  } = useTheme();
  const { currentFont, changeFont, fontLoading, loadedFonts } = useFont();
  const { currentIconSet, changeIconSet, iconLoading, loadedIconSets } =
    useIcon();
  const isOnline = useOnlineStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useModalClose(
    mobileMenuOpen,
    () => setMobileMenuOpen(false),
    mobileMenuTriggerRef,
  );

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const h1 = document.querySelector("h1");
    h1?.focus();
  }, []);

  return (
    <>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 text-sm">
          <WifiOff className="w-4 h-4 inline mr-2 icon-dynamic" />
          You're currently offline. Some features may not be available.
        </div>
      )}

      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full top-0 z-50 nav-glow border-b transition-colors",
          theme.isDark
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-slate-200",
          !isOnline && "top-10",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg p-1"
                aria-label="Scroll to top of page"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center shadow-lg",
                    theme.primary,
                    theme.glow,
                  )}
                >
                  <Brain className="w-5 h-5 text-white icon-dynamic" />
                </div>
                <span className={cn("text-xl font-semibold", theme.text)}>
                  Astra Labs
                </span>
              </button>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:flex items-center space-x-4 lg:space-x-8"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      theme.isDark
                        ? "text-slate-400 focus-visible:ring-slate-400"
                        : "text-slate-600 focus-visible:ring-slate-600",
                    )}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <item.icon className="w-4 h-4 icon-dynamic" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <FontSwitcher
                currentFont={currentFont}
                onFontChange={changeFont}
                isLoading={fontLoading}
                loadedFonts={loadedFonts}
                theme={theme}
              />

              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={changeTheme}
                isLoading={themeLoading}
                theme={theme}
              />

              <IconSwitcher
                currentIconSet={currentIconSet}
                onIconSetChange={changeIconSet}
                isLoading={iconLoading}
                loadedIconSets={loadedIconSets}
                theme={theme}
              />

              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" theme={theme}>
                  Sign In
                </Button>
                <Button
                  size="sm"
                  theme={theme}
                  className="bg-gradient-to-r text-white border-0"
                >
                  Get Started
                </Button>
              </div>

              <button
                ref={mobileMenuTriggerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
                aria-expanded={mobileMenuOpen}
                className={cn(
                  "md:hidden p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  theme.isDark
                    ? "text-slate-400 focus-visible:ring-slate-400"
                    : "text-slate-600 focus-visible:ring-slate-600",
                )}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 icon-dynamic" />
                ) : (
                  <Menu className="w-5 h-5 icon-dynamic" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "md:hidden border-t backdrop-blur-xl",
              theme.isDark
                ? "bg-slate-950/95 border-slate-800"
                : "bg-white/95 border-slate-200",
            )}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-3 rounded-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    theme.isDark
                      ? "text-slate-400 focus-visible:ring-slate-400"
                      : "text-slate-600 focus-visible:ring-slate-600",
                  )}
                >
                  <item.icon className="w-5 h-5 icon-dynamic" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <Button
                  variant="ghost"
                  theme={theme}
                  className="w-full justify-start"
                >
                  Sign In
                </Button>
                <Button
                  theme={theme}
                  className="w-full bg-gradient-to-r text-white border-0"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
