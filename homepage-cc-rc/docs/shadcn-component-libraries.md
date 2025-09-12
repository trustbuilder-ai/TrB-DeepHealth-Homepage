<!-- markdownlint-disable MD024 -->

# Shadcn Component Libraries Comparison

## Overview

This document compares popular component libraries and tools that extend or
build upon shadcn/ui, providing additional components, themes, and
functionality for React projects using Tailwind CSS.

## Current Project Stack

- **Framework**: React 18.2.0 with Vite
- **Styling**: Tailwind CSS
- **UI Base**: Radix UI primitives
- **Existing Components**: Basic shadcn/ui components already implemented

## Library Comparisons

### 1. Origin UI

**Website**: [originui.com](https://originui.com) |
**GitHub**: 8k+ stars | **License**: MIT

#### Description

Open-source collection of copy-and-paste React components built with Tailwind CSS.

#### Features

- **24 component categories** with 300+ total variants
- Light/dark mode support
- Copy-paste implementation (no package installation)
- TypeScript support (99.6% TypeScript codebase)

#### Components

- Navbar (20 variants)
- Buttons (54 variants)
- Tree components (15 variants)
- Calendar & Date Picker (28 variants)
- Avatar (23 variants)

#### Setup

```bash
# Copy .tsx files from registry/default/ui to components/ui
# Add required CSS variables to stylesheet
```

#### Project Benefits

- **Free and open-source**
- **Large component variety**
- **Active maintenance** (838+ commits)
- **Tailwind v4 support**
- **No dependencies** beyond React/Tailwind

#### Limitations

- Manual copy-paste workflow (no CLI)
- Requires manual CSS variable setup

---

### 2. Kibo UI

**Website**: [kibo-ui.com](https://www.kibo-ui.com/) |
**License**: Open Source

#### Description

Custom registry of composable, accessible components designed as shadcn/ui extensions.

#### Features

- **Advanced components**: Gantt charts, Kanban boards, color pickers
- Built with React, TypeScript, Tailwind CSS, Lucide, Radix UI
- CLI-based installation: `npx kibo-ui add`
- Specialized for complex business interfaces

#### Components

- Collaboration tools (Gantt, Kanban)
- Project management blocks
- Finance widgets
- Code editors
- Social interaction components

#### Setup

```bash
npx kibo-ui add [component-name]
```

#### Project Benefits

- **Free forever**
- **Advanced business components**
- **CLI installation**
- **Extends shadcn/ui ecosystem**
- **TypeScript + Radix UI**

#### Limitations

- Focused on business/enterprise use cases
- May be overkill for simple projects

---

### 3. MVP Blocks

**Website**: [blocks.mvp-subha.me](https://blocks.mvp-subha.me/) |
**License**: Open Source

#### Description

Copy-paste responsive UI sections optimized for landing pages
and MVPs.

#### Features

- **Landing page sections** (heroes, carousels, testimonials)
- Pixel-perfect responsive design
- Framer Motion animations
- Compatible with Next.js, plain HTML
- CLI and manual integration

#### Components

- Hero sections
- Card carousels
- Feature blocks
- Testimonial sections
- Call-to-action components

#### Setup

```bash
# Copy-paste components
# CLI integration available
```

#### Project Benefits

- **Perfect for landing pages**
- **Built-in animations**
- **Responsive by default**
- **Framework agnostic**
- **Production-ready**

#### Limitations

- Limited to landing page/marketing components
- Less variety than general-purpose libraries

---

### 4. Skiper/UI (Premium)

**Website**: [skiper-ui.com](https://skiper-ui.com/) |
**License**: Commercial

#### Description

Premium React component library with 72+ unique components featuring
advanced animations and interactions.

#### Features

- **72+ premium components**
- Advanced scroll and animation effects
- Single-file components (no extra packages)
- Inspired by industry design experts
- Professional quality animations

#### Components

- Image reveal effects
- Dynamic islands
- Hover interactions
- Cursor trails
- Vercel-style tooltips

#### Pricing

- **Premium**: $129 (all components, lifetime updates)
- **Exclusive**: $549 (includes Figma files, templates)

#### Setup

```bash
npx shadcn add @skiper-ui/skiper40
```

#### Project Benefits

- **High-quality animations**
- **Unique interactive components**
- **Professional design**
- **Single-file architecture**

#### Limitations

- **Paid license** ($129-$549)
- Overkill for basic projects
- Focused on advanced interactions

---

### 5. Shsf UI (Beta)

**Website**: [shsfui.com](https://www.shsfui.com/) |
**License**: Open Source (Coming Soon)

#### Description

Motion-first UI library focusing on elegant animations and micro-interactions.

#### Features

- Built with React, TypeScript, Tailwind CSS, Framer Motion
- Uses shadcn/ui as foundation
- Beta stage development
- Motion-first design philosophy

#### Components

- Animated buttons (bookmark, heart, like, star)
- Volume/brightness controls
- Day/night switches
- Swap cards
- Avatar groups

#### Setup

```bash
# Installation details not yet available (Beta)
```

#### Project Benefits

- **Motion-focused design**
- **Built on shadcn/ui**
- **Open source promise**

#### Limitations

- **Still in Beta**
- Limited documentation
- Small component library
- Uncertain release timeline

---

### 6. TweakCN (Theme Tool)

**Website**: [tweakcn.com](https://tweakcn.com/) | **Creator**: Sahaj Jain

#### Description

Interactive theme editor and generator specifically for shadcn/ui components.

#### Features

- Visual theme customization
- Real-time preview
- Tailwind CSS v4 support
- Export custom CSS variables
- Web-based editor

#### Project Benefits

- **Easy theme customization**
- **Visual interface**
- **Tailwind v4 ready**
- **No installation required**

#### Limitations

- Not a component library (theme tool only)
- Limited to color/theme customization

## Recommendations for This Project

### Best Overall Value: **Origin UI**

- **Why**: Large component variety, completely free, active development
- **Use case**: General-purpose components with extensive options
- **Setup**: Manual copy-paste, but comprehensive documentation

### Best for Advanced Features: **Kibo UI**

- **Why**: Advanced business components, CLI installation, extends shadcn/ui
- **Use case**: If you need complex components like Gantt charts or Kanban boards
- **Setup**: Simple CLI installation

### Best for Landing Pages: **MVP Blocks**

- **Why**: Specialized landing page sections with built-in animations
- **Use case**: Marketing/landing page focused projects
- **Setup**: Copy-paste with optional CLI

### Theme Customization: **TweakCN**

- **Why**: Easy visual theme editing
- **Use case**: Custom branding and color schemes
- **Setup**: Web-based tool, no installation

### Avoid for Now

- **Skiper/UI**: Premium pricing may not justify cost for this project
- **Shsf UI**: Too early in development (Beta)

## Implementation Strategy

### Phase 1: Foundation

1. **Use TweakCN** to customize theme colors and variables
2. **Install Origin UI components** for core functionality
3. **Copy essential components** from MVP Blocks for landing sections

### Phase 2: Enhancement

1. **Add Kibo UI components** if advanced features are needed
2. **Evaluate Shsf UI** when it exits Beta stage

### Current Project Integration

Based on your existing stack (React 18.2.0 + Vite + Tailwind), all
recommended libraries are compatible:

```javascript
// Current dependencies that support these libraries
"react": "^18.2.0",
"react-dom": "^18.2.0",
"tailwindcss": "^3.3.0",
"@radix-ui/*": "^1.0.*"
```

## React 19 Migration Plan

### Compatibility Assessment

#### Core Dependencies Status

- **shadcn/ui**: **Fully compatible** with React 19 (Oct 2024)
- **Radix UI**: **Full React 19 compatibility** achieved
- **Tailwind CSS**: **v3.4.1 stable**, v4 + React 19 in development

#### Library-Specific Compatibility

**Ready for React 19:**

- **Origin UI**: Built with React + Tailwind (no framework lock-in)
- **Kibo UI**: Uses Radix UI + TypeScript (compatible stack)
- **MVP Blocks**: Framework agnostic, works with React 19
- **TweakCN**: Pure theme tool (React version independent)

**Needs Evaluation:**

- **Skiper/UI**: Premium library, compatibility status unknown
- **Shsf UI**: Beta stage, React 19 support unconfirmed

### Migration Strategy

#### Phase 1: Pre-Migration (Current: React 18.2.0)

```bash
# Test compatibility with React 18.3 first
npm install react@18.3.0 react-dom@18.3.0

# Run codemods to identify issues
npx codemod@latest react/19/migration-recipe --dry-run
```

#### Phase 2: React 19 Upgrade

```bash
# Core React 19 upgrade
npm install --save-exact react@^19.0.0 react-dom@^19.0.0

# Handle peer dependency warnings for shadcn/ui
npm install --legacy-peer-deps
# OR use pnpm/bun (no flags needed)
```

#### Phase 3: Component Library Updates

**Immediate (Safe):**

1. **Origin UI**: Copy latest components from registry
2. **TweakCN**: Use for theme customization (no changes needed)
3. **MVP Blocks**: Test existing components, update if needed

**Gradual (Evaluate):**

1. **Kibo UI**: Test advanced components thoroughly
2. **Skiper/UI**: Contact vendor for React 19 support status
3. **Shsf UI**: Wait for stable release before adoption

### Breaking Changes Impact

#### React 19 Changes vs shadcn Libraries

**No Impact:**

- **React Compiler optimizations**: All libraries benefit automatically
- **New hooks** (`useActionState`, `useFormStatus`): Additive features
- **Server Components**: Only affects framework-level integration

**Requires Attention:**

- **forwardRef deprecation**: shadcn/ui already updated
- **StrictMode changes**: Test all components thoroughly
- **Suspense waterfall behavior**: Review data fetching patterns

### Feasibility Assessment

#### HIGH Feasibility

- **Origin UI + TweakCN + MVP Blocks**: Risk-free migration
- All are React 19 compatible with active maintenance
- No breaking changes expected

#### MEDIUM Feasibility

- **Kibo UI**: Depends on Radix UI (now compatible)
- Test complex business components (Gantt, Kanban)
- CLI installation should work with `--legacy-peer-deps`

#### LOW Feasibility

- **Skiper/UI**: Premium vendor, unknown React 19 timeline
- **Shsf UI**: Beta stage, unstable for production

### Recommended Migration Path

#### Week 1-2: Foundation

```bash
# 1. Test current stack with React 18.3
npm install react@18.3.0 react-dom@18.3.0

# 2. Run migration codemods
npx codemod@latest react/19/migration-recipe

# 3. Remove manual memoization (per React 19 best practices)
# - Remove memo(), useMemo(), useCallback()
# - Let React Compiler handle optimization
```

#### Week 3-4: Core Upgrade

```bash
# 1. Upgrade to React 19
npm install --save-exact react@^19.0.0 react-dom@^19.0.0

# 2. Update shadcn/ui components (if needed)
npx shadcn-ui@latest add --overwrite

# 3. Install recommended libraries
# Origin UI (manual copy-paste)
# TweakCN (web tool - no installation)
```

#### Week 5-6: Testing & Optimization

- Enable **React Compiler** for automatic optimizations
- Implement **new hooks** where beneficial (`useActionState` for forms)
- Test **Suspense boundaries** and data fetching
- Add **error boundaries** for improved error handling

### Risk Mitigation

#### Technical Risks

- **Peer dependency conflicts**: Use `--legacy-peer-deps` or switch to pnpm
- **Third-party library issues**: Stick to confirmed compatible libraries
- **Tailwind v4 issues**: Stay on v3.4.1 until v4 is stable

#### Business Risks

- **Development velocity**: Phase migration over 6 weeks
- **Production stability**: Test in staging environment first
- **Team learning curve**: Focus on React Compiler benefits

### Success Metrics

- All existing components render without errors
- Performance improvements from React Compiler
- Reduced bundle size (no manual memoization code)
- Enhanced developer experience with new hooks
- Improved error handling with React 19 error boundaries

### Rollback Plan

```bash
# Emergency rollback to React 18.2.0
npm install react@18.2.0 react-dom@18.2.0
# Restore previous memoization code if needed
# Disable React Compiler
```

## Sources

- [Origin UI](https://originui.com/) - [GitHub](https://github.com/origin-space/originui)
- [Kibo UI](https://www.kibo-ui.com/)
- [MVP Blocks](https://blocks.mvp-subha.me/)
- [Skiper/UI](https://skiper-ui.com/)
- [Shsf UI](https://www.shsfui.com/)
- [TweakCN](https://tweakcn.com/)
- [React 19 Best Practices Guide](docs/react19-best-practices.md)
