# Agent Resources

## Quick Start

**Commands**: `npm run validate` | `npm run dev` | `npm run build` | `npm run analyze` | `npm run test:coverage`
**Stack**: React 19 + Vite + TypeScript + Tailwind + Radix UI (ref as prop, no forwardRef)
**Structure**: `config/, docs/, src/{components/{ui,features,layout}, data, hooks, styles, types, utils}/`

## Core Rules

- **React 19**: No `React.forwardRef` (ref as prop), no manual memoization (`memo`/`useMemo`/`useCallback`)
- **Patterns**: Use existing component/hook patterns, extend via props
- **TypeScript**: Strict mode, no `any`
- **Accessibility**: Radix primitives for interactive elements, error boundaries required
- **Styling**: `cn()` for classes, Tailwind-only, CSS vars `hsl(var(--primary))`
- **Imports**: `@/components`, `@/hooks`, `@/utils`
- **Performance**: React 19 compiler handles optimization, individual icon imports
- **New Hooks**: `useActionState`, `useOptimistic`, `use`, `useFormStatus`
- **Forms**: Server Actions with `<form action={serverAction}>` pattern
- **Testing**: Vitest + Testing Library, coverage reports, `npm run validate` pipeline
- **Bundle Analysis**: `npm run analyze` - React 19 migration tracking with bundle-analysis.js
- **DevOps**: Security audit, deps management, lighthouse performance, CI validation

## Context7: Docs via MCP

```typescript
mcp__context7__resolve - library - id("react"); // → /facebook/react
mcp__context7__get - library - docs("/facebook/react", { topic: "hooks" });
```

**Libraries**: `/websites/react_dev`, `/websites/tailwindcss`, `/radix-ui/primitives`, `/vitejs/vite`
