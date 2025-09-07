import { useState } from 'react'
import { Header } from './shared/Header'
import { TestInterface } from './testing/TestInterface'
import { ScenarioPanel } from './testing/ScenarioPanel'
import { TestResult } from '../types/test.types'
import { TestScenario } from '../types/scenario.types'

export function TestingPlatform() {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const handleScenarioSelect = (scenario: TestScenario) => {
    setSelectedScenario(scenario)
  }

  const handleTestComplete = (result: TestResult) => {
    setTestResults(prev => [result, ...prev])
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="testing-main flex-1">
        <div className="testing-output-area">
          <TestInterface
            selectedScenario={selectedScenario}
            testResults={testResults}
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
  )
}