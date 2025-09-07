import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header - matches implementation plan layout */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                TrB-DeepHealth: LLM Mental Health Testing Platform
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/platform"
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

      {/* Simple main content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">
            <p className="text-xl text-muted-foreground mb-8">
              Testing LLMs for Safe Mental Health Product Development
            </p>

            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              A comprehensive testing platform for developers, researchers, and
              healthcare organizations to validate LLM safety and effectiveness
              before deployment in mental health applications.
            </p>
          </div>

          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/platform"
              className="btn btn-primary btn-lg flex items-center gap-2 justify-center"
            >
              Start Testing Platform
              <ArrowRight className="w-5 h-5" />
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
