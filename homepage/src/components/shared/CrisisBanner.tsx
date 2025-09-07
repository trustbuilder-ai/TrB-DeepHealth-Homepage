import React from 'react';
import { Phone, MessageCircle, ExternalLink } from 'lucide-react';

export const CrisisBanner: React.FC = () => {
  return (
    <div className="crisis-banner sticky top-0 z-50 bg-coral-alert-50 border-b-2 border-coral-alert-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-coral-alert-500 rounded-full animate-pulse"></div>
            </div>
            <p className="crisis-text text-sm font-semibold">
              <strong>Crisis Support Available 24/7:</strong> If you're in immediate danger or having thoughts of self-harm
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="tel:988"
              className="flex items-center space-x-1 bg-coral-alert-500 hover:bg-coral-alert-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              aria-label="Call 988 Suicide & Crisis Lifeline"
            >
              <Phone className="h-4 w-4" />
              <span>Call 988</span>
            </a>
            
            <a
              href="sms:988"
              className="flex items-center space-x-1 bg-coral-alert-100 hover:bg-coral-alert-200 text-coral-alert-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              aria-label="Text 988 Suicide & Crisis Lifeline"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Text 988</span>
            </a>
            
            <a
              href="https://988lifeline.org/chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-coral-alert-600 hover:text-coral-alert-700 text-sm font-medium transition-colors"
              aria-label="Chat with 988 Suicide & Crisis Lifeline"
            >
              <span>Chat Online</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};