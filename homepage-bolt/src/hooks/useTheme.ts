import { useState, useEffect } from 'react';

export type Theme = 
  | 'light-clinical-trust' 
  | 'light-warm-community'
  | 'light-coastal-breeze'
  | 'light-coastal-glow'
  | 'light-earthy-serenity'
  | 'dark-classic'
  | 'dark-neon-tide'
  | 'dark-cyber-mint'
  | 'dark-midnight-pulse';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to light-clinical-trust
    const savedTheme = localStorage.getItem('trb-theme') as Theme;
    return savedTheme || 'light-clinical-trust';
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