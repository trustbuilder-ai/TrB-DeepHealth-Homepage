# React 19 Best Practices

## Migration: 18.3 → Codemods → 19

```bash
npx codemod@latest react/19/migration-recipe
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
```

**Breaking**: Errors not re-thrown, StrictMode aggressive, removed `propTypes`/`defaultProps`/Legacy Context/String refs

## New Hooks

| Hook | Purpose | Usage |
|------|---------|-------|
| `useActionState` | Form submissions + async | `const [state, action, isPending] = useActionState(fn)` |
| `useOptimistic` | Optimistic UI updates | `const [optimistic, addOptimistic] = useOptimistic(state)` |
| `use` | Read resources in render | `const data = use(promise)` |
| `useFormStatus` | Parent form state | `const { pending } = useFormStatus()` |
| `useTransition` | Now accepts async | `startTransition(async () => {...})` |

## React Compiler = No Manual Optimization

**Auto-memoizes** (remove `memo`/`useMemo`/`useCallback`)  
**Replace `useEffect`** → SWR/TanStack Query  
**Inlines checks** vs wrapper overhead  
**Skips broken components**, continues compiling others

```javascript
// Before: Manual optimization
const Component = memo(({ data }) => {
  const result = useMemo(() => calc(data), [data]);
  return <div>{result}</div>;
});

// After: Compiler handles it
function Component({ data }) {
  const result = calc(data); // Auto-optimized
  return <div>{result}</div>;
}
```

## Server Components/Actions

- **Server Actions**: `"use server"` functions called from client forms
- **Server Components**: Async components that fetch on server
- **Form integration**: `<form action={serverAction}>` - no JS needed

```javascript
// Server Action
"use server";
async function createUser(formData) {
  return db.user.create({ name: formData.get("name") });
}

// Client Form
<form action={createUser}>
  <input name="name" />
  <button>Submit</button>
</form>
```

## Native Metadata

```javascript
function Page({ title }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content="..." />
      <main>...</main>
    </>
  );
}
```

## Suspense Breaking Change

**React 19**: Creates waterfalls (sequential) instead of parallel fetching

```javascript
<Suspense fallback={<Loading />}>
  <ComponentA /> {/* Fetches first */}
  <ComponentB /> {/* Waits for A */}
</Suspense>
```

## Key Practices

- **Error boundaries** required (errors not re-thrown)
- **ref as prop** (no `forwardRef` needed)  
- **StrictMode** for dev checks
- **Resource preloading** APIs for performance
- **Optimistic UI** with `useOptimistic`
