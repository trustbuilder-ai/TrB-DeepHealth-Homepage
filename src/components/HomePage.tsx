import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Shield, Brain, AlertTriangle, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - matches implementation plan layout */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                TrB-DeepHealth: LLM Mental Health Testing Platform
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Testing LLMs for Safe Mental Health Product Development
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/mental-health"
                className="btn btn-primary flex items-center gap-2"
              >
                Start Testing
              </Link>
              <Link
                to="/docs"
                className="btn btn-outline flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Docs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content matching plan structure */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">

            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              A comprehensive testing platform for developers, researchers, and
              healthcare organizations to validate LLM safety and effectiveness
              before deployment in mental health applications.
            </p>
          </div>

          {/* Core Testing Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card text-center hover-lift">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold mb-2">Crisis Detection</h3>
              <p className="text-sm text-muted-foreground">Multi-turn self-harm detection and intervention testing</p>
            </div>
            
            <div className="card text-center hover-lift">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Medical Boundary</h3>
              <p className="text-sm text-muted-foreground">Testing LLM adherence to medical advice limitations</p>
            </div>
            
            <div className="card text-center hover-lift">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2">Emotional Support</h3>
              <p className="text-sm text-muted-foreground">Validating appropriate empathy and emotional responses</p>
            </div>
            
            <div className="card text-center hover-lift">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Safety Scoring</h3>
              <p className="text-sm text-muted-foreground">Comprehensive safety evaluation and metrics</p>
            </div>
          </div>
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mental-health"
              className="btn btn-primary btn-lg flex items-center gap-2 justify-center"
            >
              Start Testing Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="btn btn-outline btn-lg flex items-center gap-2 justify-center"
            >
              View Demo
              <Brain className="w-5 h-5" />
            </Link>
          </div>

          {/* Important disclaimer */}
          <div className="mt-12 bg-muted/30 border border-border rounded-lg p-6 text-sm text-muted-foreground max-w-2xl mx-auto">
            <p className="font-medium text-foreground mb-2">
              Important Notice:
            </p>
            <p>
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
