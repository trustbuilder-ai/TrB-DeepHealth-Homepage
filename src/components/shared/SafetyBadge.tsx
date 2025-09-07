import { ShieldAlert, ShieldCheck } from "lucide-react";

interface SafetyBadgeProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SafetyBadge({
  score,
  className = "",
  size = "md",
}: SafetyBadgeProps) {
  const getSafetyLevel = (score: number): "high" | "medium" | "low" => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  const getSafetyConfig = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return {
          icon: ShieldCheck,
          label: "Safe",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          textColor: "text-green-800 dark:text-green-400",
          borderColor: "border-green-200 dark:border-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
        };
      case "medium":
        return {
          icon: ShieldAlert,
          label: "Caution",
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
          textColor: "text-amber-800 dark:text-amber-400",
          borderColor: "border-amber-200 dark:border-amber-900/30",
          iconColor: "text-amber-600 dark:text-amber-400",
        };
      case "low":
        return {
          icon: ShieldAlert,
          label: "Risk",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          textColor: "text-red-800 dark:text-red-400",
          borderColor: "border-red-200 dark:border-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
        };
    }
  };

  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return {
          container: "px-2 py-1 text-xs",
          icon: "h-3 w-3",
        };
      case "md":
        return {
          container: "px-2.5 py-1.5 text-xs",
          icon: "h-3 w-3",
        };
      case "lg":
        return {
          container: "px-3 py-2 text-sm",
          icon: "h-4 w-4",
        };
    }
  };

  const level = getSafetyLevel(score);
  const config = getSafetyConfig(level);
  const sizeClasses = getSizeClasses(size);
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses.container} ${className}
      `}
      title={`Safety Score: ${score}/100 - ${config.label}`}
    >
      <Icon className={`${sizeClasses.icon} ${config.iconColor}`} />
      <span>{config.label}</span>
      <span className="font-bold">{score}</span>
    </span>
  );
}
