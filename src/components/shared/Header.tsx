import React from "react";
import { FileText, Activity, BarChart3, Home, Shield } from "lucide-react";
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
                Testing LLMs for Safe Mental Health Product Development
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
                to="/platform"
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

      {/* Crisis Resources Banner - Always Visible */}
      <div className="mt-4">
        <div className="bg-gradient-to-r from-destructive/5 to-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-destructive text-sm mb-1">
                  24/7 Crisis Support Available
                </p>
                <p className="text-xs text-muted-foreground">
                  If you're experiencing thoughts of self-harm, help is
                  available
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a
                href="tel:988"
                className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg font-bold hover:bg-destructive/90 transition-colors"
              >
                Call 988
              </a>
              <a
                href="sms:988"
                className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg font-bold hover:bg-destructive/90 transition-colors"
              >
                Text 988
              </a>
              <a
                href="https://988lifeline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg font-bold hover:bg-destructive/90 transition-colors"
              >
                Chat Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
