/**
 * Unit Tests for useEditorExtensions Hook
 *
 * Tests that the correct TipTap extensions are included or excluded
 * based on disabledFeatures, isLightweight, feature flags, and other options.
 *
 * Since useMemo is a React hook, we extract the pure logic by calling
 * the hook via a lightweight renderHook-style helper.
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorExtensions, type UseEditorExtensionsOptions, type ExtensionCallbackRefs } from './useEditorExtensions';
import { createRef } from 'react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal set of callback refs for testing */
function makeCallbackRefs(): ExtensionCallbackRefs {
  return {
    onImageUploadStart: { current: undefined },
    onImageUploadComplete: { current: undefined },
    onImageUploadError: { current: undefined },
    onImageUpload: { current: undefined },
    resolveImageSrc: { current: undefined },
    onWikiLinkClick: { current: undefined },
    validateWikiLink: { current: undefined },
  };
}

/** Build default options — everything enabled, full mode */
function makeDefaultOptions(overrides: Partial<UseEditorExtensionsOptions> = {}): UseEditorExtensionsOptions {
  return {
    placeholder: 'Type something…',
    isMobile: false,
    maxImageSize: 5 * 1024 * 1024,
    headingLevels: [1, 2, 3, 4, 5, 6],
    collapsibleHeadingLevels: [1, 2, 3],
    disabledFeatures: {},
    progressiveSelectAll: false,
    enableCollapsibleHeadings: false,
    enableCollapsibleLists: false,
    enableTagAutoDetect: false,
    enableHexColorHighlight: false,
    isLightweight: false,
    setImageEditState: vi.fn(),
    callbackRefs: makeCallbackRefs(),
    ...overrides,
  };
}

/** Collect extension names from the returned array.
 *  TipTap extensions expose their name via `.name` (on instances)
 *  or via `.config.name` / `.name` (on classes).
 *  Some entries are extension *classes* (not yet instantiated), so
 *  we try multiple access paths.
 */
function getExtensionNames(extensions: any[]): string[] {
  return extensions.map((ext) => {
    // Instance created by .configure()
    if (ext?.name) return ext.name;
    // Class with static name
    if (ext?.config?.name) return ext.config.name;
    if (ext?.type) return ext.type;
    return 'unknown';
  });
}

function renderExtensions(overrides: Partial<UseEditorExtensionsOptions> = {}) {
  const opts = makeDefaultOptions(overrides);
  const { result } = renderHook(() => useEditorExtensions(opts));
  return { extensions: result.current, names: getExtensionNames(result.current) };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useEditorExtensions', () => {
  // ===== ALWAYS-INCLUDED BASE EXTENSIONS =====

  describe('base extensions (always present)', () => {
    it('should always include StarterKit core extensions', () => {
      const { names } = renderExtensions();
      // StarterKit registers many extensions under the hood; check a few key ones
      // The StarterKit itself shows up as an array of extensions when spread
      // We check for known names that StarterKit provides
      expect(names).toContain('placeholder');
      expect(names).toContain('textAlign');
      expect(names).toContain('highlight');
      expect(names).toContain('link');
      expect(names).toContain('underline');
      expect(names).toContain('subscript');
      expect(names).toContain('superscript');
    });

    it('should always include mixed list extensions', () => {
      const { names } = renderExtensions();
      expect(names).toContain('bulletList');
      expect(names).toContain('orderedList');
      expect(names).toContain('listItem');
    });

    it('should always include SearchHighlight and TabIndent', () => {
      const { names } = renderExtensions();
      expect(names).toContain('searchHighlight');
      expect(names).toContain('tabIndent');
    });

    it('should always include MarkdownLinkInputRule', () => {
      const { names } = renderExtensions();
      expect(names).toContain('markdownLinkInputRule');
    });

    it('should always include HorizontalRule', () => {
      const { names } = renderExtensions();
      expect(names).toContain('horizontalRule');
    });
  });

  // ===== LIGHTWEIGHT MODE =====

  describe('lightweight mode', () => {
    it('should include Typography in full mode', () => {
      const { names } = renderExtensions({ isLightweight: false });
      expect(names).toContain('typography');
    });

    it('should exclude Typography in lightweight mode', () => {
      const { names } = renderExtensions({ isLightweight: true });
      expect(names).not.toContain('typography');
    });

    it('should include SelectAllOccurrences in full mode', () => {
      const { names } = renderExtensions({ isLightweight: false });
      expect(names).toContain('selectAllOccurrences');
    });

    it('should exclude SelectAllOccurrences in lightweight mode', () => {
      const { names } = renderExtensions({ isLightweight: true });
      expect(names).not.toContain('selectAllOccurrences');
    });

    it('should include CollapsibleList on desktop in full mode when enabled', () => {
      const { names } = renderExtensions({ isLightweight: false, isMobile: false, enableCollapsibleLists: true });
      expect(names).toContain('collapsibleList');
    });

    it('should exclude CollapsibleList by default (disabled)', () => {
      const { names } = renderExtensions({ isLightweight: false, isMobile: false });
      expect(names).not.toContain('collapsibleList');
    });

    it('should exclude CollapsibleList in lightweight mode even when enabled', () => {
      const { names } = renderExtensions({ isLightweight: true, isMobile: false, enableCollapsibleLists: true });
      expect(names).not.toContain('collapsibleList');
    });

    it('should exclude TableSorting in lightweight mode when tables enabled', () => {
      const { names } = renderExtensions({ isLightweight: true, disabledFeatures: {} });
      expect(names).toContain('table'); // tables still present
      expect(names).not.toContain('tableSorting');
    });

    it('should include TableSorting in full mode when tables enabled', () => {
      const { names } = renderExtensions({ isLightweight: false, disabledFeatures: {} });
      expect(names).toContain('tableSorting');
    });

    it('should exclude CollapsibleHeading in lightweight mode even when enabled', () => {
      const { names } = renderExtensions({
        isLightweight: true,
        enableCollapsibleHeadings: true,
        disabledFeatures: {},
      });
      expect(names).not.toContain('collapsibleHeading');
    });

    it('should exclude HexColorMark in lightweight mode even when enabled', () => {
      const { names } = renderExtensions({
        isLightweight: true,
        enableHexColorHighlight: true,
      });
      expect(names).not.toContain('hexColor');
    });
  });

  // ===== DISABLED FEATURES =====

  describe('disabledFeatures', () => {
    it('should exclude table extensions when tables disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { tables: true } });
      expect(names).not.toContain('table');
      expect(names).not.toContain('tableRow');
      expect(names).not.toContain('tableSorting');
    });

    it('should include table extensions when tables not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('table');
      expect(names).toContain('tableRow');
    });

    it('should exclude task list extensions when taskLists disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { taskLists: true } });
      expect(names).not.toContain('taskList');
      expect(names).not.toContain('taskItem');
    });

    it('should include task list extensions when taskLists not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('taskList');
      expect(names).toContain('taskItem');
    });

    it('should exclude CodeBlockWithFeatures when codeBlocks disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { codeBlocks: true } });
      expect(names).not.toContain('codeBlock');
    });

    it('should include CodeBlockWithFeatures when codeBlocks not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('codeBlock');
    });

    it('should exclude callout extensions when callouts disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { callouts: true } });
      expect(names).not.toContain('callout');
      expect(names).not.toContain('calloutInputRule');
    });

    it('should include callout extensions when callouts not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('callout');
      expect(names).toContain('calloutInputRule');
    });

    it('should exclude image extensions when images disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { images: true } });
      expect(names).not.toContain('resizableImage');
      expect(names).not.toContain('imageUpload');
    });

    it('should include image extensions when images not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('resizableImage');
      expect(names).toContain('imageUpload');
    });

    it('should exclude DatePill when datePills disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { datePills: true } });
      expect(names).not.toContain('datePill');
    });

    it('should include DatePill when datePills not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('datePill');
    });

    it('should exclude TagPill when tagPills disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { tagPills: true } });
      expect(names).not.toContain('tagPill');
    });

    it('should include TagPill when tagPills not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('tagPill');
    });

    it('should exclude WikiLinkSafe when wikiLinks disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { wikiLinks: true } });
      expect(names).not.toContain('wikiLink');
    });

    it('should include WikiLinkSafe when wikiLinks not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('wikiLink');
    });

    it('should exclude MarkdownPasteSafe when markdownPaste disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: { markdownPaste: true } });
      expect(names).not.toContain('markdownPasteSafe');
    });

    it('should include MarkdownPasteSafe when markdownPaste not disabled', () => {
      const { names } = renderExtensions({ disabledFeatures: {} });
      expect(names).toContain('markdownPasteSafe');
    });

    it('should handle all features disabled at once', () => {
      const { names } = renderExtensions({
        disabledFeatures: {
          tables: true,
          images: true,
          codeBlocks: true,
          taskLists: true,
          callouts: true,
          datePills: true,
          tagPills: true,
          wikiLinks: true,
          collapsibleHeadings: true,
          markdownPaste: true,
        },
      });
      expect(names).not.toContain('table');
      expect(names).not.toContain('taskList');
      expect(names).not.toContain('codeBlock');
      expect(names).not.toContain('callout');
      expect(names).not.toContain('resizableImage');
      expect(names).not.toContain('datePill');
      expect(names).not.toContain('tagPill');
      expect(names).not.toContain('wikiLink');
      expect(names).not.toContain('markdownPasteSafe');
      // But base extensions should still be present
      expect(names).toContain('placeholder');
      expect(names).toContain('link');
      expect(names).toContain('horizontalRule');
    });
  });

  // ===== FEATURE FLAGS =====

  describe('feature flags', () => {
    it('should exclude CollapsibleHeading when enableCollapsibleHeadings is false', () => {
      const { names } = renderExtensions({ enableCollapsibleHeadings: false });
      expect(names).not.toContain('collapsibleHeading');
    });

    it('should include CollapsibleHeading when enableCollapsibleHeadings is true and not disabled', () => {
      const { names } = renderExtensions({
        enableCollapsibleHeadings: true,
        disabledFeatures: {},
        isLightweight: false,
      });
      expect(names).toContain('collapsibleHeading');
    });

    it('should exclude CollapsibleHeading when enableCollapsibleHeadings is true but collapsibleHeadings is disabled', () => {
      const { names } = renderExtensions({
        enableCollapsibleHeadings: true,
        disabledFeatures: { collapsibleHeadings: true },
      });
      expect(names).not.toContain('collapsibleHeading');
    });

    it('should exclude ExpandSelection when progressiveSelectAll is false', () => {
      const { names } = renderExtensions({ progressiveSelectAll: false });
      expect(names).not.toContain('expandSelection');
    });

    it('should include ExpandSelection when progressiveSelectAll is true', () => {
      const { names } = renderExtensions({ progressiveSelectAll: true });
      expect(names).toContain('expandSelection');
    });

    it('should exclude HexColorMark when enableHexColorHighlight is false', () => {
      const { names } = renderExtensions({ enableHexColorHighlight: false });
      expect(names).not.toContain('hexColor');
    });

    it('should include HexColorMark when enableHexColorHighlight is true and not lightweight', () => {
      const { names } = renderExtensions({
        enableHexColorHighlight: true,
        isLightweight: false,
      });
      expect(names).toContain('hexColor');
    });
  });

  // ===== MOBILE =====

  describe('mobile mode', () => {
    it('should exclude CollapsibleList on mobile', () => {
      const { names } = renderExtensions({ isMobile: true, isLightweight: false });
      expect(names).not.toContain('collapsibleList');
    });

    it('should include CollapsibleList on desktop in full mode when enabled', () => {
      const { names } = renderExtensions({ isMobile: false, isLightweight: false, enableCollapsibleLists: true });
      expect(names).toContain('collapsibleList');
    });

    it('should exclude CollapsibleList on desktop by default (disabled)', () => {
      const { names } = renderExtensions({ isMobile: false, isLightweight: false });
      expect(names).not.toContain('collapsibleList');
    });
  });

  // ===== RETURN VALUE =====

  describe('return value', () => {
    it('should return a non-empty array', () => {
      const { extensions } = renderExtensions();
      expect(Array.isArray(extensions)).toBe(true);
      expect(extensions.length).toBeGreaterThan(0);
    });

    it('should return more extensions with all features enabled than with all disabled', () => {
      const { extensions: allEnabled } = renderExtensions({ disabledFeatures: {} });
      const { extensions: allDisabled } = renderExtensions({
        disabledFeatures: {
          tables: true,
          images: true,
          codeBlocks: true,
          taskLists: true,
          callouts: true,
          datePills: true,
          tagPills: true,
          wikiLinks: true,
          markdownPaste: true,
        },
      });
      expect(allEnabled.length).toBeGreaterThan(allDisabled.length);
    });

    it('should return fewer extensions in lightweight mode', () => {
      const { extensions: full } = renderExtensions({ isLightweight: false });
      const { extensions: lightweight } = renderExtensions({ isLightweight: true });
      expect(full.length).toBeGreaterThan(lightweight.length);
    });
  });
});
