/**
 * React 19 useActionState Hook Implementation
 *
 * Provides enhanced form state management with built-in async action support,
 * loading states, and error handling - a key React 19 feature.
 */

import { useState, useCallback, useTransition } from "react";

// Type definitions for useActionState
export type ActionState<S> = {
  data?: S;
  error?: string;
  pending: boolean;
};

export type ActionFunction<S, P> = (prevState: S, payload: P) => Promise<S> | S;

/**
 * React 19 useActionState hook implementation
 *
 * This hook combines form state management with async actions,
 * providing built-in loading states and error handling.
 */
export function useActionState<S, P>(
  action: ActionFunction<S, P>,
  initialState: S,
  permalink?: string,
): [ActionState<S>, (payload: P) => void] {
  const [state, setState] = useState<S>(initialState);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const dispatch = useCallback(
    (payload: P) => {
      startTransition(async () => {
        try {
          setError(undefined);

          const result = await Promise.resolve(action(state, payload));

          setState(result);

          // Handle permalink for SEO if provided
          if (permalink && typeof window !== "undefined") {
            window.history.replaceState(null, "", permalink);
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";
          setError(errorMessage);
        }
      });
    },
    [action, state, permalink],
  );

  const actionState: ActionState<S> = {
    data: state,
    error,
    pending: isPending,
  };

  return [actionState, dispatch];
}

/**
 * Optimistic update hook for immediate UI feedback
 *
 * This implements React 19's useOptimistic pattern for better UX
 */
export function useOptimistic<S, A>(
  state: S,
  updateFn: (state: S, action: A) => S,
): [S, (action: A) => void] {
  const [optimisticState, setOptimisticState] = useState<S>(state);
  const [, startTransition] = useTransition();

  const addOptimistic = useCallback(
    (action: A) => {
      startTransition(() => {
        setOptimisticState((prev) => updateFn(prev, action));
      });
    },
    [updateFn],
  );

  // Reset optimistic state when actual state changes
  if (state !== optimisticState && !startTransition) {
    setOptimisticState(state);
  }

  return [optimisticState, addOptimistic];
}

/**
 * Form status hook for accessing parent form state
 *
 * Mimics React 19's useFormStatus hook
 */
export function useFormStatus() {
  // This would typically be provided by React 19's form context
  // For now, we'll provide a basic implementation
  const [pending] = useState(false);

  return {
    pending,
    data: undefined,
    method: undefined,
    action: undefined,
  };
}

/**
 * Enhanced form action creator for React 19 patterns
 */
export function createFormAction<T>(
  handler: (formData: FormData) => Promise<T> | T,
) {
  return async (_prevState: unknown, formData: FormData) => {
    try {
      const result = await Promise.resolve(handler(formData));
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  };
}

/**
 * Newsletter subscription action using React 19 patterns
 */
export interface NewsletterState {
  success: boolean;
  message?: string;
  email?: string;
}

export interface FormActionResult<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export const newsletterAction = createFormAction<{
  message: string;
  email: string;
}>(async (formData: FormData) => {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Email is required");
  }

  if (!email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate random success/failure for demo
  if (Math.random() > 0.3) {
    return {
      message: `Successfully subscribed ${email} to newsletter!`,
      email,
    };
  } else {
    throw new Error("Subscription failed. Please try again later.");
  }
});

/**
 * Login form action
 */
export interface LoginState {
  success: boolean;
  message?: string;
  user?: { email: string };
}

export const loginAction = createFormAction<{
  message: string;
  user: { email: string };
}>(async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Demo authentication (always succeeds for demo@example.com)
  if (email === "demo@example.com") {
    return {
      message: "Successfully logged in!",
      user: { email },
    };
  } else {
    throw new Error("Invalid credentials");
  }
});
