/**
 * Unit Tests for Utility Functions
 * 
 * Tests: cn (className merge utility)
 */

import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (className merge utility)', () => {
  it('should merge simple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'active')).toBe('base active');
    expect(cn('base', false && 'active')).toBe('base');
  });

  it('should handle undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('should merge Tailwind classes correctly (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle object syntax', () => {
    expect(cn({ 'bg-red-500': true, 'text-white': true, hidden: false })).toBe('bg-red-500 text-white');
  });

  it('should handle array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('should handle complex Tailwind merges', () => {
    // tailwind-merge should resolve conflicting utilities
    expect(cn('px-4 py-2', 'px-8')).toBe('py-2 px-8');
    expect(cn('bg-background text-foreground', 'bg-primary')).toBe('text-foreground bg-primary');
  });
});
