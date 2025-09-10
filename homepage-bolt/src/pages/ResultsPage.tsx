import React from 'react';
import { BarChart3, TrendingUp, Download, Eye, Calendar, Filter } from 'lucide-react';
import { RelatedLinks } from '../components/shared/InternalLinks';

export const ResultsPage: React.FC = () => {
  const mockResults = [
    {
      id: 'test-001',
      date: '2024-01-15',
      model: 'GPT-4',
      scenario: 'Crisis Detection',
      safetyScore: 92,
      status: 'Passed',
      duration: '12m 34s'
    },
    {
      id: 'test-002',
      date: '2024-01-14',
      model: 'Claude-3',
      scenario: 'Medical Boundaries',
      safetyScore: 88,
      status: 'Passed',
      duration: '8m 21s'
    },
    {
      id: 'test-003',
      date: '2024-01-14',
      model: 'GPT-3.5',
      scenario: 'Empathy Validation',
      safetyScore: 76,
      status: 'Review Required',
      duration: '15m 07s'
    },
    {
      id: 'test-004',
      date: '2024-01-13',
      model: 'Custom Model',
      scenario: 'Adverse Scenarios',
      safetyScore: 65,
      status: 'Failed',
      duration: '22m 18s'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed': return 'text-medical-green-600 bg-medical-green-100';
      case 'Review Required': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-coral-alert-600 bg-coral-alert-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-medical-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-coral-alert-600';
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <BarChart3 className="h-12 w-12 text-trust-teal-500" />
          <TrendingUp className="h-10 w-10 text-medical-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-trust-teal-600 mb-4">
          Test Results & Analytics
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Comprehensive analysis of your LLM testing results with detailed safety scores, 
          compliance reports, and performance analytics.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8 animate-in" style={{ animationDelay: '0.2s' }}>
        <div className="card text-center">
          <div className="text-2xl font-bold text-trust-teal-600 mb-1">24</div>
          <div className="text-sm text-gray-600">Total Tests</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-medical-green-600 mb-1">18</div>
          <div className="text-sm text-gray-600">Passed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">4</div>
          <div className="text-sm text-gray-600">Review Required</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-coral-alert-600 mb-1">2</div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 animate-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select className="input-therapeutic text-sm">
              <option>All Models</option>
              <option>GPT-4</option>
              <option>Claude-3</option>
              <option>Custom Model</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <select className="input-therapeutic text-sm">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 24 Hours</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-sm group">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </button>
          <button className="btn-primary text-sm group">
            Generate Report
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="card-trust overflow-hidden animate-in" style={{ animationDelay: '0.4s' }}>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Test Results</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Safety Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.scenario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-semibold ${getScoreColor(result.safetyScore)}`}>
                      {result.safetyScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-trust-teal-600 hover:text-trust-teal-700 hover:scale-110 transition-all duration-200 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 hover:scale-110 transition-all duration-200">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Placeholder */}
      <div className="card-trust mt-8 animate-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Analytics</h2>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-therapeutic p-8 text-center border border-gray-200">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Advanced Analytics Coming Soon
          </h3>
          <p className="text-gray-500 mb-6">
            Detailed charts, trends, and model comparisons will be available here.
          </p>
          <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
            View Analytics (Coming Soon)
          </button>
        </div>
      </div>

      {/* Related Results Resources */}
      <RelatedLinks
        title="Results & Analytics Resources"
        links={[
          {
            to: '/testing',
            label: 'Run New Tests',
            description: 'Start new LLM testing sessions to generate more results'
          },
          {
            to: '/scenarios',
            label: 'Compare Scenario Performance',
            description: 'Analyze how different test scenarios perform'
          },
          {
            to: '/docs',
            label: 'Results Interpretation Guide',
            description: 'Learn how to interpret and act on your test results'
          }
        ]}
        className="mt-8 animate-in"
        style={{ animationDelay: '0.6s' }}
      />
    </main>
  );
};