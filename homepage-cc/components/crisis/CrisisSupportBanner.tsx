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
    <div className="crisis-banner animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="text-xl font-bold text-foreground">
              Crisis Support Resources
            </h3>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed text-base">
            If you're experiencing thoughts of self-harm or are in immediate
            danger, please reach out for help immediately. You are not alone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  {contact.number ? (
                    <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
                  ) : (
                    <MessageCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">
                    {contact.name}
                  </div>
                  <div className="font-mono text-red-600 dark:text-red-400 font-bold text-lg">
                    {contact.number || contact.text}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available {contact.available}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm text-muted-foreground leading-relaxed">
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
