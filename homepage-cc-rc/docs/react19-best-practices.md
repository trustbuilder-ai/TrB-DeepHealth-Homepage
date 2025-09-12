# React 19 Best Practices Guide

## Migration Strategy

### Pre-Migration Checklist

1. **Upgrade to React 18.3 first** to identify potential issues
2. **Run codemods** for automated migration: `npx codemod@latest react/19/migration-recipe`
3. **Install React 19**: `npm install --save-exact react@^19.0.0 react-dom@^19.0.0`

### Breaking Changes to Address

- **Error handling**: Errors in render are no longer re-thrown
- **StrictMode changes**: Double-rendering in development is more aggressive
- **Removed APIs**:
  - `propTypes` and `defaultProps` for functions
  - Legacy Context
  - String refs
  - `React.createFactory`
  - Module pattern factories
  - `react-test-renderer/shallow`

## Core Features to Adopt

### 1. New Hooks

**`useActionState`** - Simplifies form submissions and async actions

```javascript
const [state, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    const result = await submitForm(formData);
    return result;
  },
);
```

**`useOptimistic`** - Enables optimistic UI updates

```javascript
const [optimisticState, addOptimistic] = useOptimistic(currentState);
```

**`use`** - Read resources during render

```javascript
const data = use(fetchPromise);
```

**`useFormStatus`** - Access parent form status without prop drilling

```javascript
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

**Enhanced `useTransition`** - Now accepts async functions

```javascript
const [isPending, startTransition] = useTransition();

// React 19: Can pass async function directly
startTransition(async () => {
  await updateData();
  setOptimisticState(newState);
});
```

### 2. Performance Optimizations

- **Resource preloading APIs** for scripts and stylesheets
- **Automatic deduplication** of stylesheets and scripts
- **Improved hydration** error reporting
- **Enhanced concurrent rendering** support
- **React Compiler** optimizes re-renders automatically

### 3. Document Metadata

Native support for metadata tags:

```javascript
function BlogPost({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <article>...</article>
    </>
  );
}
```

## Best Practices

### React Compiler Optimizations (NEW)

1. **No more manual memoization needed**:
   - React Compiler automatically memoizes components and values
   - Remove `memo()`, `useMemo()`, and `useCallback()` - they're redundant
   - Compiler handles re-render optimization automatically
   - **How it works** (per GitHub React team): Compiler inlines conditional
     checks instead of using `useMemo`/`useCallback` wrappers, reducing overhead
   - **Safety**: Skips components that break rules, continues compiling others

2. **Replace `useEffect` with data fetching libraries**:
   - Use **SWR**, **TanStack Query**, or **use()** hook for data fetching
   - Server Components eliminate many `useEffect` use cases
   - Actions handle side effects more declaratively

Example migration:

```javascript
// Before (React 18)
const Component = memo(({ data }) => {
  const [result, setResult] = useState(null);
  const processedData = useMemo(() => expensiveCalc(data), [data]);
  const handleClick = useCallback(() => doSomething(), []);

  useEffect(() => {
    fetchData().then(setResult);
  }, []);

  return <div onClick={handleClick}>{processedData}</div>;
});

// After (React 19)
function Component({ data }) {
  const processedData = expensiveCalc(data); // Compiler optimizes
  const result = use(fetchDataPromise); // Or use SWR/TanStack Query

  const handleClick = () => doSomething(); // No useCallback needed

  return <div onClick={handleClick}>{processedData}</div>;
}
```

### State Management

1. **Use Server Actions** for predictable data mutations
2. **Leverage optimistic updates** for responsive interfaces
3. **Implement `useActionState`** for form handling instead of manual state management
4. **Replace data fetching `useEffect`** with SWR or TanStack Query

### Component Architecture

1. **Collocate stylesheets** with components for better organization
2. **Use `ref` as a prop** in function components (no more `forwardRef`)
3. **Implement Suspense boundaries** for better loading states
4. **Keep StrictMode enabled** for development-time checks:
   - Detects unsafe lifecycles and side effects
   - Enhanced double-rendering catches more bugs
   - Warns about deprecated patterns

### Performance

1. **Utilize resource preloading** APIs for critical assets
2. **Enable automatic batching** for state updates
3. **Implement code splitting** with improved Suspense support

### Error Handling

1. **Add error boundaries** as errors are no longer re-thrown
2. **Improve hydration** error recovery strategies
3. **Handle third-party script** compatibility issues

## Actionable Migration Steps

1. **Audit codebase** for deprecated APIs using React 18.3
2. **Run automated codemods** to update syntax
3. **Remove unnecessary memoization** (`memo`, `useMemo`, `useCallback`)
4. **Replace `useEffect` data fetching** with SWR/TanStack Query
5. **Update form handling** to use new action-based APIs
6. **Implement optimistic UI** patterns where applicable
7. **Add metadata tags** directly in components
8. **Enable React Compiler** for automatic optimizations
9. **Review and update** error boundaries
10. **Test thoroughly** with focus on hydration and SSR

## Server Components & Actions (NEW)

### Server Actions

Functions executed on the server, called from client components:

```javascript
"use server";

async function createUser(formData) {
  const user = await db.user.create({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  return user;
}

// Client component
function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Create User</button>
    </form>
  );
}
```

### Server Components

Render on server, reduce client JavaScript:

```javascript
// Server Component (async allowed)
async function UserList() {
  const users = await fetchUsers(); // Runs on server

  return (
    <ul>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

## Suspense Behavior Changes

**Breaking Change**: React 19 creates waterfalls within Suspense boundaries
instead of parallel fetching (React 18 behavior).

```javascript
// React 18: Queries run in parallel
// React 19: Queries run in waterfall
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ComponentA /> {/* Fetches first */}
      <ComponentB /> {/* Waits for A to complete */}
    </Suspense>
  );
}
```

## Sources Referenced

- **Official React Documentation**: [react.dev](https://react.dev)
- **React Compiler Discussion**: [github.com/reactwg/react-compiler](https://github.com/reactwg/react-compiler)
- **React GitHub Releases**: [github.com/facebook/react/releases](https://github.com/facebook/react/releases)
- [remix.run/blog/incremental-path-to-react-19](https://remix.run/blog/incremental-path-to-react-19)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React 19 Improvements](https://react.dev/blog/2024/12/05/react-19)
