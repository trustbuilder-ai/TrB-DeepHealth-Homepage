// Core types for LLM testing platform

export interface TestScenario {
  id: string;
  name: string;
  category: 'crisis-detection' | 'medical-boundary' | 'emotional-support' | 'custom';
  description: string;
  prompts: TestPrompt[];
  expectedBehaviors: ExpectedBehavior[];
  safetyThresholds: SafetyThresholds;
  metadata: ScenarioMetadata;
}

export interface TestPrompt {
  id: string;
  text: string;
  riskLevel: 'low' | 'medium' | 'high' | 'crisis';
  expectedResponse: 'support' | 'referral' | 'crisis-escalation' | 'boundary-enforcement';
  context?: string;
}

export interface ExpectedBehavior {
  type: 'crisis-detection' | 'boundary-respect' | 'empathy-display' | 'resource-provision';
  description: string;
  required: boolean;
  weight: number; // For scoring calculation
}

export interface SafetyThresholds {
  crisisDetectionAccuracy: number; // Minimum % for crisis language detection
  falsePositiveRate: number; // Maximum acceptable false positive rate
  responseTime: number; // Maximum response time in ms
  boundaryCompliance: number; // Minimum % for medical boundary respect
}

export interface ScenarioMetadata {
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  version: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface TestResults {
  testId: string;
  scenarioId: string;
  llmModel: string;
  timestamp: Date;
  overallScore: number;
  metrics: TestMetrics;
  responses: TestResponse[];
  safetyFlags: SafetyFlag[];
  recommendations: string[];
}

export interface TestMetrics {
  safetyScore: number; // 0-100
  boundaryCompliance: number; // 0-100
  empathyRating: number; // 0-100
  responseTime: number; // Average in ms
  consistencyScore: number; // 0-100
  crisisDetectionRate: number; // 0-100
  falsePositiveRate: number; // 0-100
}

export interface TestResponse {
  promptId: string;
  llmResponse: string;
  responseTime: number;
  safetyScore: number;
  flagged: boolean;
  flagReasons: string[];
  humanValidation?: HumanValidation;
}

export interface SafetyFlag {
  type: 'crisis-missed' | 'boundary-violation' | 'harmful-advice' | 'inappropriate-tone';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  promptId: string;
  autoDetected: boolean;
  humanConfirmed?: boolean;
}

export interface HumanValidation {
  validatorId: string;
  timestamp: Date;
  approved: boolean;
  notes: string;
  suggestedImprovements?: string[];
}

export interface LLMConfiguration {
  model: string;
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  parameters: {
    temperature: number;
    maxTokens: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
  systemPrompt: string;
  safetyFilters: string[];
}

export interface TestSession {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  scenarios: string[];
  llmConfigurations: LLMConfiguration[];
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  results: TestResults[];
}

// Custom scenario builder types
export interface CustomScenarioBuilder {
  name: string;
  description: string;
  prompts: CustomPrompt[];
  expectedBehaviors: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CustomPrompt {
  text: string;
  expectedResponse: string;
  riskIndicators: string[];
}