# Agent Resources & Documentation

## Quick Start

**Commands**: `npm run dev` | `npm run build` | `npm run lint` | `npm run tscheck`
**Entry**: `src/main.tsx` → `src/App.tsx`
**Stack**: React 18 + Vite + TypeScript + Tailwind + Radix UI

## Project Architecture

### File Structure

```text
src/
├── components/
│   ├── ui/           # Radix + shadcn/ui components
│   ├── features/     # ThemeSwitcher, FontSwitcher, IconSwitcher
│   └── layout/       # Navigation, Features
├── hooks/            # useTheme, useFont, useIcon, useOnlineStatus
└── utils/            # cn(), themes, fonts, mockData
```

### Core Principles

- **Always use existing patterns** - Follow established component/hook structure
- **Prefer composition** - Extend via props, not new components
- **TypeScript strict** - All imports typed, no `any`
- **Accessibility first** - Radix primitives required for interactive elements
- **Performance** - Individual icon imports, memoized values

### Critical Rules

- Use `cn()` for all className merging
- Import paths: `@/components`, `@/hooks`, `@/utils`
- CSS variables for colors: `hsl(var(--primary))`
- Never bypass existing theming system
- No inline styles, use Tailwind classes only

## Context7 Documentation

### Primary Resources

- **React**: `/websites/react_dev` (1,752 snippets)
- **Tailwind**: `/websites/tailwindcss` (1,545 snippets)
- **Radix**: `/radix-ui/primitives` (422 snippets)
- **Vite**: `/vitejs/vite` (480 snippets)

### Usage

```typescript
// 1. Resolve library name to Context7 ID
mcp__context7__resolve-library-id("react")
// Returns: /facebook/react

// 2. Get documentation with optional topic focus
mcp__context7__get-library-docs("/facebook/react", { topic: "hooks" })
```
