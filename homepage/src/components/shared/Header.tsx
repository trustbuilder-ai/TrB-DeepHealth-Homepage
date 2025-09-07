import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TestTube, Menu } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Theme } from '../../hooks/useTheme';

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
    <header className="bg-white shadow-gentle border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex items-center space-x-2">
              <TestTube className="h-8 w-8 text-trust-teal-500" />
              <Shield className="h-6 w-6 text-medical-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-trust-teal-600">
                TrB-DeepHealth
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                LLM Mental Health Testing Platform
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/testing" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Start Testing
            </Link>
            <Link 
              to="/scenarios" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Test Scenarios
            </Link>
            <Link 
              to="/results" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Results
            </Link>
            <Link 
              to="/docs" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-all duration-200 hover:scale-105"
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
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-trust-teal-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};