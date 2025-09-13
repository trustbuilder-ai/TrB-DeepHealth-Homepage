import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/hooks/useTheme";

interface AnalyticsData {
  totalTests: number;
  passRate: number;
  averageResponseTime: number;
  riskFlags: number;
  categories: Array<{
    name: string;
    passRate: number;
  }>;
}

interface AnalyticsSectionProps {
  mockAnalytics: AnalyticsData;
}

export const AnalyticsSection = ({ mockAnalytics }: AnalyticsSectionProps) => {
  const { theme } = useTheme();

  return (
    <section
      id="analytics"
      className={`py-12 px-4 ${theme.surface}`}
      aria-labelledby="analytics-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="analytics-heading"
          className="h2-style font-bold mb-8 text-center"
          tabIndex={-1}
        >
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
              <CardTitle
                className={`text-2xl font-bold ${theme.isDark ? "text-green-400" : "text-green-600"}`}
              >
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
              <CardTitle
                className={`text-2xl font-bold ${theme.isDark ? "text-red-400" : "text-red-600"}`}
              >
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
                <div key={index} className="flex items-center justify-between">
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
  );
};
