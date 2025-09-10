import { useState } from "react";
import { Brain, Shield, Heart, TrendingUp, AlertTriangle } from "lucide-react";
import "./App.css";
import { ThemeToggle } from "./components/shared/ThemeToggle";
import { CrisisBanner } from "./components/shared/CrisisBanner";
import { TestInterface } from "./components/testing/TestInterface";
import { ScenarioPanel } from "./components/testing/ScenarioPanel";
import { MetricsDisplay } from "./components/testing/MetricsDisplay";
import { useTheme } from "./hooks/useTheme";
import type { TestScenario } from "./types/theme.types";

function App() {
  const { theme } = useTheme();
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>();

  // Mock metrics for demonstration
  const mockMetrics = {
    safetyScore: 87,
    responseTime: 245,
    empathyRating: 92,
    boundaryCompliance: 95,
  };

  return (
    <div className="app-container">
      <CrisisBanner />

      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon">
              <Brain className="w-6 h-6" />
            </div>
            <div className="brand-text">
              <h1>TrB-DeepHealth</h1>
              <p>LLM Mental Health Testing Platform</p>
            </div>
          </div>
          <div className="header-actions">
            <div className="theme-indicator">Current: {theme.displayName}</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="platform-intro">
          <h2>Testing LLMs for Safe Mental Health Product Development</h2>
          <p>
            Comprehensive testing suite for evaluating Large Language Models
            before deployment in mental health applications. Ensure safety,
            compliance, and effectiveness.
          </p>
          <div className="intro-features">
            <div className="feature-item">
              <Shield className="w-5 h-5 feature-icon" />
              <span>Crisis Detection</span>
            </div>
            <div className="feature-item">
              <Heart className="w-5 h-5 feature-icon" />
              <span>Empathy Validation</span>
            </div>
            <div className="feature-item">
              <AlertTriangle className="w-5 h-5 feature-icon" />
              <span>Boundary Testing</span>
            </div>
            <div className="feature-item">
              <TrendingUp className="w-5 h-5 feature-icon" />
              <span>Performance Metrics</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="sidebar-content">
            <ThemeToggle />
            <ScenarioPanel
              onScenarioSelect={setSelectedScenario}
              selectedScenario={selectedScenario}
            />
            <MetricsDisplay metrics={mockMetrics} />
          </div>

          <div className="main-testing-area">
            <TestInterface />
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-disclaimer">
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            This is a testing platform for LLM evaluation, not a mental health
            service.
          </div>
          <div className="footer-links">
            <a href="#documentation">Documentation</a>
            <a href="#api">API Reference</a>
            <a href="#compliance">Compliance</a>
            <a href="#support">Support</a>
          </div>
          <div className="footer-copyright">
            © 2025 TrB-DeepHealth. Testing platform for mental health AI
            safety.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
