/**
 * Unit Tests for Editor Page Helper Functions
 * 
 * Tests: parseBool, parseIntSafe
 * These are internal helpers used for query parameter parsing.
 * We test them by extracting the logic.
 * 
 * Note: convertCheckboxListsToTaskLists tests have been moved to
 * ../components/editor/utils/convertCheckboxLists.test.ts (co-located with source).
 */

import { describe, it, expect } from 'vitest';
import { restoreHeaderColumn } from '../components/editor/utils/restoreHeaderColumn';

// Re-implement the pure functions from Editor.tsx for testing
// (They are not exported, so we test the logic directly)

function parseBool(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue;
  return value !== 'false' && value !== '0';
}

function parseIntSafe(value: string | null, defaultValue: number, min: number, max: number): number {
  if (value === null) return defaultValue;
  const n = Number(value);
  if (isNaN(n)) return defaultValue;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

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

/**
 * Regression Tests for Table Header Column Round-Trip
 * 
 * When a table has a header column (first cell in body rows is <th>),
 * the turndown service appends <!-- header-column --> after the markdown table.
 * When converting back from markdown to HTML, this marker is detected and
 * the first <td> in each body row is restored to <th>.
 * 
 * These tests verify the markdown → HTML restoration side of the round-trip.
 * The restoreHeaderColumn function is imported from the shared utility module.
 */
describe('Header Column Restoration (markdown → HTML)', () => {
  it('should convert first <td> to <th> in body rows when marker is present', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>H1</th>\n<th>H2</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>R1C1</td>\n<td>R1C2</td>\n</tr>\n<tr>\n<td>R2C1</td>\n<td>R2C2</td>\n</tr>\n</tbody></table>\n' +
      '<!-- header-column -->';
    const result = restoreHeaderColumn(html);
    // First cell in each body row should be <th>
    expect(result).toContain('<th>R1C1</th>');
    expect(result).toContain('<th>R2C1</th>');
    // Second cell should remain <td>
    expect(result).toContain('<td>R1C2</td>');
    expect(result).toContain('<td>R2C2</td>');
    // Marker should be removed
    expect(result).not.toContain('<!-- header-column -->');
  });

  it('should NOT modify tables without the header-column marker', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>H1</th>\n<th>H2</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>R1C1</td>\n<td>R1C2</td>\n</tr>\n</tbody></table>';
    const result = restoreHeaderColumn(html);
    // All body cells should remain <td>
    expect(result).toContain('<td>R1C1</td>');
    expect(result).toContain('<td>R1C2</td>');
    expect(result).not.toContain('<th>R1C1</th>');
  });

  it('should handle tables with 3+ columns (only first becomes <th>)', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n<th>C</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>1</td>\n<td>2</td>\n<td>3</td>\n</tr>\n</tbody></table>\n' +
      '<!-- header-column -->';
    const result = restoreHeaderColumn(html);
    expect(result).toContain('<th>1</th>');
    expect(result).toContain('<td>2</td>');
    expect(result).toContain('<td>3</td>');
  });

  it('should handle multiple body rows correctly', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Value</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>Alpha</td>\n<td>100</td>\n</tr>\n' +
      '<tr>\n<td>Beta</td>\n<td>200</td>\n</tr>\n' +
      '<tr>\n<td>Gamma</td>\n<td>300</td>\n</tr>\n</tbody></table>\n' +
      '<!-- header-column -->';
    const result = restoreHeaderColumn(html);
    expect(result).toContain('<th>Alpha</th>');
    expect(result).toContain('<th>Beta</th>');
    expect(result).toContain('<th>Gamma</th>');
    expect(result).toContain('<td>100</td>');
    expect(result).toContain('<td>200</td>');
    expect(result).toContain('<td>300</td>');
  });

  it('should preserve header row <th> tags (thead is not modified)', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>H1</th>\n<th>H2</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>R1C1</td>\n<td>R1C2</td>\n</tr>\n</tbody></table>\n' +
      '<!-- header-column -->';
    const result = restoreHeaderColumn(html);
    // Header row should still have <th>
    expect(result).toContain('<th>H1</th>');
    expect(result).toContain('<th>H2</th>');
  });

  it('should handle single body row table', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>X</th>\n<th>Y</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>A</td>\n<td>B</td>\n</tr>\n</tbody></table>\n' +
      '<!-- header-column -->';
    const result = restoreHeaderColumn(html);
    expect(result).toContain('<th>A</th>');
    expect(result).toContain('<td>B</td>');
  });

  it('should handle marker with extra whitespace', () => {
    const html = '<table>\n<thead>\n<tr>\n<th>H1</th>\n</tr>\n</thead>\n' +
      '<tbody><tr>\n<td>R1</td>\n</tr>\n</tbody></table>\n\n  <!--  header-column  -->';
    const result = restoreHeaderColumn(html);
    expect(result).toContain('<th>R1</th>');
    expect(result).not.toContain('header-column');
  });
});
