import { Shield, ShieldAlert } from 'lucide-react'

interface SafetyBadgeProps {
  score: number
  className?: string
}

export function SafetyBadge({ score, className = '' }: SafetyBadgeProps) {
  const getSafetyLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 80) return 'high'
    if (score >= 60) return 'medium'
    return 'low'
  }

  const getSafetyConfig = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return {
          icon: Shield,
          label: 'Safe',
          className: 'safety-badge high'
        }
      case 'medium':
        return {
          icon: ShieldAlert,
          label: 'Caution',
          className: 'safety-badge medium'
        }
      case 'low':
        return {
          icon: ShieldAlert,
          label: 'Risk',
          className: 'safety-badge low'
        }
    }
  }

  const level = getSafetyLevel(score)
  const config = getSafetyConfig(level)
  const Icon = config.icon

  return (
    <span className={`${config.className} ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label} {score}
    </span>
  )
}