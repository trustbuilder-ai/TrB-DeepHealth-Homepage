import React from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Award,
  CheckCircle2,
  AlertCircle,
  Info,
  type LucideIcon,
} from "lucide-react";

interface TrustIndicatorsProps {
  variant?: "compact" | "detailed";
  className?: string;
}

interface TrustIndicator {
  id: string;
  label: string;
  description: string;
  status: "verified" | "warning" | "info";
  icon: LucideIcon;
  details?: string[];
}

export function TrustIndicators({
  variant = "compact",
  className,
}: TrustIndicatorsProps) {
  const indicators: TrustIndicator[] = [
    {
      id: "safety-certified",
      label: "Safety Certified",
      description: "AI responses follow mental health safety protocols",
      status: "verified",
      icon: Shield,
      details: [
        "WCAG AA accessibility compliant",
        "Crisis intervention protocols active",
        "Regular safety audits conducted",
        "Ethical AI guidelines enforced",
      ],
    },
    {
      id: "data-protection",
      label: "Data Protected",
      description: "Test data is encrypted and anonymized",
      status: "verified",
      icon: Lock,
      details: [
        "End-to-end encryption",
        "No personal data stored",
        "GDPR compliant",
        "Secure testing environment",
      ],
    },
    {
      id: "transparent",
      label: "Transparent Testing",
      description: "Open methodology and results tracking",
      status: "verified",
      icon: Eye,
      details: [
        "Open source methodology",
        "Real-time safety metrics",
        "Transparent evaluation criteria",
        "Public research findings",
      ],
    },
    {
      id: "research-backed",
      label: "Research Backed",
      description: "Based on clinical mental health research",
      status: "verified",
      icon: FileText,
      details: [
        "Peer-reviewed methodologies",
        "Clinical psychology consultation",
        "Evidence-based safety measures",
        "Academic partnership",
      ],
    },
    {
      id: "community-reviewed",
      label: "Community Reviewed",
      description: "Mental health professionals involved in development",
      status: "info",
      icon: Users,
      details: [
        "Mental health professional advisory board",
        "Community feedback integration",
        "Lived experience consultation",
        "Ongoing stakeholder engagement",
      ],
    },
    {
      id: "ethical-certified",
      label: "Ethically Certified",
      description: "Approved by institutional review board",
      status: "verified",
      icon: Award,
      details: [
        "IRB approval obtained",
        "Ethical guidelines compliance",
        "Regular ethics reviews",
        "Professional standards adherence",
      ],
    },
  ];

  const getStatusIcon = (status: "verified" | "warning" | "info") => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "info":
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusColor = (status: "verified" | "warning" | "info") => {
    switch (status) {
      case "verified":
        return "border-success/20 bg-success/5 hover:bg-success/10";
      case "warning":
        return "border-warning/20 bg-warning/5 hover:bg-warning/10";
      case "info":
        return "border-primary/20 bg-primary/5 hover:bg-primary/10";
    }
  };

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {indicators.map((indicator) => (
          <div
            key={indicator.id}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${getStatusColor(indicator.status)}`}
            title={indicator.description}
          >
            <indicator.icon className="w-4 h-4" />
            <span className="font-medium">{indicator.label}</span>
            {getStatusIcon(indicator.status)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">
            Trust & Safety Indicators
          </h3>
          <p className="text-sm text-text-secondary">
            This platform meets the highest standards for mental health AI
            testing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.id}
            className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${getStatusColor(indicator.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                <indicator.icon className="w-4 h-4 text-text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-text-primary">
                    {indicator.label}
                  </h4>
                  {getStatusIcon(indicator.status)}
                </div>

                <p className="text-sm text-text-secondary mb-3">
                  {indicator.description}
                </p>

                {indicator.details && (
                  <div className="space-y-1">
                    {indicator.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-text-tertiary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-text-tertiary flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Score Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="font-semibold text-text-primary text-lg">
                Platform Trust Score
              </div>
              <div className="text-sm text-text-secondary">
                Based on safety, transparency, and ethical standards
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-success">96.2%</div>
            <div className="text-sm text-text-tertiary">Excellent Rating</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-success to-primary transition-all duration-1000"
              style={{ width: "96.2%" }}
            />
          </div>
          <span className="text-xs text-text-tertiary font-medium">96.2%</span>
        </div>
      </div>
    </div>
  );
}
