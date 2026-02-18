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
