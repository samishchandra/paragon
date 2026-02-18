/**
 * Unit Tests for DatePill Extension Utilities
 * 
 * Tests: parseLocalDate, getLocalToday, getLocalDateOffset, dateToLocalString,
 *        formatDate, formatDateForMarkdown, parseDateFromMarkdown, getDateVariant
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseLocalDate,
  getLocalToday,
  getLocalDateOffset,
  dateToLocalString,
  formatDate,
  formatDateForMarkdown,
  parseDateFromMarkdown,
  getDateVariant,
} from './DatePill';

describe('parseLocalDate', () => {
  it('should parse YYYY-MM-DD format correctly', () => {
    const date = parseLocalDate('2025-02-11');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(1); // February (0-indexed)
    expect(date.getDate()).toBe(11);
  });

  it('should parse dates in local timezone (not UTC)', () => {
    // This is the key fix — new Date('2025-02-11') would parse as UTC midnight
    // which could be Feb 10 in US timezones. parseLocalDate should always be local.
    const date = parseLocalDate('2025-02-11');
    expect(date.getDate()).toBe(11); // Should always be 11, regardless of timezone
  });

  it('should handle single-digit months and days', () => {
    const date = parseLocalDate('2025-01-05');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(0); // January
    expect(date.getDate()).toBe(5);
  });

  it('should handle December 31st correctly', () => {
    const date = parseLocalDate('2025-12-31');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(11); // December
    expect(date.getDate()).toBe(31);
  });

  it('should handle January 1st correctly', () => {
    const date = parseLocalDate('2026-01-01');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
  });
});

describe('getLocalToday', () => {
  it('should return today\'s date in YYYY-MM-DD format', () => {
    const today = getLocalToday();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const now = new Date();
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(today).toBe(expected);
  });
});

describe('getLocalDateOffset', () => {
  it('should return tomorrow for offset +1', () => {
    const tomorrow = getLocalDateOffset(1);
    const expected = new Date();
    expected.setDate(expected.getDate() + 1);
    const expectedStr = `${expected.getFullYear()}-${String(expected.getMonth() + 1).padStart(2, '0')}-${String(expected.getDate()).padStart(2, '0')}`;
    expect(tomorrow).toBe(expectedStr);
  });

  it('should return yesterday for offset -1', () => {
    const yesterday = getLocalDateOffset(-1);
    const expected = new Date();
    expected.setDate(expected.getDate() - 1);
    const expectedStr = `${expected.getFullYear()}-${String(expected.getMonth() + 1).padStart(2, '0')}-${String(expected.getDate()).padStart(2, '0')}`;
    expect(yesterday).toBe(expectedStr);
  });

  it('should return today for offset 0', () => {
    const today = getLocalDateOffset(0);
    expect(today).toBe(getLocalToday());
  });

  it('should handle large offsets', () => {
    const result = getLocalDateOffset(365);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('dateToLocalString', () => {
  it('should convert a Date to YYYY-MM-DD string', () => {
    const date = new Date(2025, 1, 11); // Feb 11, 2025
    expect(dateToLocalString(date)).toBe('2025-02-11');
  });

  it('should pad single-digit months and days', () => {
    const date = new Date(2025, 0, 5); // Jan 5, 2025
    expect(dateToLocalString(date)).toBe('2025-01-05');
  });

  it('should handle December correctly', () => {
    const date = new Date(2025, 11, 25); // Dec 25, 2025
    expect(dateToLocalString(date)).toBe('2025-12-25');
  });
});

describe('formatDate', () => {
  it('should return "Today" for today\'s date', () => {
    const today = getLocalToday();
    expect(formatDate(today)).toBe('Today');
  });

  it('should return "Tomorrow" for tomorrow\'s date', () => {
    const tomorrow = getLocalDateOffset(1);
    expect(formatDate(tomorrow)).toBe('Tomorrow');
  });

  it('should return "Yesterday" for yesterday\'s date', () => {
    const yesterday = getLocalDateOffset(-1);
    expect(formatDate(yesterday)).toBe('Yesterday');
  });

  it('should return formatted date for other dates in the same year', () => {
    // Use a date far enough from today to not be "Yesterday", "Today", "Tomorrow", or "Next Monday"
    const now = new Date();
    const farDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    const dateStr = dateToLocalString(farDate);
    const result = formatDate(dateStr);
    // Should be something like "Mar 19" (no year for same year)
    expect(result).not.toBe('Today');
    expect(result).not.toBe('Tomorrow');
    expect(result).not.toBe('Yesterday');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should include year for dates in a different year', () => {
    const result = formatDate('2020-06-15');
    expect(result).toContain('2020');
  });
});

describe('formatDateForMarkdown', () => {
  it('should format date as "Mon DD, YYYY"', () => {
    const result = formatDateForMarkdown('2025-02-11');
    expect(result).toBe('Feb 11, 2025');
  });

  it('should format January correctly', () => {
    const result = formatDateForMarkdown('2025-01-01');
    expect(result).toBe('Jan 1, 2025');
  });

  it('should format December correctly', () => {
    const result = formatDateForMarkdown('2025-12-25');
    expect(result).toBe('Dec 25, 2025');
  });
});

describe('parseDateFromMarkdown', () => {
  it('should parse "today" keyword', () => {
    expect(parseDateFromMarkdown('today')).toBe(getLocalToday());
  });

  it('should parse "tomorrow" keyword', () => {
    expect(parseDateFromMarkdown('tomorrow')).toBe(getLocalDateOffset(1));
  });

  it('should parse "yesterday" keyword', () => {
    expect(parseDateFromMarkdown('yesterday')).toBe(getLocalDateOffset(-1));
  });

  it('should parse "next monday" keyword', () => {
    const result = parseDateFromMarkdown('next monday');
    expect(result).not.toBeNull();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Verify it's actually a Monday
    if (result) {
      const date = parseLocalDate(result);
      expect(date.getDay()).toBe(1); // Monday
    }
  });

  it('should be case-insensitive for keywords', () => {
    expect(parseDateFromMarkdown('Today')).toBe(getLocalToday());
    expect(parseDateFromMarkdown('TOMORROW')).toBe(getLocalDateOffset(1));
  });

  it('should parse "Mon DD, YYYY" format', () => {
    const result = parseDateFromMarkdown('Feb 11, 2025');
    expect(result).toBe('2025-02-11');
  });

  it('should parse "Mon DD YYYY" format (without comma)', () => {
    const result = parseDateFromMarkdown('Feb 11 2025');
    expect(result).toBe('2025-02-11');
  });

  it('should parse "Mon DD" format (current year)', () => {
    const result = parseDateFromMarkdown('Mar 15');
    expect(result).not.toBeNull();
    if (result) {
      const date = parseLocalDate(result);
      expect(date.getMonth()).toBe(2); // March
      expect(date.getDate()).toBe(15);
      expect(date.getFullYear()).toBe(new Date().getFullYear());
    }
  });

  it('should parse full month names', () => {
    const result = parseDateFromMarkdown('February 11, 2025');
    expect(result).toBe('2025-02-11');
  });

  it('should parse ISO format YYYY-MM-DD', () => {
    expect(parseDateFromMarkdown('2025-02-11')).toBe('2025-02-11');
  });

  it('should parse MM/DD/YYYY format', () => {
    expect(parseDateFromMarkdown('02/11/2025')).toBe('2025-02-11');
  });

  it('should return null for invalid input', () => {
    expect(parseDateFromMarkdown('not a date')).toBeNull();
    expect(parseDateFromMarkdown('')).toBeNull();
    expect(parseDateFromMarkdown('abc 123')).toBeNull();
  });

  it('should trim whitespace', () => {
    expect(parseDateFromMarkdown('  today  ')).toBe(getLocalToday());
    expect(parseDateFromMarkdown('  Feb 11, 2025  ')).toBe('2025-02-11');
  });
});

describe('getDateVariant', () => {
  it('should return "date-today" for today', () => {
    const today = getLocalToday();
    expect(getDateVariant(today)).toBe('date-today');
  });

  it('should return "date-overdue" for past dates', () => {
    expect(getDateVariant('2020-01-01')).toBe('date-overdue');
  });

  it('should return "date-upcoming" for dates within the next week', () => {
    const threeDaysFromNow = getLocalDateOffset(3);
    expect(getDateVariant(threeDaysFromNow)).toBe('date-upcoming');
  });

  it('should return empty string for dates more than a week away', () => {
    const farFuture = getLocalDateOffset(30);
    expect(getDateVariant(farFuture)).toBe('');
  });

  it('should return "date-upcoming" for tomorrow', () => {
    const tomorrow = getLocalDateOffset(1);
    expect(getDateVariant(tomorrow)).toBe('date-upcoming');
  });

  it('should return "date-overdue" for yesterday', () => {
    const yesterday = getLocalDateOffset(-1);
    expect(getDateVariant(yesterday)).toBe('date-overdue');
  });
});
