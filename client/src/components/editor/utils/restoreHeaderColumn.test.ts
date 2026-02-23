/**
 * Tests for restoreHeaderColumn
 * 
 * When a table has a header column (first cell in body rows is <th>),
 * the turndown service appends <!-- header-column --> after the markdown table.
 * When converting back from markdown to HTML, this marker is detected and
 * the first <td> in each body row is restored to <th>.
 * 
 * These tests verify the markdown → HTML restoration side of the round-trip.
 * Co-located with the source module for maintainability.
 */

import { describe, it, expect } from 'vitest';
import { restoreHeaderColumn } from './restoreHeaderColumn';

describe('restoreHeaderColumn', () => {
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
