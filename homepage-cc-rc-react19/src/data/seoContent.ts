export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export const seoContent: Record<string, SEOContent> = {
  home: {
    title: "AI Safety Testing Platform for Mental Health Applications",
    description:
      "Research-backed LLM testing platform with comprehensive safety protocols, empathy evaluation, and bias detection for mental health AI applications. Trusted by healthcare professionals.",
    keywords: [
      "AI testing platform",
      "mental health AI",
      "LLM safety evaluation",
      "empathy testing",
      "healthcare AI testing",
      "AI safety protocols",
      "therapeutic AI validation",
      "mental wellness AI",
      "clinical AI assessment",
      "AI bias detection",
    ],
    ogImage: "/og-home.jpg",
  },

  features: {
    title: "AI Safety Features - Mental Health Testing Platform",
    description:
      "Comprehensive AI safety features including real-time monitoring, bias detection, empathy scoring, privacy protection, and crisis intervention protocols for mental health applications.",
    keywords: [
      "AI safety features",
      "bias detection",
      "empathy scoring",
      "mental health AI safety",
      "real-time monitoring",
      "privacy protection",
      "crisis intervention AI",
      "therapeutic AI features",
      "clinical AI tools",
      "healthcare AI security",
    ],
    canonicalUrl: "/#features",
    ogImage: "/og-features.jpg",
  },

  scenarios: {
    title: "Mental Health AI Testing Scenarios - Expert-Designed Evaluations",
    description:
      "Expert-designed testing scenarios for evaluating AI responses to mental health situations, crisis interventions, therapeutic conversations, and empathy assessment.",
    keywords: [
      "AI testing scenarios",
      "mental health testing",
      "crisis intervention AI",
      "therapeutic AI evaluation",
      "empathy assessment",
      "clinical AI scenarios",
      "mental health simulations",
      "AI response testing",
      "healthcare AI validation",
      "psychological AI testing",
    ],
    canonicalUrl: "/#scenarios",
    ogImage: "/og-scenarios.jpg",
  },

  conversations: {
    title: "AI Safety Research & Conversation Analysis - Mental Health Metrics",
    description:
      "Detailed analysis of AI conversations with safety metrics, empathy scores, bias detection results, and performance analytics for mental health applications.",
    keywords: [
      "AI safety research",
      "conversation analysis",
      "mental health metrics",
      "AI evaluation results",
      "empathy scoring",
      "bias measurement",
      "clinical AI analysis",
      "therapeutic conversation metrics",
      "AI performance analytics",
      "healthcare AI insights",
    ],
    canonicalUrl: "/#conversations",
    ogImage: "/og-research.jpg",
  },

  analytics: {
    title: "AI Performance Analytics - Mental Health Testing Dashboard",
    description:
      "Comprehensive analytics dashboard showing AI performance metrics, safety scores, bias detection results, and testing outcomes for mental health applications.",
    keywords: [
      "AI performance analytics",
      "mental health AI metrics",
      "safety score dashboard",
      "AI testing results",
      "bias analytics",
      "empathy metrics",
      "clinical AI insights",
      "healthcare AI reporting",
      "therapeutic AI analysis",
      "AI evaluation dashboard",
    ],
    canonicalUrl: "/#analytics",
    ogImage: "/og-analytics.jpg",
  },
};

// Healthcare-specific schema data
export const healthcareSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "TrB DeepHealth AI Testing Platform",
  description:
    "Professional-grade AI testing platform for mental health applications with comprehensive safety protocols",
  url: "https://trb-deephealth.com",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "TrB DeepHealth",
    url: "https://trb-deephealth.com",
  },
  about: [
    {
      "@type": "MedicalSpecialty",
      name: "Psychiatry",
    },
    {
      "@type": "MedicalSpecialty",
      name: "Clinical Psychology",
    },
  ],
  audience: {
    "@type": "MedicalAudience",
    audienceType: [
      "Healthcare Researchers",
      "AI Developers",
      "Mental Health Professionals",
      "Clinical Psychologists",
      "Psychiatrists",
    ],
  },
  medicalSpecialty: "Psychiatry",
  lastReviewed: "2025-09-13",
  reviewedBy: {
    "@type": "Organization",
    name: "TrB DeepHealth Research Team",
    url: "https://trb-deephealth.com",
  },
};

// Organization schema for the company
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TrB DeepHealth",
  alternateName: "Astra Labs",
  url: "https://trb-deephealth.com",
  logo: "https://trb-deephealth.com/logo.svg",
  description:
    "Research-backed AI testing platform for mental health applications with comprehensive safety protocols and empathy evaluation",
  foundingDate: "2024",
  industry: "Healthcare Technology",
  expertise: "AI Safety in Mental Health",
  areaServed: "Global",
  knowsAbout: [
    "AI Safety Testing",
    "Mental Health Technology",
    "Large Language Model Evaluation",
    "Clinical AI Assessment",
    "Therapeutic AI Validation",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "research",
      email: "research@trb-deephealth.com",
      areaServed: "Global",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "support@trb-deephealth.com",
      areaServed: "Global",
      availableLanguage: "English",
    },
  ],
  sameAs: [
    "https://linkedin.com/company/trb-deephealth",
    "https://twitter.com/trbdeephealth",
  ],
};

// Software application schema
export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TrB DeepHealth LLM Testing Platform",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Medical Research Software",
  description:
    "AI testing platform for mental health applications with comprehensive safety protocols, empathy evaluation, and bias detection",
  operatingSystem: "Web Browser",
  browserRequirements: "Chrome 80+, Firefox 75+, Safari 13+, Edge 80+",
  softwareVersion: "1.0.0",
  dateCreated: "2024-01-01",
  dateModified: "2025-09-13",
  creator: {
    "@type": "Organization",
    name: "TrB DeepHealth",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    category: "Research Platform",
  },
  featureList: [
    "AI Safety Testing",
    "Empathy Evaluation",
    "Bias Detection",
    "Real-time Monitoring",
    "Crisis Intervention Protocols",
    "Privacy Protection",
    "Performance Analytics",
  ],
  screenshot: "https://trb-deephealth.com/screenshots/platform-overview.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};
