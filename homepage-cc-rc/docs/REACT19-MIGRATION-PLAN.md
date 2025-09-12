# React 19 Migration Plan with Parallel Subagents

## Execution Instructions

### How to Execute This Plan

1. **Open 4 terminal windows** or use tmux/screen for parallel execution
2. **Copy each agent command** from the phases below
3. **Monitor agent outputs** - they report to you when complete
4. **Wait for all parallel agents** in a phase before proceeding to next phase
5. **Review agent reports** before moving to next phase

### Alternative Execution Methods

**Option A: Sequential with Agents** (Safer)
- Run each Task command one at a time
- Review output before next command
- Total time: ~60 minutes

**Option B: Manual Parallel** (Fastest)  
- You run commands in multiple terminals
- Manually coordinate phases
- Total time: ~20 minutes

**Option C: Automated Script** (Most Efficient)
- Create bash script with phase synchronization
- Use `wait` command for parallel tasks
- Total time: ~20 minutes unattended

---

## Phase 1: Setup & Initial Migration (Sequential)

```bash
# Run these commands one by one
npm run dev && npm run build && npm run lint && npm run tscheck
npx codemod@latest react/19/migration-recipe
npm install --save-exact react@^19.0.0 react-dom@^19.0.0 @types/react@^19.0.0 @types/react-dom@^19.0.0
npx types-react-codemod@latest preset-19 ./src
npm run tscheck
```

---

## Phase 2: Parallel Analysis (3 agents)

### Execute all three simultaneously:

```typescript
// Agent 1: Deprecated Patterns
Task({
  subagent_type: "general-purpose",
  description: "Analyze deprecated patterns",
  prompt: `
    Find all React 18 deprecated patterns in src/:
    - Count React.forwardRef usage
    - List files with propTypes/defaultProps
    - Identify string refs or Legacy Context
    - Output: File paths grouped by pattern type
    CRITICAL: Must check ALL .tsx/.ts files`
})

// Agent 2: Optimization Analysis  
Task({
  subagent_type: "general-purpose", 
  description: "Analyze optimization hooks",
  prompt: `
    Analyze memoization in src/:
    - Find useMemo/useCallback/memo usage
    - Categorize: Required vs Removable
    - Count instances per file
    Output format: filepath:line - hook - can_remove(yes/no)`
})

// Agent 3: Radix Compatibility
Task({
  subagent_type: "general-purpose",
  description: "Verify Radix compatibility",
  prompt: `
    Check Radix UI React 19 compatibility:
    - List all @radix-ui imports in package.json
    - Find Radix component usage in src/
    - Check each package version for React 19 support
    Flag any incompatible versions`
})
```

**Wait for all 3 agents to complete before proceeding**

---

## Phase 3: Parallel Refactoring (3 agents)

### Execute all three simultaneously:

```typescript
// Agent 1: UI Components Batch 1
Task({
  subagent_type: "general-purpose",
  description: "Remove forwardRef batch 1",
  prompt: `
    Remove React.forwardRef from these files ONLY:
    - src/components/ui/button.tsx
    - src/components/ui/input.tsx  
    - src/components/ui/textarea.tsx
    - src/components/ui/badge.tsx
    - src/components/ui/progress.tsx
    - src/components/ui/progress-bar.tsx
    - src/components/ui/status-badge.tsx
    
    Pattern: Convert forwardRef to regular function with ref prop
    Maintain: TypeScript types, displayName
    Run after each file: npm run tscheck`
})

// Agent 2: Card & Compound Components
Task({
  subagent_type: "general-purpose",
  description: "Remove forwardRef batch 2", 
  prompt: `
    Remove React.forwardRef from card components ONLY:
    - src/components/ui/card.tsx (all 6 components inside)
    - src/components/ui/alert.tsx (all 3 components inside)
    - src/components/ui/avatar.tsx (all 3 components inside)
    
    Same conversion pattern as batch 1
    Preserve theme prop handling`
})

// Agent 3: Complex Components
Task({
  subagent_type: "general-purpose",
  description: "Remove forwardRef batch 3",
  prompt: `
    Remove React.forwardRef from remaining files:
    - src/components/ui/select.tsx
    - src/components/ui/dialog.tsx
    - src/components/ui/modal.tsx
    - src/components/ui/notification.tsx
    
    Maintain Radix primitive integration
    Test interactivity after changes`
})
```

**Wait for all 3 agents to complete before proceeding**

---

## Phase 4: Parallel Enhancement & Testing (4 agents)

### Execute all four simultaneously:

```typescript
// Agent 1: Error Boundary
Task({
  subagent_type: "general-purpose",
  description: "Create error boundary",
  prompt: `
    Create src/components/ui/error-boundary.tsx:
    - Class component with componentDidCatch
    - Reset functionality
    - Follow existing UI component patterns
    - Use TypeScript strict mode
    Wrap App component with ErrorBoundary`
})

// Agent 2: Component Testing
Task({
  subagent_type: "general-purpose",
  description: "Test critical paths",
  prompt: `
    Test these features work:
    - Theme switching (ThemeSwitcher)
    - Modal open/close with ESC
    - Select dropdowns
    - Form inputs
    Run: npm run dev, test manually, report issues`
})

// Agent 3: Migration Documentation
Task({
  subagent_type: "general-purpose",
  description: "Create migration docs",
  prompt: `
    Create docs/MIGRATION.md:
    - List all changes made
    - Document any errors encountered
    - Note Radix UI compatibility findings
    Include before/after code examples ONLY for complex changes`
})

// Agent 4: Update Project Docs
Task({
  subagent_type: "general-purpose",
  description: "Update project docs",
  prompt: `
    Update AGENTS.md:
    - Change "React 18" to "React 19" in Stack
    - Add note: "ref as prop pattern (no forwardRef)"
    
    Check for README.md, update if exists`
})
```

**Wait for all 4 agents to complete before proceeding**

---

## Phase 5: Final Validation (Sequential)

```bash
# Run final validation
npm run format && npm run lint && npm run tscheck && npm run build

# Manual testing checklist
- [ ] Theme switcher works
- [ ] Modals open/close properly
- [ ] Forms submit correctly
- [ ] No console errors
- [ ] Build succeeds

# Update best practices doc
echo "Update react19-best-practices.md with findings"
```

---

## Execution Checklist

- [ ] Phase 1: Setup complete
- [ ] Phase 2: Analysis agents finished
- [ ] Phase 3: Refactoring agents finished  
- [ ] Phase 4: Enhancement agents finished
- [ ] Phase 5: Validation passed

## Success Criteria

- **Zero TypeScript errors** (`npm run tscheck`)
- **Zero lint warnings** (`npm run lint`)
- **Successful build** (`npm run build`)
- **All features working** (manual test)
- **Documentation updated** (3 files minimum)

## Rollback Plan

If migration fails:
```bash
git reset --hard HEAD
npm install  # Restore original dependencies
```

## Timeline

| Phase | Duration | Type |
|-------|----------|------|
| Phase 1 | 5 min | Sequential |
| Phase 2 | 2 min | Parallel (3 agents) |
| Phase 3 | 5 min | Parallel (3 agents) |
| Phase 4 | 3 min | Parallel (4 agents) |
| Phase 5 | 5 min | Sequential |
| **Total** | **~20 min** | Mixed |

## Notes

- Agents must NOT edit same files simultaneously
- Each agent self-validates its changes
- Maintain strict TypeScript (no `any`)
- Preserve all existing functionality
- Follow project patterns from AGENTS.md