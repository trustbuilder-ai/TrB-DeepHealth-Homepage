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
    <div className="min-h-screen flex flex-col bg-background">
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
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <CrisisSupportBanner />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Scenarios */}
        <div
          className={`${
            isSidebarCollapsed ? "w-0 lg:w-0" : "w-full lg:w-80"
          } transition-all duration-300 border-r border-border/50 bg-surface`}
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
          className="hidden lg:flex items-center justify-center w-6 bg-surface hover:bg-surface-hover border-r border-border/50 text-text-secondary hover:text-text-primary transition-colors"
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
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/50 bg-surface/50">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentView("testing")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === "testing"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                LLM Testing Area
              </button>
              <button
                onClick={() => setCurrentView("results")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === "results"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Results & Analytics
              </button>
              <button
                onClick={() => setCurrentView("about")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === "about"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      showDashboard
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
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
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-text-inverse rounded-lg hover:bg-primary-dark transition-colors">
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
                <div className="flex-1 p-4 sm:p-6 overflow-hidden">
                  <MentalHealthTestInterface
                    selectedScenario={selectedScenario}
                    onTestComplete={handleTestComplete}
                  />
                </div>
              )}

              {currentView === "results" && (
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold text-text-primary">
                      Testing Results & Analytics
                    </h2>
                  </div>

                  <SafetyDashboard recentTests={testResults} />

                  {testResults.length > 0 && (
                    <div className="bg-surface rounded-lg border border-border/50 p-6">
                      <h3 className="font-semibold text-text-primary mb-4">
                        Recent Test Results
                      </h3>
                      <div className="space-y-3">
                        {testResults.slice(0, 10).map((result) => (
                          <div
                            key={result.id}
                            className="p-3 bg-background/50 rounded-lg border border-border/30"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-text-primary">
                                  {result.scenarioName}
                                </div>
                                <div className="text-sm text-text-secondary truncate max-w-md">
                                  {result.input}
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-sm font-medium ${
                                    result.safetyScore >= 90
                                      ? "text-success"
                                      : result.safetyScore >= 75
                                        ? "text-warning"
                                        : "text-crisis"
                                  }`}
                                >
                                  {result.safetyScore.toFixed(1)}% Safe
                                </div>
                                <div className="text-xs text-text-tertiary">
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
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Info className="w-8 h-8 text-primary" />
                      </div>
                      <h1 className="text-3xl font-bold text-text-primary mb-2">
                        Mental Health AI Testing Platform
                      </h1>
                      <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        A comprehensive testing environment for evaluating AI
                        safety and effectiveness in mental health conversations.
                      </p>
                    </div>

                    <TrustIndicators variant="detailed" />

                    <div className="bg-surface rounded-lg border border-border/50 p-6">
                      <h3 className="font-semibold text-text-primary mb-4">
                        Research Methodology
                      </h3>
                      <div className="prose prose-sm max-w-none text-text-secondary">
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

                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20 p-6">
                      <h3 className="font-semibold text-text-primary mb-2">
                        Important Notice
                      </h3>
                      <p className="text-text-secondary">
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
              <div className="w-full lg:w-96 border-l border-border/50 bg-surface p-4 overflow-y-auto">
                <SafetyDashboard recentTests={testResults} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default MentalHealthTestingPlatform;
