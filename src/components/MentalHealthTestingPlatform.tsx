import React, { useState, useEffect } from "react";
import { Header } from "./shared/Header";
import { CrisisSupportBanner } from "./crisis/CrisisSupportBanner";
import { MentalHealthTestInterface } from "./testing/MentalHealthTestInterface";
import { MentalHealthScenarioPanel } from "./testing/MentalHealthScenarioPanel";
import { SafetyDashboard } from "./dashboard/SafetyDashboard";
import { TrustIndicators } from "./shared/TrustIndicators";
import { TestResult } from "../types/test.types";
import { TestScenario } from "../types/scenario.types";
import {
  BarChart3,
  Download,
  Info,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function MentalHealthTestingPlatform() {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<
    "testing" | "results" | "about"
  >("testing");

  const handleScenarioSelect = (scenario: TestScenario) => {
    setSelectedScenario(scenario);
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev].slice(0, 100)); // Keep last 100 results
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Auto-hide dashboard on mobile when scenario is selected
  useEffect(() => {
    if (selectedScenario && window.innerWidth < 1024) {
      setShowDashboard(false);
    }
  }, [selectedScenario]);

  return (
    <div className="testing-interface flex flex-col">
      {/* Mental Health Theme Variables */}
      <style>{`
        :root {
          --mental-health-primary: #005C65;
          --mental-health-primary-light: #017A8D;
          --mental-health-accent: #ECA97C;
          --mental-health-accent-light: #F3B890;
          --mental-health-crisis: #ff6252;
          --mental-health-success: #38A169;
          --mental-health-warning: #D69E2E;
        }
        
        body {
          font-family: 'Open Sans', 'Lato', 'Montserrat', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Header */}
      <Header />

      {/* Crisis Support Banner */}
      <div className="page-container pt-6">
        <CrisisSupportBanner />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar - Scenarios */}
        <div
          className={`${
            isSidebarCollapsed ? "w-0 lg:w-0" : "w-full lg:w-96"
          } transition-all duration-300 border-r border-border/50 bg-card/50 backdrop-blur-sm`}
        >
          {!isSidebarCollapsed && (
            <MentalHealthScenarioPanel
              selectedScenario={selectedScenario}
              onScenarioSelect={handleScenarioSelect}
            />
          )}
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center w-8 bg-card/80 hover:bg-card border-r border-border/50 text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Main Testing Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* View Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView("testing")}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === "testing"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                LLM Testing Area
              </button>
              <button
                onClick={() => setCurrentView("results")}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === "results"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                Results & Analytics
              </button>
              <button
                onClick={() => setCurrentView("about")}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === "about"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                About Platform
              </button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              {currentView === "testing" && (
                <>
                  <button
                    onClick={() => setShowDashboard(!showDashboard)}
                    className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                      showDashboard
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    title={showDashboard ? "Hide dashboard" : "Show dashboard"}
                  >
                    {showDashboard ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </>
              )}

              {currentView === "results" && (
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Content */}
            <div
              className={`${
                showDashboard && currentView === "testing" ? "flex-1" : "w-full"
              } flex flex-col overflow-hidden`}
            >
              {currentView === "testing" && (
                <div className="flex-1 p-6 overflow-hidden">
                  <MentalHealthTestInterface
                    selectedScenario={selectedScenario}
                    onTestComplete={handleTestComplete}
                  />
                </div>
              )}

              {currentView === "results" && (
                <div className="flex-1 p-6 overflow-y-auto space-y-8">
                  <div className="section-header">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-primary" />
                      <h2 className="section-title">
                        Testing Results & Analytics
                      </h2>
                    </div>
                  </div>

                  <SafetyDashboard recentTests={testResults} />

                  {testResults.length > 0 && (
                    <div className="mental-health-card">
                      <h3 className="text-xl font-semibold text-foreground mb-6">
                        Recent Test Results
                      </h3>
                      <div className="space-y-4">
                        {testResults.slice(0, 10).map((result) => (
                          <div
                            key={result.id}
                            className="p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-foreground mb-1">
                                  {result.scenarioName}
                                </div>
                                <div className="text-sm text-muted-foreground truncate max-w-md">
                                  {result.input}
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-sm font-semibold mb-1 ${
                                    result.safetyScore >= 90
                                      ? "text-green-600"
                                      : result.safetyScore >= 75
                                        ? "text-amber-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {result.safetyScore.toFixed(1)}% Safe
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {result.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentView === "about" && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-5xl mx-auto space-y-10">
                    <div className="section-header">
                      <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Info className="w-8 h-8 text-primary" />
                      </div>
                      <h1 className="section-title">
                        Mental Health AI Testing Platform
                      </h1>
                      <p className="section-description">
                        A comprehensive testing environment for evaluating AI
                        safety and effectiveness in mental health conversations.
                      </p>
                    </div>

                    <TrustIndicators variant="detailed" />

                    <div className="mental-health-card">
                      <h3 className="text-xl font-semibold text-foreground mb-6">
                        Research Methodology
                      </h3>
                      <div className="prose prose-base max-w-none text-muted-foreground">
                        <p>
                          This platform uses evidence-based testing scenarios
                          developed in collaboration with mental health
                          professionals. Our methodology focuses on:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Crisis intervention response accuracy</li>
                          <li>Appropriate boundary maintenance</li>
                          <li>Empathetic and supportive communication</li>
                          <li>Ethical guideline adherence</li>
                          <li>Safety protocol compliance</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mental-health-card bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/30">
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Important Notice
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        This platform is designed for research and testing
                        purposes only. If you or someone you know is
                        experiencing a mental health crisis, please contact a
                        qualified mental health professional or crisis helpline
                        immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Dashboard */}
            {showDashboard && currentView === "testing" && (
              <div className="w-full lg:w-96 border-l border-border/50 bg-card/50 backdrop-blur-sm p-6 overflow-y-auto">
                <SafetyDashboard recentTests={testResults} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default MentalHealthTestingPlatform;
