import React, { useEffect, useState } from "react";
import { AlertTriangle, Phone, MessageCircle, Heart, X } from "lucide-react";

interface CrisisDetectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  severity: "medium" | "high";
  triggerWords?: string[];
}

export function CrisisDetectionModal({
  isOpen,
  onClose,
  severity,
  triggerWords = [],
}: CrisisDetectionModalProps) {
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingCount, setBreathingCount] = useState(4);

  useEffect(() => {
    if (isOpen && severity === "high") {
      // Auto-trigger breathing exercise for high severity
      setTimeout(() => setShowBreathing(true), 1000);
    }
  }, [isOpen, severity]);

  useEffect(() => {
    if (showBreathing && breathingCount > 0) {
      const timer = setTimeout(
        () => setBreathingCount((prev) => prev - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
    if (breathingCount === 0) {
      setShowBreathing(false);
      setBreathingCount(4);
    }
  }, [showBreathing, breathingCount]);

  const handleCall988 = () => {
    window.open("tel:988", "_self");
  };

  const handleText988 = () => {
    window.open("sms:741741?body=HOME", "_self");
  };

  if (!isOpen) return null;

  const isHighSeverity = severity === "high";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className={`glass-card max-w-lg w-full p-8 animate-bounce-in ${
          isHighSeverity
            ? "border-red-500 border-2"
            : "border-amber-400 border-2"
        }`}
        style={{
          background: isHighSeverity
            ? "linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)",
        }}
      >
        {/* Breathing exercise overlay */}
        {showBreathing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 rounded-2xl">
            <div className="text-center">
              <div
                className="w-32 h-32 rounded-full mx-auto mb-6 animate-breathe"
                style={{
                  background: `radial-gradient(circle, var(--mental-health-calm) 0%, var(--mental-health-calm-light) 100%)`,
                  boxShadow: "0 0 40px rgba(34, 62, 172, 0.3)",
                }}
              />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Take a moment to breathe
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                {breathingCount > 2
                  ? "Breathe in slowly..."
                  : breathingCount > 0
                    ? "Now breathe out..."
                    : "You're doing great"}
              </p>
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--mental-health-calm)" }}
              >
                {breathingCount > 0 ? breathingCount : "✓"}
              </div>
            </div>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
          disabled={showBreathing}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crisis detection content */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
              isHighSeverity
                ? "bg-red-100 dark:bg-red-900/30"
                : "bg-amber-100 dark:bg-amber-900/30"
            }`}
          >
            {isHighSeverity ? (
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            ) : (
              <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {isHighSeverity
                ? "We're Concerned About You"
                : "We're Here to Support You"}
            </h2>
            <p className="text-muted-foreground">
              {isHighSeverity
                ? "We detected language that suggests you might be in distress"
                : "It sounds like you might be going through a difficult time"}
            </p>
          </div>
        </div>

        {isHighSeverity && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
            <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Immediate Support Available
            </p>
            <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
              If you're having thoughts of hurting yourself or are in immediate
              danger, please contact emergency services or use the resources
              below right now.
            </p>
          </div>
        )}

        {/* Crisis contact buttons */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button
            onClick={handleCall988}
            className="flex items-center gap-4 p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <Phone className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold text-lg">
                Call 988 - Suicide & Crisis Lifeline
              </div>
              <div className="text-red-100 text-sm">
                Available 24/7 • Free & Confidential
              </div>
            </div>
          </button>

          <button
            onClick={handleText988}
            className="flex items-center gap-4 p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold text-lg">Text "HOME" to 741741</div>
              <div className="text-red-100 text-sm">
                Crisis Text Line • 24/7 Support
              </div>
            </div>
          </button>
        </div>

        {/* Additional support message */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>You are not alone.</strong> Many people have felt this way
            and found help. Crisis counselors are trained to help people in
            situations exactly like yours.
          </p>
        </div>

        {/* Trigger words (for debugging/transparency) */}
        {triggerWords.length > 0 && (
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground">
              Detection details (for testing)
            </summary>
            <div className="mt-2 p-2 bg-muted/30 rounded">
              Detected phrases: {triggerWords.join(", ")}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
