/**
 * usePreferences — Manages user preferences state (editor settings, tasks, checklist).
 *
 * Extracted from ServerMomentumContext to reduce the monolithic provider's size.
 * The main provider calls this hook and spreads its return values into the context.
 *
 * Note: The actual loading of preferences from Supabase (user_settings table) is still
 * done in the main provider's loadMetadata and performCatchUpSync functions, which call
 * applySettingsFromServer() to push server data into this hook's state.
 */
import { useState, useCallback } from 'react';

export interface EditorPreferences {
  fontFamily: string;
  fontSize: number;
  lineHeight: string;
}

const DEFAULT_EDITOR_PREFS: EditorPreferences = {
  fontFamily: 'inter',
  fontSize: 15,
  lineHeight: 'normal',
};

export interface UsePreferencesReturn {
  autoReorderChecklist: boolean;
  tasksEnabled: boolean;
  setTasksEnabled: (enabled: boolean) => void;
  editorPreferences: EditorPreferences;
  setEditorPreferences: (prefs: Partial<EditorPreferences>) => void;
  /**
   * Called by the provider when settings are loaded from Supabase (initial load + catch-up sync).
   * Applies server values to local state.
   */
  applySettingsFromServer: (data: {
    auto_reorder_checklist?: boolean;
    tasks_enabled?: boolean;
    editor_font_family?: string;
    editor_font_size?: number;
    editor_line_height?: string;
  }) => void;
}

export function usePreferences(): UsePreferencesReturn {
  const [autoReorderChecklist, setAutoReorderChecklist] = useState(true);
  const [tasksEnabled, setTasksEnabled] = useState(false);
  const [editorPreferences, setEditorPreferencesState] = useState<EditorPreferences>(DEFAULT_EDITOR_PREFS);

  const setEditorPreferences = useCallback((prefs: Partial<EditorPreferences>) => {
    setEditorPreferencesState(prev => ({ ...prev, ...prefs }));
  }, []);

  /**
   * Apply settings fetched from the Supabase user_settings table.
   * Called during initial metadata load and during catch-up sync.
   */
  const applySettingsFromServer = useCallback((data: {
    auto_reorder_checklist?: boolean;
    tasks_enabled?: boolean;
    editor_font_family?: string;
    editor_font_size?: number;
    editor_line_height?: string;
  }) => {
    setAutoReorderChecklist(data.auto_reorder_checklist ?? true);
    setTasksEnabled(data.tasks_enabled ?? false);
    setEditorPreferencesState({
      fontFamily: data.editor_font_family || 'inter',
      fontSize: data.editor_font_size || 15,
      lineHeight: data.editor_line_height || 'normal',
    });
  }, []);

  return {
    autoReorderChecklist,
    tasksEnabled,
    setTasksEnabled,
    editorPreferences,
    setEditorPreferences,
    applySettingsFromServer,
  };
}
