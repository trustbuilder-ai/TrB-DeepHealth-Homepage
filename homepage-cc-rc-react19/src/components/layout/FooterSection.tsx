import { Brain, Globe, Heart, Wifi, WifiOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrisisBanner } from "@/components/ui/crisis-banner";
import { useTheme } from "@/hooks/useTheme";

interface FooterSectionProps {
  isOnline: boolean;
  expandedFooterSections: Record<string, boolean>;
  setExpandedFooterSections: (
    value:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>),
  ) => void;
}

export const FooterSection = ({
  isOnline,
  expandedFooterSections,
  setExpandedFooterSections,
}: FooterSectionProps) => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-16 ${theme.surface} border-t ${theme.border}`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 mb-8 lg:items-start">
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-r ${theme.primary} flex items-center justify-center shadow-lg ${theme.glow}`}
              >
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-semibold ${theme.text}`}>
                Astra Labs
              </span>
            </div>
            <p className={`text-sm ${theme.textSecondary} mb-6`}>
              Building safer AI for mental health with research-backed design.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" theme={theme}>
                <Globe className="w-4 h-4 icon-dynamic" />
              </Button>
              {isOnline ? (
                <Wifi
                  className={`w-4 h-4 ml-2 ${theme.isDark ? "text-green-400" : "text-green-500"}`}
                  aria-label="Online"
                />
              ) : (
                <WifiOff
                  className={`w-4 h-4 ml-2 ${theme.isDark ? "text-red-400" : "text-red-500"}`}
                  aria-label="Offline"
                />
              )}
            </div>
          </div>

          {/* Desktop: Side by side sections */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:col-span-4 gap-8">
            {[
              {
                title: "Platform",
                items: [
                  "LLM Testing",
                  "Safety Protocols",
                  "Analytics Dashboard",
                  "API Access",
                ],
              },
              {
                title: "Research",
                items: [
                  "Case Studies",
                  "White Papers",
                  "Best Practices",
                  "Publications",
                ],
              },
              {
                title: "Resources",
                items: ["Documentation", "Tutorials", "Community", "Blog"],
              },
              {
                title: "Support",
                items: [
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className={`font-semibold ${theme.text} mb-3`}>
                  {section.title}
                </h3>
                <nav aria-label={`${section.title} links`}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`text-sm ${theme.textSecondary} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Mobile: Expandable sections */}
          <div className="lg:hidden space-y-4">
            {[
              {
                id: "platform",
                title: "Platform",
                items: [
                  "LLM Testing",
                  "Safety Protocols",
                  "Analytics Dashboard",
                  "API Access",
                ],
              },
              {
                id: "research",
                title: "Research",
                items: [
                  "Case Studies",
                  "White Papers",
                  "Best Practices",
                  "Publications",
                ],
              },
              {
                id: "resources",
                title: "Resources",
                items: ["Documentation", "Tutorials", "Community", "Blog"],
              },
              {
                id: "support",
                title: "Support",
                items: [
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ],
              },
            ].map((section) => {
              const isExpanded =
                expandedFooterSections[
                  section.id as keyof typeof expandedFooterSections
                ];

              return (
                <div
                  key={section.id}
                  className={`border rounded-lg ${theme.border}`}
                >
                  <button
                    onClick={() =>
                      setExpandedFooterSections(
                        (prev: typeof expandedFooterSections) => ({
                          ...prev,
                          [section.id]: !prev[section.id as keyof typeof prev],
                        }),
                      )
                    }
                    aria-expanded={isExpanded}
                    aria-controls={`footer-section-${section.id}`}
                    className={`w-full flex items-center justify-between p-4 text-left ${theme.surface} rounded-lg transition-colors hover:bg-opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                  >
                    <h3 className={`font-semibold ${theme.text}`}>
                      {section.title}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 ${theme.textSecondary} transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <div
                      id={`footer-section-${section.id}`}
                      className="px-4 pb-4"
                    >
                      <nav aria-label={`${section.title} links`}>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                className={`text-sm ${theme.textSecondary} transition-colors block py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded`}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Crisis Support Banner - below all footer sections */}
        <aside
          role="complementary"
          aria-label="Crisis support and mental health resources"
        >
          <div className="mt-8">
            <CrisisBanner />
          </div>
        </aside>

        <div
          className={`border-t ${theme.border} mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between`}
        >
          <p className={`text-sm ${theme.textSecondary}`}>
            © 2025 Astra Labs. Building safer AI for mental health with
            research-backed design.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className={`text-xs ${theme.textMuted}`}>Made with</span>
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${theme.isDark ? "bg-rose-900/30" : "bg-rose-100"} transition-colors`}
            >
              <Heart
                className={`w-3 h-3 ${theme.isDark ? "text-rose-400" : "text-rose-600"}`}
              />
            </div>
            <span className={`text-xs ${theme.textMuted}`}>
              for mental wellness
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
