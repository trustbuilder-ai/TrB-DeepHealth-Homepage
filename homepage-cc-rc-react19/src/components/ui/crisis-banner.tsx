import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

/**
 * Crisis support banner providing immediate access to mental health resources
 * and suicide prevention hotlines. Prominently displays 988 crisis resources.
 */
export const CrisisBanner = () => {
  const { theme } = useTheme();

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      description: "24/7 free and confidential support",
      urgent: true,
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 crisis support via text",
      urgent: false,
    },
    {
      name: "SAMHSA Helpline",
      phone: "1-800-662-HELP",
      description: "Treatment referral and information",
      urgent: false,
    },
  ];

  return (
    <div
      className={cn(
        "border-l-4 rounded-lg p-4 mb-6",
        "bg-gradient-to-r shadow-lg",
        theme.isDark
          ? "border-red-400 from-red-900/20 to-orange-900/20 bg-slate-800/50"
          : "border-red-500 from-red-50 to-orange-50 bg-white/80",
        "backdrop-blur-sm",
      )}
      role="complementary"
      aria-label="Crisis support resources"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3
            className={cn(
              "text-lg font-semibold mb-2",
              theme.isDark ? "text-red-300" : "text-red-800",
            )}
          >
            Crisis Support Available 24/7
          </h3>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
            {crisisResources.map((resource, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  theme.isDark
                    ? "bg-slate-700/50 hover:bg-slate-700/70"
                    : "bg-white/70 hover:bg-white/90",
                  "border",
                  theme.isDark ? "border-slate-600" : "border-gray-200",
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 p-1.5 rounded",
                    resource.urgent
                      ? theme.isDark
                        ? "bg-red-800/50"
                        : "bg-red-200"
                      : theme.isDark
                        ? "bg-blue-800/50"
                        : "bg-blue-200",
                  )}
                >
                  {resource.phone.includes("Text") ? (
                    <MessageCircle
                      className={cn(
                        "w-4 h-4",
                        resource.urgent
                          ? theme.isDark
                            ? "text-red-300"
                            : "text-red-700"
                          : theme.isDark
                            ? "text-blue-300"
                            : "text-blue-700",
                      )}
                    />
                  ) : (
                    <Phone
                      className={cn(
                        "w-4 h-4",
                        resource.urgent
                          ? theme.isDark
                            ? "text-red-300"
                            : "text-red-700"
                          : theme.isDark
                            ? "text-blue-300"
                            : "text-blue-700",
                      )}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", theme.text)}>
                    {resource.name}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      resource.urgent
                        ? theme.isDark
                          ? "text-red-300"
                          : "text-red-700"
                        : theme.isDark
                          ? "text-blue-300"
                          : "text-blue-700",
                    )}
                  >
                    {resource.phone}
                  </p>
                  <p className={cn("text-xs", theme.textMuted)}>
                    {resource.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-3 pt-3 border-t",
              theme.isDark ? "border-slate-600" : "border-gray-200",
            )}
          >
            <p
              className={cn(
                "text-sm flex items-center gap-2",
                theme.textSecondary,
              )}
            >
              <ExternalLink className="w-4 h-4" />
              <span>
                If you're in immediate danger, call 911 or go to your nearest
                emergency room. For more resources, visit{" "}
                <a
                  href="https://988lifeline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "font-medium underline hover:no-underline",
                    theme.isDark ? "text-blue-400" : "text-blue-600",
                  )}
                >
                  988lifeline.org
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
