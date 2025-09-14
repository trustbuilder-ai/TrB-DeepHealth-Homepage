import React from "react";
import {
  healthcareSchema,
  organizationSchema,
  softwareSchema,
} from "@/data/seoContent";

interface StructuredDataProps {
  includeOrganization?: boolean;
  includeSoftware?: boolean;
  includeHealthcare?: boolean;
  additionalSchemas?: object[];
}

/**
 * StructuredData component for adding JSON-LD structured data to pages
 * Includes healthcare-specific, organization, and software application schemas
 *
 * @param includeOrganization - Include organization schema (default: true)
 * @param includeSoftware - Include software application schema (default: true)
 * @param includeHealthcare - Include healthcare/medical schema (default: true)
 * @param additionalSchemas - Additional custom schemas to include
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  includeOrganization = true,
  includeSoftware = true,
  includeHealthcare = true,
  additionalSchemas = [],
}) => {
  React.useEffect(() => {
    // Remove existing structured data scripts to avoid duplicates
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-seo-schema]',
    );
    existingScripts.forEach((script) => script.remove());

    const schemas: object[] = [];

    // Add organization schema
    if (includeOrganization) {
      schemas.push(organizationSchema);
    }

    // Add software application schema
    if (includeSoftware) {
      schemas.push(softwareSchema);
    }

    // Add healthcare/medical schema
    if (includeHealthcare) {
      schemas.push(healthcareSchema);
    }

    // Add any additional custom schemas
    schemas.push(...additionalSchemas);

    // Create and inject structured data scripts
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", `schema-${index}`);
      script.textContent = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      const currentScripts = document.querySelectorAll(
        'script[type="application/ld+json"][data-seo-schema]',
      );
      currentScripts.forEach((script) => script.remove());
    };
  }, [
    includeOrganization,
    includeSoftware,
    includeHealthcare,
    additionalSchemas,
  ]);

  // This component doesn't render anything visible
  return null;
};

/**
 * Specialized structured data components for specific page types
 */

// FAQ structured data
export const FAQStructuredData: React.FC<{
  faqs: Array<{ question: string; answer: string }>;
}> = ({ faqs }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <StructuredData
      additionalSchemas={[faqSchema]}
      includeOrganization={false}
      includeSoftware={false}
      includeHealthcare={false}
    />
  );
};

// Article structured data
export const ArticleStructuredData: React.FC<{
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}> = ({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
}) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "TrB DeepHealth",
      logo: {
        "@type": "ImageObject",
        url: "https://trb-deephealth.com/logo.svg",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
  };

  return (
    <StructuredData
      additionalSchemas={[articleSchema]}
      includeOrganization={false}
      includeSoftware={false}
      includeHealthcare={false}
    />
  );
};

// Research/study structured data
export const ResearchStructuredData: React.FC<{
  name: string;
  description: string;
  about: string[];
  methodology?: string;
  findings?: string;
}> = ({ name, description, about, methodology, findings }) => {
  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: name,
    description: description,
    about: about.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
    founder: {
      "@type": "Organization",
      name: "TrB DeepHealth",
    },
    funder: {
      "@type": "Organization",
      name: "TrB DeepHealth",
    },
    studySubject: "AI Safety in Mental Health",
    methodology: methodology,
    result: findings
      ? {
          "@type": "Result",
          description: findings,
        }
      : undefined,
  };

  return (
    <StructuredData
      additionalSchemas={[researchSchema]}
      includeOrganization={false}
      includeSoftware={false}
      includeHealthcare={false}
    />
  );
};

// Service structured data
export const ServiceStructuredData: React.FC<{
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
  audience?: string[];
}> = ({
  name,
  description,
  serviceType,
  areaServed = "Global",
  audience = [],
}) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    serviceType: serviceType,
    provider: {
      "@type": "Organization",
      name: "TrB DeepHealth",
    },
    areaServed: areaServed,
    audience: audience.map((type) => ({
      "@type": "Audience",
      audienceType: type,
    })),
    category: "Healthcare Technology",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Safety Testing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Safety Evaluation",
            description:
              "Comprehensive testing of AI systems for mental health applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Empathy Assessment",
            description:
              "Evaluation of AI empathy and emotional intelligence capabilities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bias Detection",
            description:
              "Detection and analysis of potential biases in AI responses",
          },
        },
      ],
    },
  };

  return (
    <StructuredData
      additionalSchemas={[serviceSchema]}
      includeOrganization={false}
      includeSoftware={false}
      includeHealthcare={false}
    />
  );
};

export default StructuredData;
