import React from "react";
import { Phone, ExternalLink } from "lucide-react";

export const CrisisBanner: React.FC = () => {
  return (
    <div className="crisis-banner">
      <div className="crisis-content">
        <Phone className="w-5 h-5" />
        <div className="crisis-text">
          <strong>Crisis Support:</strong> If you're in crisis, call 988
          (Suicide & Crisis Lifeline) or text "HELLO" to 741741
        </div>
        <a
          href="https://988lifeline.org"
          target="_blank"
          rel="noopener noreferrer"
          className="crisis-link"
        >
          <ExternalLink className="w-4 h-4" />
          Get Help
        </a>
      </div>
    </div>
  );
};
