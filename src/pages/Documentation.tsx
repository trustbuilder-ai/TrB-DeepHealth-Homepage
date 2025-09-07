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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testing Platform
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">TrB-DeepHealth Documentation</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Comprehensive guide to testing LLMs for mental health product
            development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold">Safety Testing</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Learn how our platform evaluates LLM responses for crisis
              detection, medical boundary compliance, and emotional
              appropriateness.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Crisis language detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Medical advice boundaries</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Safety score calculation</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Testing Scenarios</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Explore our comprehensive test scenarios designed to validate LLM
              behavior in mental health contexts.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Crisis detection tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Medical boundary tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Emotional support validation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Platform Purpose</h2>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
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
            <h2 className="text-2xl font-semibold mb-4">Target Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Developers</h3>
                  <p className="text-sm text-muted-foreground">
                    Validate LLMs before integrating into mental health
                    applications
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                <Code className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Researchers</h3>
                  <p className="text-sm text-muted-foreground">
                    Study LLM safety and effectiveness in mental health contexts
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                <Shield className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Healthcare Orgs</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure compliance before implementing AI solutions
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-xl font-semibold text-destructive">
                Important Disclaimers
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-destructive">
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
