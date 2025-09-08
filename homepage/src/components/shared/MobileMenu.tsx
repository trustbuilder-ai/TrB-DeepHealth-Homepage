import React from 'react';
import { Link } from 'react-router-dom';
import { X, TestTube, FileText, BarChart3, BookOpen } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Add cleanup for escape key and body scroll lock
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when menu is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Add event listener
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

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
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out rounded-l-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 font-display">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-primary-50 transition-all duration-200 hover:scale-105"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <div className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-4 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group hover:scale-105"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary-100 transition-colors duration-200">
                      <Icon className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-200" />
                    </div>
                    <div>
                      <div className="font-medium font-display">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-primary-600 mb-2 font-medium font-display">
                TrB-DeepHealth Testing Platform
              </p>
              <p className="text-xs text-gray-500">
                For LLM validation, not mental health services
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};