import React, { useState } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Add cleanup for click outside functionality
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('[data-theme-switcher]')) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themes = [
    {
      id: 'clinical-trust' as Theme,
      name: 'Clinical Trust',
      description: 'Professional medical theme',
      color: 'bg-success-600'
    },
    {
      id: 'warm-community' as Theme,
      name: 'Warm Community',
      description: 'Approachable and friendly',
      color: 'bg-warning-400'
    },
    {
      id: 'dark-mode' as Theme,
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      color: 'bg-primary-800'
    }
  ];

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative" data-theme-switcher>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
        aria-label="Switch theme"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{currentThemeData?.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-scale-in">
          <div className="p-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-primary-50 transition-all duration-200 hover:scale-105"
              >
                <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 font-display">{theme.name}</div>
                  <div className="text-xs text-gray-500">{theme.description}</div>
                </div>
                {currentTheme === theme.id && (
                  <Check className="h-4 w-4 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};