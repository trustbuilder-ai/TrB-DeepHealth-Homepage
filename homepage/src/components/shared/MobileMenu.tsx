import React from 'react';
import { Link } from 'react-router-dom';
import { X, TestTube, FileText, BarChart3, BookOpen } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      to: '/testing',
      icon: TestTube,
      label: 'Start Testing',
      description: 'Test your LLM models'
    },
    {
      to: '/scenarios',
      icon: FileText,
      label: 'Test Scenarios',
      description: 'Browse testing scenarios'
    },
    {
      to: '/results',
      icon: BarChart3,
      label: 'Results',
      description: 'View test results'
    },
    {
      to: '/docs',
      icon: BookOpen,
      label: 'Documentation',
      description: 'API docs and guides'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-trust-teal-600 hover:bg-trust-teal-50 transition-all duration-200 group"
                  >
                    <Icon className="h-5 w-5 text-gray-500 group-hover:text-trust-teal-600 transition-colors duration-200" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                TrB-DeepHealth Testing Platform
              </p>
              <p className="text-xs text-gray-400">
                For LLM validation, not mental health services
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};