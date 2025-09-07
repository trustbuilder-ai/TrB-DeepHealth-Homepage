import { LucideIcon } from 'lucide-react'

export type ScenarioType = 'crisis-detection' | 'medical-boundary' | 'emotional-support' | 'harmful-advice' | 'custom'

export interface TestScenario {
  id: string
  name: string
  type: ScenarioType
  description: string
  icon: LucideIcon
  color: string
  testCases?: string[]
  expectedBehavior: string
  safetyThreshold: number
}

export interface ScenarioResult {
  scenarioId: string
  passed: boolean
  safetyScore: number
  issues: string[]
  recommendations: string[]
}