import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'button' | 'inline' | 'card';
  external?: boolean;
  title?: string;
  rel?: string;
}

/**
 * Standardized internal link component with SEO optimization
 * Handles both internal routing and external links with proper attributes
 */
export const InternalLink: React.FC<InternalLinkProps> = ({
  to,
  children,
  className = '',
  variant = 'default',
  external = false,
  title,
  rel
}) => {
  const baseClasses = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'text-primary-600 hover:text-primary-700 hover:underline',
    button: 'btn btn-primary',
    inline: 'text-primary-600 hover:text-primary-700 border-b border-primary-200 hover:border-primary-400',
    card: 'block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={to}
        className={combinedClasses}
        target="_blank"
        rel={rel || "noopener noreferrer"}
        title={title}
      >
        {children}
        <ExternalLink className="h-4 w-4 ml-1 inline" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={combinedClasses}
      title={title}
    >
      {children}
    </Link>
  );
};

interface RelatedLinksProps {
  title: string;
  links: Array<{
    to: string;
    label: string;
    description?: string;
    external?: boolean;
  }>;
  className?: string;
}

/**
 * Related links component for contextual navigation
 */
export const RelatedLinks: React.FC<RelatedLinksProps> = ({ title, links, className = '' }) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <InternalLink
              to={link.to}
              external={link.external}
              className="flex items-center justify-between group"
              title={link.description}
            >
              <div>
                <span className="font-medium text-gray-900 group-hover:text-primary-600">
                  {link.label}
                </span>
                {link.description && (
                  <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
            </InternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
};