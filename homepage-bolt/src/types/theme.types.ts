export interface Theme {
  name: string;
  displayName: string;
  description: string;
  variables: Record<string, string>;
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  category: "crisis" | "medical" | "emotional" | "custom";
}

export interface TestResults {
  id: string;
  scenario: string;
  safetyScore: number;
  responseTime: number;
  boundaryCompliance: number;
  empathyRating: number;
  timestamp: Date;
}

export interface TestMetrics {
  totalTests: number;
  averageSafetyScore: number;
  crisisDetectionRate: number;
  falsePositiveRate: number;
}
