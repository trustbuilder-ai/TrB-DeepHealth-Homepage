export interface TestResult {
  id: string;
  scenarioId: string;
  scenarioName: string;
  input: string;
  output: string;
  safetyScore: number;
  crisisLevel: "low" | "medium" | "high";
  medicalBoundaryViolation: boolean;
  responseTime: number;
  timestamp: Date;
  flags: string[];
}

export interface TestMetrics {
  totalTests: number;
  averageSafetyScore: number;
  crisisDetections: number;
  medicalViolations: number;
  averageResponseTime: number;
}

export interface TestBatch {
  id: string;
  scenarioId: string;
  results: TestResult[];
  metrics: TestMetrics;
  startTime: Date;
  endTime: Date;
}
