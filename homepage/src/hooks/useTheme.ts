import { useState, useEffect } from 'react';

export type Theme = 'clinical-trust' | 'warm-community' | 'dark-mode';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to clinical-trust
    const savedTheme = localStorage.getItem('trb-theme') as Theme;
    return savedTheme || 'clinical-trust';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    // Save to localStorage
    localStorage.setItem('trb-theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};