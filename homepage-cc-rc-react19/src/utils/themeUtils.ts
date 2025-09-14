import { Theme } from "../styles/themes";

/**
 * Generates theme-aware CSS classes for button components.
 * Supports multiple variants with dark/light mode compatibility.
 * Enhanced for WCAG contrast compliance.
 *
 * @param theme - The current theme object containing style definitions
 * @param variant - The button variant (default, outline, ghost, destructive, secondary)
 * @returns CSS class string for the button styling
 */
export const getButtonStyles = (theme: Theme, variant: string) => {
  if (!theme) return "";

  const base = `${theme.border} ${theme.text} focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;

  switch (variant) {
    case "default":
      return `${theme.primarySolid} text-white ${theme.primaryHover} focus:ring-offset-0`;
    case "outline":
      return `border ${base} ${theme.surface} hover:${theme.accent} transition-colors`;
    case "ghost":
      return `${theme.text} hover:${theme.accent} transition-colors`;
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
    case "secondary":
      return `${theme.accent} ${theme.text} hover:bg-opacity-80 transition-colors`;
    default:
      return "";
  }
};

/**
 * Generates theme-aware CSS classes for card components.
 * Enhanced for consistent styling and accessibility across themes.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for card styling
 */
export const getCardStyles = (theme: Theme) => {
  if (!theme) return "bg-card text-card-foreground border";

  return `${theme.surface} ${theme.text} ${theme.border} transition-colors`;
};

/**
 * Generates theme-aware CSS classes for input components.
 * Enhanced for WCAG AA+ contrast compliance and accessibility.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for input styling
 */
export const getInputStyles = (theme: Theme) => {
  if (!theme) return "bg-background border-input text-foreground";

  const baseStyles = theme.isDark
    ? `${theme.surface} ${theme.border} ${theme.text} placeholder:${theme.textMuted} focus:border-blue-400 focus:ring-blue-400/30`
    : `bg-white ${theme.border} ${theme.text} placeholder:${theme.textMuted} focus:border-blue-500 focus:ring-blue-500/30`;

  return `${baseStyles} focus:ring-2 focus:ring-offset-0 transition-colors`;
};

/**
 * Generates theme-aware CSS classes for select/dropdown components.
 * Enhanced for accessibility and contrast compliance.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for select styling
 */
export const getSelectStyles = (theme: Theme) => {
  if (!theme) return "bg-background border-input text-foreground";

  const baseStyles = theme.isDark
    ? `${theme.surface} ${theme.border} ${theme.text} focus:border-blue-400 focus:ring-blue-400/30`
    : `bg-white ${theme.border} ${theme.text} focus:border-blue-500 focus:ring-blue-500/30`;

  return `${baseStyles} focus:ring-2 focus:ring-offset-0 transition-colors`;
};

/**
 * Generates theme-aware CSS classes for modal/dialog components.
 * Enhanced for accessibility and proper contrast.
 *
 * @param theme - The current theme object containing style definitions
 * @returns CSS class string for modal styling
 */
export const getModalStyles = (theme: Theme) => {
  if (!theme) return "bg-background border text-foreground";

  return theme.isDark
    ? `${theme.surface} ${theme.border} ${theme.text}`
    : `bg-white ${theme.border} ${theme.text}`;
};
