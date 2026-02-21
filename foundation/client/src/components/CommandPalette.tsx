/**
 * CommandPalette - Desktop modal wrapper around SearchPanel.
 * Renders SearchPanel inside a centered modal overlay with backdrop.
 * On mobile, SearchPanel is rendered directly as a full-screen tab (see Home.tsx).
 *
 * Uses CSS animations instead of motion/react for lighter bundle.
 */
import { memo } from 'react';
import { SearchPanel } from './SearchPanel';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNewTask: () => void;
  onNewNote: () => void;
  onToggleSidebar: () => void;
  onToggleDetailPanel: () => void;
  onSelectItem: (id: string) => void;
  onSelectList: (listId: string) => void;
  onSelectTag: (tagId: string) => void;
}

export const CommandPalette = memo(function CommandPalette({
  isOpen,
  onClose,
  onNewTask,
  onNewNote,
  onToggleSidebar,
  onToggleDetailPanel,
  onSelectItem,
  onSelectList,
  onSelectTag,
}: CommandPaletteProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 animate-in fade-in zoom-in-95 slide-in-from-top-5 duration-150"
      >
        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          <SearchPanel
            mode="modal"
            isActive={isOpen}
            onClose={onClose}
            onNewTask={onNewTask}
            onNewNote={onNewNote}
            onToggleSidebar={onToggleSidebar}
            onToggleDetailPanel={onToggleDetailPanel}
            onSelectItem={onSelectItem}
            onSelectList={onSelectList}
            onSelectTag={onSelectTag}
          />
        </div>
      </div>
    </>
  );
});
