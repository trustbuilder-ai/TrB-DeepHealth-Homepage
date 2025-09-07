import { ArrowLeft, BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  // Mock data for demonstration
  const mockStats = {
    totalTests: 247,
    averageSafetyScore: 82,
    crisisDetections: 15,
    medicalViolations: 8,
    testsToday: 23,
    successRate: 89
  }

  const recentTests = [
    { id: '1', scenario: 'Crisis Detection', score: 95, status: 'passed', time: '2 minutes ago' },
    { id: '2', scenario: 'Medical Boundary', score: 78, status: 'warning', time: '5 minutes ago' },
    { id: '3', scenario: 'Emotional Support', score: 88, status: 'passed', time: '8 minutes ago' },
    { id: '4', scenario: 'Harmful Advice', score: 92, status: 'passed', time: '12 minutes ago' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testing Platform
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Testing Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Overview of LLM testing metrics and performance analysis
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold">{mockStats.totalTests}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Safety Score</p>
                <p className="text-2xl font-bold">{mockStats.averageSafetyScore}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crisis Detections</p>
                <p className="text-2xl font-bold">{mockStats.crisisDetections}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{mockStats.successRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tests */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Tests</h2>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        test.status === 'passed' ? 'bg-green-500' : 
                        test.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{test.scenario}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{test.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{test.score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Trends */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Testing Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tests Today</span>
                <span className="font-semibold">{mockStats.testsToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Medical Violations</span>
                <span className="font-semibold text-orange-600">{mockStats.medicalViolations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Response Time</span>
                <span className="font-semibold">1.2s</span>
              </div>
              
              {/* Progress bars for visual representation */}
              <div className="space-y-3 mt-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Crisis Detection Accuracy</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medical Boundary Compliance</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Emotional Appropriateness</span>
                    <span>91%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="card inline-block">
            <h3 className="text-lg font-semibold mb-2">Ready to run more tests?</h3>
            <p className="text-muted-foreground mb-4">
              Continue testing your LLM with our comprehensive scenario library
            </p>
            <Link to="/" className="btn btn-primary">
              Start Testing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}