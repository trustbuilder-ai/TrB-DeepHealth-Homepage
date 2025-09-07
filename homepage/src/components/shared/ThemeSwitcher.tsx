import React, { useState } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'clinical-trust' as Theme,
      name: 'Clinical Trust',
      description: 'Professional medical theme',
      color: 'bg-medical-green-600'
    },
    {
      id: 'warm-community' as Theme,
      name: 'Warm Community',
      description: 'Approachable and friendly',
      color: 'bg-warm-peach-400'
    },
    {
      id: 'dark-mode' as Theme,
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      color: 'bg-gray-800'
    }
  ];

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-trust-teal-600 hover:bg-gray-100 transition-all duration-200"
        aria-label="Switch theme"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{currentThemeData?.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                  <div className="text-xs text-gray-500">{theme.description}</div>
                </div>
                {currentTheme === theme.id && (
                  <Check className="h-4 w-4 text-trust-teal-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};