/**
 * Unit Tests for LinkBoundary Extension
 *
 * Tests the LinkBoundary ProseMirror plugin that prevents typed text
 * from being absorbed into a link mark when the cursor is at the
 * start of a textblock.
 */
import { describe, it, expect } from 'vitest';
import { LinkBoundary } from './LinkBoundary';

describe('LinkBoundary Extension', () => {
  it('should have the correct name', () => {
    expect(LinkBoundary.name).toBe('linkBoundary');
  });

  it('should be a TipTap extension', () => {
    expect(LinkBoundary.type).toBe('extension');
  });

  it('should register ProseMirror plugins via addProseMirrorPlugins', () => {
    // The extension should define addProseMirrorPlugins
    expect(LinkBoundary.config.addProseMirrorPlugins).toBeDefined();
    expect(typeof LinkBoundary.config.addProseMirrorPlugins).toBe('function');
  });

  it('should not define any schema (marks, nodes, or attributes)', () => {
    // LinkBoundary is purely a plugin — it should not modify the schema
    expect(LinkBoundary.config.addAttributes).toBeUndefined();
    expect(LinkBoundary.config.addNodeView).toBeUndefined();
    expect(LinkBoundary.config.parseHTML).toBeUndefined();
    expect(LinkBoundary.config.renderHTML).toBeUndefined();
  });

  it('should not define any commands or keyboard shortcuts', () => {
    // LinkBoundary is a passive plugin — no commands or shortcuts
    expect(LinkBoundary.config.addCommands).toBeUndefined();
    expect(LinkBoundary.config.addKeyboardShortcuts).toBeUndefined();
    expect(LinkBoundary.config.addInputRules).toBeUndefined();
  });

  it('should be configurable without errors', () => {
    // Ensure configure() doesn't throw
    expect(() => LinkBoundary.configure({})).not.toThrow();
  });
});
