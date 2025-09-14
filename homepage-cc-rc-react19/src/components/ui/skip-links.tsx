import { useFocusManagement } from "@/hooks/useFocusManagement";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

/**
 * Skip links component for keyboard navigation accessibility.
 * Provides quick navigation to main sections of the page.
 * Implements WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks).
 */
export const SkipLinks = () => {
  const { skipToContent, navigateToSection } = useFocusManagement();
  const { theme } = useTheme();

  const skipLinks = [
    { id: "main-content", label: "Skip to main content" },
    { id: "features", label: "Skip to features" },
    { id: "scenarios", label: "Skip to testing scenarios" },
    { id: "conversations", label: "Skip to research" },
    { id: "footer", label: "Skip to footer" },
    { id: "navigation", label: "Skip to navigation" },
  ];

  return (
    <nav aria-label="Skip links" className="skip-links-container">
      {skipLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => {
            if (link.id === "main-content") {
              skipToContent(link.id);
            } else {
              navigateToSection(link.id);
            }
          }}
          className={cn(
            "skip-link",
            "absolute -top-16 left-4 z-[9999] px-4 py-2 rounded-md",
            "text-sm font-medium transition-all duration-300",
            "focus:top-4 focus:outline-none focus:ring-2 focus:ring-offset-2",
            theme.isDark
              ? "bg-slate-900 text-white border border-slate-700 focus:ring-blue-400"
              : "bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 shadow-lg",
            "hover:shadow-lg transform hover:scale-105",
          )}
          tabIndex={0}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};

/**
 * Enhanced skip links with keyboard shortcuts display
 */
export const SkipLinksWithShortcuts = () => {
  const { skipToContent, navigateToSection } = useFocusManagement();
  const { theme } = useTheme();

  const skipLinks = [
    { id: "main-content", label: "Skip to main content", shortcut: "Ctrl+M" },
    { id: "features", label: "Skip to features", shortcut: "Alt+1" },
    { id: "scenarios", label: "Skip to testing scenarios", shortcut: "Alt+2" },
    { id: "conversations", label: "Skip to research", shortcut: "Alt+3" },
    { id: "footer", label: "Skip to footer", shortcut: "Alt+F" },
    { id: "navigation", label: "Skip to navigation", shortcut: "Alt+N" },
  ];

  return (
    <nav
      aria-label="Skip links and keyboard shortcuts"
      className="skip-links-container"
    >
      {skipLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => {
            if (link.id === "main-content") {
              skipToContent(link.id);
            } else {
              navigateToSection(link.id);
            }
          }}
          className={cn(
            "skip-link",
            "absolute -top-20 left-4 z-[9999] px-4 py-3 rounded-md",
            "text-sm font-medium transition-all duration-300",
            "focus:top-4 focus:outline-none focus:ring-2 focus:ring-offset-2",
            "flex items-center justify-between gap-4 min-w-[200px]",
            theme.isDark
              ? "bg-slate-900 text-white border border-slate-700 focus:ring-blue-400"
              : "bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 shadow-lg",
            "hover:shadow-lg transform hover:scale-105",
          )}
          tabIndex={0}
          title={`${link.label} (${link.shortcut})`}
        >
          <span>{link.label}</span>
          <kbd
            className={cn(
              "text-xs px-2 py-1 rounded border",
              theme.isDark
                ? "bg-slate-800 border-slate-600 text-slate-300"
                : "bg-gray-100 border-gray-300 text-gray-600",
            )}
          >
            {link.shortcut}
          </kbd>
        </button>
      ))}
    </nav>
  );
};
