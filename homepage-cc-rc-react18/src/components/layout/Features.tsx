import { Shield, BarChart3, Heart, Lock, Activity, Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Advanced safety protocols with real-time bias detection ensure responsible AI development for sensitive mental health applications.",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Transparent Analytics",
    desc: "Clear, intuitive metrics help you understand model performance, safety scores, and empathy ratings at a glance.",
    color: "emerald",
  },
  {
    icon: Heart,
    title: "Empathy Evaluation",
    desc: "Specialized testing for emotional intelligence and appropriate responses in mental health contexts.",
    color: "rose",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    desc: "Enterprise-grade encryption and privacy controls exceed industry standards for sensitive healthcare data.",
    color: "purple",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    desc: "Continuous performance tracking and instant alerts help maintain safety standards across all interactions.",
    color: "amber",
  },
  {
    icon: Brain,
    title: "Research-Backed Design",
    desc: "Color palettes and UI elements based on clinical research into trust and empathy.",
    color: "cyan",
  },
];

export const Features = () => {
  const { theme } = useTheme();

  return (
    <section id="features" className={cn("py-20", theme.surface)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={cn("text-4xl font-bold mb-4", theme.text)}
            tabIndex={-1}
          >
            Built for Trust & Safety
          </h2>
          <p className={cn("text-xl max-w-3xl mx-auto", theme.textSecondary)}>
            Every feature designed with mental health professionals in mind,
            ensuring responsible AI development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              theme={theme}
              className="group card-glow transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 transition-transform flex-shrink-0 enhanced-glow">
                    <AvatarFallback
                      className={cn(
                        "transition-colors",
                        theme.isDark
                          ? `${theme.accent} bg-opacity-20`
                          : `${theme.accent} bg-opacity-60`,
                      )}
                    >
                      <feature.icon
                        className={cn(
                          "w-6 h-6 icon-dynamic transition-colors",
                          theme.text,
                        )}
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle theme={theme} className="text-lg mb-3">
                      {feature.title}
                    </CardTitle>
                    <CardDescription theme={theme}>
                      {feature.desc}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
