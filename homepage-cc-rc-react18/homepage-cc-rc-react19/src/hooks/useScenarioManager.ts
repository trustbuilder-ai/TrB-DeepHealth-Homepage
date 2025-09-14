import { useState, useCallback, useMemo } from "react";
import { scenarios } from "@/data/mockData";

/**
 * Test execution states for scenario tracking.
 */
export type TestState = "running" | "completed" | "error";

/**
 * Interface for toast notifications.
 */
interface ToastMessage {
  message: string;
  type: "success" | "error" | "info";
}

/**
 * Custom hook for managing test scenarios, their execution states, and related functionality.
 * Handles scenario selection, test execution, filtering, and state management.
 *
 * @returns Object containing scenario management state and functions
 */
export const useScenarioManager = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [testingStates, setTestingStates] = useState<Record<number, TestState>>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  /**
   * Executes a test scenario with simulated delay and error handling.
   * Updates the testing state throughout the process.
   *
   * @param scenarioId - The unique identifier of the scenario to test
   */
  const handleRunTest = useCallback(async (scenarioId: number) => {
    setTestingStates((prev) => ({ ...prev, [scenarioId]: "running" }));

    try {
      // Simulate test execution with 3 second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTestingStates((prev) => ({ ...prev, [scenarioId]: "completed" }));
      setToast({ message: "Test completed successfully!", type: "success" });
    } catch {
      setTestingStates((prev) => ({ ...prev, [scenarioId]: "error" }));
      setToast({ message: "Test failed to complete", type: "error" });
    }
  }, []);

  /**
   * Filters scenarios based on search query across multiple fields.
   * Searches in title, description, category, and difficulty.
   */
  const filteredScenarios = useMemo(() => {
    if (!searchQuery.trim()) return scenarios;
    const query = searchQuery.toLowerCase();
    return scenarios.filter(
      (scenario) =>
        scenario.title.toLowerCase().includes(query) ||
        scenario.description.toLowerCase().includes(query) ||
        scenario.category.toLowerCase().includes(query) ||
        scenario.difficulty.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  /**
   * Clears the current toast message.
   */
  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * Resets all test states to initial values.
   */
  const resetTestStates = useCallback(() => {
    setTestingStates({});
    setSelectedScenario(null);
    setSearchQuery("");
    clearToast();
  }, [clearToast]);

  return {
    // State
    selectedScenario,
    testingStates,
    searchQuery,
    toast,
    filteredScenarios,

    // Actions
    setSelectedScenario,
    setSearchQuery,
    handleRunTest,
    clearToast,
    resetTestStates,
  };
};
