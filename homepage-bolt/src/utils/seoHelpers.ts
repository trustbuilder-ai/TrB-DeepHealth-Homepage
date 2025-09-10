/**
 * SEO and URL utilities for internal linking optimization
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Generate SEO-optimized anchor text variations
 */
export const generateAnchorTextVariations = (baseTerm: string): string[] => {
  const variations: Record<string, string[]> = {
    'testing': [
      'LLM testing platform',
      'test your language model',
      'AI safety testing',
      'mental health LLM validation',
      'start testing interface'
    ],
    'scenarios': [
      'test scenarios library',
      'testing scenarios',
      'mental health test cases',
      'crisis detection scenarios',
      'browse test scenarios'
    ],
    'results': [
      'test results analytics',
      'view test results',
      'performance analytics',
      'testing metrics dashboard',
      'LLM evaluation results'
    ],
    'documentation': [
      'API documentation',
      'integration guide',
      'developer documentation',
      'platform documentation',
      'technical reference'
    ]
  };

  return variations[baseTerm.toLowerCase()] || [baseTerm];
};

/**
 * Generate structured data for breadcrumbs
 */
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': `${window.location.origin}${crumb.url}`
    }))
  };
};

/**
 * Page metadata configuration for SEO optimization
 */
export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'TrB-DeepHealth - LLM Mental Health Testing Platform',
    description: 'Comprehensive testing platform for validating Large Language Models in mental health applications. Ensure safety, compliance, and effectiveness before deployment.',
    keywords: ['LLM testing', 'mental health AI', 'language model validation', 'AI safety testing', 'healthcare AI'],
    canonicalUrl: '/',
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ]
  },
  '/testing': {
    title: 'LLM Testing Interface - TrB-DeepHealth',
    description: 'Test your Large Language Model for mental health applications. Configure parameters, run scenarios, and validate safety compliance.',
    keywords: ['LLM testing interface', 'AI model testing', 'mental health validation', 'language model evaluation'],
    canonicalUrl: '/testing',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'LLM Testing Interface', url: '/testing' }
    ]
  },
  '/scenarios': {
    title: 'Test Scenarios Library - Mental Health LLM Testing',
    description: 'Comprehensive library of test scenarios for mental health LLM validation including crisis detection, boundary testing, and empathy validation.',
    keywords: ['test scenarios', 'mental health testing', 'crisis detection', 'LLM validation scenarios', 'AI safety tests'],
    canonicalUrl: '/scenarios',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Test Scenarios Library', url: '/scenarios' }
    ]
  },
  '/results': {
    title: 'Test Results & Analytics - LLM Performance Dashboard',
    description: 'View comprehensive test results, safety scores, and performance analytics for your mental health LLM testing sessions.',
    keywords: ['LLM test results', 'AI performance analytics', 'safety scores', 'mental health AI metrics'],
    canonicalUrl: '/results',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Test Results & Analytics', url: '/results' }
    ]
  },
  '/docs': {
    title: 'Documentation & API Reference - TrB-DeepHealth',
    description: 'Complete documentation for integrating TrB-DeepHealth LLM testing platform. API reference, best practices, and implementation guides.',
    keywords: ['API documentation', 'LLM testing API', 'integration guide', 'developer documentation', 'mental health AI docs'],
    canonicalUrl: '/docs',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Documentation & API Reference', url: '/docs' }
    ]
  }
};

/**
 * Generate canonical URLs with proper domain
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://trb-deephealth.com' 
    : 'http://localhost:5173';
  
  return `${baseUrl}${path}`;
};

/**
 * Validate internal links and suggest improvements
 */
export const validateInternalLink = (href: string): {
  isValid: boolean;
  suggestions: string[];
} => {
  const suggestions: string[] = [];
  
  // Check for proper URL structure
  if (!href.startsWith('/') && !href.startsWith('http')) {
    suggestions.push('Use absolute paths starting with / for internal links');
  }
  
  // Check for anchor text best practices
  if (href.includes('#')) {
    suggestions.push('Consider using descriptive anchor text for accessibility');
  }
  
  // Check for proper rel attributes for external links
  if (href.startsWith('http') && !href.includes(window.location.hostname)) {
    suggestions.push('Add rel="noopener noreferrer" for external links');
  }
  
  return {
    isValid: suggestions.length === 0,
    suggestions
  };
};