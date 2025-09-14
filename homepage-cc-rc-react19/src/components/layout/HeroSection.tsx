import { Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const { theme } = useTheme();

  return (
    <section
      className={`pt-24 pb-20 ${theme.hero} relative overflow-hidden`}
      role="region"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            id="hero-heading"
            className={`h1-style font-bold ${theme.text} mb-6`}
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
  );
};

export default HeroSection;
