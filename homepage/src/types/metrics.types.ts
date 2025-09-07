// Metrics and analytics types for LLM testing platform

export interface MetricsData {
  timestamp: Date;
  testId: string;
  scenarioId: string;
  llmModel: string;
  metrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
  // Core safety metrics
  safetyScore: number;
  crisisDetectionAccuracy: number;
  boundaryComplianceRate: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  
  // Response quality metrics
  empathyScore: number;
  appropriatenessScore: number;
  coherenceScore: number;
  consistencyScore: number;
  
  // Performance metrics
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  throughput: number; // responses per minute
  
  // Conversation metrics
  conversationLength: number;
  contextRetention: number;
  topicCoherence: number;
}

export interface AggregatedMetrics {
  timeRange: TimeRange;
  totalTests: number;
  averageScores: PerformanceMetrics;
  trends: MetricTrend[];
  comparisons: ModelComparison[];
}

export interface TimeRange {
  start: Date;
  end: Date;
  granularity: 'hour' | 'day' | 'week' | 'month';
}

export interface MetricTrend {
  metric: keyof PerformanceMetrics;
  direction: 'up' | 'down' | 'stable';
  changePercentage: number;
  significance: 'low' | 'medium' | 'high';
}

export interface ModelComparison {
  modelA: string;
  modelB: string;
  metrics: ComparisonMetrics;
  statisticalSignificance: number;
  recommendation: 'prefer-a' | 'prefer-b' | 'equivalent';
}

export interface ComparisonMetrics {
  safetyScoreDiff: number;
  empathyScoreDiff: number;
  responseTimeDiff: number;
  consistencyDiff: number;
  overallRecommendation: string;
}

export interface ExportFormat {
  type: 'csv' | 'json' | 'pdf' | 'xlsx';
  includeRawData: boolean;
  includeCharts: boolean;
  includeRecommendations: boolean;
  dateRange: TimeRange;
}

export interface ComplianceReport {
  reportId: string;
  generatedAt: Date;
  timeRange: TimeRange;
  complianceScore: number;
  criticalIssues: ComplianceIssue[];
  recommendations: ComplianceRecommendation[];
  certificationStatus: 'compliant' | 'non-compliant' | 'pending-review';
}

export interface ComplianceIssue {
  type: 'safety-violation' | 'boundary-breach' | 'crisis-miss' | 'data-privacy';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  occurrences: number;
  firstDetected: Date;
  lastDetected: Date;
  resolution: 'pending' | 'in-progress' | 'resolved';
}

export interface ComplianceRecommendation {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'safety' | 'performance' | 'compliance' | 'user-experience';
  description: string;
  estimatedImpact: 'low' | 'medium' | 'high';
  implementationEffort: 'low' | 'medium' | 'high';
}

// Real-time metrics for dashboard
export interface RealTimeMetrics {
  activeTests: number;
  averageResponseTime: number;
  currentSafetyScore: number;
  alertsCount: number;
  lastUpdated: Date;
}

export interface AlertConfig {
  metric: keyof PerformanceMetrics;
  threshold: number;
  condition: 'above' | 'below' | 'equals';
  severity: 'info' | 'warning' | 'error' | 'critical';
  enabled: boolean;
}

export interface MetricAlert {
  id: string;
  config: AlertConfig;
  triggeredAt: Date;
  currentValue: number;
  message: string;
  acknowledged: boolean;
  resolvedAt?: Date;
}