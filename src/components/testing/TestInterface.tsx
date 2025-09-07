import { useState } from "react";
import { TestResult } from "../../types/test.types";
import { TestScenario } from "../../types/scenario.types";

interface ConversationEntry {
  id: number;
  input: string;
  response: string;
  timestamp: Date;
}

interface TestInterfaceProps {
  selectedScenario: TestScenario | null;
  onTestComplete: (result: TestResult) => void;
}

export function TestInterface({
  selectedScenario,
  onTestComplete,
}: TestInterfaceProps) {
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<
    ConversationEntry[]
  >([]);

  const handleRunTest = async () => {
    if (!input.trim()) return;

    setIsRunning(true);

    // Simulate LLM response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = `Mock LLM response for: "${input}". This would be replaced with actual LLM API call.`;

    // Create conversation entry
    const conversationEntry: ConversationEntry = {
      id: Date.now(),
      input,
      response,
      timestamp: new Date(),
    };

    setCurrentConversation((prev) => [...prev, conversationEntry]);

    // Create simple test result
    if (selectedScenario) {
      const testResult: TestResult = {
        id: Date.now().toString(),
        scenarioId: selectedScenario.id,
        scenarioName: selectedScenario.name,
        input,
        output: response,
        safetyScore: 85, // Mock score
        crisisLevel: "low",
        medicalBoundaryViolation: false,
        responseTime: 1000,
        timestamp: new Date(),
        flags: [],
      };

      onTestComplete(testResult);
    }

    setInput("");
    setIsRunning(false);
  };

  const handleBatchTest = async () => {
    if (!selectedScenario) return;
    setIsRunning(true);
    // Simulate batch processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Simple header matching implementation plan */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">LLM Testing Area</h2>
        <p className="text-sm text-muted-foreground">
          Chat Interface for Testing LLM Responses
        </p>
      </div>

      {/* Conversation area - simple chat interface */}
      <div className="flex-1 bg-card border border-border rounded-lg p-4 mb-4 overflow-y-auto">
        {currentConversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p>No conversation yet.</p>
              <p className="text-sm mt-2">
                {selectedScenario
                  ? "Enter a message below to start testing."
                  : "Select a test scenario first."}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentConversation.map((entry) => (
              <div key={entry.id}>
                <div className="mb-2">
                  <div className="bg-primary/10 rounded p-3 text-sm">
                    <strong>Test Input:</strong> {entry.input}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="bg-secondary/10 rounded p-3 text-sm">
                    <strong>LLM Response:</strong> {entry.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom input section matching implementation plan */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-medium">Test Input</h3>
          {selectedScenario && (
            <span className="text-xs bg-primary/20 px-2 py-1 rounded">
              {selectedScenario.name}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter test input..."
            className="flex-1 form-textarea min-h-[60px]"
            rows={2}
            disabled={isRunning}
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRunTest}
              disabled={!input.trim() || isRunning}
              className="btn btn-primary px-6"
            >
              {isRunning ? "Running..." : "Run Test"}
            </button>
            <button
              onClick={handleBatchTest}
              disabled={!selectedScenario || isRunning}
              className="btn btn-outline px-6"
            >
              Batch Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
