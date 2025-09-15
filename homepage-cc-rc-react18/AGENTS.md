# Agent Resources

## Quick Start

**Commands**: `npm run dev` | `npm run build` | `npm run lint` | `npm run typecheck` | `npm run format`
**Stack**: React 18 + Vite + TypeScript + Tailwind + Radix UI
**Structure**: `config/, docs/, src/{components/{ui,features,layout,seo}, contexts, data, hooks, styles, types, utils}/`

## Core Rules

- **React 18**: `React.forwardRef` pattern, manual memoization (`memo`/`useMemo`/`useCallback`)
- **Patterns**: Use existing component/hook patterns, extend via props
- **TypeScript**: Strict mode, no `any`
- **Accessibility**: Radix primitives for interactive elements
- **Styling**: `cn()` for classes, Tailwind-only, CSS vars `hsl(var(--primary))`
- **Imports**: `@/components`, `@/hooks`, `@/utils`
- **Performance**: Individual icon imports, manual memoization
- **Shadcn Libraries**: Origin UI (copy-paste), TweakCN (theming), MVP Blocks (landing)
- **Testing**: Vitest + Testing Library, `npm run validate` for all checks

## Context7: Docs via MCP

```typescript
mcp__context7__resolve - library - id("react"); // → /facebook/react
mcp__context7__get - library - docs("/facebook/react", { topic: "hooks" });
```

**Libraries**: `/websites/react_dev`, `/websites/tailwindcss`, `/radix-ui/primitives`, `/vitejs/vite`
