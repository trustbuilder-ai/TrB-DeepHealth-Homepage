# TODOs

- ~~Modals 'signin' and 'newsletter' do not close on ESC. Check whether they use the common modal hooks and components~~ - FIXED 2025-09-13 - Removed duplicate ESC handlers and unified modal closing behavior
- Modals 'ai insights' and 'analytics' use more distance to the bottom than to the top of the page
- ~~Themes are not rerendered, the page has to be reloaded to switch themes~~ - FIXED 2025-09-13 - Fixed theme switching dependency cycles and CSS variable application
- Hamburger menu in mobile mode not scrollable

## 2025-09-12

- [x] move configs from / to config/? - 2025-09-13 - Configs already moved to config/ directory
- [x] use jsdoc for files, classes, methods, functions, types, and similar - 2025-09-13 - Added comprehensive JSDoc to App.tsx, theme utilities, and type definitions
- [x] provide all themes from theme.ts in the theme switcher - 2025-09-13 - Updated ThemeSwitcher to display all theme categories (Research, Original, Therapy/Crisis, Accessibility)
- [x] theme switching without site refresh - 2025-09-13 - Theme switching already implemented with React context and CSS variables
- [x] separate functionality from app.tsx - 2025-09-13 - Refactored App.tsx using custom hooks: useModalManager, useScenarioManager, useNotificationManager
- [x] provide therapeutic fonts from fonts.ts in the font switcher - 2025-09-13 - Updated font categorization and added therapeutic/accessibility/scientific indicators
- [x] use types/ and context/? - 2025-09-13 - Directories already exist and are being used properly
- [x] use strict mode - 2025-09-13 - React.StrictMode already enabled in main.tsx
- [x] @ notation concistently for imports instead of relative paths, possible issues with config/tsconfig.json - 2025-09-13 - @ imports working correctly with baseUrl and paths configured
- [x] Added login modal to navbar - 2025-09-13 - Created login modal with form validation matching newsletter modal pattern
- [x] Enhanced font system with proper therapeutic categorization - 2025-09-13 - Updated FontSet interface and component to show therapeutic/accessibility/scientific badges
- [x] Implemented vibrant "-2" theme variants - 2025-09-13 - Added 6 new enhanced themes: Coastal Breeze Vivid, Coastal Glow Radiant, Earthy Serenity Lush, Neon Tide Electric, Cyber Mint Matrix, Midnight Pulse Neon, **Design Approach**: Neo-Cyberpunk Glassmorphism with enhanced gradients, backdrop-blur, shadow-2xl glow effects, and layered transparency for modern AI/tech aesthetic
- [x] Fixed button theme adaptation issues - 2025-09-13 - Updated floating action buttons, modal buttons, and icons to properly use theme colors instead of hardcoded teal-600
- [x] Enhanced WCAG accessibility and contrast compliance - 2025-09-13 - Improved form inputs, modals, dropdowns, and theme switcher with better contrast ratios and focus indicators
- [x] Added theme-aware styling utilities - 2025-09-13 - Enhanced themeUtils.ts with new functions for inputs, selects, modals, and improved button styling
- [x] Updated Select component with theme support - 2025-09-13 - Added theme props and styling to SelectTrigger, SelectContent, and SelectItem components
- [x] Improved ThemeSwitcher accessibility - 2025-09-13 - Enhanced dropdown contrast, focus management, and ARIA attributes for better screen reader support
- [x] Created unified settings dropdown - 2025-09-13 - Consolidated theme, font, icon switchers and accessibility controls into single dropdown with proper ESC/click-outside closing
- [x] Implemented optional accessibility features - 2025-09-13 - Added toggleable enhanced readability, dyslexia-friendly text, high contrast, and reduced motion settings with local storage persistence
- [x] Added comprehensive keyboard navigation - 2025-09-13 - Implemented skip links, focus management, WCAG 2.1 compliant navigation with keyboard shortcuts (Ctrl+M, Alt+1/2/3, Alt+S)
- [x] Fixed modal conditional accessibility - 2025-09-13 - Made accessibility improvements optional via settings checkboxes instead of default behavior
- [x] Updated feature section layout - 2025-09-13 - Positioned icons to the left of title and description for better visual hierarchy

## 2025-09-13 - Session 2

### Critical Feature Implementation

- [x] **Crisis Support Integration** - Added comprehensive 988 crisis resources banner with suicide prevention hotline, crisis text line, and SAMHSA helpline
- [x] **Human Oversight Messaging** - Implemented AI limitations banner with professional validation requirements and ethics messaging
- [x] **Footer Layout Optimization** - Ensured all footer sections (Astra Labs, Platform, Research, Resources, Support) align at same height with crisis banner positioned below

### Accessibility & UX Enhancements

- [x] **Modal Accessibility Overhaul** - Made enhanced readability, dyslexia-friendly fonts, and high contrast OPTIONAL (user must opt-in via settings)
- [x] **Compact Modal Design** - Reduced default modal spacing (p-4→p-3, mb-4→mb-2, mb-6→mb-3) while maintaining readability
- [x] **Enhanced vs Standard Distinction** - Created clear visual difference between default compact modals and enhanced accessibility modes
- [x] **Modal ESC Key Fix** - Removed duplicate ESC handlers preventing proper modal closure
- [x] **Theme Switching Fix** - Resolved dependency cycles causing page reload requirement for theme changes

### ARIA Landmark Implementation

- [x] **Complete ARIA Audit** - Implemented proper semantic landmark structure for screen readers
- [x] **Banner Role** - Navigation wrapped in `<header role="banner">`
- [x] **Navigation Role** - Added `role="navigation" aria-label="Main navigation"` to nav elements
- [x] **Main Content** - Enhanced main content area with `role="main"`
- [x] **Complementary Content** - Crisis banner and human oversight sections wrapped in `<aside role="complementary">`
- [x] **Content Info** - Footer enhanced with `role="contentinfo"`
- [x] **Section Labeling** - All major sections have proper `aria-labelledby` with corresponding heading IDs

### Component Architecture

- [x] **Dropdown Spacing** - Reduced SettingsDropdown and ThemeSwitcher padding for more compact interface
- [x] **CSS Accessibility Rules** - Fixed global styles applying enhanced accessibility by default (now only with .spacing-comfortable)
- [x] **Modal Components** - Updated both EnhancedDialog and Dialog components with conditional accessibility
- [x] **Heart Icon Removal** - Removed heart icon from crisis banner per user request

## 2025-09-14 - React 19 Migration & Testing

### PostCSS/Tailwind Configuration Issue

- [x] **Tailwind CSS Color Palette Issue** - FIXED 2025-09-14 - Downgraded from Tailwind CSS v4 to stable v3.4.0 to restore full color palette support (bg-green-100, bg-blue-100, etc.). CSS bundle now generates properly (58KB vs 0KB before)

### React 19 Bundle Analysis Optimization

- [x] **Test Structure Best Practices** - FIXED 2025-09-14 - Moved App.test.tsx to proper `src/__tests__/` directory structure with comprehensive Vitest configuration
- [x] **React 19 Manual Optimization Removal** - FIXED 2025-09-14 - Reduced manual optimizations from 50 to 30 (40% improvement) by removing unnecessary `React.memo`, `useCallback`, `useMemo` that React 19 compiler handles automatically
- [x] **TypeScript Lazy Loading Fixes** - FIXED 2025-09-14 - Fixed prop type errors by converting lazy-loaded components to default exports
- [x] **Development CSS Loading** - FIXED 2025-09-14 - Resolved CSS styling issues in development server, all Tailwind classes now working properly

### Crisis Banner Styling Refinements

- [x] **Crisis Banner Layout Updates** - FIXED 2025-09-14 - Updated spacing: h3 (mt-2 mb-6 px-3 py-0), bottom div (mt-6 mb-2 px-3 py-0), removed border-top and ExternalLink icon
- [ ] **Text Width Issue** - Crisis banner text still breaking between "emergency" and "room" despite full-width container attempts - may need container width investigation

## Testing Priority Tasks

### Critical Tests (High Priority)

- [ ] **Theme System Integration Tests** - Test theme switching functionality, CSS variable application, and persistence across page reloads for all 12+ theme variants
- [ ] **Modal Functionality Tests** - Comprehensive testing of all modals (signin, newsletter, ai insights, analytics) including ESC key handling, overlay clicks, and focus management
- [ ] **Accessibility Feature Tests** - Test optional accessibility features (enhanced readability, dyslexia fonts, high contrast, reduced motion) including settings persistence and conditional rendering
- [ ] **Navigation and Skip Links Tests** - Test keyboard navigation, skip links functionality (Ctrl+M, Alt+1/2/3), focus management, and ARIA landmark structure
- [ ] **Crisis Banner Integration Tests** - Test crisis support banner rendering, emergency contact links, human oversight messaging, and responsive layout behavior

## Known Issues

- Crisis banner text wrapping: "emergency room" breaks across lines despite w-full classes on all containers
- Modals 'ai insights' and 'analytics' use more distance to the bottom than to the top of the page
- Hamburger menu in mobile mode not scrollable
