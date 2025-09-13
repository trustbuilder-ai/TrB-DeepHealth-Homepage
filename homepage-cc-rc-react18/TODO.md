# TODOs

- Modals 'signin' and 'newsletter' do not close on ESC. Check whether they use the common modal hooks and components
- Modals 'ai insights' and 'analytics' use more distance to the bottom than to the top of the page
- Themes are not rerendered, the page has to be reloaded to switch themes

## 2025-09-13

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
- [x] Implemented vibrant "-2" theme variants - 2025-09-13 - Added 6 new enhanced themes: Coastal Breeze Vivid, Coastal Glow Radiant, Earthy Serenity Lush, Neon Tide Electric, Cyber Mint Matrix, Midnight Pulse Neon
- [x] Fixed button theme adaptation issues - 2025-09-13 - Updated floating action buttons, modal buttons, and icons to properly use theme colors instead of hardcoded teal-600
- [x] Enhanced WCAG accessibility and contrast compliance - 2025-09-13 - Improved form inputs, modals, dropdowns, and theme switcher with better contrast ratios and focus indicators
- [x] Added theme-aware styling utilities - 2025-09-13 - Enhanced themeUtils.ts with new functions for inputs, selects, modals, and improved button styling
- [x] Updated Select component with theme support - 2025-09-13 - Added theme props and styling to SelectTrigger, SelectContent, and SelectItem components
- [x] Improved ThemeSwitcher accessibility - 2025-09-13 - Enhanced dropdown contrast, focus management, and ARIA attributes for better screen reader support
