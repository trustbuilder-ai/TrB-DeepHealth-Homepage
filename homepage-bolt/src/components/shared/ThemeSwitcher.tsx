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

  const lightThemes = [
    {
      id: 'light-clinical-trust' as Theme,
      name: 'Clinical Trust',
      description: 'Professional medical theme',
      color: 'bg-trust-teal-600'
    },
    {
      id: 'light-warm-community' as Theme,
      name: 'Warm Community',
      description: 'Approachable and friendly',
      color: 'bg-warm-peach-500'
    },
    {
      id: 'light-coastal-breeze' as Theme,
      name: 'Coastal Breeze',
      description: 'Soothing ocean tones',
      color: 'bg-cyan-600'
    },
    {
      id: 'light-coastal-glow' as Theme,
      name: 'Coastal Glow',
      description: 'Fresh and clean',
      color: 'bg-teal-500'
    },
    {
      id: 'light-earthy-serenity' as Theme,
      name: 'Earthy Serenity',
      description: 'Warm and natural',
      color: 'bg-green-400'
    }
  ];

  const darkThemes = [
    {
      id: 'dark-classic' as Theme,
      name: 'Classic',
      description: 'Easy on the eyes',
      color: 'bg-gray-800'
    },
    {
      id: 'dark-neon-tide' as Theme,
      name: 'Neon Tide',
      description: 'Glowing ocean vibes',
      color: 'bg-cyan-400'
    },
    {
      id: 'dark-cyber-mint' as Theme,
      name: 'Cyber Mint',
      description: 'Bold and futuristic',
      color: 'bg-emerald-400'
    },
    {
      id: 'dark-midnight-pulse' as Theme,
      name: 'Midnight Pulse',
      description: 'Sleek and dramatic',
      color: 'bg-blue-500'
    }
  ];

  const allThemes = [...lightThemes, ...darkThemes];

  const currentThemeData = allThemes.find(t => t.id === currentTheme);

  return (
    <div className="relative" data-theme-switcher>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-trust-teal-600 hover:bg-trust-teal-50 transition-all duration-200"
        aria-label="Switch theme"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{currentThemeData?.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-scale-in">
          <div className="p-3">
            {/* Light Themes Section */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Light Themes</span>
              </div>
              {lightThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-trust-teal-50 transition-all duration-200 hover:scale-105"
                >
                  <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 font-display">{theme.name}</div>
                    <div className="text-xs text-gray-500">{theme.description}</div>
                  </div>
                  {currentTheme === theme.id && (
                    <Check className="h-4 w-4 text-trust-teal-600" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Dark Themes Section */}
            <div>
              <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Dark Themes</span>
              </div>
              {darkThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-trust-teal-50 transition-all duration-200 hover:scale-105"
                >
                  <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 font-display">{theme.name}</div>
                    <div className="text-xs text-gray-500">{theme.description}</div>
                  </div>
                  {currentTheme === theme.id && (
                    <Check className="h-4 w-4 text-trust-teal-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};