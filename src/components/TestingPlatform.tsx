import { useState } from "react";
import { Header } from "./shared/Header";
import { TestInterface } from "./testing/TestInterface";
import { ScenarioPanel } from "./testing/ScenarioPanel";
import { TestResult } from "../types/test.types";
import { TestScenario } from "../types/scenario.types";

export function TestingPlatform() {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(
    null,
  );

  const handleScenarioSelect = (scenario: TestScenario) => {
    setSelectedScenario(scenario);
  };

  const handleTestComplete = (_result: TestResult) => {
    // Test results can be handled here if needed in the future
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="testing-main flex-1">
        <div className="testing-output-area">
          <TestInterface
            selectedScenario={selectedScenario}
            onTestComplete={handleTestComplete}
          />
        </div>

        <div className="testing-scenario-sidebar">
          <ScenarioPanel
            selectedScenario={selectedScenario}
            onScenarioSelect={handleScenarioSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default TestingPlatform;
