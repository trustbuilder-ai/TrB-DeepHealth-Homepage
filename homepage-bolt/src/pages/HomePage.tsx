import React from 'react';
import { TestTube, Shield, Brain, BarChart3, FileText, Users } from 'lucide-react';
import { SafetyIndicator } from '../components/shared/SafetyBadge';
import { InternalLink, RelatedLinks } from '../components/shared/InternalLinks';

export const HomePage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center space-x-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TestTube className="h-14 w-14 text-trust-teal-600" />
          <Brain className="h-12 w-12 text-calm-blue-500" />
          <Shield className="h-10 w-10 text-medical-green-600" />
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-bold text-trust-teal-900 mb-6 font-display">
          TrB-DeepHealth
        </h1>
        
        <p className="text-2xl text-trust-teal-700 mb-4 font-display font-medium">
          LLM Mental Health Testing Platform
        </p>
        
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
          Testing LLMs to ensure they're safe for mental health product development. 
          Comprehensive safety validation before deployment in sensitive mental health contexts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <InternalLink to="/testing" variant="button" className="text-base px-8 py-4">
            Start Testing LLMs
          </InternalLink>
          <InternalLink to="/docs" variant="button" className="btn-secondary text-base px-8 py-4">
            View Documentation
          </InternalLink>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-coral-alert-100 rounded-xl group-hover:bg-coral-alert-200 transition-colors duration-200">
              <Shield className="h-8 w-8 text-coral-alert-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Crisis Detection</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Real-time crisis language monitoring with immediate 988 resource routing. 
            Test your LLM's ability to detect and respond to mental health emergencies.
          </p>
        </div>

        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-medical-green-100 rounded-xl group-hover:bg-medical-green-200 transition-colors duration-200">
              <FileText className="h-8 w-8 text-medical-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Medical Boundaries</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Validate that your LLM respects medical boundaries - no diagnosis, treatment, 
            or medication advice. Ensure professional referral triggers work correctly.
          </p>
        </div>

        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-warm-peach-100 rounded-xl group-hover:bg-warm-peach-200 transition-colors duration-200">
              <Users className="h-8 w-8 text-warm-peach-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Empathy Validation</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Test emotional support capabilities and appropriate empathy responses. 
            Ensure your LLM provides validation without toxic positivity.
          </p>
        </div>

        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-trust-teal-100 rounded-xl group-hover:bg-trust-teal-200 transition-colors duration-200">
              <TestTube className="h-8 w-8 text-trust-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Scenario Library</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Comprehensive test scenarios covering crisis intervention, boundary testing, 
            emotional support, and custom scenarios for your specific use case.
          </p>
        </div>

        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-calm-blue-100 rounded-xl group-hover:bg-calm-blue-200 transition-colors duration-200">
              <BarChart3 className="h-8 w-8 text-calm-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Analytics & Reporting</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Detailed safety scores, compliance reports, and performance analytics. 
            Compare different LLM models and track improvements over time.
          </p>
        </div>

        <div className="card-interactive group">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-200">
              <Brain className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-display">Human Oversight</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            All responses validated by mental health professionals. 
            Ensure your LLM meets the highest standards for mental health applications.
          </p>
        </div>
      </div>

      {/* Safety Indicator */}
      <div className="flex justify-center mb-16 animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <SafetyIndicator className="max-w-md" />
      </div>

      {/* Value Propositions */}
      <div className="card-elevated mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl font-bold text-trust-teal-800 text-center mb-10 font-display">
          Who We Serve
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 font-display">For Developers</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Validate your LLM before deployment in mental health apps. 
              Comprehensive testing suite ensures safety and compliance.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Pre-deployment safety validation</li>
              <li>• Automated testing scenarios</li>
              <li>• Performance benchmarking</li>
              <li>• Integration-ready APIs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 font-display">For Healthcare Organizations</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ensure compliance before implementing AI solutions. 
              Professional-grade testing for sensitive healthcare contexts.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• HIPAA compliance validation</li>
              <li>• Clinical boundary testing</li>
              <li>• Risk assessment reports</li>
              <li>• Regulatory documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-br from-trust-teal-50 to-calm-blue-50 rounded-3xl p-12 animate-scale-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl font-bold text-trust-teal-800 mb-6 font-display">
          Ready to Test Your LLM?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Start with our comprehensive testing suite to ensure your LLM is safe, 
          appropriate, and effective for mental health applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <InternalLink to="/testing" variant="button" className="text-base px-8 py-4">
            Begin Testing Now
          </InternalLink>
          <InternalLink to="/scenarios" variant="button" className="btn-secondary text-base px-8 py-4">
            Explore Test Scenarios
          </InternalLink>
        </div>
      </div>

      {/* Related Resources */}
      <RelatedLinks
        title="Quick Start Resources"
        links={[
          {
            to: '/scenarios',
            label: 'Browse Test Scenarios',
            description: 'Explore our comprehensive library of mental health testing scenarios'
          },
          {
            to: '/results',
            label: 'View Sample Results',
            description: 'See example test results and analytics dashboards'
          },
          {
            to: '/docs',
            label: 'API Documentation',
            description: 'Complete guide for integrating our testing platform'
          },
          {
            to: 'https://988lifeline.org',
            label: '988 Crisis Resources',
            description: 'Mental health crisis support and resources',
            external: true
          }
        ]}
        className="mt-12 animate-scale-in"
        style={{ animationDelay: '0.6s' }}
      />
    </main>
  );
};