import {
  Search,
  Play,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatusBadge } from "@/components/ui/status-badge";
import { useTheme } from "@/hooks/useTheme";

interface Scenario {
  id: number;
  title: string;
  category: string;
  description: string;
  prompt: string;
  difficulty: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ScenariosSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredScenarios: Scenario[];
  selectedScenario: number | null;
  setSelectedScenario: (id: number | null) => void;
  testingStates: Record<string, string>;
  handleRunTest: (scenarioId: number) => void;
  isOnline: boolean;
}

const ScenariosSection = ({
  searchQuery,
  setSearchQuery,
  filteredScenarios,
  selectedScenario,
  setSelectedScenario,
  testingStates,
  handleRunTest,
  isOnline,
}: ScenariosSectionProps) => {
  const { theme } = useTheme();

  return (
    <section
      id="scenarios"
      className="py-20"
      aria-labelledby="scenarios-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="scenarios-heading"
            className={`h2-style font-bold ${theme.text} mb-4`}
            tabIndex={-1}
          >
            Testing Scenarios
          </h2>
          <p
            className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-8 leading-relaxed`}
          >
            Comprehensive evaluation scenarios designed by mental health
            experts.
          </p>

          {/* Search Input */}
          <div
            className="max-w-md mx-auto"
            role="search"
            aria-label="Search testing scenarios"
          >
            <label htmlFor="search-input" className="sr-only">
              Search testing scenarios
            </label>
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 icon-dynamic ${theme.textMuted}`}
              />
              <Input
                id="search-input"
                type="search"
                placeholder="Search scenarios... (Ctrl+K)"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                theme={theme}
                className="pl-10"
                aria-label="Search testing scenarios"
                role="searchbox"
                aria-describedby={searchQuery ? "search-results" : undefined}
              />
            </div>
            {searchQuery && (
              <p
                id="search-results"
                className={`text-sm ${theme.textMuted} mt-2`}
                aria-live="polite"
                role="status"
              >
                {filteredScenarios.length} scenario
                {filteredScenarios.length !== 1 ? "s" : ""} found for "
                {searchQuery}"
              </p>
            )}
          </div>
        </div>

        {filteredScenarios.length === 0 ? (
          <div className="text-center py-12">
            <Search
              className={`w-12 h-12 mx-auto mb-4 icon-dynamic ${theme.textMuted}`}
            />
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
                    <div className="flex items-center justify-between">
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
                          Running test scenario... This may take a few moments.
                        </AlertDescription>
                      </Alert>
                    )}

                    {testState === "completed" && (
                      <Alert className="mb-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                          Test completed successfully! Results are available in
                          the Research section.
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
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleRunTest(scenario.id);
                          }}
                          disabled={testState === "running" || !isOnline}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {testState === "running" ? "Running..." : "Run Test"}
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
  );
};

export default ScenariosSection;
