/**
 * WYSIWYGOverlays — Groups all floating overlays rendered in WYSIWYG mode.
 *
 * Includes: FloatingToolbar, AIDropdownMenu, AIResultPopover, SlashCommands,
 * WikiLinkAutocomplete, LinkPopover, LinkHoverTooltip, ImageEditPopover.
 */
import type { Editor } from '@tiptap/core';
import { FloatingToolbar } from './FloatingToolbar';
import { LinkPopover } from './LinkPopover';
import { LinkHoverTooltip } from './LinkHoverTooltip';
import { SlashCommands } from './SlashCommands';
import { WikiLinkAutocomplete } from './WikiLinkAutocomplete';
import { ImageEditPopover } from './ImageEditPopover';
import { ImageDropZone } from './ImageDropZone';
import { AIDropdownMenu } from './ai/AIDropdownMenu';
import { AIResultPopover } from './ai/AIResultPopover';
import type { AIActionDefinition } from './ai/types';

// Re-export types used by the parent
export interface AIDropdownState {
  scope: 'selection' | 'document';
  position: { top: number; left: number };
}

export interface AIPopoverPositionState {
  selectionTop: number;
  selectionBottom: number;
  selectionCenterX: number;
}

export interface ImageEditState {
  isOpen: boolean;
  src: string;
  alt: string;
  position: { x: number; y: number };
  pos: number;
}

interface WYSIWYGOverlaysProps {
  editor: Editor;
  isMobile: boolean;
  disabledFeatures: Record<string, boolean | undefined>;
  containerRef: React.RefObject<HTMLElement>;
  editable: boolean;

  // Floating toolbar
  showFloatingToolbar: boolean;
  isLinkPopoverOpen: boolean;
  aiEnabled: boolean;
  onAISetupRequired?: () => void;
  onAISparklesClick: (anchorEl?: HTMLElement) => void;

  // AI
  aiDropdown: AIDropdownState | null;
  aiActions?: AIActionDefinition[];
  onAIActionSelect: (actionId: string, customPrompt?: string) => void;
  onAIDropdownClose: () => void;
  aiState: { status: string; [key: string]: any };
  aiPopoverPosition: AIPopoverPositionState;
  onAIReplace: () => void;
  onAIInsert: () => void;
  onAIRetry: () => void;
  onAIDiscard: () => void;

  // Link popover
  onLinkPopoverClose: () => void;
  onEditLink: () => void;

  // Wiki links
  onWikiLinkSearch?: ((query: string) => Promise<Array<{ id: string; title: string; type: string }>>) | null;

  // Image edit
  imageEditState: ImageEditState | null;
  onImageSave: (newSrc: string, newAlt: string) => void;
  onImageDelete: () => void;
  onImageEditClose: () => void;
}

export function WYSIWYGOverlays({
  editor,
  isMobile,
  disabledFeatures,
  containerRef,
  editable,
  showFloatingToolbar,
  isLinkPopoverOpen,
  aiEnabled,
  onAISetupRequired,
  onAISparklesClick,
  aiDropdown,
  aiActions,
  onAIActionSelect,
  onAIDropdownClose,
  aiState,
  aiPopoverPosition,
  onAIReplace,
  onAIInsert,
  onAIRetry,
  onAIDiscard,
  onLinkPopoverClose,
  onEditLink,
  onWikiLinkSearch,
  imageEditState,
  onImageSave,
  onImageDelete,
  onImageEditClose,
}: WYSIWYGOverlaysProps) {
  return (
    <>
      {/* Image drop zone overlay */}
      {!disabledFeatures.images && !disabledFeatures.dragAndDrop && (
        <ImageDropZone containerRef={containerRef} enabled={editable} />
      )}

      {/* Floating toolbar on text selection (desktop only) */}
      {!isMobile && showFloatingToolbar && (
        <FloatingToolbar
          editor={editor}
          suppressWhenLinkPopoverOpen={isLinkPopoverOpen}
          aiEnabled={aiEnabled || !!onAISetupRequired}
          onAISparklesClick={(anchorEl) => onAISparklesClick(anchorEl)}
        />
      )}

      {/* AI dropdown menu */}
      {aiDropdown && aiActions && (
        <AIDropdownMenu
          actions={aiActions}
          scope={aiDropdown.scope}
          position={aiDropdown.position}
          onAction={onAIActionSelect}
          onClose={onAIDropdownClose}
        />
      )}

      {/* AI result popover */}
      {aiState.status !== 'idle' && (
        <AIResultPopover
          state={aiState as any}
          position={aiPopoverPosition}
          onReplace={onAIReplace}
          onInsert={onAIInsert}
          onRetry={onAIRetry}
          onDiscard={onAIDiscard}
        />
      )}

      {/* Slash commands */}
      {!disabledFeatures.slashCommands && (
        <SlashCommands editor={editor} disabledFeatures={disabledFeatures} />
      )}

      {/* Wiki link autocomplete */}
      {!disabledFeatures.wikiLinks && onWikiLinkSearch && (
        <WikiLinkAutocomplete editor={editor} onSearch={onWikiLinkSearch} />
      )}

      {/* Link popover */}
      <LinkPopover
        editor={editor}
        isOpen={isLinkPopoverOpen}
        onClose={onLinkPopoverClose}
      />

      {/* Link hover tooltip (desktop only) */}
      {!isMobile && (
        <LinkHoverTooltip editor={editor} onEditLink={onEditLink} />
      )}

      {/* Image edit popover */}
      {!disabledFeatures.images && imageEditState?.isOpen && (
        <ImageEditPopover
          src={imageEditState.src}
          alt={imageEditState.alt}
          position={imageEditState.position}
          onSave={onImageSave}
          onDelete={onImageDelete}
          onClose={onImageEditClose}
        />
      )}
    </>
  );
}
