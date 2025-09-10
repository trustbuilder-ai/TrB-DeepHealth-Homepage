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

    // Cleanup function to remove theme attribute if component unmounts
    return () => {
      // Note: In practice, we usually don't remove the theme on unmount
      // as it should persist across the app, but this ensures proper cleanup
      // if the theme hook is used in a component that gets unmounted
    };
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};