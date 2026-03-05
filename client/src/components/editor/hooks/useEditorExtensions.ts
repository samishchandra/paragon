/**
 * useEditorExtensions — Builds the TipTap extensions array.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * The hook wraps the extensions in a `useMemo` that only recomputes
 * when primitive/stable dependencies change.  Callback props are
 * accessed via refs passed in from the parent so they never trigger
 * a recompute.
 */
import { useMemo, type MutableRefObject } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import { TableCellWithMenu, TableHeaderWithMenu } from '../extensions/TableCellWithMenu';
import { TableSorting } from '../extensions/TableSorting';
import { MixedBulletList, MixedOrderedList, MixedTaskList, MixedTaskItem, MixedListItem } from '../extensions/MixedLists';
import { CollapsibleList } from '../extensions/CollapsibleList';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { CodeBlockWithFeatures } from '../extensions/CodeBlockWithFeatures';
import { CalloutWithMenu } from '../extensions/CalloutWithMenu';
import { ResizableImage } from '../extensions/ResizableImage';
import { DatePill } from '../extensions/DatePill';
import { TagPill } from '../extensions/TagPill';
import { WikiLinkSafe } from '../extensions/WikiLinkSafe';
import { MarkdownPasteSafe } from '../extensions/MarkdownPasteSafe';
import { CollapsibleHeading } from '../extensions/CollapsibleHeading';
import { MarkdownLinkInputRule } from '../extensions/MarkdownLinkInputRule';
import { CalloutInputRule } from '../extensions/CalloutInputRule';
import { SearchHighlight } from '../extensions/SearchHighlight';
import { TabIndent } from '../extensions/TabIndent';
import { InputDispatcher } from '../extensions/InputDispatcher';
import { ExpandSelection } from '../extensions/ExpandSelection';
import { HexColorMark } from '../extensions/HexColorMark';
import { SelectAllOccurrences } from '../extensions/SelectAllOccurrences';
import { LinkBoundary } from '../extensions/LinkBoundary';
import { SmartCopyPaste } from '../extensions/SmartCopyPaste';
import { ImageUpload } from '../extensions/ImageUpload';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Code from '@tiptap/extension-code';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import { InputRule } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DisabledFeatures {
  tables?: boolean;
  images?: boolean;
  codeBlocks?: boolean;
  taskLists?: boolean;
  callouts?: boolean;
  datePills?: boolean;
  tagPills?: boolean;
  wikiLinks?: boolean;
  collapsibleHeadings?: boolean;
  slashCommands?: boolean;
  markdownPaste?: boolean;
  dragAndDrop?: boolean;
}

export interface ImageEditState {
  isOpen: boolean;
  src: string;
  alt: string;
  pos: number;
  position: { x: number; y: number };
}

/** Refs for callback props — avoids recreating extensions on every parent render. */
export interface ExtensionCallbackRefs {
  onImageUploadStart: MutableRefObject<(() => void) | undefined>;
  onImageUploadComplete: MutableRefObject<(() => void) | undefined>;
  onImageUploadError: MutableRefObject<((error: string) => void) | undefined>;
  onImageUpload: MutableRefObject<
    ((file: File, options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }) => Promise<string>) | undefined
  >;
  resolveImageSrc: MutableRefObject<((src: string) => Promise<string>) | undefined>;
  onWikiLinkClick: MutableRefObject<((pageName: string) => void) | undefined>;
  validateWikiLink: MutableRefObject<((pageName: string) => boolean) | undefined>;
}

export interface UseEditorExtensionsOptions {
  placeholder: string;
  isMobile: boolean;
  maxImageSize: number;
  headingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
  collapsibleHeadingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
  disabledFeatures: DisabledFeatures;
  progressiveSelectAll: boolean;
  enableCollapsibleHeadings: boolean;
  enableCollapsibleLists: boolean;
  enableTagAutoDetect: boolean;
  enableHexColorHighlight: boolean;
  isLightweight: boolean;
  /** Setter for image edit popover state — called from ResizableImage onImageClick */
  setImageEditState: (state: ImageEditState | null) => void;
  /** Callback refs for image upload, wiki links, etc. */
  callbackRefs: ExtensionCallbackRefs;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useEditorExtensions({
  placeholder,
  isMobile,
  maxImageSize,
  headingLevels,
  collapsibleHeadingLevels,
  disabledFeatures,
  progressiveSelectAll,
  enableCollapsibleHeadings,
  enableCollapsibleLists,
  enableTagAutoDetect,
  enableHexColorHighlight,
  isLightweight,
  setImageEditState,
  callbackRefs,
}: UseEditorExtensionsOptions) {
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseExtensions: any[] = [
      StarterKit.configure({
        heading: {
          levels: headingLevels,
        },
        codeBlock: false, // We use CodeBlockWithFeatures instead
        dropcursor: {
          color: 'var(--primary)',
          width: 2,
        },
        // Disable default list extensions - we use MixedLists instead
        bulletList: false,
        orderedList: false,
        listItem: false,
        // Disable extensions that we configure separately to avoid duplicates
        link: false, // We configure Link separately with custom options
        underline: false, // We add Underline separately
        // Disable built-in HorizontalRule input rules - we handle HR creation
        // via our custom space shortcut handler (insertHorizontalRuleClean)
        // to avoid the extra empty paragraph that the default command creates
        horizontalRule: false,
        // Disable built-in Bold, Italic, Strike, and Code marks — we extend
        // them below with keepOnSplit: false so that pressing Enter at the end
        // of formatted text does not carry the formatting into the new line.
        bold: false,
        italic: false,
        strike: false,
        code: false,
      }),
      // Inline formatting marks with keepOnSplit disabled — prevents bold,
      // italic, strikethrough, and code styles from carrying over when pressing
      // Enter to create a new line or list item.
      Bold.configure({ HTMLAttributes: { class: 'font-bold' } }).extend({ keepOnSplit: false }),
      Italic.configure({ HTMLAttributes: { class: 'italic' } }).extend({ keepOnSplit: false }),
      Strike.configure({}).extend({ keepOnSplit: false }),
      Code.configure({}).extend({ keepOnSplit: false }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      MixedBulletList,
      MixedOrderedList,
      MixedListItem,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      LinkBoundary,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      SmartCopyPaste,
      Underline,
      Subscript,
      Superscript,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...(!isLightweight ? [Typography] : []),
      MarkdownLinkInputRule,
      SearchHighlight,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...(!isLightweight ? [SelectAllOccurrences] : []),
      TabIndent,
      InputDispatcher,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      HorizontalRule.extend({
        addInputRules() {
          const type = this.type;
          return [
            new InputRule({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state, range }) => {
                const { tr } = state;
                const start = range.from;
                const end = range.to;
                // Delete the trigger text
                tr.delete(start, end);
                // Resolve position after deletion
                const $pos = tr.doc.resolve(start);
                const hrNode = type.create();
                // Replace the current paragraph block with the HR
                const blockStart = $pos.before($pos.depth);
                const blockEnd = $pos.after($pos.depth);
                tr.replaceWith(blockStart, blockEnd, hrNode);
                // Position right after the HR node
                const posAfterHR = blockStart + hrNode.nodeSize;
                // Check if there's already content after the HR
                if (posAfterHR < tr.doc.content.size) {
                  const $afterHR = tr.doc.resolve(posAfterHR);
                  if ($afterHR.nodeAfter && $afterHR.nodeAfter.isTextblock) {
                    tr.setSelection(TextSelection.create(tr.doc, posAfterHR + 1));
                  } else if ($afterHR.nodeAfter) {
                    tr.setSelection(TextSelection.near(tr.doc.resolve(posAfterHR)));
                  }
                } else {
                  // At end of document - add a paragraph and place cursor in it
                  const paragraphType = state.schema.nodes.paragraph;
                  const newParagraph = paragraphType.create();
                  tr.insert(posAfterHR, newParagraph);
                  tr.setSelection(TextSelection.create(tr.doc, posAfterHR + 1));
                }
                tr.scrollIntoView();
              },
            }),
          ];
        },
      }),
    ];

    // Conditionally add tables
    if (!disabledFeatures.tables) {
      baseExtensions.push(
        Table.configure({
          resizable: !isMobile, // Disable resize on mobile
          HTMLAttributes: {
            class: 'editor-table',
          },
        }),
        TableRow,
        TableCellWithMenu,
        TableHeaderWithMenu,
        // TableSorting adds decoration plugins for sort indicators; skip in lightweight mode
        ...(!isLightweight ? [TableSorting] : [])
      );
    }

    // Conditionally add task lists (using mixed variants)
    if (!disabledFeatures.taskLists) {
      baseExtensions.push(
        MixedTaskList.configure({
          HTMLAttributes: {
            class: 'task-list',
          },
        }),
        MixedTaskItem.configure({
          nested: true,
          HTMLAttributes: {
            class: 'task-item',
          },
        })
      );
    }

    // Collapsible list items (requires enableCollapsibleLists prop, desktop only, skip in lightweight mode)
    if (enableCollapsibleLists && !isMobile && !isLightweight) {
      baseExtensions.push(
        CollapsibleList.configure({
          listItemTypes: ['listItem', 'taskItem'],
        })
      );
    }

    // Conditionally add code blocks
    if (!disabledFeatures.codeBlocks) {
      baseExtensions.push(CodeBlockWithFeatures);
    }

    // Conditionally add callouts
    if (!disabledFeatures.callouts) {
      baseExtensions.push(CalloutWithMenu, CalloutInputRule);
    }

    // Conditionally add collapsible headings (requires enableCollapsibleHeadings prop)
    // Skip in lightweight mode — heading decorations are expensive on large docs
    if (enableCollapsibleHeadings && !disabledFeatures.collapsibleHeadings && !isLightweight) {
      baseExtensions.push(
        CollapsibleHeading.configure({
          levels: collapsibleHeadingLevels,
        })
      );
    }

    // Conditionally add images
    if (!disabledFeatures.images) {
      baseExtensions.push(
        ResizableImage.configure({
          allowBase64: true,
          HTMLAttributes: {
            class: 'editor-image',
          },
          onImageClick: (attrs: { src: string; alt: string; pos: number; rect: DOMRect }) => {
            setImageEditState({
              isOpen: true,
              src: attrs.src,
              alt: attrs.alt,
              pos: attrs.pos,
              position: { x: attrs.rect.left + attrs.rect.width / 2, y: attrs.rect.bottom },
            });
          },
          resolveImageSrc: callbackRefs.resolveImageSrc.current ? ((...args: any[]) => (callbackRefs.resolveImageSrc.current as any)(...args)) : undefined,
        }),
        ImageUpload.configure({
          maxFileSize: maxImageSize,
          onUploadStart: callbackRefs.onImageUploadStart.current ? ((...args: any[]) => (callbackRefs.onImageUploadStart.current as any)(...args)) : undefined,
          onUploadComplete: callbackRefs.onImageUploadComplete.current ? ((...args: any[]) => (callbackRefs.onImageUploadComplete.current as any)(...args)) : undefined,
          onUploadError: callbackRefs.onImageUploadError.current ? ((...args: any[]) => (callbackRefs.onImageUploadError.current as any)(...args)) : undefined,
          onImageUpload: callbackRefs.onImageUpload.current ? ((file: File, options: any) => (callbackRefs.onImageUpload.current as any)(file, options)) : undefined,
        })
      );
    }

    // Add DatePill if not disabled (works on both desktop and mobile)
    if (!disabledFeatures.datePills) {
      baseExtensions.push(
        DatePill.configure({
          HTMLAttributes: {
            class: 'date-pill',
          },
        })
      );
    }

    // Add TagPill if not disabled
    // When enableTagAutoDetect is false, the extension is still added (for rendering existing pills)
    // but input rules and paste handling are disabled
    if (!disabledFeatures.tagPills) {
      baseExtensions.push(
        TagPill.configure({
          HTMLAttributes: {
            class: 'tag-pill',
          },
          enableAutoDetect: enableTagAutoDetect,
        })
      );
    }

    // Conditionally add wiki links
    if (!disabledFeatures.wikiLinks) {
      baseExtensions.push(
        WikiLinkSafe.configure({
          onWikiLinkClick: (pageName: string) => {
            console.log('WikiLink clicked:', pageName);
            callbackRefs.onWikiLinkClick.current?.(pageName);
          },
          validateLink: (pageName: string) => {
            return callbackRefs.validateWikiLink.current ? callbackRefs.validateWikiLink.current(pageName) : true;
          },
        })
      );
    }

    // Conditionally add progressive Cmd+A expand selection
    if (progressiveSelectAll) {
      baseExtensions.push(ExpandSelection);
    }

    // Add HexColorMark for auto-detecting hex color values and rendering with background color
    // Skip in lightweight mode — decoration scanning is expensive on large docs
    if (enableHexColorHighlight && !isLightweight) {
      baseExtensions.push(HexColorMark);
    }

    // Conditionally add markdown paste
    if (!disabledFeatures.markdownPaste) {
      baseExtensions.push(
        MarkdownPasteSafe.configure({
          enableMarkdownPaste: true,
        })
      );
    }

    return baseExtensions;
  // Dependencies: only stable values (primitives, objects compared by reference that don't change).
  // Callback props are accessed via refs, so they don't need to be in the deps array.
  }, [placeholder, isMobile, maxImageSize, headingLevels, collapsibleHeadingLevels, disabledFeatures, progressiveSelectAll, enableCollapsibleHeadings, enableCollapsibleLists, enableTagAutoDetect, enableHexColorHighlight, isLightweight]);
}
