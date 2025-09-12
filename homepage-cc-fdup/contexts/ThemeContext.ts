import { createContext } from "react";

export type Theme =
  | "clinical-trust"
  | "warm-community"
  | "mental-health"
  | "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
