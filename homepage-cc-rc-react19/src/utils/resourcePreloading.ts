/**
 * React 19 Resource Preloading Utilities
 *
 * Provides utilities for preloading critical resources using React 19's
 * native resource preloading APIs for optimal performance.
 */

// Type definitions for React 19 resource preloading
declare global {
  function preload(href: string, options?: PreloadOptions): void;
  function preinit(href: string, options?: PreinitOptions): void;
  function preloadModule(href: string, options?: PreloadModuleOptions): void;
}

interface PreloadOptions {
  as?:
    | "script"
    | "style"
    | "font"
    | "image"
    | "video"
    | "audio"
    | "document"
    | "fetch";
  crossOrigin?: "anonymous" | "use-credentials";
  integrity?: string;
  fetchPriority?: "high" | "low" | "auto";
}

interface PreinitOptions extends PreloadOptions {
  precedence?: string;
}

interface PreloadModuleOptions {
  crossOrigin?: "anonymous" | "use-credentials";
  integrity?: string;
}

/**
 * Preload critical CSS stylesheets
 */
export function preloadCriticalStyles(): void {
  // Check if running in browser and preload is available
  if (typeof window === "undefined" || typeof preload !== "function") {
    return;
  }

  // Preload critical CSS files
  const criticalStyles = [
    "/assets/index-BbbOV5oy.css", // Main stylesheet from build
  ];

  criticalStyles.forEach((href) => {
    try {
      preload(href, {
        as: "style",
        fetchPriority: "high",
      });
    } catch (error) {
      console.warn("Failed to preload stylesheet:", href, error);
    }
  });
}

/**
 * Preload JavaScript modules for route components
 */
export function preloadRouteModules(): void {
  if (typeof window === "undefined" || typeof preloadModule !== "function") {
    return;
  }

  // Preload main application chunks
  const moduleChunks = [
    "/assets/vendor-gH-7aFTg.js",
    "/assets/ui-CKwJiv1H.js",
    "/assets/utils-ncXYd3jY.js",
  ];

  moduleChunks.forEach((href) => {
    try {
      preloadModule(href);
    } catch (error) {
      console.warn("Failed to preload module:", href, error);
    }
  });
}

/**
 * Preload fonts to prevent layout shift
 */
export function preloadFonts(): void {
  if (typeof window === "undefined" || typeof preload !== "function") {
    return;
  }

  // Preload system fonts that might be used
  const fontPreloads: string[] = [
    // Google Fonts or custom fonts would go here
    // Example: '/fonts/inter-var.woff2'
  ];

  fontPreloads.forEach((href) => {
    try {
      preload(href, {
        as: "font",
        crossOrigin: "anonymous",
        fetchPriority: "high",
      });
    } catch (error) {
      console.warn("Failed to preload font:", href, error);
    }
  });
}

/**
 * Preload images that are above the fold
 */
export function preloadCriticalImages(): void {
  if (typeof window === "undefined" || typeof preload !== "function") {
    return;
  }

  // Preload hero images or critical assets
  const criticalImages: string[] = [
    // Add paths to critical images here
    // Example: '/images/hero-bg.webp'
  ];

  criticalImages.forEach((href) => {
    try {
      preload(href, {
        as: "image",
        fetchPriority: "high",
      });
    } catch (error) {
      console.warn("Failed to preload image:", href, error);
    }
  });
}

/**
 * Initialize all resource preloading optimizations
 */
export function initializeResourcePreloading(): void {
  // Use requestIdleCallback to avoid blocking critical rendering
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => {
      preloadCriticalStyles();
      preloadRouteModules();
      preloadFonts();
      preloadCriticalImages();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      preloadCriticalStyles();
      preloadRouteModules();
      preloadFonts();
      preloadCriticalImages();
    }, 0);
  }
}

/**
 * Hook for component-level resource preloading
 */
export function useResourcePreloading(
  resources: Array<{
    href: string;
    type: "style" | "script" | "image" | "font" | "module";
    priority?: "high" | "low" | "auto";
    crossOrigin?: boolean;
  }>,
) {
  if (typeof window === "undefined") return;

  resources.forEach(({ href, type, priority = "auto", crossOrigin }) => {
    try {
      if (type === "module" && typeof preloadModule === "function") {
        preloadModule(href, {
          crossOrigin: crossOrigin ? "anonymous" : undefined,
        });
      } else if (typeof preload === "function") {
        const asType = type === "module" ? "script" : type;
        preload(href, {
          as: asType as "style" | "script" | "image" | "font",
          fetchPriority: priority,
          crossOrigin: crossOrigin ? "anonymous" : undefined,
        });
      }
    } catch (error) {
      console.warn(`Failed to preload ${type}:`, href, error);
    }
  });
}

/**
 * Fallback implementation for browsers without native preload support
 */
export function fallbackPreload(href: string, as: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;

  // Add to head if not already present
  if (!document.querySelector(`link[href="${href}"]`)) {
    document.head.appendChild(link);
  }
}
