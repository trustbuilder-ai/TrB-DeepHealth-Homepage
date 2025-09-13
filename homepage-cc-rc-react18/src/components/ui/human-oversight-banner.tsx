import { Shield, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

/**
 * Human oversight messaging component that displays AI limitations
 * and human validation requirements for mental health applications.
 */
export const HumanOversightBanner = () => {
  const { theme } = useTheme();

  const oversightPoints = [
    {
      icon: Shield,
      title: "Human Validation Required",
      description: "All AI responses require professional review",
      type: "validation",
    },
    {
      icon: Users,
      title: "Licensed Professional Oversight",
      description: "Mental health professionals supervise AI outputs",
      type: "oversight",
    },
    {
      icon: AlertTriangle,
      title: "AI Limitations Acknowledged",
      description: "AI cannot replace human clinical judgment",
      type: "limitation",
    },
  ];

  return (
    <div
      className={cn(
        "border rounded-lg p-4 mb-6",
        "bg-gradient-to-r shadow-sm",
        theme.isDark
          ? "border-amber-600/50 from-amber-900/10 to-orange-900/10 bg-slate-800/30"
          : "border-amber-400/50 from-amber-50/80 to-orange-50/80 bg-white/60",
        "backdrop-blur-sm",
      )}
      role="complementary"
      aria-label="Human oversight and AI limitations notice"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex-shrink-0 p-2 rounded-full",
            theme.isDark ? "bg-amber-900/40" : "bg-amber-100",
          )}
        >
          <Shield
            className={cn(
              "w-5 h-5",
              theme.isDark ? "text-amber-400" : "text-amber-600",
            )}
          />
        </div>

        <div className="flex-1">
          <h3
            className={cn(
              "text-lg font-semibold mb-3",
              theme.isDark ? "text-amber-300" : "text-amber-800",
            )}
          >
            Professional Oversight & AI Limitations
          </h3>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 mb-4">
            {oversightPoints.map((point, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg",
                  theme.isDark ? "bg-slate-700/30" : "bg-white/70",
                  "border",
                  theme.isDark ? "border-slate-600/50" : "border-gray-200/50",
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 p-1.5 rounded",
                    point.type === "validation"
                      ? theme.isDark
                        ? "bg-green-800/50"
                        : "bg-green-200"
                      : point.type === "oversight"
                        ? theme.isDark
                          ? "bg-blue-800/50"
                          : "bg-blue-200"
                        : theme.isDark
                          ? "bg-amber-800/50"
                          : "bg-amber-200",
                  )}
                >
                  <point.icon
                    className={cn(
                      "w-4 h-4",
                      point.type === "validation"
                        ? theme.isDark
                          ? "text-green-300"
                          : "text-green-700"
                        : point.type === "oversight"
                          ? theme.isDark
                            ? "text-blue-300"
                            : "text-blue-700"
                          : theme.isDark
                            ? "text-amber-300"
                            : "text-amber-700",
                    )}
                  />
                </div>

                <div className="flex-1">
                  <p className={cn("text-sm font-medium mb-1", theme.text)}>
                    {point.title}
                  </p>
                  <p className={cn("text-xs", theme.textMuted)}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "flex items-center gap-2 p-3 rounded-lg",
              theme.isDark ? "bg-slate-700/50" : "bg-gray-50",
              "border",
              theme.isDark ? "border-slate-600" : "border-gray-200",
            )}
          >
            <CheckCircle2
              className={cn(
                "w-4 h-4 flex-shrink-0",
                theme.isDark ? "text-green-400" : "text-green-600",
              )}
            />
            <p className={cn("text-sm", theme.textSecondary)}>
              <strong>Important:</strong> This platform is designed for research
              and testing purposes only. AI-generated responses are not medical
              advice and must always be reviewed by qualified mental health
              professionals before being used in any clinical or therapeutic
              context.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compact badge version for inline use
 */
export const AILimitationsBadge = ({ className }: { className?: string }) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        theme.isDark
          ? "bg-amber-900/20 text-amber-300 border border-amber-600/30"
          : "bg-amber-100 text-amber-800 border border-amber-300/50",
        className,
      )}
    >
      <AlertTriangle className="w-3 h-3" />
      <span>Professional Review Required</span>
    </div>
  );
};
