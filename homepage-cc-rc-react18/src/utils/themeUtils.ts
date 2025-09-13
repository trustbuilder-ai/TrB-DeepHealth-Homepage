import { Theme } from "../styles/themes";

/**
 * Generates theme-aware CSS classes for button components.
 * Supports multiple variants with dark/light mode compatibility.
 *
 * @param theme - The current theme object containing style definitions
 * @param variant - The button variant (default, outline, ghost, destructive, secondary)
 * @returns CSS class string for the button styling
 */
export const getButtonStyles = (theme: Theme, variant: string) => {
  if (!theme) return "";

  const base = theme.isDark
    ? "border-slate-600 text-slate-100 focus:ring-slate-400"
    : "border-slate-300 text-slate-900 focus:ring-slate-300";

  switch (variant) {
    case "default":
      return theme.isDark
        ? "bg-slate-100 text-slate-900 hover:bg-white"
        : "bg-teal-600 text-white hover:bg-teal-700";
    case "outline":
      return `border ${base} hover:bg-slate-100 dark:hover:bg-slate-800`;
    case "ghost":
      return `${theme.text} hover:bg-slate-100 dark:hover:bg-slate-800`;
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700";
    case "secondary":
      return theme.isDark
        ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
        : "bg-slate-100 text-slate-900 hover:bg-slate-200";
    default:
      return "";
  }
};

/**
 * Generates theme-aware CSS classes for card components.
 * Provides consistent styling across light and dark themes.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for card styling
 */
export const getCardStyles = (theme: Theme) => {
  if (!theme) return "bg-card text-card-foreground border-border";

  return theme.isDark
    ? "bg-slate-800 text-slate-100 border-slate-700"
    : "bg-white text-slate-900 border-slate-200";
};

/**
 * Generates theme-aware CSS classes for input components.
 * Includes proper placeholder styling for accessibility.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for input styling
 */
export const getInputStyles = (theme: Theme) => {
  if (!theme) return "bg-background border-input text-foreground";

  return theme.isDark
    ? "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500";
};
