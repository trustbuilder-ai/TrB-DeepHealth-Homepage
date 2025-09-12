import React, { useState } from "react";
import { Heart, Phone, MessageCircle, X, AlertTriangle } from "lucide-react";

interface FloatingCrisisButtonProps {
  onCrisisDetected?: () => void;
  isVisible?: boolean;
}

export function FloatingCrisisButton({
  onCrisisDetected: _onCrisisDetected,
  isVisible = true,
}: FloatingCrisisButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    {
      name: "988 Lifeline",
      action: () => window.open("tel:988", "_self"),
      icon: Phone,
      color: "text-white",
      bg: "bg-red-600 hover:bg-red-700",
      description: "Call now",
    },
    {
      name: "Crisis Text",
      action: () => window.open("sms:741741?body=HOME", "_self"),
      icon: MessageCircle,
      color: "text-white",
      bg: "bg-red-500 hover:bg-red-600",
      description: "Text HOME",
    },
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded crisis resources */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 glass-card p-6 w-80 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className="w-5 h-5"
                  style={{ color: "var(--mental-health-crisis)" }}
                />
                <h3 className="font-bold text-foreground">Crisis Support</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              If you're having thoughts of self-harm or are in immediate danger,
              please reach out for help immediately. You are not alone.
            </p>

            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={contact.action}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl ${contact.bg} ${contact.color} transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                >
                  <contact.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-xs opacity-90">
                      {contact.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-4 border-amber-400">
              <p className="text-xs text-muted-foreground">
                This platform is for testing only. Always seek professional help
                for mental health concerns.
              </p>
            </div>
          </div>
        )}

        {/* Main crisis button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 animate-breathe"
          style={{
            background: `linear-gradient(135deg, var(--mental-health-crisis) 0%, #dc2626 100%)`,
            boxShadow: "0 8px 32px rgba(220, 38, 38, 0.3)",
          }}
          title="Crisis Support Resources"
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Heart className="w-6 h-6 text-white animate-pulse" />
          )}

          {/* Pulse ring effect */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "var(--mental-health-crisis)", opacity: 0.2 }}
          />
        </button>

        {/* Help text hint */}
        {!isExpanded && (
          <div className="absolute bottom-0 right-20 glass-card px-3 py-2 text-sm text-muted-foreground whitespace-nowrap animate-fade-in">
            Need immediate help?
            <div className="absolute top-1/2 -right-2 w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-card border-t-transparent border-b-transparent transform -translate-y-1/2" />
          </div>
        )}
      </div>
    </>
  );
}
