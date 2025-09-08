import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Users } from 'lucide-react';

interface SafetyBadgeProps {
  type: 'human-oversight' | 'crisis-detection' | 'boundary-compliance' | 'testing-only';
  className?: string;
}

export const SafetyBadge: React.FC<SafetyBadgeProps> = ({ type, className = '' }) => {
  const badges = {
    'human-oversight': {
      icon: Users,
      text: 'Human Oversight',
      description: 'All responses validated by mental health professionals',
      bgColor: 'bg-success-100',
      textColor: 'text-success-800',
      iconColor: 'text-success-600'
    },
    'crisis-detection': {
      icon: Shield,
      text: 'Crisis Detection',
      description: 'Real-time crisis language monitoring with immediate 988 routing',
      bgColor: 'bg-alert-100',
      textColor: 'text-alert-800',
      iconColor: 'text-alert-600'
    },
    'boundary-compliance': {
      icon: CheckCircle,
      text: 'Medical Boundaries',
      description: 'No diagnosis, treatment, or medication advice provided',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-800',
      iconColor: 'text-primary-600'
    },
    'testing-only': {
      icon: AlertTriangle,
      text: 'Testing Platform Only',
      description: 'This is not a therapy service - for LLM evaluation purposes',
      bgColor: 'bg-warning-100',
      textColor: 'text-warning-800',
      iconColor: 'text-warning-600'
    }
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium ${badge.bgColor} ${badge.textColor} ${className}`}>
      <Icon className={`h-4 w-4 ${badge.iconColor}`} />
      <span>{badge.text}</span>
    </div>
  );
};

interface SafetyIndicatorProps {
  className?: string;
}

export const SafetyIndicator: React.FC<SafetyIndicatorProps> = ({ className = '' }) => {
  return (
    <div className={`card-elevated ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 font-display">Platform Safety Features</h3>
      <div className="space-y-3">
        <SafetyBadge type="testing-only" />
        <SafetyBadge type="human-oversight" />
        <SafetyBadge type="crisis-detection" />
        <SafetyBadge type="boundary-compliance" />
      </div>
      <p className="text-sm text-gray-500 mt-4 leading-relaxed">
        This platform tests LLMs for mental health product development. 
        It is not a mental health service and does not provide therapy or medical advice.
      </p>
    </div>
  );
};