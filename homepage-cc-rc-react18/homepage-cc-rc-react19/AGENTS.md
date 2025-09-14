# Agent Resources

## Quick Start

**Commands**: `npm run dev` | `npm run build` | `npm run lint` | `npm run typecheck` | `npm run format`
**Stack**: React 18 + Vite + TypeScript + Tailwind + Radix UI
**Structure**: `src/{components/{ui,features,layout}, hooks, utils}`

## Core Rules

- **Patterns**: Use existing component/hook patterns, extend via props
- **TypeScript**: Strict mode, no `any`
- **Accessibility**: Radix primitives for interactive elements
- **Styling**: `cn()` for classes, Tailwind-only, CSS vars `hsl(var(--primary))`
- **Imports**: `@/components`, `@/hooks`, `@/utils`
- **Performance**: Individual icon imports, memoized values

## Context7: Docs via MCP

```typescript
mcp__context7__resolve - library - id("react"); // → /facebook/react
mcp__context7__get - library - docs("/facebook/react", { topic: "hooks" });
```

**Libraries**: `/websites/react_dev`, `/websites/tailwindcss`, `/radix-ui/primitives`, `/vitejs/vite`
