import React from 'react';
import { TestTube, Play, Settings, Upload } from 'lucide-react';
import { InternalLink, RelatedLinks } from '../components/shared/InternalLinks';

export const TestingPage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <TestTube className="h-12 w-12 text-trust-teal-500" />
          <Play className="h-10 w-10 text-medical-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-trust-teal-600 mb-4">
          LLM Testing Interface
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Test your Large Language Model's safety and appropriateness for mental health applications. 
          Run comprehensive evaluations across multiple scenarios.
        </p>
      </div>

      {/* Testing Configuration */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12 animate-in" style={{ animationDelay: '0.2s' }}>
        <div className="lg:col-span-2">
          <div className="card-trust">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-6 w-6 text-trust-teal-500" />
              <h2 className="text-xl font-semibold text-gray-800">LLM Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Provider
                </label>
                <select className="input-therapeutic">
                  <option>OpenAI GPT-4</option>
                  <option>Anthropic Claude</option>
                  <option>Google Gemini</option>
                  <option>Custom Model</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input 
                  type="password" 
                  className="input-therapeutic" 
                  placeholder="Enter your API key"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    defaultValue="0.7"
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">0.7</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Tokens
                  </label>
                  <input 
                    type="number" 
                    className="input-therapeutic" 
                    defaultValue="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="h-6 w-6 text-warm-peach-500" />
              <h3 className="text-lg font-semibold text-gray-800">Quick Start</h3>
            </div>
            
            <div className="space-y-3">
              <InternalLink to="/scenarios" variant="button" className="w-full group">
                Run Standard Test Suite
              </InternalLink>
              <InternalLink to="/scenarios" variant="button" className="btn-secondary w-full group">
                Upload Custom Scenarios
              </InternalLink>
              <button className="w-full px-4 py-2 border border-gray-300 rounded-therapeutic text-gray-700 hover:bg-gray-50 transition-colors">
                Load Previous Configuration
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-medical-green-50 rounded-therapeutic">
              <p className="text-sm text-medical-green-800">
                <strong>Safety Note:</strong> All test responses are validated by mental health professionals before scoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Interface Placeholder */}
      <div className="card-trust animate-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Testing Interface</h2>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-therapeutic p-8 text-center border border-gray-200">
          <TestTube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Testing Interface Coming Soon
          </h3>
          <p className="text-gray-500 mb-6">
            Configure your LLM settings above and select test scenarios to begin comprehensive safety evaluation.
          </p>
          <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
            Start Testing (Coming Soon)
          </button>
        </div>
      </div>

      {/* Related Testing Resources */}
      <RelatedLinks
        title="Testing Resources"
        links={[
          {
            to: '/scenarios',
            label: 'Test Scenario Library',
            description: 'Browse pre-built testing scenarios for different use cases'
          },
          {
            to: '/results',
            label: 'Previous Test Results',
            description: 'Review your historical test results and analytics'
          },
          {
            to: '/docs',
            label: 'Testing Best Practices',
            description: 'Learn how to effectively test LLMs for mental health applications'
          }
        ]}
        className="mt-8 animate-in"
        style={{ animationDelay: '0.4s' }}
      />
    </main>
  );
};