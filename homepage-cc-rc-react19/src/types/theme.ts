export interface Theme {
  name: string;
  category: string;
  primary: string;
  primarySolid: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  bg: string;
  surface: string;
  border: string;
  hero: string;
  glow: string;
  isDark: boolean;
  therapeutic?: boolean;
  accessibility?: boolean;
}
