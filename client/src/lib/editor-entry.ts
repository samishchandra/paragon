/**
 * @manus/editor — Public API Entry Point
 * 
 * This file defines the public surface of the Manus Markdown Editor library.
 * Import the CSS file alongside this module in your application:
 * 
 *   import { MarkdownEditor } from '@manus/editor';
 *   import '@manus/editor/style.css';
 * 
 * Or if using the UMD build, include the CSS via a <link> tag.
 */

// ─── Core Editor ────────────────────────────────────────────────────────────
export {
  MarkdownEditor,
  type MarkdownEditorProps,
} from '@/components/editor/MarkdownEditor';

// ─── Toolbar Components ─────────────────────────────────────────────────────
export { FloatingToolbar } from '@/components/editor/FloatingToolbar';
export { EditorToolbar } from '@/components/editor/EditorToolbar';

// ─── Slash Commands ─────────────────────────────────────────────────────────
export { SlashCommands } from '@/components/editor/SlashCommands';

// ─── Extensions ─────────────────────────────────────────────────────────────
export { Callout, type CalloutType } from '@/components/editor/extensions/Callout';
export { ResizableImage } from '@/components/editor/extensions/ResizableImage';
export { ImageUpload, type ImageUploadOptions } from '@/components/editor/extensions/ImageUpload';
export { CollapsibleHeading } from '@/components/editor/extensions/CollapsibleHeading';
export { SearchHighlight } from '@/components/editor/extensions/SearchHighlight';
export { SelectAllOccurrences } from '@/components/editor/extensions/SelectAllOccurrences';
export { TabIndent } from '@/components/editor/extensions/TabIndent';
export { DatePill } from '@/components/editor/extensions/DatePill';
export { WikiLinkSafe } from '@/components/editor/extensions/WikiLinkSafe';
export { MarkdownPasteSafe } from '@/components/editor/extensions/MarkdownPasteSafe';
export { MarkdownLinkInputRule } from '@/components/editor/extensions/MarkdownLinkInputRule';
export { CalloutInputRule } from '@/components/editor/extensions/CalloutInputRule';

// ─── Theming ────────────────────────────────────────────────────────────────
export { EditorThemeProvider, useEditorTheme } from '@/components/editor/ThemeProvider';
export {
  themes,
  applyTheme,
  createCustomTheme,
  darkTheme,
  lightTheme,
  sepiaTheme,
  nordTheme,
  type EditorTheme,
} from '@/components/editor/themes';

// ─── Auto-Save ──────────────────────────────────────────────────────────────
export {
  useAutoSave,
  type AutoSaveOptions,
  type AutoSaveState,
  type AutoSaveReturn,
} from '@/components/editor/hooks/useAutoSave';
export {
  AutoSaveIndicator,
  type AutoSaveIndicatorProps,
} from '@/components/editor/AutoSaveIndicator';

// ─── Recovery ───────────────────────────────────────────────────────────────
export {
  RecoveryBanner,
  type RecoveryBannerProps,
} from '@/components/editor/RecoveryBanner';

// ─── Supplementary Components ───────────────────────────────────────────────
export { ImageDropZone } from '@/components/editor/ImageDropZone';
export { CodeBlockComponent } from '@/components/editor/CodeBlockComponent';
export { FindReplace } from '@/components/editor/FindReplace';
export { SelectAllActionBar } from '@/components/editor/SelectAllActionBar';
export { TableOfContents } from '@/components/editor/TableOfContents';

// ─── Hooks ──────────────────────────────────────────────────────────────────
export { useWordCount } from '@/components/editor/hooks/useWordCount';

// ─── Import the editor styles so they're bundled into the CSS output ────────
import '@/index.css';
