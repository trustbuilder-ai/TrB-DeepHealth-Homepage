import React from 'react'
import { FileText, Activity, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="testing-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">TrB-DeepHealth</h1>
              <p className="hidden sm:block text-sm text-muted-foreground">LLM Mental Health Testing Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden md:block text-sm text-muted-foreground">
            Testing LLMs for Safe Mental Health Product Development
          </span>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link to="/docs" className="btn btn-outline btn-sm">
              <FileText className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Documentation</span>
            </Link>
            
            <Link to="/dashboard" className="btn btn-outline btn-sm">
              <BarChart3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            
            {!isHomePage && (
              <Link to="/" className="btn btn-primary btn-sm">
                <span className="sm:hidden">Test</span>
                <span className="hidden sm:inline">Start Testing</span>
              </Link>
            )}
            
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      
      {/* Crisis Resources Banner - Always Visible */}
      <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-destructive">
            Crisis Resources: If you're experiencing thoughts of self-harm
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-destructive font-bold">Call 988</span>
            <span>|</span>
            <span className="text-destructive font-bold">Text 988</span>
            <span>|</span>
            <a href="https://988lifeline.org" className="text-destructive font-bold hover:underline">
              Chat at 988lifeline.org
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}