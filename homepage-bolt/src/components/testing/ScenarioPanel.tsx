import React from "react";
import { AlertTriangle, Heart, Shield, Plus } from "lucide-react";
import type { TestScenario } from "../../types/theme.types";

const predefinedScenarios: TestScenario[] = [
  {
    id: "crisis-1",
    name: "Suicide Ideation Detection",
    description: "Test LLM response to expressions of suicidal thoughts",
    category: "crisis",
  },
  {
    id: "crisis-2",
    name: "Self-Harm Language",
    description: "Evaluate detection of self-harm indicators",
    category: "crisis",
  },
  {
    id: "medical-1",
    name: "Diagnosis Prevention",
    description: "Ensure LLM avoids providing medical diagnoses",
    category: "medical",
  },
  {
    id: "medical-2",
    name: "Medication Advice Block",
    description: "Test blocking of medication recommendations",
    category: "medical",
  },
  {
    id: "emotional-1",
    name: "Empathy Validation",
    description: "Assess appropriate emotional responses",
    category: "emotional",
  },
  {
    id: "emotional-2",
    name: "Toxic Positivity Check",
    description: "Detect and avoid dismissive positive responses",
    category: "emotional",
  },
];

interface ScenarioPanelProps {
  onScenarioSelect: (scenario: TestScenario) => void;
  selectedScenario?: TestScenario;
}

export const ScenarioPanel: React.FC<ScenarioPanelProps> = ({
  onScenarioSelect,
  selectedScenario,
}) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "crisis":
        return <AlertTriangle className="w-5 h-5" />;
      case "medical":
        return <Shield className="w-5 h-5" />;
      case "emotional":
        return <Heart className="w-5 h-5" />;
      default:
        return <Plus className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "crisis":
        return "crisis";
      case "medical":
        return "medical";
      case "emotional":
        return "emotional";
      default:
        return "custom";
    }
  };

  return (
    <div className="scenario-panel">
      <div className="panel-header">
        <h3 className="text-lg font-semibold text-theme-text">
          Test Scenarios
        </h3>
        <p className="text-sm text-theme-text-light">
          Select a predefined scenario to test LLM safety responses
        </p>
      </div>

      <div className="scenarios-grid">
        {predefinedScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onScenarioSelect(scenario)}
            className={`scenario-card ${getCategoryColor(scenario.category)} ${
              selectedScenario?.id === scenario.id ? "selected" : ""
            }`}
          >
            <div className="scenario-icon">{getIcon(scenario.category)}</div>
            <div className="scenario-content">
              <h4 className="scenario-name">{scenario.name}</h4>
              <p className="scenario-description">{scenario.description}</p>
              <span className="scenario-category">{scenario.category}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="custom-scenario">
        <button className="custom-scenario-button">
          <Plus className="w-5 h-5" />
          <span>Create Custom Scenario</span>
        </button>
      </div>
    </div>
  );
};
