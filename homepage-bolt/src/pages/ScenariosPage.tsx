import React from 'react';
import { Shield, FileText, Users, TestTube, AlertTriangle, Heart } from 'lucide-react';
import { InternalLink, RelatedLinks } from '../components/shared/InternalLinks';

export const ScenariosPage: React.FC = () => {
  const scenarios = [
    {
      id: 'crisis-detection',
      title: 'Crisis Detection',
      icon: Shield,
      color: 'text-coral-alert-500',
      bgColor: 'bg-coral-alert-50',
      borderColor: 'border-coral-alert-200',
      description: 'Test your LLM\'s ability to detect and respond to mental health emergencies.',
      tests: [
        'Suicide ideation detection',
        'Self-harm language recognition',
        'Emergency escalation protocols',
        '988 resource routing validation'
      ],
      difficulty: 'Critical',
      testCount: 25
    },
    {
      id: 'medical-boundary',
      title: 'Medical Boundaries',
      icon: FileText,
      color: 'text-medical-green-600',
      bgColor: 'bg-medical-green-50',
      borderColor: 'border-medical-green-200',
      description: 'Validate that your LLM respects medical boundaries and professional limits.',
      tests: [
        'Diagnosis attempt prevention',
        'Medication advice blocking',
        'Treatment recommendation limits',
        'Professional referral triggers'
      ],
      difficulty: 'High',
      testCount: 18
    },
    {
      id: 'emotional-support',
      title: 'Empathy Validation',
      icon: Heart,
      color: 'text-warm-peach-500',
      bgColor: 'bg-warm-peach-50',
      borderColor: 'border-warm-peach-200',
      description: 'Test emotional support capabilities and appropriate empathy responses.',
      tests: [
        'Empathy appropriateness',
        'Validation language effectiveness',
        'Toxic positivity avoidance',
        'Cultural sensitivity checks'
      ],
      difficulty: 'Medium',
      testCount: 22
    },
    {
      id: 'boundary-testing',
      title: 'Adverse Scenarios',
      icon: AlertTriangle,
      color: 'text-calm-blue-600',
      bgColor: 'bg-calm-blue-50',
      borderColor: 'border-calm-blue-200',
      description: 'Test resistance to manipulation and harmful advice prevention.',
      tests: [
        'Manipulation resistance',
        'Harmful advice prevention',
        'Relationship advice safety',
        'Youth protection protocols'
      ],
      difficulty: 'High',
      testCount: 15
    },
    {
      id: 'consistency',
      title: 'Consistency Testing',
      icon: TestTube,
      color: 'text-trust-teal-500',
      bgColor: 'bg-trust-teal-50',
      borderColor: 'border-trust-teal-200',
      description: 'Evaluate response consistency across multiple conversation turns.',
      tests: [
        'Multi-turn coherence',
        'Context retention',
        'Personality consistency',
        'Safety maintenance over time'
      ],
      difficulty: 'Medium',
      testCount: 12
    },
    {
      id: 'custom',
      title: 'Custom Scenarios',
      icon: Users,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Create and run custom test scenarios for your specific use case.',
      tests: [
        'Custom prompt builder',
        'Expected behavior definition',
        'Scoring criteria setup',
        'Batch testing capabilities'
      ],
      difficulty: 'Variable',
      testCount: 'Unlimited'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Critical': return 'text-coral-alert-600 bg-coral-alert-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <TestTube className="h-12 w-12 text-trust-teal-500" />
          <Shield className="h-10 w-10 text-coral-alert-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-trust-teal-600 mb-4">
          Test Scenarios
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Comprehensive testing scenarios to validate your LLM's safety and appropriateness 
          for mental health applications. Each scenario includes multiple test cases and validation criteria.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-in" style={{ animationDelay: '0.2s' }}>
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <div 
              key={scenario.id}
              className={`card border-2 ${scenario.borderColor} ${scenario.bgColor} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`h-8 w-8 ${scenario.color} group-hover:scale-110 transition-transform duration-200`} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{scenario.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">
                      {scenario.testCount} tests
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {scenario.description}
              </p>
              
              <ul className="space-y-1 mb-6">
                {scenario.tests.map((test, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {test}
                  </li>
                ))}
              </ul>
              
              <div className="flex space-x-2">
                <InternalLink to="/testing" variant="button" className="flex-1 text-sm group">
                  Run Scenario
                </InternalLink>
                <button className="px-3 py-2 border border-gray-300 rounded-therapeutic text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm">
                  Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scenario Builder */}
      <div className="card-trust animate-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-trust-teal-500" />
          <h2 className="text-xl font-semibold text-gray-800">Custom Scenario Builder</h2>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-therapeutic p-8 text-center border border-gray-200">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Build Your Own Test Scenarios
          </h3>
          <p className="text-gray-500 mb-6">
            Create custom test scenarios tailored to your specific mental health application requirements.
          </p>
          <button className="btn-primary group">
            Open Scenario Builder
          </button>
        </div>
      </div>

      {/* Related Scenario Resources */}
      <RelatedLinks
        title="Scenario Development Resources"
        links={[
          {
            to: '/testing',
            label: 'Start Testing Interface',
            description: 'Begin testing with your selected scenarios'
          },
          {
            to: '/results',
            label: 'Scenario Performance Analytics',
            description: 'View how different scenarios perform across LLM models'
          },
          {
            to: '/docs',
            label: 'Custom Scenario Guide',
            description: 'Learn how to create effective custom testing scenarios'
          },
          {
            to: 'https://www.nimh.nih.gov/health/topics/suicide-prevention',
            label: 'NIMH Crisis Guidelines',
            description: 'Official guidelines for crisis intervention protocols',
            external: true
          }
        ]}
        className="mt-8 animate-in"
        style={{ animationDelay: '0.4s' }}
      />
    </main>
  );
};