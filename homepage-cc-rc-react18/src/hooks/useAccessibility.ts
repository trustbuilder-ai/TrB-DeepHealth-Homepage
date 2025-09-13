import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface AccessibilitySettings {
  enhancedReadability: boolean;
  dyslexiaFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

const defaultSettings: AccessibilitySettings = {
  enhancedReadability: false,
  dyslexiaFriendly: false,
  highContrast: false,
  reducedMotion: false,
};

/**
 * Hook for managing accessibility settings and preferences.
 * Provides toggles for various accessibility features like enhanced readability,
 * dyslexia-friendly text, high contrast, and reduced motion.
 *
 * @returns Object containing accessibility settings and toggle functions
 */
export const useAccessibility = () => {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'accessibility-settings',
    defaultSettings
  );

  /**
   * Toggle enhanced readability features (improved spacing, typography)
   */
  const toggleEnhancedReadability = () => {
    setSettings({
      ...settings,
      enhancedReadability: !settings.enhancedReadability
    });
  };

  /**
   * Toggle dyslexia-friendly typography and spacing
   */
  const toggleDyslexiaFriendly = () => {
    setSettings({
      ...settings,
      dyslexiaFriendly: !settings.dyslexiaFriendly
    });
  };

  /**
   * Toggle high contrast mode
   */
  const toggleHighContrast = () => {
    setSettings({
      ...settings,
      highContrast: !settings.highContrast
    });
  };

  /**
   * Toggle reduced motion preferences
   */
  const toggleReducedMotion = () => {
    setSettings({
      ...settings,
      reducedMotion: !settings.reducedMotion
    });
  };

  /**
   * Apply accessibility settings to document
   */
  useEffect(() => {
    const body = document.body;

    // Enhanced readability
    if (settings.enhancedReadability) {
      body.classList.add('spacing-comfortable');
    } else {
      body.classList.remove('spacing-comfortable');
    }

    // Dyslexia-friendly features
    if (settings.dyslexiaFriendly) {
      body.classList.add('dyslexia-friendly');
    } else {
      body.classList.remove('dyslexia-friendly');
    }

    // High contrast
    if (settings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      body.style.setProperty('--animation-duration', '0.01ms');
      body.style.setProperty('--transition-duration', '0.01ms');
    } else {
      body.style.removeProperty('--animation-duration');
      body.style.removeProperty('--transition-duration');
    }
  }, [settings]);

  return {
    settings,
    toggleEnhancedReadability,
    toggleDyslexiaFriendly,
    toggleHighContrast,
    toggleReducedMotion,
  };
};