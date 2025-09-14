import { useState, useEffect, Suspense, lazy } from "react";
import type {
  ModelComparison,
  Recommendation,
  BatchQueueItem,
} from "@/data/mockData";
import type { NotificationItem } from "@/hooks/useNotificationManager";
import { Loader2, Brain, TrendingUp, Lightbulb } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
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
} from "@/data/mockData";

import { Button } from "@/components/ui/button";
import { EnhancedDialog } from "@/components/ui/modal";
import { Notification } from "@/components/ui/notification";

import { Navigation } from "@/components/layout/Navigation";
import { SkipLinksWithShortcuts } from "@/components/ui/skip-links";
import { HumanOversightBanner } from "@/components/ui/human-oversight-banner";
import { useFocusManagement } from "@/hooks/useFocusManagement";

// Code splitting with React.lazy()
const Features = lazy(() => import("@/components/layout/Features"));
const HeroSection = lazy(() => import("@/components/layout/HeroSection"));
const FooterSection = lazy(() => import("@/components/layout/FooterSection"));
const ScenariosSection = lazy(
  () => import("@/components/layout/ScenariosSection"),
);
const AnalyticsSection = lazy(
  () => import("@/components/layout/AnalyticsSection"),
);
const ConversationsSection = lazy(
  () => import("@/components/layout/ConversationsSection"),
);

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
  const { announceToScreenReader } = useFocusManagement();

  // Use custom hooks for state management
  const {
    selectedScenario,
    testingStates,
    searchQuery,
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

  const [expandedFooterSections, setExpandedFooterSections] = useLocalStorage(
    "expandedFooterSections",
    {},
  );

  /**
   * Navigates to a section with smooth scrolling and accessibility focus.
   * Used by HeroSection component.
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      const heading = element.querySelector("h2, h3");
      if (heading) {
        (heading as HTMLElement).focus();
        announceToScreenReader(`Navigated to ${heading.textContent}`);
      }
    }
  };

  /**
   * Consolidated keyboard shortcuts for navigation and modal management.
   */
  useEffect(() => {
    /**
     * Navigates to a section with smooth scrolling and accessibility focus.
     * Combines scrollToSection and navigateToSection functionality.
     */
    const navigateToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        const heading = element.querySelector("h2, h3");
        if (heading) {
          (heading as HTMLElement).focus();
          announceToScreenReader(`Navigated to ${heading.textContent}`);
        }
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC: Close modals
      if (e.key === "Escape") {
        closeAllModals();
        return;
      }

      // Ctrl/Cmd shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            document.getElementById("search-input")?.focus();
            return;
          case "m":
            e.preventDefault();
            navigateToSection("main-content");
            return;
          case "/":
            e.preventDefault();
            modals.showTour.open();
            return;
        }
      }

      // Alt shortcuts
      if (e.altKey) {
        e.preventDefault();
        const shortcuts: Record<string, () => void> = {
          "1": () => navigateToSection("features"),
          "2": () => navigateToSection("scenarios"),
          "3": () => navigateToSection("conversations"),
          s: () => {
            const settingsButton = document.querySelector(
              '[aria-label="Settings menu"]',
            ) as HTMLButtonElement;
            settingsButton?.click();
            announceToScreenReader("Settings menu opened");
          },
          t: () => modals.showTour.open(),
          a: () => modals.showAnalytics.open(),
        };
        shortcuts[e.key]?.();
        return;
      }

      // F1: Help
      if (e.key === "F1") {
        e.preventDefault();
        modals.showTour.open();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAllModals, announceToScreenReader, modals]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${theme.bg} ${theme.text}`}
    >
      {/* SEO Meta Tags */}
      <SEOHead
        title={seoContent.home.title}
        description={seoContent.home.description}
        keywords={seoContent.home.keywords}
        canonicalUrl={seoContent.home.canonicalUrl}
        ogImage={seoContent.home.ogImage}
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
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }
      >
        <HeroSection scrollToSection={scrollToSection} />
      </Suspense>

      {/* Main Content */}
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Main content"
        role="main"
      >
        {/* Features Section */}
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          }
        >
          <Features />
        </Suspense>

        {/* Testing Scenarios Section */}
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          }
        >
          <ScenariosSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredScenarios={filteredScenarios}
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            testingStates={testingStates}
            handleRunTest={handleRunTest}
          />
        </Suspense>

        {/* Analytics Overview */}
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          }
        >
          <AnalyticsSection mockAnalytics={mockAnalytics} />
        </Suspense>

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

        {/* Conversations Section */}
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          }
        >
          <ConversationsSection conversations={mockConversations} />
        </Suspense>

        {/* Footer Section */}
        <Suspense
          fallback={
            <div className="min-h-[30vh] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          }
        >
          <FooterSection
            expandedFooterSections={expandedFooterSections}
            setExpandedFooterSections={setExpandedFooterSections}
          />
        </Suspense>
      </main>

      {/* Notifications */}
      {notifications.map((notification: NotificationItem) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}

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
              {mockAnalytics.modelComparison.map(
                (model: ModelComparison, i: number) => (
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
                ),
              )}
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
          {mockRecommendations.map((rec: Recommendation) => (
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
                {batchQueue?.filter(
                  (item: BatchQueueItem) => item.status === "running",
                ).length || 0}{" "}
                of {batchQueue?.length || 0} tests
              </span>
            </div>

            <div className="space-y-3">
              <h4 className={`font-medium ${theme.text}`}>Test Queue Status</h4>
              {batchQueue && batchQueue.length > 0 ? (
                batchQueue.map((item: BatchQueueItem) => (
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
