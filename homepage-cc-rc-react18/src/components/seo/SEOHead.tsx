import React from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  additionalMeta?: Record<string, string>;
}

/**
 * SEOHead component for managing meta tags and SEO elements
 * Optimized for healthcare/YMYL content and mental health AI platform
 *
 * @param title - Page title (will be suffixed with site name)
 * @param description - Meta description (150-160 chars recommended)
 * @param keywords - Array of relevant keywords
 * @param canonicalUrl - Canonical URL for the page
 * @param ogImage - Open Graph image URL
 * @param ogType - Open Graph type (default: 'website')
 * @param additionalMeta - Additional meta tags as key-value pairs
 */
export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "/og-default.jpg",
  ogType = "website",
  additionalMeta = {},
}) => {
  const siteUrl = "https://trb-deephealth.com"; // Replace with actual domain
  const siteName = "TrB DeepHealth";
  const fullTitle = `${title} | ${siteName} - AI Safety for Mental Health`;
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  // Ensure description length is optimal for search results
  const optimizedDescription =
    description.length > 160
      ? `${description.substring(0, 157)}...`
      : description;

  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean,
    ) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(
        `meta[${attribute}="${name}"]`,
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement;

      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Primary meta tags
    updateMetaTag("description", optimizedDescription);
    updateMetaTag("keywords", keywords.join(", "));
    updateMetaTag("author", "TrB DeepHealth Research Team");
    updateMetaTag(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    );

    // Healthcare/YMYL specific meta tags
    updateMetaTag(
      "medical-disclaimer",
      "This platform is for research and testing purposes only. Not intended for direct patient care or clinical diagnosis.",
    );
    updateMetaTag("content-type", "healthcare-research");
    updateMetaTag(
      "audience",
      "healthcare professionals, researchers, AI developers",
    );

    // Open Graph meta tags
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", optimizedDescription, true);
    updateMetaTag("og:image", fullOgImage, true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag(
      "og:image:alt",
      `${title} - Mental Health AI Testing Platform`,
      true,
    );
    updateMetaTag("og:url", fullCanonicalUrl, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", "en_US", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", optimizedDescription);
    updateMetaTag("twitter:image", fullOgImage);
    updateMetaTag(
      "twitter:image:alt",
      `${title} - Mental Health AI Testing Platform`,
    );
    updateMetaTag("twitter:site", "@trbdeephealth");
    updateMetaTag("twitter:creator", "@trbdeephealth");

    // LinkedIn specific
    updateMetaTag("article:author", "TrB DeepHealth Research Team");
    updateMetaTag("article:published_time", "2025-09-13T00:00:00Z");
    updateMetaTag("article:modified_time", new Date().toISOString());

    // Healthcare and trust signals
    updateMetaTag("classification", "healthcare technology");
    updateMetaTag("subject", "AI safety in mental health");
    updateMetaTag("coverage", "global");
    updateMetaTag("distribution", "global");
    updateMetaTag("rating", "general");

    // Security and privacy
    updateMetaTag("referrer", "strict-origin-when-cross-origin");
    updateMetaTag("format-detection", "telephone=no");

    // Additional custom meta tags
    Object.entries(additionalMeta).forEach(([name, content]) => {
      updateMetaTag(name, content);
    });

    // Update canonical URL
    updateLinkTag("canonical", fullCanonicalUrl);

    // Preconnect to important external domains
    const preconnects = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://cdn.jsdelivr.net",
    ];

    preconnects.forEach((url) => {
      let link = document.querySelector(
        `link[rel="preconnect"][href="${url}"]`,
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "preconnect";
        link.href = url;
        if (url.includes("fonts.gstatic.com")) {
          link.crossOrigin = "anonymous";
        }
        document.head.appendChild(link);
      }
    });

    // Add DNS prefetch for performance
    const dnsPrefetches = [
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com",
    ];

    dnsPrefetches.forEach((url) => {
      let link = document.querySelector(
        `link[rel="dns-prefetch"][href="${url}"]`,
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    additionalMeta,
    fullTitle,
    optimizedDescription,
    fullCanonicalUrl,
    fullOgImage,
  ]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
