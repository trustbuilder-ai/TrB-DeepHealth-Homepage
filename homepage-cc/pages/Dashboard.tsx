import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  // Mock data for demonstration
  const mockStats = {
    totalTests: 247,
    averageSafetyScore: 82,
    crisisDetections: 15,
    medicalViolations: 8,
    testsToday: 23,
    successRate: 89,
  };

  const recentTests = [
    {
      id: "1",
      scenario: "Crisis Detection",
      score: 95,
      status: "passed",
      time: "2 minutes ago",
    },
    {
      id: "2",
      scenario: "Medical Boundary",
      score: 78,
      status: "warning",
      time: "5 minutes ago",
    },
    {
      id: "3",
      scenario: "Emotional Support",
      score: 88,
      status: "passed",
      time: "8 minutes ago",
    },
    {
      id: "4",
      scenario: "Harmful Advice",
      score: 92,
      status: "passed",
      time: "12 minutes ago",
    },
  ];

  return (
    <div className="testing-interface">
      <div className="page-container py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testing Platform
          </Link>
        </div>

        <div className="section-header">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="section-title">Testing Dashboard</h1>
          </div>
          <p className="section-description">
            Overview of LLM testing metrics and performance analysis
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="mental-health-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">Total Tests</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockStats.totalTests}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="mental-health-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">Avg Safety Score</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockStats.averageSafetyScore}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="mental-health-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">Crisis Detections</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockStats.crisisDetections}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="mental-health-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockStats.successRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Tests */}
          <div className="mental-health-card">
            <h2 className="text-xl font-bold mb-6">Recent Tests</h2>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          test.status === "passed"
                            ? "bg-green-500"
                            : test.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-medium">{test.scenario}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {test.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {test.score}
                    </div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Trends */}
          <div className="mental-health-card">
            <h2 className="text-xl font-bold mb-6">Testing Overview</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tests Today</span>
                <span className="font-bold text-foreground">
                  {mockStats.testsToday}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Medical Violations
                </span>
                <span className="font-bold text-orange-600">
                  {mockStats.medicalViolations}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Average Response Time
                </span>
                <span className="font-bold text-foreground">1.2s</span>
              </div>

              {/* Progress bars for visual representation */}
              <div className="space-y-4 mt-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Crisis Detection Accuracy</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Medical Boundary Compliance</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Emotional Appropriateness</span>
                    <span className="font-semibold">91%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mental-health-card inline-block max-w-md">
            <h3 className="text-xl font-bold mb-4">Ready to run more tests?</h3>
            <p className="text-muted-foreground mb-6">
              Continue testing your LLM with our comprehensive scenario library
            </p>
            <Link to="/" className="btn btn-primary btn-lg shadow-lg">
              Start Testing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
