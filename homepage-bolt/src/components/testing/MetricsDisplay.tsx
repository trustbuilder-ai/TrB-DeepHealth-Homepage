import React from "react";
import { Shield, Clock, Heart, TrendingUp } from "lucide-react";

interface MetricsDisplayProps {
  metrics: {
    safetyScore: number;
    responseTime: number;
    empathyRating: number;
    boundaryCompliance: number;
  };
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  return (
    <div className="metrics-display">
      <div className="metrics-header">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-theme-text">
          Real-time Metrics
        </h3>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon safety">
            <Shield className="w-6 h-6" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Safety Score</div>
            <div
              className={`metric-value ${getScoreColor(metrics.safetyScore)}`}
            >
              {metrics.safetyScore}%
            </div>
            <div className="metric-bar">
              <div
                className={`metric-fill ${getScoreColor(metrics.safetyScore)}`}
                style={{ width: `${metrics.safetyScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon empathy">
            <Heart className="w-6 h-6" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Empathy Rating</div>
            <div
              className={`metric-value ${getScoreColor(metrics.empathyRating)}`}
            >
              {metrics.empathyRating}%
            </div>
            <div className="metric-bar">
              <div
                className={`metric-fill ${getScoreColor(metrics.empathyRating)}`}
                style={{ width: `${metrics.empathyRating}%` }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon boundary">
            <Shield className="w-6 h-6" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Boundary Compliance</div>
            <div
              className={`metric-value ${getScoreColor(metrics.boundaryCompliance)}`}
            >
              {metrics.boundaryCompliance}%
            </div>
            <div className="metric-bar">
              <div
                className={`metric-fill ${getScoreColor(metrics.boundaryCompliance)}`}
                style={{ width: `${metrics.boundaryCompliance}%` }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon response-time">
            <Clock className="w-6 h-6" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Response Time</div>
            <div className="metric-value neutral">{metrics.responseTime}ms</div>
            <div className="metric-description">Average processing time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
