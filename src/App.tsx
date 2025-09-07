import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TestingPlatform } from './components/TestingPlatform'
import { Documentation } from './pages/Documentation'
import { Dashboard } from './pages/Dashboard'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="testing-interface">
          <Routes>
            <Route path="/" element={<TestingPlatform />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App