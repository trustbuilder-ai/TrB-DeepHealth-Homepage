import React, { useState, useEffect, useMemo } from "react";
import { Heart, X, Play, Pause } from "lucide-react";

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // in seconds
  autoStart?: boolean;
}

export function BreathingExercise({
  isOpen,
  onClose,
  duration = 60,
  autoStart = false,
}: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(autoStart);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">(
    "inhale",
  );
  const [countdown, setCountdown] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  // Breathing pattern: 4-4-4-4 (inhale-hold-exhale-pause)
  const breathingCycle = useMemo(
    () => ({
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4,
    }),
    [],
  );

  const phaseMessages = {
    inhale: "Breathe in slowly and deeply...",
    hold: "Hold your breath gently...",
    exhale: "Breathe out slowly...",
    pause: "Rest for a moment...",
  };

  const phaseInstructions = {
    inhale: "Fill your lungs completely",
    hold: "Let the calm settle in",
    exhale: "Release all tension",
    pause: "Feel the peace within",
  };

  useEffect(() => {
    if (!isActive || !isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        setPhase((currentPhase) => {
          const phases: Array<keyof typeof breathingCycle> = [
            "inhale",
            "hold",
            "exhale",
            "pause",
          ];
          const currentIndex = phases.indexOf(currentPhase);
          const nextPhase = phases[(currentIndex + 1) % phases.length];

          if (nextPhase === "inhale") {
            setCycleCount((prev) => prev + 1);
          }

          return nextPhase;
        });

        return breathingCycle[phase];
      });

      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isOpen, phase, breathingCycle]);

  useEffect(() => {
    if (totalTime >= duration && duration > 0) {
      setIsActive(false);
    }
  }, [totalTime, duration]);

  const resetExercise = () => {
    setPhase("inhale");
    setCountdown(4);
    setTotalTime(0);
    setCycleCount(0);
    setIsActive(false);
  };

  const getCircleScale = () => {
    const progress =
      (breathingCycle[phase] - countdown) / breathingCycle[phase];
    switch (phase) {
      case "inhale":
        return 1 + progress * 0.4; // Scale from 1 to 1.4
      case "hold":
        return 1.4; // Stay large
      case "exhale":
        return 1.4 - progress * 0.4; // Scale from 1.4 to 1
      case "pause":
        return 1; // Stay small
      default:
        return 1;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case "inhale":
        return "var(--mental-health-calm)";
      case "hold":
        return "var(--mental-health-primary)";
      case "exhale":
        return "var(--mental-health-warm)";
      case "pause":
        return "var(--mental-health-authority)";
      default:
        return "var(--mental-health-primary)";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-md w-full p-8 text-center animate-bounce-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Take a Moment to Breathe
          </h2>
          <p className="text-muted-foreground">
            Let's pause and center ourselves with some mindful breathing
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative mb-8">
          <div
            className="w-48 h-48 rounded-full mx-auto transition-all duration-1000 ease-in-out shadow-2xl"
            style={{
              transform: `scale(${getCircleScale()})`,
              background: `radial-gradient(circle, ${getCircleColor()}, ${getCircleColor()}dd)`,
              boxShadow: `0 0 60px ${getCircleColor()}40`,
            }}
          />

          {/* Countdown number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-white">{countdown}</div>
          </div>
        </div>

        {/* Phase instruction */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 capitalize">
            {phase.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <p className="text-lg text-muted-foreground mb-1">
            {phaseMessages[phase]}
          </p>
          <p className="text-sm text-muted-foreground">
            {phaseInstructions[phase]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
          >
            {isActive ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isActive ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetExercise}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
          >
            Reset
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>Cycles: {cycleCount}</div>
          <div>
            Time: {Math.floor(totalTime / 60)}:
            {(totalTime % 60).toString().padStart(2, "0")}
          </div>
          {duration > 0 && (
            <div>
              Remaining: {Math.max(0, Math.floor((duration - totalTime) / 60))}:
              {Math.max(0, (duration - totalTime) % 60)
                .toString()
                .padStart(2, "0")}
            </div>
          )}
        </div>

        {/* Motivational message */}
        {cycleCount >= 3 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
            <p className="text-sm text-green-700 dark:text-green-400">
              Great job! You're doing wonderfully. Keep focusing on your breath.
            </p>
          </div>
        )}

        {totalTime >= duration && duration > 0 && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-semibold">
              ✓ Exercise complete! How do you feel?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
