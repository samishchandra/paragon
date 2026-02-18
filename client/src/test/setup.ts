/**
 * Vitest Test Setup
 * 
 * Configures the test environment with:
 * - jsdom for DOM simulation
 * - @testing-library/jest-dom for extended DOM matchers
 * - Mock implementations for browser APIs not available in jsdom
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia (used by theme providers and responsive hooks)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver (used by TipTap and various components)
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock requestAnimationFrame / cancelAnimationFrame
window.requestAnimationFrame = vi.fn((cb) => {
  cb(0);
  return 0;
});
window.cancelAnimationFrame = vi.fn();

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
  writable: true,
});

// Mock DOMParser for convertCheckboxListsToTaskLists
// jsdom provides DOMParser natively, but ensure it's available
if (typeof DOMParser === 'undefined') {
  // @ts-ignore
  global.DOMParser = class {
    parseFromString(html: string, type: string) {
      const doc = document.implementation.createHTMLDocument('');
      doc.body.innerHTML = html;
      return doc;
    }
  };
}

// Suppress console.warn for known TipTap warnings during tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  // Suppress known TipTap/ProseMirror warnings
  if (
    msg.includes('useWordCount') ||
    msg.includes('useAutoSave') ||
    msg.includes('[Performance]')
  ) {
    return;
  }
  originalWarn(...args);
};
