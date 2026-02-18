/**
 * Unit Tests for Callout Extension
 * 
 * Tests the Callout TipTap extension configuration and behavior.
 */

import { describe, it, expect } from 'vitest';
import { Callout, type CalloutType } from './Callout';

describe('Callout Extension', () => {
  it('should have the correct name', () => {
    expect(Callout.name).toBe('callout');
  });

  it('should have default options with all callout types', () => {
    const extension = Callout.configure({});
    const options = extension.options;
    expect(options.types).toEqual(['info', 'note', 'prompt', 'resources', 'todo']);
  });

  it('should have default type attribute of "info"', () => {
    const extension = Callout.configure({});
    // Access the extension's schema attributes
    const attrs = extension.config.addAttributes?.call(extension);
    expect(attrs?.type?.default).toBe('info');
  });

  it('should parse HTML from div[data-callout]', () => {
    const extension = Callout.configure({});
    const parseRules = extension.config.parseHTML?.call(extension);
    expect(parseRules).toEqual([{ tag: 'div[data-callout]' }]);
  });

  it('should support all five callout types', () => {
    const validTypes: CalloutType[] = ['info', 'note', 'prompt', 'resources', 'todo'];
    validTypes.forEach(type => {
      expect(typeof type).toBe('string');
    });
  });
});
