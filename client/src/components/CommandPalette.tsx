/**
 * CommandPalette - Desktop modal wrapper around SearchPanel.
 * Renders SearchPanel inside a centered modal overlay with backdrop.
 * On mobile, SearchPanel is rendered directly as a full-screen tab (see Home.tsx).
 */
import { motion, AnimatePresence } from 'framer-motion';
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

export function CommandPalette({
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
