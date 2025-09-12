import React from "react";
import {
  FileText,
  Activity,
  BarChart3,
  Home,
  Shield,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="testing-header shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/15 transition-colors">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                TrB-DeepHealth
              </h1>
              <p className="hidden sm:block text-xs font-medium text-muted-foreground">
                LLM Mental Health Testing Platform
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:block">
            <div className="bg-primary/5 border border-primary/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-primary">
                LLM Mental Health Testing Platform
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            {!isHomePage && (
              <Link to="/" className="btn btn-ghost btn-sm" title="Home">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}

            <Link
              to="/docs"
              className="btn btn-outline btn-sm"
              title="Documentation"
            >
              <FileText className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Docs</span>
            </Link>

            <Link
              to="/dashboard"
              className="btn btn-outline btn-sm"
              title="Dashboard"
            >
              <BarChart3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {isHomePage && (
              <Link
                to="/mental-health"
                className="btn btn-primary btn-sm shadow-sm hover:shadow-md transition-all"
              >
                <Shield className="h-4 w-4 sm:mr-2" />
                <span>Start Testing</span>
              </Link>
            )}

            <div className="border-l border-border pl-3 ml-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Enhanced Crisis Resources Banner - Research-Based Design */}
      <div className="mt-4 animate-fade-in">
        <div
          className="crisis-banner"
          style={{
            background:
              "linear-gradient(135deg, var(--mental-health-coral) 5%, #dc2626 95%)",
            border: "2px solid var(--mental-health-crisis)",
            boxShadow: "0 4px 20px rgba(220, 38, 38, 0.15)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 animate-breathe">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <p className="font-bold text-lg mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Crisis Support - You Are Not Alone
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  If you're experiencing thoughts of self-harm or are in
                  immediate danger,
                  <br className="hidden sm:block" /> please reach out for help
                  immediately.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:988"
                className="glass-card bg-white/95 text-red-600 px-4 py-3 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-0"
                title="Call 988 Suicide & Crisis Lifeline"
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Call 988</span>
              </a>
              <a
                href="sms:741741"
                className="glass-card bg-white/90 text-red-600 px-4 py-3 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-0"
                title="Text HOME to 741741"
              >
                <Heart className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Text Crisis</span>
              </a>
              <a
                href="https://988lifeline.org/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card bg-white/85 text-red-600 px-4 py-3 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-0"
                title="Chat online with crisis counselors"
              >
                <Activity className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Chat Online</span>
              </a>
            </div>
          </div>

          {/* Availability indicator */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/80 text-xs text-center">
              ✓ Available 24/7 • Free & Confidential • Multilingual Support
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
