import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/shared/Header';
import { CrisisBanner } from './components/shared/CrisisBanner';
import { MobileMenu } from './components/shared/MobileMenu';
import { HomePage } from './pages/HomePage';
import { TestingPage } from './pages/TestingPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ResultsPage } from './pages/ResultsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { useTheme } from './hooks/useTheme';
import './styles/globals.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-therapeutic">
      {/* Non-dismissible Crisis Banner */}
      <CrisisBanner />
      
      {/* Header */}
      <Header 
        currentTheme={theme}
        onThemeChange={toggleTheme}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      />
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Routes */}
      <main className="animate-in fade-in duration-500">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              TrB-DeepHealth - LLM Mental Health Testing Platform
            </p>
            <p className="text-sm text-gray-400">
              This is a testing platform for LLM validation, not a mental health service.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;