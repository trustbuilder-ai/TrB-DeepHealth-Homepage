import React from 'react';
import { TestTube, Shield, Brain, BarChart3, FileText, Users } from 'lucide-react';
import { SafetyIndicator } from '../components/shared/SafetyBadge';

export const HomePage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <TestTube className="h-12 w-12 text-trust-teal-500" />
          <Brain className="h-10 w-10 text-medical-green-600" />
          <Shield className="h-8 w-8 text-trust-teal-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-trust-teal-600 mb-4">
          TrB-DeepHealth
        </h1>
        
        <p className="text-xl text-gray-700 mb-2 font-therapeutic">
          LLM Mental Health Testing Platform
        </p>
        
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Testing LLMs to ensure they're safe for mental health product development. 
          Comprehensive safety validation before deployment in sensitive mental health contexts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-primary">
            Start Testing LLMs
          </button>
          <button className="btn-secondary">
            View Documentation
          </button>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-coral-alert-500" />
            <h3 className="text-lg font-semibold text-gray-800">Crisis Detection</h3>
          </div>
          <p className="text-gray-600">
            Real-time crisis language monitoring with immediate 988 resource routing. 
            Test your LLM's ability to detect and respond to mental health emergencies.
          </p>
        </div>

        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-medical-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Medical Boundaries</h3>
          </div>
          <p className="text-gray-600">
            Validate that your LLM respects medical boundaries - no diagnosis, treatment, 
            or medication advice. Ensure professional referral triggers work correctly.
          </p>
        </div>

        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-warm-peach-500" />
            <h3 className="text-lg font-semibold text-gray-800">Empathy Validation</h3>
          </div>
          <p className="text-gray-600">
            Test emotional support capabilities and appropriate empathy responses. 
            Ensure your LLM provides validation without toxic positivity.
          </p>
        </div>

        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <TestTube className="h-8 w-8 text-trust-teal-500" />
            <h3 className="text-lg font-semibold text-gray-800">Scenario Library</h3>
          </div>
          <p className="text-gray-600">
            Comprehensive test scenarios covering crisis intervention, boundary testing, 
            emotional support, and custom scenarios for your specific use case.
          </p>
        </div>

        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-calm-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Analytics & Reporting</h3>
          </div>
          <p className="text-gray-600">
            Detailed safety scores, compliance reports, and performance analytics. 
            Compare different LLM models and track improvements over time.
          </p>
        </div>

        <div className="card-trust">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-8 w-8 text-medical-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Human Oversight</h3>
          </div>
          <p className="text-gray-600">
            All responses validated by mental health professionals. 
            Ensure your LLM meets the highest standards for mental health applications.
          </p>
        </div>
      </div>

      {/* Safety Indicator */}
      <div className="flex justify-center mb-12">
        <SafetyIndicator className="max-w-md" />
      </div>

      {/* Value Propositions */}
      <div className="bg-white rounded-therapeutic shadow-gentle p-8 mb-12">
        <h2 className="text-2xl font-bold text-trust-teal-600 text-center mb-8">
          Who We Serve
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">For Developers</h3>
            <p className="text-gray-600 mb-4">
              Validate your LLM before deployment in mental health apps. 
              Comprehensive testing suite ensures safety and compliance.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Pre-deployment safety validation</li>
              <li>• Automated testing scenarios</li>
              <li>• Performance benchmarking</li>
              <li>• Integration-ready APIs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">For Healthcare Organizations</h3>
            <p className="text-gray-600 mb-4">
              Ensure compliance before implementing AI solutions. 
              Professional-grade testing for sensitive healthcare contexts.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• HIPAA compliance validation</li>
              <li>• Clinical boundary testing</li>
              <li>• Risk assessment reports</li>
              <li>• Regulatory documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-trust-teal-50 rounded-therapeutic p-8">
        <h2 className="text-2xl font-bold text-trust-teal-700 mb-4">
          Ready to Test Your LLM?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Start with our comprehensive testing suite to ensure your LLM is safe, 
          appropriate, and effective for mental health applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            Begin Testing Now
          </button>
          <button className="btn-secondary">
            Schedule Demo
          </button>
        </div>
      </div>
    </main>
  );
};