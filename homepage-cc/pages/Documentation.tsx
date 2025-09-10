import {
  ArrowLeft,
  BookOpen,
  Shield,
  Code,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Documentation() {
  return (
    <div className="testing-interface">
      <div className="page-container py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testing Platform
          </Link>
        </div>

        <div className="section-header">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="section-title">TrB-DeepHealth Documentation</h1>
          </div>
          <p className="section-description">
            Comprehensive guide to testing LLMs for mental health product
            development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="mental-health-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold">Safety Testing</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Learn how our platform evaluates LLM responses for crisis
              detection, medical boundary compliance, and emotional
              appropriateness.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Crisis language detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Medical advice boundaries</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Safety score calculation</span>
              </li>
            </ul>
          </div>

          <div className="mental-health-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold">Testing Scenarios</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Explore our comprehensive test scenarios designed to validate LLM
              behavior in mental health contexts.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Crisis detection tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Medical boundary tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Emotional support validation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Platform Purpose</h2>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                TrB-DeepHealth is designed specifically for{" "}
                <strong>testing and evaluating</strong> Large Language Models
                before they are deployed in mental health products. This
                platform is <strong>not a mental health service</strong>- it's a
                comprehensive testing environment for developers, researchers,
                and healthcare organizations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Target Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mental-health-card">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Developers</h3>
                  <p className="text-muted-foreground">
                    Validate LLMs before integrating into mental health
                    applications
                  </p>
                </div>
              </div>
              <div className="mental-health-card">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Researchers</h3>
                  <p className="text-muted-foreground">
                    Study LLM safety and effectiveness in mental health contexts
                  </p>
                </div>
              </div>
              <div className="mental-health-card">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Healthcare Orgs</h3>
                  <p className="text-muted-foreground">
                    Ensure compliance before implementing AI solutions
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mental-health-card bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                Important Disclaimers
              </h2>
            </div>
            <ul className="space-y-3 text-red-700 dark:text-red-400">
              <li>
                • This platform is for testing purposes only - not for providing
                mental health services
              </li>
              <li>
                • Always include human oversight in mental health AI
                applications
              </li>
              <li>
                • Crisis detection should always route to professional resources
                (988 Lifeline)
              </li>
              <li>
                • No personal health information should be processed during
                testing
              </li>
              <li>
                • Compliance with healthcare regulations (HIPAA, etc.) is the
                user's responsibility
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
