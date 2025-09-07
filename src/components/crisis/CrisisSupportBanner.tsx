import React from "react";
import { AlertTriangle, Phone, MessageCircle, Heart } from "lucide-react";

export function CrisisSupportBanner() {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      available: "24/7",
    },
    {
      name: "Crisis Text Line",
      text: "HOME to 741741",
      available: "24/7",
    },
  ];

  return (
    <div className="crisis-support-banner bg-gradient-to-r from-crisis/10 via-crisis-light/10 to-accent-light/10 border border-crisis/20 rounded-lg p-6 mb-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 bg-crisis/10 rounded-full">
            <Heart className="w-6 h-6 text-crisis" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-crisis" />
            <h3 className="text-lg font-semibold text-text-primary">
              Crisis Support Resources
            </h3>
          </div>

          <p className="text-text-secondary mb-4 leading-relaxed">
            If you're experiencing thoughts of self-harm or are in immediate
            danger, please reach out for help immediately. You are not alone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  {contact.number ? (
                    <Phone className="w-5 h-5 text-primary" />
                  ) : (
                    <MessageCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary text-sm">
                    {contact.name}
                  </div>
                  <div className="font-mono text-primary font-semibold">
                    {contact.number || contact.text}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    Available {contact.available}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
            <p className="text-sm text-text-secondary">
              <strong>Professional Support:</strong> This testing platform is
              for research purposes only. For mental health support, please
              consult with qualified healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
