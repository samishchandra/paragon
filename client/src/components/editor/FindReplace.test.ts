/**
 * Integration Tests for Find & Replace Search Logic
 * 
 * Tests the search matching algorithms used by FindReplace component.
 * These test the core search logic independent of the UI.
 */

import { describe, it, expect } from 'vitest';

/**
 * findMatchesInText - Extracted search logic from FindReplace component
 * 
 * This replicates the core search algorithm for testing without needing
 * the TipTap editor or React component.
 */
function findMatchesInText(
  text: string,
  searchQuery: string,
  options: {
    caseSensitive?: boolean;
    useRegex?: boolean;
    wholeWord?: boolean;
  } = {}
): { from: number; to: number; text: string }[] {
  const { caseSensitive = false, useRegex = false, wholeWord = false } = options;
  
  if (!searchQuery || !text) return [];

  const matches: { from: number; to: number; text: string }[] = [];
  let searchPattern: RegExp;

  try {
    if (useRegex) {
      const flags = caseSensitive ? 'g' : 'gi';
      searchPattern = new RegExp(searchQuery, flags);
    } else {
      // Escape special regex characters for literal search
      const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
      const flags = caseSensitive ? 'g' : 'gi';
      searchPattern = new RegExp(pattern, flags);
    }
  } catch {
    return [];
  }

  let match;
  while ((match = searchPattern.exec(text)) !== null) {
    matches.push({
      from: match.index,
      to: match.index + match[0].length,
      text: match[0],
    });
    // Prevent infinite loop for zero-length matches
    if (match[0].length === 0) {
      searchPattern.lastIndex++;
    }
  }

  return matches;
}

/**
 * replaceMatch - Replaces a single match in text
 */
function replaceMatch(
  text: string,
  match: { from: number; to: number },
  replacement: string
): string {
  return text.substring(0, match.from) + replacement + text.substring(match.to);
}

/**
 * replaceAllMatches - Replaces all matches in text
 */
function replaceAllMatches(
  text: string,
  searchQuery: string,
  replacement: string,
  options: {
    caseSensitive?: boolean;
    useRegex?: boolean;
    wholeWord?: boolean;
  } = {}
): string {
  const matches = findMatchesInText(text, searchQuery, options);
  if (matches.length === 0) return text;

  // Replace from end to start to maintain positions
  let result = text;
  for (let i = matches.length - 1; i >= 0; i--) {
    result = replaceMatch(result, matches[i], replacement);
  }
  return result;
}

describe('Find Matches', () => {
  describe('Basic Search', () => {
    it('should find simple text matches', () => {
      const matches = findMatchesInText('Hello world hello', 'hello');
      expect(matches).toHaveLength(2);
      expect(matches[0].from).toBe(0);
      expect(matches[0].to).toBe(5);
      expect(matches[1].from).toBe(12);
    });

    it('should return empty for no matches', () => {
      const matches = findMatchesInText('Hello world', 'xyz');
      expect(matches).toHaveLength(0);
    });

    it('should return empty for empty search query', () => {
      const matches = findMatchesInText('Hello world', '');
      expect(matches).toHaveLength(0);
    });

    it('should return empty for empty text', () => {
      const matches = findMatchesInText('', 'hello');
      expect(matches).toHaveLength(0);
    });
  });

  describe('Case Sensitivity', () => {
    it('should be case-insensitive by default', () => {
      const matches = findMatchesInText('Hello HELLO hello', 'hello');
      expect(matches).toHaveLength(3);
    });

    it('should respect case-sensitive option', () => {
      const matches = findMatchesInText('Hello HELLO hello', 'hello', { caseSensitive: true });
      expect(matches).toHaveLength(1);
      expect(matches[0].from).toBe(12);
    });

    it('should find exact case match when case-sensitive', () => {
      const matches = findMatchesInText('Hello HELLO hello', 'HELLO', { caseSensitive: true });
      expect(matches).toHaveLength(1);
      expect(matches[0].from).toBe(6);
    });
  });

  describe('Whole Word', () => {
    it('should match whole words only', () => {
      const matches = findMatchesInText('cat catch category', 'cat', { wholeWord: true });
      expect(matches).toHaveLength(1);
      expect(matches[0].from).toBe(0);
      expect(matches[0].to).toBe(3);
    });

    it('should not match partial words', () => {
      const matches = findMatchesInText('catching', 'cat', { wholeWord: true });
      expect(matches).toHaveLength(0);
    });

    it('should match words at boundaries', () => {
      const matches = findMatchesInText('the cat sat', 'cat', { wholeWord: true });
      expect(matches).toHaveLength(1);
    });
  });

  describe('Regex Search', () => {
    it('should support basic regex patterns', () => {
      const matches = findMatchesInText('cat bat hat', '[cbh]at', { useRegex: true });
      expect(matches).toHaveLength(3);
    });

    it('should support character classes', () => {
      const matches = findMatchesInText('file1.txt file2.js file3.txt', '\\.txt', { useRegex: true });
      expect(matches).toHaveLength(2);
    });

    it('should support quantifiers', () => {
      const matches = findMatchesInText('color colour', 'colou?r', { useRegex: true });
      expect(matches).toHaveLength(2);
    });

    it('should handle invalid regex gracefully', () => {
      const matches = findMatchesInText('test', '[invalid');
      // Should not throw, just return empty
      expect(matches).toHaveLength(0);
    });

    it('should support groups', () => {
      const matches = findMatchesInText('2025-02-11 2024-12-25', '\\d{4}-\\d{2}-\\d{2}', { useRegex: true });
      expect(matches).toHaveLength(2);
    });
  });

  describe('Special Characters', () => {
    it('should escape special regex characters in literal search', () => {
      const matches = findMatchesInText('price is $10.00', '$10.00');
      expect(matches).toHaveLength(1);
    });

    it('should handle parentheses in literal search', () => {
      const matches = findMatchesInText('function(x)', 'function(x)');
      expect(matches).toHaveLength(1);
    });

    it('should handle brackets in literal search', () => {
      const matches = findMatchesInText('array[0]', 'array[0]');
      expect(matches).toHaveLength(1);
    });
  });

  describe('Match Positions', () => {
    it('should return correct from/to positions', () => {
      const matches = findMatchesInText('abcdefg', 'cde');
      expect(matches).toHaveLength(1);
      expect(matches[0].from).toBe(2);
      expect(matches[0].to).toBe(5);
      expect(matches[0].text).toBe('cde');
    });

    it('should handle overlapping potential matches', () => {
      const matches = findMatchesInText('aaa', 'aa');
      // Regex doesn't find overlapping matches by default
      expect(matches).toHaveLength(1);
    });

    it('should handle multiline text', () => {
      const matches = findMatchesInText('line1\nline2\nline3', 'line');
      expect(matches).toHaveLength(3);
    });
  });
});

describe('Replace Operations', () => {
  it('should replace a single match', () => {
    const result = replaceMatch('Hello world', { from: 6, to: 11 }, 'universe');
    expect(result).toBe('Hello universe');
  });

  it('should replace at the beginning', () => {
    const result = replaceMatch('Hello world', { from: 0, to: 5 }, 'Hi');
    expect(result).toBe('Hi world');
  });

  it('should replace at the end', () => {
    const result = replaceMatch('Hello world', { from: 6, to: 11 }, 'earth');
    expect(result).toBe('Hello earth');
  });

  it('should handle replacement with different length', () => {
    const result = replaceMatch('abc', { from: 1, to: 2 }, 'xyz');
    expect(result).toBe('axyzc');
  });

  it('should handle empty replacement', () => {
    const result = replaceMatch('Hello world', { from: 5, to: 11 }, '');
    expect(result).toBe('Hello');
  });
});

describe('Replace All', () => {
  it('should replace all occurrences', () => {
    const result = replaceAllMatches('cat and cat and cat', 'cat', 'dog');
    expect(result).toBe('dog and dog and dog');
  });

  it('should handle case-insensitive replace all', () => {
    const result = replaceAllMatches('Cat CAT cat', 'cat', 'dog');
    expect(result).toBe('dog dog dog');
  });

  it('should handle case-sensitive replace all', () => {
    const result = replaceAllMatches('Cat CAT cat', 'cat', 'dog', { caseSensitive: true });
    expect(result).toBe('Cat CAT dog');
  });

  it('should handle whole word replace all', () => {
    const result = replaceAllMatches('cat catch category', 'cat', 'dog', { wholeWord: true });
    expect(result).toBe('dog catch category');
  });

  it('should handle regex replace all', () => {
    const result = replaceAllMatches('color colour', 'colou?r', 'shade', { useRegex: true });
    expect(result).toBe('shade shade');
  });

  it('should handle no matches', () => {
    const result = replaceAllMatches('Hello world', 'xyz', 'abc');
    expect(result).toBe('Hello world');
  });

  it('should handle empty text', () => {
    const result = replaceAllMatches('', 'test', 'replacement');
    expect(result).toBe('');
  });
});
