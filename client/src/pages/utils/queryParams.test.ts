/**
 * Tests for query parameter parsing utilities.
 * 
 * parseBool and parseIntSafe are used by the Editor page to convert
 * URL search-parameter strings into typed configuration values.
 * Co-located with the source module for maintainability.
 */

import { describe, it, expect } from 'vitest';
import { parseBool, parseIntSafe } from './queryParams';

describe('parseBool', () => {
  it('should return default value for null', () => {
    expect(parseBool(null, true)).toBe(true);
    expect(parseBool(null, false)).toBe(false);
  });

  it('should return false for "false"', () => {
    expect(parseBool('false', true)).toBe(false);
  });

  it('should return false for "0"', () => {
    expect(parseBool('0', true)).toBe(false);
  });

  it('should return true for "true"', () => {
    expect(parseBool('true', false)).toBe(true);
  });

  it('should return true for "1"', () => {
    expect(parseBool('1', false)).toBe(true);
  });

  it('should return true for any other string', () => {
    expect(parseBool('yes', false)).toBe(true);
    expect(parseBool('anything', false)).toBe(true);
    expect(parseBool('', false)).toBe(true);
  });
});

describe('parseIntSafe', () => {
  it('should return default value for null', () => {
    expect(parseIntSafe(null, 4, 1, 6)).toBe(4);
  });

  it('should parse valid integers', () => {
    expect(parseIntSafe('3', 4, 1, 6)).toBe(3);
    expect(parseIntSafe('1', 4, 1, 6)).toBe(1);
    expect(parseIntSafe('6', 4, 1, 6)).toBe(6);
  });

  it('should clamp to min', () => {
    expect(parseIntSafe('0', 4, 1, 6)).toBe(1);
    expect(parseIntSafe('-5', 4, 1, 6)).toBe(1);
  });

  it('should clamp to max', () => {
    expect(parseIntSafe('10', 4, 1, 6)).toBe(6);
    expect(parseIntSafe('100', 4, 1, 6)).toBe(6);
  });

  it('should floor decimal values', () => {
    expect(parseIntSafe('3.7', 4, 1, 6)).toBe(3);
    expect(parseIntSafe('5.9', 4, 1, 6)).toBe(5);
  });

  it('should return default for NaN', () => {
    expect(parseIntSafe('abc', 4, 1, 6)).toBe(4);
  });

  it('should clamp empty string (Number("") === 0) to min', () => {
    // Number('') === 0, which is valid but below min=1, so clamps to min
    expect(parseIntSafe('', 4, 1, 6)).toBe(1);
  });
});
