import { useState, useCallback, useEffect } from "react";
import { Loader2, Brain, Users, TrendingUp, Lightbulb } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useModalManager } from "@/hooks/useModalManager";
import { useScenarioManager } from "@/hooks/useScenarioManager";
import { useNotificationManager } from "@/hooks/useNotificationManager";

// SEO Components
import { SEOHead, StructuredData } from "@/components/seo";
import { seoContent } from "@/data/seoContent";

import {
  mockAnalytics,
  mockConversations,
  mockTourSteps,
  mockRecommendations,
  mockBatchQueue,
} from "@/utils/mockData";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatusBadge } from "@/components/ui/status-badge";
import { EnhancedDialog } from "@/components/ui/modal";
import { useModalClose } from "@/hooks/useModalClose";
import { Notification } from "@/components/ui/notification";

import { Navigation } from "@/components/layout/Navigation";
import { Features } from "@/components/layout/Features";
import { HeroSection } from "@/components/layout/HeroSection";
import { FooterSection } from "@/components/layout/FooterSection";
import { ScenariosSection } from "@/components/layout/ScenariosSection";
import { AnalyticsSection } from "@/components/layout/AnalyticsSection";
import { SkipLinksWithShortcuts } from "@/components/ui/skip-links";
import { HumanOversightBanner } from "@/components/ui/human-oversight-banner";
import { useFocusManagement } from "@/hooks/useFocusManagement";

/**
 * Main component for testing LLMs for mental health capabilities.
 *
 * Provides a comprehensive testing environment with:
 * - Theme switching with research-backed color palettes
 * - Test scenario management and execution
 * - Analytics dashboard and insights
 * - Accessibility features and therapeutic design
 * - Real-time conversation monitoring
 *
 * @returns The main application component
 */
export default function App() {
  const { theme } = useTheme();
  const isOnline = useOnlineStatus();
  const { navigateToSection, announceToScreenReader } = useFocusManagement();

  // Use custom hooks for state management
  const {
    selectedScenario,
    testingStates,
    searchQuery,
    toast,
    filteredScenarios,
    setSelectedScenario,
    setSearchQuery,
    handleRunTest,
  } = useScenarioManager();

  const { notifications, dismissNotification } = useNotificationManager();

  const { modals, closeAllModals } = useModalManager({
    showTour: false,
    showAnalytics: false,
    showRecommendations: false,
    showBatchTesting: false,
  });

  // Legacy state that needs refactoring
  const [tourStep, setTourStep] = useState(0);
  const [batchQueue] = useState(mockBatchQueue);

  // SEO: Track active section for dynamic meta tags
  const [activeSection, setActiveSection] =
    useState<keyof typeof seoContent>("home");

  // Modal close hooks
  useModalClose(modals.showTour.isOpen, modals.showTour.close);
  useModalClose(modals.showAnalytics.isOpen, modals.showAnalytics.close);
  useModalClose(
    modals.showRecommendations.isOpen,
    modals.showRecommendations.close,
  );

  /**
   * Scrolls to a specific section of the page with smooth animation.
   * Focuses on the section heading for accessibility compliance.
   *
   * @param sectionId - The DOM ID of the target section
   */
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

  const [expandedFooterSections, setExpandedFooterSections] = useLocalStorage(
    "expandedFooterSections",
    {},
  );

  /**
   * Sets up global keyboard event handlers for modal management and shortcuts.
   * - ESC key: Close all open modals
   * - Ctrl/Cmd+K: Focus search input
   * - Alt+1/2/3: Navigate to sections
   * - Alt+S: Open settings dropdown
   * - Ctrl/Cmd+M: Skip to main content
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllModals();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
        return;
      }

      // Skip to main content
      if ((e.metaKey || e.ctrlKey) && e.key === "m") {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: "smooth" });
          announceToScreenReader("Skipped to main content");
        }
        return;
      }

      // Alt key shortcuts for navigation
      if (e.altKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            navigateToSection("features");
            break;
          case "2":
            e.preventDefault();
            navigateToSection("scenarios");
            break;
          case "3":
            e.preventDefault();
            navigateToSection("conversations");
            break;
          case "s": {
            e.preventDefault();
            // Open settings dropdown
            const settingsButton = document.querySelector(
              '[aria-label="Settings menu"]',
            ) as HTMLButtonElement;
            if (settingsButton) {
              settingsButton.click();
              announceToScreenReader("Settings menu opened");
            }
            break;
          }
          case "t":
            e.preventDefault();
            modals.showTour.open();
            break;
          case "a":
            e.preventDefault();
            modals.showAnalytics.open();
            break;
        }
        return;
      }

      // Help shortcut
      if (e.key === "F1" || ((e.ctrlKey || e.metaKey) && e.key === "/")) {
        e.preventDefault();
        modals.showTour.open();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAllModals, navigateToSection, announceToScreenReader, modals]);

  // SEO: Track active section for dynamic meta tags
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero-heading", key: "home" as const },
        { id: "features", key: "features" as const },
        { id: "scenarios", key: "scenarios" as const },
        { id: "conversations", key: "conversations" as const },
        { id: "analytics", key: "analytics" as const },
      ];

      // Find the section that's currently in view
      const current = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active if its top is within the upper half of the viewport
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });

      // Default to home if no section is clearly in view
      const newActiveSection = current?.key || "home";
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [activeSection]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${theme.bg} ${theme.text}`}
    >
      {/* SEO Meta Tags - Dynamic based on active section */}
      <SEOHead
        title={seoContent[activeSection].title}
        description={seoContent[activeSection].description}
        keywords={seoContent[activeSection].keywords}
        canonicalUrl={seoContent[activeSection].canonicalUrl}
        ogImage={seoContent[activeSection].ogImage}
        additionalMeta={{
          "theme-color": theme.isDark ? "#1e293b" : "#ffffff",
          "application-name": "TrB DeepHealth Platform",
          "apple-mobile-web-app-title": "TrB DeepHealth",
          "apple-mobile-web-app-capable": "yes",
          "apple-mobile-web-app-status-bar-style": theme.isDark
            ? "black-translucent"
            : "default",
          "msapplication-TileColor": "#2563eb",
          "msapplication-config": "/browserconfig.xml",
        }}
      />

      {/* Structured Data - Healthcare & Organization */}
      <StructuredData />

      {/* Skip Links for Accessibility */}
      <SkipLinksWithShortcuts />

      {/* Navigation Banner */}
      <header role="banner">
        <Navigation />
      </header>

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Main content"
        role="main"
      >
        {/* Features Section */}
        <Features />

        {/* Testing Scenarios Section */}
        <ScenariosSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredScenarios={filteredScenarios}
          selectedScenario={selectedScenario}
          setSelectedScenario={setSelectedScenario}
          testingStates={testingStates}
          handleRunTest={handleRunTest}
          isOnline={isOnline}
        />

        {/* Analytics Overview */}
        <AnalyticsSection mockAnalytics={mockAnalytics} />

        {/* Human Oversight Notice */}
        <aside
          role="complementary"
          aria-label="AI limitations and professional oversight information"
        >
          <section className={`py-8 ${theme.surface}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HumanOversightBanner />
            </div>
          </section>
        </aside>

        {/* Conversation Display Section */}
        <section
          id="conversations"
          className="py-20"
          aria-labelledby="conversations-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="conversations-heading"
                className={`h2-style font-bold ${theme.text} mb-4`}
                tabIndex={-1}
              >
                Research Conversations
              </h2>
              <p
                className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto leading-relaxed`}
              >
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
                          <span
                            className={`font-medium ${theme.textSecondary}`}
                          >
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
        <FooterSection
          isOnline={isOnline}
          expandedFooterSections={expandedFooterSections}
          setExpandedFooterSections={setExpandedFooterSections}
        />
      </main>

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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <Button
          size="icon"
          onClick={() => modals.showRecommendations.open()}
          theme={theme}
          className={`rounded-full floating-glow ${theme.primarySolid} text-white ${theme.primaryHover} transition-all duration-200 ${theme.glow}`}
          title="AI Insights"
          aria-label="Open AI insights panel"
        >
          <Brain className="w-4 h-4 icon-dynamic" />
        </Button>
        <Button
          size="icon"
          onClick={() => modals.showAnalytics.open()}
          theme={theme}
          className={`rounded-full floating-glow ${theme.primarySolid} text-white ${theme.primaryHover} transition-all duration-200 ${theme.glow}`}
          title="Analytics Dashboard"
          aria-label="Open analytics dashboard"
        >
          <TrendingUp className="w-4 h-4 icon-dynamic" />
        </Button>
        <Button
          size="icon"
          onClick={() => modals.showBatchTesting.open()}
          theme={theme}
          className={`rounded-full floating-glow ${theme.primarySolid} text-white ${theme.primaryHover} transition-all duration-200 ${theme.glow}`}
          title="Batch Testing"
          aria-label="Open batch testing panel"
        >
          <Loader2 className="w-4 h-4 icon-dynamic" />
        </Button>
        <Button
          size="icon"
          onClick={() => modals.showTour.open()}
          theme={theme}
          className={`rounded-full floating-glow ${theme.primarySolid} text-white ${theme.primaryHover} transition-all duration-200 ${theme.glow}`}
          title="Help Tour"
          aria-label="Start help tour"
        >
          <Lightbulb className="w-4 h-4 icon-dynamic" />
        </Button>
      </div>

      {/* Tour Overlay */}
      {modals.showTour.isOpen && mockTourSteps[tourStep] && (
        <EnhancedDialog
          isOpen={modals.showTour.isOpen}
          onClose={() => {
            modals.showTour.close();
            setTourStep(0);
          }}
          title={mockTourSteps[tourStep].title || "Tour"}
          size="md"
          theme={theme}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full ${theme.primarySolid} flex items-center justify-center transition-colors`}
            >
              <Lightbulb className="w-4 h-4 text-white icon-dynamic" />
            </div>
          </div>
          <p className={`${theme.textSecondary} mb-6`}>
            {mockTourSteps[tourStep].content || "Tour content"}
          </p>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${theme.textMuted}`}>
              Step {tourStep + 1} of {mockTourSteps.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                theme={theme}
                onClick={() => {
                  modals.showTour.close();
                  setTourStep(0);
                }}
              >
                Skip Tour
              </Button>
              <Button
                theme={theme}
                onClick={() => {
                  if (tourStep === mockTourSteps.length - 1) {
                    modals.showTour.close();
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
        </EnhancedDialog>
      )}

      {/* Analytics Panel */}
      <EnhancedDialog
        isOpen={modals.showAnalytics.isOpen}
        onClose={() => modals.showAnalytics.close()}
        title="Analytics Dashboard"
        size="sidebar-right"
        theme={theme}
      >
        <div className="space-y-6">
          <div>
            <h4 className={`font-medium ${theme.text} mb-3`}>Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded ${theme.accent} transition-colors`}>
                <div
                  className={`text-2xl font-bold ${theme.isDark ? "text-green-400" : "text-green-600"}`}
                >
                  {mockAnalytics.passRate}%
                </div>
                <div className={`text-sm ${theme.textSecondary}`}>
                  Pass Rate
                </div>
              </div>
              <div className={`p-3 rounded ${theme.accent} transition-colors`}>
                <div
                  className={`text-2xl font-bold ${theme.isDark ? "text-blue-400" : "text-blue-600"}`}
                >
                  {mockAnalytics.totalTests}
                </div>
                <div className={`text-sm ${theme.textSecondary}`}>
                  Total Tests
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className={`font-medium ${theme.text} mb-3`}>
              Model Comparison
            </h4>
            <div className="space-y-3">
              {mockAnalytics.modelComparison.map((model, i) => (
                <div
                  key={i}
                  className={`p-3 rounded border ${theme.surface} ${theme.border} transition-colors`}
                >
                  <div className={`font-medium ${theme.text} mb-2`}>
                    {model.model}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className={`${theme.textSecondary}`}>Safety</div>
                      <div className="text-green-600 font-medium">
                        {model.safety}%
                      </div>
                    </div>
                    <div>
                      <div className={`${theme.textSecondary}`}>Empathy</div>
                      <div className="text-blue-600 font-medium">
                        {model.empathy}%
                      </div>
                    </div>
                    <div>
                      <div className={`${theme.textSecondary}`}>Bias</div>
                      <div className="text-purple-600 font-medium">
                        {model.bias}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EnhancedDialog>

      {/* AI Insights Panel */}
      <EnhancedDialog
        isOpen={modals.showRecommendations.isOpen}
        onClose={() => modals.showRecommendations.close()}
        title="AI Insights"
        size="sidebar-right"
        theme={theme}
      >
        <div className="space-y-4">
          {mockRecommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-3 rounded border ${theme.surface} ${theme.border} transition-colors`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${theme.text}`}>{rec.title}</h4>
              </div>
              <p className={`text-sm ${theme.textSecondary} mb-2`}>
                {rec.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-1 rounded ${
                    rec.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : rec.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {rec.priority}
                </span>
                <span className={`font-medium ${theme.textMuted}`}>
                  {rec.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </EnhancedDialog>

      {/* Batch Testing Modal */}
      {modals.showBatchTesting.isOpen && (
        <EnhancedDialog
          isOpen={modals.showBatchTesting.isOpen}
          onClose={() => modals.showBatchTesting.close()}
          title="Batch Testing Dashboard"
          size="lg"
          theme={theme}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin icon-dynamic" />
              <span className={`font-medium ${theme.text}`}>
                Running{" "}
                {batchQueue?.filter((item) => item.status === "running")
                  .length || 0}{" "}
                of {batchQueue?.length || 0} tests
              </span>
            </div>

            <div className="space-y-3">
              <h4 className={`font-medium ${theme.text}`}>Test Queue Status</h4>
              {batchQueue && batchQueue.length > 0 ? (
                batchQueue.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded border ${theme.surface} ${theme.border} transition-colors`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`font-medium ${theme.text}`}>
                          {item.scenario}
                        </div>
                        <div className={`text-sm ${theme.textSecondary}`}>
                          Model: {item.model}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "running"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`p-3 text-center ${theme.textSecondary}`}>
                  No batch tests available
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button theme={theme} disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin icon-dynamic" />
                Running Tests...
              </Button>
              <Button
                variant="outline"
                theme={theme}
                onClick={() => modals.showBatchTesting.close()}
              >
                Close
              </Button>
            </div>
          </div>
        </EnhancedDialog>
      )}
    </div>
  );
}
