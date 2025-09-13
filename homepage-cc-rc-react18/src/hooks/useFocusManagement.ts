import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook for comprehensive focus management in single-page applications.
 * Implements WCAG 2.1 Success Criterion 2.4.3 for focus order management.
 */
export const useFocusManagement = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const focusHistoryRef = useRef<HTMLElement[]>([]);

  /**
   * Store the currently focused element before opening a modal/dialog
   */
  const storeFocus = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      previousFocusRef.current = activeElement;
      focusHistoryRef.current.push(activeElement);
    }
  }, []);

  /**
   * Restore focus to the previously focused element
   */
  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  /**
   * Focus the first focusable element in a container
   */
  const focusFirst = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    if (firstElement) {
      firstElement.focus();
      return true;
    }

    // If no focusable elements, focus the container itself
    if (container.tabIndex === -1) {
      container.focus();
      return true;
    }

    return false;
  }, []);

  /**
   * Focus management for modal dialogs
   */
  const useFocusTrap = (isOpen: boolean, containerRef: React.RefObject<HTMLElement>) => {
    useEffect(() => {
      if (!isOpen || !containerRef.current) return;

      const container = containerRef.current;

      // Store current focus and focus the modal
      storeFocus();

      // Focus the first element or the container
      setTimeout(() => {
        focusFirst(container);
      }, 0);

      // Handle Tab key for focus trapping
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const focusableElements = container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift+Tab: moving backwards
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: moving forwards
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener('keydown', handleKeyDown);

      return () => {
        container.removeEventListener('keydown', handleKeyDown);
        // Restore focus when modal closes
        restoreFocus();
      };
    }, [isOpen, containerRef, storeFocus, focusFirst, restoreFocus]);
  };

  /**
   * Announce content changes to screen readers
   */
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  /**
   * Focus management for dynamic content updates
   */
  const handleContentUpdate = useCallback((
    container: HTMLElement,
    message?: string,
    focusTarget?: HTMLElement | string
  ) => {
    if (message) {
      announceToScreenReader(message);
    }

    // Focus specific target or first focusable element
    setTimeout(() => {
      if (typeof focusTarget === 'string') {
        const element = container.querySelector(focusTarget) as HTMLElement;
        if (element) {
          element.focus();
          return;
        }
      } else if (focusTarget) {
        focusTarget.focus();
        return;
      }

      // Default: focus first focusable element
      focusFirst(container);
    }, 100);
  }, [announceToScreenReader, focusFirst]);

  /**
   * Skip to main content functionality
   */
  const skipToContent = useCallback((targetId: string = 'main-content') => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      announceToScreenReader(`Skipped to ${target.getAttribute('aria-label') || 'main content'}`);
    }
  }, [announceToScreenReader]);

  /**
   * Navigate to section with proper focus management
   */
  const navigateToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // Focus the section heading or first focusable element
      const heading = section.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
        announceToScreenReader(`Navigated to ${heading.textContent}`);
      } else {
        focusFirst(section);
      }
    }
  }, [focusFirst, announceToScreenReader]);

  return {
    storeFocus,
    restoreFocus,
    focusFirst,
    useFocusTrap,
    announceToScreenReader,
    handleContentUpdate,
    skipToContent,
    navigateToSection,
  };
};