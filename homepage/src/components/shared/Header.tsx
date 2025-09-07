import React from 'react';
import { Shield, TestTube, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white shadow-gentle border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
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
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#testing" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-colors"
            >
              Start Testing
            </a>
            <a 
              href="#scenarios" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-colors"
            >
              Test Scenarios
            </a>
            <a 
              href="#results" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-colors"
            >
              Results
            </a>
            <a 
              href="#docs" 
              className="text-gray-700 hover:text-trust-teal-600 font-medium transition-colors"
            >
              Documentation
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-trust-teal-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};