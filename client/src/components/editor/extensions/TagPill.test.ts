/**
 * Unit Tests for TagPill Extension Utilities
 * 
 * Tests: isValidTag, normalizeTag
 */

import { describe, it, expect } from 'vitest';
import { isValidTag, normalizeTag } from './TagPill';

describe('isValidTag', () => {
  it('should accept simple alphabetic tags', () => {
    expect(isValidTag('work')).toBe(true);
    expect(isValidTag('urgent')).toBe(true);
    expect(isValidTag('a')).toBe(true);
  });

  it('should accept tags with numbers and letters', () => {
    expect(isValidTag('v2')).toBe(true);
    expect(isValidTag('tag123')).toBe(true);
    expect(isValidTag('2fast')).toBe(true);
  });

  it('should accept tags with hyphens', () => {
    expect(isValidTag('follow-up')).toBe(true);
    expect(isValidTag('high-priority')).toBe(true);
  });

  it('should accept tags with underscores', () => {
    expect(isValidTag('to_do')).toBe(true);
    expect(isValidTag('work_item')).toBe(true);
  });

  it('should reject purely numeric tags', () => {
    expect(isValidTag('123')).toBe(false);
    expect(isValidTag('42')).toBe(false);
    expect(isValidTag('0')).toBe(false);
  });

  it('should reject tags with special characters', () => {
    expect(isValidTag('tag!')).toBe(false);
    expect(isValidTag('tag@work')).toBe(false);
    expect(isValidTag('tag.name')).toBe(false);
    expect(isValidTag('tag name')).toBe(false);
  });

  it('should reject empty strings', () => {
    expect(isValidTag('')).toBe(false);
  });

  it('should reject hex color values (3-digit)', () => {
    expect(isValidTag('fff')).toBe(false);
    expect(isValidTag('F00')).toBe(false);
    expect(isValidTag('abc')).toBe(false);
    expect(isValidTag('ABC')).toBe(false);
  });

  it('should reject hex color values (6-digit)', () => {
    expect(isValidTag('2E80F1')).toBe(false);
    expect(isValidTag('ff82b2')).toBe(false);
    expect(isValidTag('10B981')).toBe(false);
    expect(isValidTag('3B82F6')).toBe(false);
    expect(isValidTag('FB923C')).toBe(false);
    expect(isValidTag('FBBF24')).toBe(false);
    expect(isValidTag('A78BFA')).toBe(false);
    expect(isValidTag('34D399')).toBe(false);
    expect(isValidTag('F87171')).toBe(false);
  });

  it('should reject hex color values (8-digit with alpha)', () => {
    expect(isValidTag('2E80F1FF')).toBe(false);
    expect(isValidTag('ff82b280')).toBe(false);
  });

  it('should still accept tags that look similar but are not hex colors', () => {
    // Tags with non-hex characters or different lengths are still valid
    expect(isValidTag('abcg')).toBe(true); // 'g' is not a hex char
    expect(isValidTag('hello')).toBe(true); // 5 chars, not 3/6/8
    expect(isValidTag('ab')).toBe(true); // 2 chars, not 3/6/8
    expect(isValidTag('abcde')).toBe(true); // 5 chars
    expect(isValidTag('abcdefg')).toBe(true); // 7 chars
    expect(isValidTag('work')).toBe(true);
  });
});

describe('normalizeTag', () => {
  it('should convert to lowercase', () => {
    expect(normalizeTag('Work')).toBe('work');
    expect(normalizeTag('URGENT')).toBe('urgent');
    expect(normalizeTag('FollowUp')).toBe('followup');
  });

  it('should trim whitespace', () => {
    expect(normalizeTag('  work  ')).toBe('work');
    expect(normalizeTag('\turgent\n')).toBe('urgent');
  });

  it('should handle already normalized tags', () => {
    expect(normalizeTag('work')).toBe('work');
    expect(normalizeTag('follow-up')).toBe('follow-up');
  });

  it('should preserve hyphens and underscores', () => {
    expect(normalizeTag('Follow-Up')).toBe('follow-up');
    expect(normalizeTag('Work_Item')).toBe('work_item');
  });
});
