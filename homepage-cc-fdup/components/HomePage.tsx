import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Shield,
  Brain,
  AlertTriangle,
  Heart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="testing-interface">
      {/* Header - matches implementation plan layout */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50 animate-slide-up">
        <div className="page-container py-6">
          <div className="flex items-center justify-between">
            <div className="animate-slide-in-left">
              <h1 className="text-3xl font-bold text-foreground mb-2 gradient-text">
                TrB-DeepHealth: LLM Mental Health Testing Platform
              </h1>
              <p className="text-base text-muted-foreground">
                Testing LLMs for Safe Mental Health Product Development
              </p>
            </div>
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Link
                to="/mental-health"
                className="btn btn-primary btn-lg flex items-center gap-2 shadow-lg hover-lift animate-pulse-slow"
              >
                <Shield className="w-5 h-5" />
                Start Testing
              </Link>
              <Link
                to="/docs"
                className="btn btn-outline btn-lg flex items-center gap-2 hover-glow"
              >
                <FileText className="w-4 h-4" />
                Docs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content matching plan structure */}
      <main className="py-16">
        <div className="page-container">
          <div className="section-header animate-fade-in">
            <h2 className="section-title gradient-text-warm">
              Comprehensive LLM Safety Testing for Mental Health Applications
            </h2>
            <p className="section-description leading-relaxed animate-slide-up">
              A comprehensive testing platform for developers, researchers, and
              healthcare organizations to validate LLM safety and effectiveness
              before deployment in mental health applications.
            </p>
          </div>

          {/* Core Testing Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 stagger-children">
            <div className="mental-health-card text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 hover-glow animate-float">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crisis Detection</h3>
              <p className="text-muted-foreground">
                Multi-turn self-harm detection and intervention testing
              </p>
            </div>

            <div className="mental-health-card text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 hover-glow animate-float">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medical Boundary</h3>
              <p className="text-muted-foreground">
                Testing LLM adherence to medical advice limitations
              </p>
            </div>

            <div className="mental-health-card text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 hover-glow animate-float">
                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Emotional Support</h3>
              <p className="text-muted-foreground">
                Validating appropriate empathy and emotional responses
              </p>
            </div>

            <div className="mental-health-card text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 hover-glow animate-float">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety Scoring</h3>
              <p className="text-muted-foreground">
                Comprehensive safety evaluation and metrics
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-bounce-in">
            <Link
              to="/mental-health"
              className="btn btn-primary btn-lg flex items-center gap-3 justify-center shadow-lg hover:shadow-xl hover-lift animate-pulse-slow"
            >
              <Shield className="w-5 h-5" />
              Start Testing Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="btn btn-outline btn-lg flex items-center gap-3 justify-center hover-glow hover-scale"
            >
              <Brain className="w-5 h-5" />
              View Demo
            </Link>
          </div>

          {/* Important disclaimer */}
          <div className="mental-health-card bg-muted/30 max-w-3xl mx-auto text-center animate-slide-up hover-lift-gentle">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-breathe">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="font-semibold text-foreground mb-3 text-lg">
              Important Notice:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This platform is for testing and validation purposes only. We do
              not provide mental health services or medical advice. This is a
              professional tool for developers and researchers testing LLM
              safety before deployment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
