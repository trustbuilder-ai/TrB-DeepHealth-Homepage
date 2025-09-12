import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  Heart,
  Search,
  Play,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Brain,
  Users,
  Wifi,
  WifiOff,
  ChevronDown,
  Globe,
  TrendingUp,
  Lightbulb,
  X,
} from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { scenarios, mockAnalytics, mockConversations, mockTourSteps, mockRecommendations, mockBatchQueue } from "@/utils/mockData";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatusBadge } from "@/components/ui/status-badge";
import { EnhancedDialog } from "@/components/ui/modal";
import { useModalClose } from "@/hooks/useModalClose";
import { Notification } from "@/components/ui/notification";

import { Navigation } from "@/components/layout/Navigation";
import { Features } from "@/components/layout/Features";

export default function LLMTestingPlatform() {
  const { theme } = useTheme();

  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [testingStates, setTestingStates] = useState<Record<number, string>>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );
  const [notifications, setNotifications] = useState<
    Array<{ id: string; type: "success" | "error" | "warning" | "info"; title: string; message: string }>
  >([]);
  const [activeDialog, setActiveDialog] = useState<{
    title: string;
    description: string;
    content: string;
  } | null>(null);
  
  // Missing panel states
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [batchQueue] = useState(mockBatchQueue);
  
  // Modal refs for click outside detection
  const tourModalRef = useRef<HTMLDivElement>(null);
  const analyticsModalRef = useRef<HTMLDivElement>(null);
  const recommendationsModalRef = useRef<HTMLDivElement>(null);
  
  // Modal close hooks
  useModalClose(showTour, () => setShowTour(false));
  useModalClose(showAnalytics, () => setShowAnalytics(false));
  useModalClose(showRecommendations, () => setShowRecommendations(false));

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus the section for accessibility
      const heading = element.querySelector("h2, h3");
      if (heading) {
        (heading as HTMLElement).focus();
      }
    }
  }, []);

  const handleRunTest = useCallback(async (scenarioId: number) => {
    setTestingStates((prev) => ({ ...prev, [scenarioId]: "running" }));

    // Simulate test execution
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTestingStates((prev) => ({ ...prev, [scenarioId]: "completed" }));
      setToast({ message: "Test completed successfully!", type: "success" });
    } catch {
      setTestingStates((prev) => ({ ...prev, [scenarioId]: "error" }));
      setToast({ message: "Test failed to complete", type: "error" as const });
    }
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const [expandedFooterSections, setExpandedFooterSections] = useLocalStorage(
    "expandedFooterSections",
    {},
  );

  const isOnline = useOnlineStatus();
  

  // Filter scenarios based on search query
  const filteredScenarios = useMemo(() => {
    if (!searchQuery.trim()) return scenarios;
    const query = searchQuery.toLowerCase();
    return scenarios.filter(
      (scenario) =>
        scenario.title.toLowerCase().includes(query) ||
        scenario.description.toLowerCase().includes(query) ||
        scenario.category.toLowerCase().includes(query) ||
        scenario.difficulty.toLowerCase().includes(query),
    );
  }, [searchQuery]);



  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  // ESC key handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showTour) setShowTour(false);
        if (showAnalytics) setShowAnalytics(false);
        if (showRecommendations) setShowRecommendations(false);
        return;
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTour, showAnalytics, showRecommendations]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${theme.bg} ${theme.text}`}
    >
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className={`pt-24 pb-20 ${theme.hero} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme.text} mb-6 leading-tight`}
            >
              Research-Backed AI Testing for
              <span
                className={`block bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
              >
                Mental Wellness
              </span>
            </h1>

            <p
              className={`text-xl ${theme.textSecondary} mb-8 max-w-2xl mx-auto leading-relaxed`}
            >
              Scientifically-designed color palettes and evaluation tools built
              specifically for mental health AI applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("scenarios")}
                theme={theme}
                className="button-glow transition-all duration-200"
              >
                <Play className="w-4 h-4 mr-2 icon-dynamic" />
                Start Testing
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("features")}
                theme={theme}
                className="button-glow transition-all duration-300"
              >
                <Search className="w-4 h-4 mr-2 icon-dynamic" />
                Explore Platform
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <Features theme={theme} />

      {/* Testing Scenarios Section */}
      <section id="scenarios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold ${theme.text} mb-4`}
              tabIndex={-1}
            >
              Testing Scenarios
            </h2>
            <p
              className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-8`}
            >
              Comprehensive evaluation scenarios designed by mental health
              experts.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 icon-dynamic ${theme.textMuted}`}
                />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Search scenarios... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  theme={theme}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <p className={`text-sm ${theme.textMuted} mt-2`}>
                  {filteredScenarios.length} scenario
                  {filteredScenarios.length !== 1 ? "s" : ""} found for "
                  {searchQuery}"
                </p>
              )}
            </div>
          </div>

          {filteredScenarios.length === 0 ? (
            <div className="text-center py-12">
              <Search className={`w-12 h-12 mx-auto mb-4 icon-dynamic ${theme.textMuted}`} />
              <h3 className={`text-lg font-medium ${theme.text} mb-2`}>
                No scenarios found
              </h3>
              <p className={`${theme.textSecondary}`}>
                Try a different search term or clear your search.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                theme={theme}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredScenarios.map((scenario) => {
                const IconComponent = scenario.icon;
                const testState = testingStates[scenario.id];

                return (
                  <Card
                    key={scenario.id}
                    theme={theme}
                    className={`group card-glow transition-all duration-300 cursor-pointer ${
                      selectedScenario === scenario.id
                        ? `ring-2 ring-blue-500 ${theme.glow}`
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedScenario(
                        selectedScenario === scenario.id ? null : scenario.id,
                      )
                    }
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-lg ${theme.accent} group-hover:scale-105 transition-transform`}
                          >
                            <IconComponent className="w-6 h-6 icon-dynamic" />
                          </div>
                          <div>
                            <CardTitle theme={theme} className="text-lg mb-1">
                              {scenario.title}
                            </CardTitle>
                            <div className={`text-sm ${theme.textMuted} mb-2`}>
                              {scenario.category}
                            </div>
                          </div>
                        </div>
                        <StatusBadge
                          variant={
                            scenario.difficulty === "Critical"
                              ? "critical"
                              : scenario.difficulty === "High"
                                ? "warning"
                                : scenario.difficulty === "Medium"
                                  ? "info"
                                  : "default"
                          }
                          size="sm"
                        >
                          {scenario.difficulty}
                        </StatusBadge>
                      </div>
                      <CardDescription
                        theme={theme}
                        className="text-sm leading-relaxed"
                      >
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div
                        className={`px-4 py-3 ${theme.surface} rounded-lg mb-4`}
                      >
                        <p
                          className={`text-sm ${theme.textSecondary} italic leading-relaxed`}
                        >
                          "{scenario.prompt}"
                        </p>
                      </div>

                      {testState === "running" && (
                        <Alert className="mb-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <AlertDescription>
                            Running test scenario... This may take a few
                            moments.
                          </AlertDescription>
                        </Alert>
                      )}

                      {testState === "completed" && (
                        <Alert className="mb-4">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertDescription>
                            Test completed successfully! Results are available
                            in the Research section.
                          </AlertDescription>
                        </Alert>
                      )}

                      {testState === "error" && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Test failed to complete. Please try again or contact
                            support.
                          </AlertDescription>
                        </Alert>
                      )}

                      {selectedScenario === scenario.id && (
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            theme={theme}
                            className="flex-1"
                          >
                            <Settings className="w-4 h-4 mr-2 icon-dynamic" />
                            Configure
                          </Button>
                          <Button
                            size="sm"
                            theme={theme}
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRunTest(scenario.id);
                            }}
                            disabled={testState === "running" || !isOnline}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {testState === "running"
                              ? "Running..."
                              : "Run Test"}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Analytics Overview */}
      <section className={`py-12 px-4 ${theme.surface}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Platform Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">
                  {mockAnalytics.totalTests}
                </CardTitle>
                <CardDescription>Total Tests</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-green-600">
                  {mockAnalytics.passRate}%
                </CardTitle>
                <CardDescription>Pass Rate</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">
                  {mockAnalytics.averageResponseTime}s
                </CardTitle>
                <CardDescription>Avg Response Time</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-red-600">
                  {mockAnalytics.riskFlags}
                </CardTitle>
                <CardDescription>Risk Flags</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-600">
                          {category.passRate}%
                        </span>
                      </div>
                      <Progress value={category.passRate} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conversation Display Section */}
      <section id="conversations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold ${theme.text} mb-4`}
              tabIndex={-1}
            >
              Research Conversations
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              Review actual test conversations and their safety, empathy, and
              bias metrics.
            </p>
          </div>

          <div className="grid gap-8">
            {mockConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`group card-glow transition-all duration-300 ${theme.surface} ${theme.border}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className={`text-xl ${theme.text} mb-2`}>
                        {conversation.scenario}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-medium ${theme.textSecondary}`}>
                          Model: {conversation.model}
                        </span>
                        <StatusBadge
                          variant={
                            conversation.status.includes("Excellent")
                              ? "success"
                              : conversation.status.includes("Flagged")
                                ? "warning"
                                : "info"
                          }
                          size="sm"
                        >
                          {conversation.status}
                        </StatusBadge>
                        <span className={`text-xs ${theme.textMuted}`}>
                          {conversation.metrics.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Display */}
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${
                            conversation.metrics.safety >= 95
                              ? "text-green-600"
                              : conversation.metrics.safety >= 90
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {conversation.metrics.safety}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>
                          Safety
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${
                            conversation.metrics.empathy >= 90
                              ? "text-green-600"
                              : conversation.metrics.empathy >= 80
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {conversation.metrics.empathy}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>
                          Empathy
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${
                            conversation.metrics.bias >= 95
                              ? "text-green-600"
                              : conversation.metrics.bias >= 90
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {conversation.metrics.bias}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>
                          Bias Score
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {conversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "assistant" ? "ml-6" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? `${theme.primarySolid} text-white`
                              : `${theme.accent} ${theme.textSecondary}`
                          }`}
                        >
                          {message.role === "user" ? (
                            <Users className="w-4 h-4 icon-dynamic" />
                          ) : (
                            <Brain className="w-4 h-4 icon-dynamic" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`px-4 py-3 rounded-lg ${
                            message.role === "user"
                              ? `${theme.primary} bg-opacity-10 border-l-4 border-opacity-50`
                              : `${theme.surface} border`
                          } ${theme.border}`}
                        >
                          <p
                            className={`text-sm leading-relaxed ${theme.textSecondary}`}
                          >
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={`py-16 ${theme.surface} border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-1">
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
                <Button
                  variant="ghost"
                  size="icon"
                  theme={theme}
                >
                  <Globe className="w-4 h-4 icon-dynamic" />
                </Button>
                {isOnline ? (
                  <Wifi
                    className="w-4 h-4 text-green-500 ml-2"
                    aria-label="Online"
                  />
                ) : (
                  <WifiOff
                    className="w-4 h-4 text-red-500 ml-2"
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
                const isExpanded = expandedFooterSections[section.id as keyof typeof expandedFooterSections];

                return (
                  <div
                    key={section.id}
                    className={`border rounded-lg ${theme.border}`}
                  >
                    <button
                      onClick={() =>
                        setExpandedFooterSections((prev: typeof expandedFooterSections) => ({
                          ...prev,
                          [section.id]: !prev[section.id as keyof typeof prev],
                        }))
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

          <div
            className={`border-t ${theme.border} mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between`}
          >
            <p className={`text-sm ${theme.textSecondary}`}>
              © 2025 Astra Labs. Building safer AI for mental health with
              research-backed design.
            </p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className={`text-xs ${theme.textMuted}`}>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className={`text-xs ${theme.textMuted}`}>
                for mental wellness
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <Alert
            className={`${
              toast.type === "success"
                ? "bg-green-50 border-green-200"
                : toast.type === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}
          >
            <AlertDescription>{toast.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Enhanced Dialog */}
      {activeDialog && (
        <EnhancedDialog
          isOpen={!!activeDialog}
          onClose={closeDialog}
          title={activeDialog.title}
          description={activeDialog.description}
        >
          <div>Dialog content for {activeDialog.content}</div>
        </EnhancedDialog>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <Button
          size="icon"
          onClick={() => setShowRecommendations(true)}
          className="rounded-full floating-glow bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200"
          title="AI Insights"
          aria-label="Open AI insights panel"
        >
          <Brain className="w-4 h-4 icon-dynamic" />
        </Button>
        <Button
          size="icon"
          onClick={() => setShowAnalytics(true)}
          className="rounded-full floating-glow bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200"
          title="Analytics Dashboard"
          aria-label="Open analytics dashboard"
        >
          <TrendingUp className="w-4 h-4 icon-dynamic" />
        </Button>
        <Button
          size="icon"
          onClick={() => setShowTour(true)}
          className="rounded-full floating-glow bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200"
          title="Help Tour"
          aria-label="Start help tour"
        >
          <Lightbulb className="w-4 h-4 icon-dynamic" />
        </Button>
      </div>

      {/* Tour Overlay */}
      {showTour && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTour(false);
          }}
        >
          <div
            ref={tourModalRef}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 max-w-md w-full mx-4 modal-glow border theme-transition ${theme.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-white icon-dynamic" />
              </div>
              <h3 className={`text-lg font-semibold ${theme.text}`}>
                {mockTourSteps[tourStep]?.title}
              </h3>
            </div>
            <p className={`${theme.textSecondary} mb-6`}>
              {mockTourSteps[tourStep]?.content}
            </p>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme.textMuted}`}>
                Step {tourStep + 1} of {mockTourSteps.length}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" theme={theme} onClick={() => setShowTour(false)}>
                  Skip Tour
                </Button>
                <Button
                  theme={theme}
                  onClick={() => {
                    if (tourStep === mockTourSteps.length - 1) {
                      setShowTour(false);
                      setTourStep(0);
                    } else {
                      setTourStep(tourStep + 1);
                    }
                  }}
                >
                  {tourStep === mockTourSteps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Panel */}
      {showAnalytics && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAnalytics(false);
          }}
        >
          <div
            ref={analyticsModalRef}
            className={`fixed top-4 right-4 bottom-4 w-96 rounded-lg modal-glow border flex flex-col theme-transition ${theme.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className={`text-lg font-semibold ${theme.text}`}>
                Analytics Dashboard
              </h3>
              <Button
                variant="ghost"
                size="icon"
                theme={theme}
                onClick={() => setShowAnalytics(false)}
                aria-label="Close analytics"
              >
                <X className="w-4 h-4 icon-dynamic" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-6">
              <div>
                <h4 className={`font-medium ${theme.text} mb-3`}>
                  Key Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded ${theme.isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="text-2xl font-bold text-green-600">
                      {mockAnalytics.passRate}%
                    </div>
                    <div className={`text-sm ${theme.textSecondary}`}>Pass Rate</div>
                  </div>
                  <div className={`p-3 rounded ${theme.isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="text-2xl font-bold text-blue-600">
                      {mockAnalytics.totalTests}
                    </div>
                    <div className={`text-sm ${theme.textSecondary}`}>Total Tests</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className={`font-medium ${theme.text} mb-3`}>
                  Model Comparison
                </h4>
                <div className="space-y-3">
                  {mockAnalytics.modelComparison.map((model, i) => (
                    <div key={i} className={`p-3 rounded border ${theme.isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className={`font-medium ${theme.text} mb-2`}>
                        {model.model}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className={`${theme.textSecondary}`}>Safety</div>
                          <div className="text-green-600 font-medium">{model.safety}%</div>
                        </div>
                        <div>
                          <div className={`${theme.textSecondary}`}>Empathy</div>
                          <div className="text-blue-600 font-medium">{model.empathy}%</div>
                        </div>
                        <div>
                          <div className={`${theme.textSecondary}`}>Bias</div>
                          <div className="text-purple-600 font-medium">{model.bias}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Panel */}
      {showRecommendations && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowRecommendations(false);
          }}
        >
          <div
            ref={recommendationsModalRef}
            className={`fixed top-4 left-4 bottom-4 w-80 rounded-lg modal-glow border flex flex-col theme-transition ${theme.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className={`text-lg font-semibold ${theme.text}`}>
                AI Insights
              </h3>
              <Button
                variant="ghost"
                size="icon"
                theme={theme}
                onClick={() => setShowRecommendations(false)}
                aria-label="Close recommendations"
              >
                <X className="w-4 h-4 icon-dynamic" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {mockRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-3 rounded border ${theme.isDark ? 'border-slate-600 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-medium ${theme.text}`}>{rec.title}</h4>
                  </div>
                  <p className={`text-sm ${theme.textSecondary} mb-2`}>
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded ${
                      rec.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                    <span className={`font-medium ${theme.textMuted}`}>
                      {rec.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Batch Testing Panel */}
      {batchQueue.some((item) => item.status === "running") && (
        <div className="fixed bottom-4 left-24 z-40">
          <div
            className={`rounded-lg p-4 shadow-lg border max-w-sm ${theme.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 animate-spin icon-dynamic" />
              <span className={`font-medium ${theme.text}`}>Batch Testing</span>
            </div>
            <div className="space-y-1">
              {batchQueue.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className={theme.textSecondary}>{item.scenario}</span>
                  <span
                    className={`${
                      item.status === "completed"
                        ? "text-green-600"
                        : item.status === "running"
                          ? "text-blue-600"
                          : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
