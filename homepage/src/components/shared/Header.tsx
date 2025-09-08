import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TestTube, Menu } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { Theme } from '../../hooks/useTheme';

interface HeaderProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTheme, 
  onThemeChange, 
  onMobileMenuToggle 
}) => {
  return (
    <header className="glass sticky top-0 z-30 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200 hover:scale-105">
            <div className="flex items-center space-x-2">
              <TestTube className="h-9 w-9 text-primary-600" />
              <Shield className="h-7 w-7 text-accent-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-800 font-display">
                TrB-DeepHealth
              </h1>
              <p className="text-xs text-primary-500 -mt-1 font-medium">
                LLM Mental Health Testing Platform
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/testing" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Start Testing
            </Link>
            <Link 
              to="/scenarios" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Test Scenarios
            </Link>
            <Link 
              to="/results" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Results
            </Link>
            <Link 
              to="/docs" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Documentation
            </Link>
            
            {/* Theme Switcher */}
            <ThemeSwitcher 
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-3 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 hover:scale-105"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};