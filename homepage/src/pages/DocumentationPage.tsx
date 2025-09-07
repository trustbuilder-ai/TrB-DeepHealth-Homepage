import React from 'react';
import { BookOpen, Code, Shield, Users, ExternalLink, Download } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: 'text-trust-teal-500',
      items: [
        'Platform Overview',
        'Setting Up Your First Test',
        'Understanding Safety Scores',
        'Best Practices for LLM Testing'
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      color: 'text-medical-green-600',
      items: [
        'Authentication',
        'Test Execution Endpoints',
        'Results Retrieval',
        'Webhook Integration'
      ]
    },
    {
      id: 'safety-guidelines',
      title: 'Safety Guidelines',
      icon: Shield,
      color: 'text-coral-alert-500',
      items: [
        'Crisis Detection Standards',
        'Medical Boundary Requirements',
        'Compliance Frameworks',
        'Risk Assessment Criteria'
      ]
    },
    {
      id: 'integration',
      title: 'Integration Guide',
      icon: Users,
      color: 'text-warm-peach-500',
      items: [
        'SDK Installation',
        'Custom Scenario Creation',
        'Batch Testing Setup',
        'CI/CD Integration'
      ]
    }
  ];

  const resources = [
    {
      title: 'Mental Health AI Ethics Guidelines',
      description: 'Comprehensive guidelines for ethical AI development in mental health contexts.',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'Crisis Detection Algorithm Whitepaper',
      description: 'Technical documentation of our crisis language detection methodology.',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'Compliance Checklist',
      description: 'Step-by-step checklist for HIPAA and regulatory compliance.',
      type: 'PDF',
      size: '0.9 MB'
    },
    {
      title: 'Sample Test Scenarios',
      description: 'Collection of pre-built test scenarios for common use cases.',
      type: 'JSON',
      size: '0.3 MB'
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <BookOpen className="h-12 w-12 text-trust-teal-500" />
          <Code className="h-10 w-10 text-medical-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-trust-teal-600 mb-4">
          Documentation
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Comprehensive guides, API references, and best practices for implementing 
          safe and effective LLM testing in mental health applications.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in" style={{ animationDelay: '0.2s' }}>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] group">
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`h-8 w-8 ${section.color} group-hover:scale-110 transition-transform duration-200`} />
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              </div>
              
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 hover:text-trust-teal-600 cursor-pointer flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8 animate-in" style={{ animationDelay: '0.3s' }}>
        <div className="lg:col-span-2">
          <div className="card-trust">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Platform Overview</h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                TrB-DeepHealth is a comprehensive testing platform designed to validate Large Language Models (LLMs) 
                for safe deployment in mental health applications. Our platform provides rigorous testing across 
                multiple safety dimensions to ensure your AI systems meet the highest standards for sensitive healthcare contexts.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-trust-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700"><strong>Crisis Detection:</strong> Real-time identification of crisis language with immediate resource routing</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-trust-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700"><strong>Medical Boundary Testing:</strong> Validation of professional limits and referral triggers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-trust-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700"><strong>Empathy Validation:</strong> Assessment of appropriate emotional support capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-trust-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700"><strong>Human Oversight:</strong> All responses validated by mental health professionals</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Standards</h3>
              <p className="text-gray-700 mb-4">
                Our testing framework is built on evidence-based mental health practices and industry safety standards. 
                Every test scenario is developed in collaboration with licensed mental health professionals and validated 
                against real-world clinical guidelines.
              </p>
              
              <div className="bg-coral-alert-50 border-l-4 border-coral-alert-500 p-4 mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-coral-alert-500 mr-2" />
                  <p className="text-coral-alert-800 font-medium">
                    Important: This platform is for testing LLMs, not providing mental health services. 
                    Always ensure proper human oversight in production deployments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources & Downloads</h3>
            
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                    <button className="ml-3 p-2 text-trust-teal-600 hover:text-trust-teal-700 hover:bg-trust-teal-50 rounded-md transition-all duration-200 hover:scale-110">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">External Resources</h3>
            
            <div className="space-y-3">
              <a 
                href="https://988lifeline.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
              >
                <span className="text-sm font-medium text-gray-800">988 Suicide & Crisis Lifeline</span>
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </a>
              
              <a 
                href="https://www.nimh.nih.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
              >
                <span className="text-sm font-medium text-gray-800">NIMH Guidelines</span>
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </a>
              
              <a 
                href="https://www.samhsa.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
              >
                <span className="text-sm font-medium text-gray-800">SAMHSA Resources</span>
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};