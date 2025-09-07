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
      bgColor: 'bg-medical-green-100',
      textColor: 'text-medical-green-800',
      iconColor: 'text-medical-green-600'
    },
    'crisis-detection': {
      icon: Shield,
      text: 'Crisis Detection',
      description: 'Real-time crisis language monitoring with immediate 988 routing',
      bgColor: 'bg-coral-alert-100',
      textColor: 'text-coral-alert-800',
      iconColor: 'text-coral-alert-600'
    },
    'boundary-compliance': {
      icon: CheckCircle,
      text: 'Medical Boundaries',
      description: 'No diagnosis, treatment, or medication advice provided',
      bgColor: 'bg-trust-teal-100',
      textColor: 'text-trust-teal-800',
      iconColor: 'text-trust-teal-600'
    },
    'testing-only': {
      icon: AlertTriangle,
      text: 'Testing Platform Only',
      description: 'This is not a therapy service - for LLM evaluation purposes',
      bgColor: 'bg-warm-peach-100',
      textColor: 'text-warm-peach-800',
      iconColor: 'text-warm-peach-600'
    }
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${badge.bgColor} ${badge.textColor} ${className}`}>
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
    <div className={`bg-white rounded-therapeutic shadow-gentle p-4 border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Platform Safety Features</h3>
      <div className="space-y-2">
        <SafetyBadge type="testing-only" />
        <SafetyBadge type="human-oversight" />
        <SafetyBadge type="crisis-detection" />
        <SafetyBadge type="boundary-compliance" />
      </div>
      <p className="text-xs text-gray-500 mt-3">
        This platform tests LLMs for mental health product development. 
        It is not a mental health service and does not provide therapy or medical advice.
      </p>
    </div>
  );
};