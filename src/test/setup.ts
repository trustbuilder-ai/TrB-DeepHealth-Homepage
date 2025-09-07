import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock scrollIntoView for jsdom environment
Element.prototype.scrollIntoView = vi.fn()

// Mock console methods to reduce test noise
global.console = {
  ...console,
  // Uncomment to ignore console logs in tests
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})