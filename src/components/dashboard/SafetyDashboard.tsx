import React, { useState, useEffect } from "react";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
  Brain,
  Heart,
  Activity,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TestResult } from "../../types/test.types";

interface SafetyDashboardProps {
  className?: string;
  recentTests?: TestResult[];
}

interface RealTimeMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: LucideIcon;
  color: string;
  suffix?: string;
}

export function SafetyDashboard({ className }: SafetyDashboardProps) {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      const baseMetrics: RealTimeMetric[] = [
        {
          id: "safety-score",
          label: "Avg Safety Score",
          value: 89.2 + Math.random() * 10,
          change: (Math.random() - 0.5) * 4,
          trend: Math.random() > 0.3 ? "up" : "down",
          icon: Shield,
          color: "success",
          suffix: "%",
        },
        {
          id: "crisis-detection",
          label: "Crisis Detection Rate",
          value: 94.8 + Math.random() * 5,
          change: (Math.random() - 0.3) * 3,
          trend: Math.random() > 0.2 ? "up" : "stable",
          icon: AlertTriangle,
          color: "crisis",
          suffix: "%",
        },
        {
          id: "response-time",
          label: "Avg Response Time",
          value: 1.2 + Math.random() * 0.8,
          change: (Math.random() - 0.6) * 0.4,
          trend: Math.random() > 0.4 ? "down" : "up",
          icon: Clock,
          color: "primary",
          suffix: "s",
        },
        {
          id: "empathy-score",
          label: "Empathy Index",
          value: 8.1 + Math.random() * 1.8,
          change: (Math.random() - 0.4) * 1,
          trend: Math.random() > 0.3 ? "up" : "stable",
          icon: Heart,
          color: "accent",
          suffix: "/10",
        },
        {
          id: "boundary-compliance",
          label: "Boundary Compliance",
          value: 91.5 + Math.random() * 8,
          change: (Math.random() - 0.3) * 2,
          trend: Math.random() > 0.25 ? "up" : "down",
          icon: Target,
          color: "primary-light",
          suffix: "%",
        },
        {
          id: "active-tests",
          label: "Active Test Sessions",
          value: Math.floor(Math.random() * 15) + 5,
          change: Math.floor((Math.random() - 0.5) * 8),
          trend: Math.random() > 0.4 ? "up" : "down",
          icon: Activity,
          color: "warning",
          suffix: "",
        },
      ];

      setMetrics(baseMetrics);
    };

    updateMetrics();

    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(updateMetrics, 3000 + Math.random() * 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const getMetricColor = (color: string) => {
    switch (color) {
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "crisis":
        return "text-crisis bg-crisis/10 border-crisis/20";
      case "primary":
        return "text-primary bg-primary/10 border-primary/20";
      case "accent":
        return "text-accent-dark bg-accent/10 border-accent/20";
      case "primary-light":
        return "text-primary-light bg-primary-light/10 border-primary-light/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      default:
        return "text-text-secondary bg-background/10 border-border/20";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "stable", change: number) => {
    if (trend === "up" && change > 0) {
      return <TrendingUp className="w-3 h-3 text-success" />;
    } else if (trend === "down" && change < 0) {
      return <TrendingDown className="w-3 h-3 text-crisis" />;
    } else {
      return <div className="w-3 h-3 rounded-full bg-text-tertiary" />;
    }
  };

  const formatValue = (value: number, suffix: string) => {
    if (suffix === "%" || suffix === "/10") {
      return value.toFixed(1);
    } else if (suffix === "s") {
      return value.toFixed(2);
    } else {
      return Math.round(value).toString();
    }
  };

  const formatChange = (change: number, suffix: string) => {
    const prefix = change >= 0 ? "+" : "";
    if (suffix === "%" || suffix === "/10" || suffix === "s") {
      return `${prefix}${change.toFixed(1)}`;
    } else {
      return `${prefix}${Math.round(change)}`;
    }
  };

  return (
    <div
      className={`bg-surface rounded-lg border border-border/50 ${className}`}
    >
      {/* Dashboard Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-text-primary">
              Safety Dashboard
            </h2>
            <p className="text-sm text-text-secondary">
              Real-time mental health AI monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isLive
                ? "bg-success/10 text-success border border-success/20"
                : "bg-background text-text-secondary border border-border"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${isLive ? "bg-success animate-pulse" : "bg-text-tertiary"}`}
            />
            {isLive ? "Live" : "Paused"}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getMetricColor(metric.color)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                {getTrendIcon(metric.trend, metric.change)}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatValue(metric.value, metric.suffix || "")}
                    <span className="text-sm font-normal ml-1">
                      {metric.suffix}
                    </span>
                  </div>
                  <div
                    className={`text-xs ${
                      metric.change >= 0 ? "text-success" : "text-crisis"
                    }`}
                  >
                    {formatChange(metric.change, metric.suffix || "")} from last
                    hour
                  </div>
                </div>

                {isLive && (
                  <div className="flex items-center">
                    <Zap className="w-3 h-3 text-warning animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-text-primary">Recent Activity</h3>
          <span className="text-xs text-text-tertiary">Last 24 hours</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {147 + Math.floor(Math.random() * 50)}
            </div>
            <div className="text-xs text-text-secondary">
              Messages Processed
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-crisis/10 rounded-full mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-crisis" />
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {3 + Math.floor(Math.random() * 5)}
            </div>
            <div className="text-xs text-text-secondary">
              Crisis Interventions
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {89 + Math.floor(Math.random() * 10)}%
            </div>
            <div className="text-xs text-text-secondary">Safety Compliance</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-accent-dark" />
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {12 + Math.floor(Math.random() * 8)}
            </div>
            <div className="text-xs text-text-secondary">
              Active Researchers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
