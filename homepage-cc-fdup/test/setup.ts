import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock scrollIntoView for jsdom environment
Element.prototype.scrollIntoView = vi.fn();

// Mock console methods to reduce test noise
interface MockConsole {
  log: typeof vi.fn;
  warn: typeof vi.fn;
  error: typeof vi.fn;
  [key: string]: unknown;
}

(globalThis as typeof globalThis & { console: MockConsole }).console = {
  ...console,
  // Uncomment to ignore console logs in tests
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
