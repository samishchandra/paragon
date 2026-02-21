/**
 * Settings Page — split into section components for 2-column layout.
 *
 * Exports: SettingsGeneral, SettingsEditor, SettingsData, SettingsBackup,
 *          SettingsDeveloper, SettingsContent (legacy), Settings (full-page).
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/lib/toast';
import {
  ArrowLeft,
  Sparkles,
  Settings as SettingsIcon,
  Loader2,
  CheckSquare,
  Trash2,
  HardDrive,
  FolderArchive,
  FolderOpen,
  FileText,
  Tag,
  ListChecks,
  FolderClosed,
  Cloud,
  CloudOff,
  RefreshCw,
  ExternalLink,
  KeyRound,
  Database,
  CheckCircle2,
  Clock,
  Shield,
  AlertTriangle,
  ScrollText,
  Upload,
  Trash,
  Plug,
  Unplug,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SyncStatusIndicator } from '@/components/SyncStatusIndicator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { useMomentum } from '@/contexts/ServerMomentumContext';
import { Beaker } from 'lucide-react';
import { apiQuery } from '@/lib/db';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as localBackup from '@/lib/localBackup';
import { runBackup, runFullBackup, setBackupUserId, type BackupProgress } from '@/lib/localBackupSync';
import { triggerFullBackup, setAutoBackupEnabled, hasUnsyncedItems, getPendingCount, onGlobalBackupStatusChange } from '@/lib/autoBackup';
import { getLog, onLogChange, clearLog, logManualBackup, logConnection, type BackupLogEntry, type BackupLogType } from '@/lib/backupLog';
// AI config is now handled server-side via built-in LLM
import { useAuth } from '@/contexts/AuthContext';

/* ─────────────────────────────────────────────
 * Shared hook: user_settings row
 * ───────────────────────────────────────────── */

function useUserSettings(userId: string) {
  const [userSettings, setUserSettings] = useState<any>(null);

  useEffect(() => {
    apiQuery({ table: 'user_settings', select: '*', filters: { user_id: userId }, limit: 1, single: true }).then(({ data }) => {
      setUserSettings(data);
    });
  }, [userId]);

  const updateSettings = useCallback(async (updates: any) => {
    if (userSettings?.user_id) {
      await apiQuery({ action: 'update', table: 'user_settings', data: updates, filters: { user_id: userSettings.user_id } });
    } else {
      await apiQuery({ action: 'insert', table: 'user_settings', data: { ...updates, user_id: userId } });
    }
    const { data } = await apiQuery({ table: 'user_settings', select: '*', filters: { user_id: userId }, limit: 1, single: true });
    setUserSettings(data);
  }, [userSettings?.user_id, userId]);

  return { userSettings, updateSettings };
}

/* ─────────────────────────────────────────────
 * SECTION: General
 * ───────────────────────────────────────────── */

export function SettingsGeneral() {
  const { userId, setTasksEnabled } = useMomentum();
  const { userSettings, updateSettings } = useUserSettings(userId);

  return (
    <div className="space-y-6">
      {/* Sync Status */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Sync Status</h4>
          <SyncStatusIndicator />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Features</h4>

        <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30">
          <div className="flex-1">
            <Label htmlFor="tasksEnabled" className="text-sm font-medium cursor-pointer">
              Enable Tasks
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Show task creation options and task-related views. When disabled, only notes are available.
            </p>
          </div>
          <Switch
            id="tasksEnabled"
            checked={userSettings?.tasks_enabled ?? false}
            onCheckedChange={(checked) => {
              updateSettings({ tasks_enabled: checked });
              setTasksEnabled(checked);
              toast.success(checked ? 'Tasks enabled' : 'Tasks disabled');
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTION: Editor
 * ───────────────────────────────────────────── */

const FONT_FAMILIES = [
  { value: 'system', label: 'System Default' },
  { value: 'inter', label: 'Inter' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'lora', label: 'Lora' },
  { value: 'source-sans', label: 'Source Sans 3' },
  { value: 'jetbrains-mono', label: 'JetBrains Mono' },
  { value: 'fira-code', label: 'Fira Code' },
  { value: 'ibm-plex-sans', label: 'IBM Plex Sans' },
  { value: 'nunito', label: 'Nunito' },
  { value: 'open-sans', label: 'Open Sans' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'sf-pro', label: 'SF Pro' },
];

const FONT_SIZES = [
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '20', label: '20' },
  { value: '22', label: '22' },
  { value: '24', label: '24' },
];

export function SettingsEditor() {
  const { userId, setEditorPreferences } = useMomentum();
  const { userSettings, updateSettings } = useUserSettings(userId);

  const currentFontFamily = userSettings?.editor_font_family || 'system';
  const currentFontSize = userSettings?.editor_font_size?.toString() || '15';
  const currentLineHeight = userSettings?.editor_line_height || 'normal';

  const handleFontFamilyChange = async (value: string) => {
    await updateSettings({ editor_font_family: value });
    setEditorPreferences?.({ fontFamily: value });
    toast.success(`Font changed to ${FONT_FAMILIES.find(f => f.value === value)?.label || value}`);
  };

  const handleFontSizeChange = async (value: string) => {
    const size = parseInt(value, 10);
    await updateSettings({ editor_font_size: size });
    setEditorPreferences?.({ fontSize: size });
    toast.success(`Font size changed to ${size}px`);
  };

  const LINE_HEIGHTS = [
    { value: 'compact', label: 'Compact', description: 'Tighter spacing' },
    { value: 'normal', label: 'Normal', description: 'Default spacing' },
    { value: 'relaxed', label: 'Relaxed', description: 'More breathing room' },
  ];

  const handleLineHeightChange = async (value: string) => {
    await updateSettings({ editor_line_height: value });
    setEditorPreferences?.({ lineHeight: value });
    toast.success(`Line height changed to ${LINE_HEIGHTS.find(l => l.value === value)?.label || value}`);
  };

  return (
    <div className="space-y-6">
      {/* Typography */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Typography</h4>

        <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30">
          <Label className="text-sm font-medium">Font</Label>
          <Select value={currentFontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES.map((f) => (
                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30">
          <Label className="text-sm font-medium">Font size</Label>
          <Select value={currentFontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_SIZES.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30">
          <div>
            <Label className="text-sm font-medium">Line height</Label>
            <p className="text-xs text-muted-foreground mt-0.5">Controls spacing between lines of text.</p>
          </div>
          <Select value={currentLineHeight} onValueChange={handleLineHeightChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LINE_HEIGHTS.map((l) => (
                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Editor Behavior */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Behavior</h4>

        <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30">
          <div className="flex-1">
            <Label htmlFor="autoReorderEditor" className="text-sm font-medium cursor-pointer">
              Auto-reorder checklist items
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Move completed checklist items to the bottom when toggled.
            </p>
          </div>
          <Switch
            id="autoReorderEditor"
            checked={userSettings?.auto_reorder_checklist ?? true}
            onCheckedChange={(checked) => {
              updateSettings({ auto_reorder_checklist: checked });
              toast.success(checked ? 'Auto-reorder enabled' : 'Auto-reorder disabled');
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTION: Data (Export / Import)
 * ───────────────────────────────────────────── */

export function SettingsData() {
  const { userId, refreshData } = useMomentum();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importTotal, setImportTotal] = useState(0);
  const [importMessage, setImportMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showImportPreview, setShowImportPreview] = useState(false);
  const [importPreview, setImportPreview] = useState<{
    files: { name: string; content: string; folder: string; lastModified: number }[];
    lists: string[];
    tags: string[];
    tasks: number;
    notes: number;
  } | null>(null);

  // ── Parse helpers ──
  const parseFrontmatter = (content: string) => {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) return { meta: {} as Record<string, string>, body: content };
    const meta: Record<string, string> = {};
    for (const line of fmMatch[1].split('\n')) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        meta[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
      }
    }
    return { meta, body: fmMatch[2] };
  };

  const extractHashtags = (text: string): string[] => {
    const withoutCode = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]+`/g, '');
    const tagRegex = /(?:^|\s)#([a-zA-Z][\w-]{0,49})(?=\s|$|[.,;:!?)])/gm;
    const tags = new Set<string>();
    let match;
    while ((match = tagRegex.exec(withoutCode)) !== null) {
      tags.add(match[1].toLowerCase());
    }
    return Array.from(tags);
  };

  const resolveTag = async (
    tagName: string,
    tagNameToId: Map<string, string>,
    counters: { items: number; lists: number; tags: number },
  ): Promise<string | null> => {
    const lower = tagName.toLowerCase();
    if (tagNameToId.has(lower)) return tagNameToId.get(lower)!;
    const { data: existing } = await apiQuery({ table: 'tags', select: 'id', filters: { user_id: userId, name: lower }, limit: 1, single: true });
    if (existing) { tagNameToId.set(lower, existing.id); return existing.id; }
    const colors = ['#008948', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    const color = colors[counters.tags % colors.length];
    const { data: newTag } = await apiQuery({ action: 'insert', table: 'tags', data: { name: lower, color, user_id: userId }, single: true });
    if (newTag) { tagNameToId.set(lower, newTag.id); counters.tags++; return newTag.id; }
    return null;
  };

  const importMarkdownFile = async (
    fileName: string, content: string, folderName: string,
    listNameToId: Map<string, string>, tagNameToId: Map<string, string>,
    counters: { items: number; lists: number; tags: number },
    lastModified?: number,
  ) => {
    if (folderName !== 'Miscellaneous' && !listNameToId.has(folderName)) {
      const { data: existingList } = await apiQuery({ table: 'lists', select: 'id', filters: { user_id: userId, name: folderName }, limit: 1, single: true });
      if (existingList) { listNameToId.set(folderName, existingList.id); }
      else {
        const { data: newList } = await apiQuery({ action: 'insert', table: 'lists', data: { name: folderName, type: 'note', user_id: userId }, single: true });
        if (newList) { listNameToId.set(folderName, newList.id); counters.lists++; }
      }
    }
    const { meta, body } = parseFrontmatter(content);
    let title = fileName.replace('.md', '');
    let itemContent = body;
    const headingMatch = body.match(/^#\s+(.+)/m);
    if (headingMatch) { title = headingMatch[1]; itemContent = body.replace(/^#\s+.+\n*/, '').trim(); }
    const detectedTags = extractHashtags(title + '\n' + itemContent);
    const fmTags: string[] = [];
    if (meta.tags) {
      for (const t of meta.tags.replace(/^\[|\]$/g, '').split(',')) {
        const trimmed = t.trim().replace(/^#/, ''); // Strip # prefix (Obsidian-compatible format)
        if (trimmed) fmTags.push(trimmed.toLowerCase());
      }
    }
    const allTagNames = Array.from(new Set([...detectedTags, ...fmTags]));
    const type = meta.type === 'task' ? 'task' : 'note';
    const section = meta.section || 'now';
    const isCompleted = meta.completed === 'true';
    const isPinned = meta.pinned === 'true';
    const dueDate = meta.due || null;
    const listId = listNameToId.get(folderName) || null;
    const searchContent = itemContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const timestamps: Record<string, string> = {};
    if (lastModified) {
      const isoDate = new Date(lastModified).toISOString();
      timestamps.updated_at = isoDate;
      timestamps.created_at = isoDate;
    }
    const hasUncompleted = /- \[ \]/.test(itemContent);
    const { data: insertedItem } = await apiQuery({ action: 'insert', table: 'items', data: {
      type, title, content: itemContent, section, list_id: listId,
      is_completed: isCompleted, is_pinned: isPinned, due_date: dueDate,
      sort_order: counters.items, search_content: searchContent,
      has_uncompleted_todos: hasUncompleted, user_id: userId, ...timestamps,
    }, single: true });
    if (insertedItem && allTagNames.length > 0) {
      const tagIds: string[] = [];
      for (const tagName of allTagNames) {
        const tagId = await resolveTag(tagName, tagNameToId, counters);
        if (tagId) tagIds.push(tagId);
      }
      if (tagIds.length > 0) {
        await apiQuery({ action: 'insert', table: 'item_tags', data: tagIds.map(tid => ({ item_id: insertedItem.id, tag_id: tid })) });
      }
    }
    counters.items++;
  };

  const analyzeFiles = (files: { name: string; content: string; folder: string; lastModified: number }[]) => {
    const lists = new Set<string>();
    const tags = new Set<string>();
    let tasks = 0; let notes = 0;
    for (const f of files) {
      if (f.folder !== 'Miscellaneous') lists.add(f.folder);
      const { meta, body } = parseFrontmatter(f.content);
      let itemContent = body;
      const headingMatch = body.match(/^#\s+(.+)/m);
      if (headingMatch) itemContent = body.replace(/^#\s+.+\n*/, '').trim();
      const detected = extractHashtags(f.name + '\n' + itemContent);
      detected.forEach(t => tags.add(t));
      if (meta.tags) {
        for (const t of meta.tags.replace(/^\[|\]$/g, '').split(',')) {
          const trimmed = t.trim().replace(/^#/, ''); // Strip # prefix (Obsidian-compatible format)
          if (trimmed) tags.add(trimmed.toLowerCase());
        }
      }
      if (meta.type === 'task') tasks++; else notes++;
    }
    return { files, lists: Array.from(lists), tags: Array.from(tags), tasks, notes };
  };

  // ── Export ──
  const handleExportFolders = async () => {
    setIsExporting(true);
    try {
      const [itemsResult, tagsResult, listsResult] = await Promise.all([
        apiQuery({ table: 'items', select: '*, item_tags(tag_id)', filters: { user_id: userId } }),
        apiQuery({ table: 'tags', select: '*', filters: { user_id: userId } }),
        apiQuery({ table: 'lists', select: '*', filters: { user_id: userId } }),
      ]);
      const items = itemsResult.data || [];
      const tags = tagsResult.data || [];
      const lists = listsResult.data || [];
      const tagMap = new Map(tags.map((t: any) => [t.id, t.name]));
      const listMap = new Map(lists.map((l: any) => [l.id, l.name]));
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      for (const item of items) {
        const listName = item.list_id ? (listMap.get(item.list_id) || 'Miscellaneous') : 'Miscellaneous';
        const itemTags = (item.item_tags || []).map((it: any) => tagMap.get(it.tag_id)).filter(Boolean);
        let frontmatter = '---\n';
        frontmatter += `type: ${item.type}\n`;
        if (item.section) frontmatter += `section: ${item.section}\n`;
        if (item.is_completed) frontmatter += `completed: true\n`;
        if (item.is_pinned) frontmatter += `pinned: true\n`;
        if (item.due_date) frontmatter += `due: ${item.due_date}\n`;
        if (itemTags.length > 0) frontmatter += `tags: [${itemTags.join(', ')}]\n`;
        frontmatter += '---\n\n';
        const title = item.title || 'Untitled';
        const safeTitle = title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 100);
        const content = frontmatter + `# ${title}\n\n${item.content || ''}`;
        zip.file(`${listName}/${safeTitle}.md`, content);
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `momentum-backup-${new Date().toISOString().slice(0, 10)}.zip`;
      a.click(); URL.revokeObjectURL(url);
      toast.success('Export complete', { description: `Exported ${items.length} items in ${lists.length + 1} folders.` });
    } catch (err) {
      toast.error('Export failed', { description: err instanceof Error ? err.message : 'Unknown error' });
    } finally { setIsExporting(false); }
  };

  // ── Import from Folder ──
  const handleImportFromFolder = () => {
    if (typeof (window as any).showDirectoryPicker === 'function') {
      (async () => {
        try {
          const dirHandle = await (window as any).showDirectoryPicker();
          setIsScanning(true);
          const filesToImport: { name: string; content: string; folder: string; lastModified: number }[] = [];
          const collectFiles = async (handle: FileSystemDirectoryHandle, parentFolder: string) => {
            for await (const entry of (handle as any).values()) {
              if (entry.kind === 'file' && entry.name.endsWith('.md')) {
                const file = await entry.getFile();
                const content = await file.text();
                filesToImport.push({ name: file.name, content, folder: parentFolder, lastModified: file.lastModified });
              } else if (entry.kind === 'directory' && !entry.name.startsWith('.')) {
                await collectFiles(entry, entry.name);
              }
            }
          };
          await collectFiles(dirHandle, 'Miscellaneous');
          if (filesToImport.length === 0) { toast.info('No markdown files found'); return; }
          const preview = analyzeFiles(filesToImport);
          setImportPreview(preview);
          setShowImportPreview(true);
        } catch (err: any) {
          if (err.name !== 'AbortError') toast.error('Scan failed', { description: err.message });
        } finally { setIsScanning(false); }
      })();
    } else {
      const input = document.createElement('input');
      input.type = 'file';
      (input as any).webkitdirectory = true;
      (input as any).directory = true;
      input.multiple = true;
      input.onchange = async (e) => {
        const fileList = (e.target as HTMLInputElement).files;
        if (!fileList || fileList.length === 0) return;
        setIsScanning(true);
        try {
          const filesToImport: { name: string; content: string; folder: string; lastModified: number }[] = [];
          for (const file of Array.from(fileList)) {
            if (!file.name.endsWith('.md')) continue;
            const content = await file.text();
            const parts = (file as any).webkitRelativePath?.split('/') || [file.name];
            let folderName = 'Miscellaneous';
            if (parts.length >= 3) folderName = parts[parts.length - 2];
            filesToImport.push({ name: file.name, content, folder: folderName, lastModified: file.lastModified });
          }
          if (filesToImport.length === 0) { toast.info('No markdown files found'); return; }
          const preview = analyzeFiles(filesToImport);
          setImportPreview(preview);
          setShowImportPreview(true);
        } catch (err) {
          toast.error('Scan failed', { description: err instanceof Error ? err.message : 'Failed to read folder' });
        } finally { setIsScanning(false); }
      };
      input.click();
    }
  };

  const executeImport = async () => {
    if (!importPreview) return;
    setShowImportPreview(false);
    setIsImporting(true);
    setImportProgress(0);
    setImportTotal(importPreview.files.length);
    setImportMessage(`Importing 0 of ${importPreview.files.length} files...`);
    try {
      const listNameToId = new Map<string, string>();
      const tagNameToId = new Map<string, string>();
      const counters = { items: 0, lists: 0, tags: 0 };
      for (const f of importPreview.files) {
        await importMarkdownFile(f.name, f.content, f.folder, listNameToId, tagNameToId, counters, f.lastModified);
        setImportProgress(counters.items);
        setImportMessage(`Importing ${counters.items} of ${importPreview.files.length} files...`);
      }
      refreshData();
      // Trigger full backup to local folder after import
      triggerFullBackup();
      const tagMsg = counters.tags > 0 ? `, ${counters.tags} tags` : '';
      toast.success('Folder imported successfully', { description: `Imported ${counters.items} items, ${counters.lists} lists${tagMsg}.` });
    } catch (err) {
      toast.error('Import failed', { description: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setIsImporting(false); setImportProgress(0); setImportTotal(0);
      setImportMessage(''); setImportPreview(null);
    }
  };

  const { sidebarCounts, sidebarTagCounts, state: ctxState } = useMomentum();
  const totalTags = Object.keys(sidebarTagCounts || {}).length;
  const totalLists = ctxState.lists?.length || 0;

  // Storage size estimate
  const [storageSize, setStorageSize] = useState<{ totalBytes: number; itemCount: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Sum approximate content size: title + content for all items
        const { data, error } = await apiQuery({
          table: 'items',
          select: 'title, content',
          filters: { user_id: userId },
        });
        if (error || !data || cancelled) return;
        let totalBytes = 0;
        for (const row of data) {
          totalBytes += new Blob([row.title || '']).size;
          totalBytes += new Blob([row.content || '']).size;
        }
        if (!cancelled) setStorageSize({ totalBytes, itemCount: data.length });
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Data Stats */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Data Overview</h4>
        {sidebarCounts ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.all}</div>
              <div className="text-xs text-muted-foreground mt-0.5">All Items</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.tasks}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Tasks</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.notes}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Notes</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.pinned}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Pinned</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.completed}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Completed</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{sidebarCounts.trash}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Deleted</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{totalLists}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Lists</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-2xl font-bold tabular-nums">{totalTags}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Tags</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading stats...
          </div>
        )}
      </div>

      {/* Storage Used */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Storage Used</h4>
        {storageSize ? (
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">{formatBytes(storageSize.totalBytes)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Estimated content size across {storageSize.itemCount.toLocaleString()} items (titles + body text)
                </div>
              </div>
            </div>
            {/* Visual bar */}
            <div className="mt-3">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min((storageSize.totalBytes / (500 * 1024 * 1024)) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>{formatBytes(storageSize.totalBytes)}</span>
                <span>500 MB (est. limit)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Calculating storage...
          </div>
        )}
      </div>

      {/* Import */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Import</h4>
        <div>
          <Button variant="outline" onClick={handleImportFromFolder} disabled={isImporting || isScanning}>
            {(isImporting || isScanning) ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FolderOpen className="w-4 h-4 mr-2" />}
            {isScanning ? 'Scanning...' : 'Import from Folder'}
          </Button>
          {isImporting && importTotal > 0 && (
            <div className="space-y-2 mt-3">
              <Progress value={(importProgress / importTotal) * 100} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {importMessage}
                </div>
                <span>{Math.round((importProgress / importTotal) * 100)}%</span>
              </div>
            </div>
          )}
          {isImporting && importTotal === 0 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {importMessage || 'Preparing...'}
            </div>
          )}
          {!isImporting && (
            <p className="text-xs text-muted-foreground mt-2">
              Restore from a folder of markdown files. Tags (#hashtags) are auto-detected.
            </p>
          )}
        </div>
      </div>

      {/* Export */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Export</h4>
        <div>
          <Button variant="outline" onClick={handleExportFolders} disabled={isExporting}>
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FolderArchive className="w-4 h-4 mr-2" />}
            Export Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Download your tasks and notes as a ZIP with markdown files organized by list.
          </p>
        </div>
      </div>

      {/* Import Preview Dialog */}
      <AlertDialog open={showImportPreview} onOpenChange={setShowImportPreview}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Import Preview</AlertDialogTitle>
            <AlertDialogDescription>Review what will be imported before proceeding.</AlertDialogDescription>
          </AlertDialogHeader>
          {importPreview && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-2xl font-semibold leading-none">{importPreview.files.length}</div>
                    <div className="text-xs text-muted-foreground mt-1">Markdown files</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <ListChecks className="w-5 h-5 text-green-500 shrink-0" />
                  <div>
                    <div className="text-2xl font-semibold leading-none">{importPreview.tasks}</div>
                    <div className="text-xs text-muted-foreground mt-1">Tasks / {importPreview.notes} Notes</div>
                  </div>
                </div>
              </div>
              {importPreview.lists.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FolderClosed className="w-4 h-4 text-amber-500" />
                    {importPreview.lists.length} list{importPreview.lists.length !== 1 ? 's' : ''} detected
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {importPreview.lists.map(l => (
                      <span key={l} className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">{l}</span>
                    ))}
                  </div>
                </div>
              )}
              {importPreview.tags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="w-4 h-4 text-violet-500" />
                    {importPreview.tags.length} tag{importPreview.tags.length !== 1 ? 's' : ''} detected
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {importPreview.tags.slice(0, 20).map(t => (
                      <span key={t} className="inline-flex items-center rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-700 dark:text-violet-400 ring-1 ring-inset ring-violet-500/20">#{t}</span>
                    ))}
                    {importPreview.tags.length > 20 && (
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">+{importPreview.tags.length - 20} more</span>
                    )}
                  </div>
                </div>
              )}
              {importPreview.tags.length === 0 && importPreview.lists.length === 0 && (
                <p className="text-sm text-muted-foreground">No tags or lists detected. All items will be imported to Miscellaneous.</p>
              )}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setShowImportPreview(false); setImportPreview(null); }}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeImport}>Import {importPreview?.files.length} files</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTION: Backup (Local Folder)
 * ───────────────────────────────────────────── */

function getLogIcon(type: BackupLogType) {
  switch (type) {
    case 'auto': return <Cloud className="w-3.5 h-3.5 text-primary" />;
    case 'manual': return <Upload className="w-3.5 h-3.5 text-primary" />;
    case 'full': return <RefreshCw className="w-3.5 h-3.5 text-violet-500" />;
    case 'error': return <AlertTriangle className="w-3.5 h-3.5 text-destructive" />;
    case 'connect': return <Plug className="w-3.5 h-3.5 text-emerald-500" />;
    case 'disconnect': return <Unplug className="w-3.5 h-3.5 text-amber-500" />;
    default: return <ScrollText className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function BackupLogRow({ entry }: { entry: BackupLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = (entry.uploaded != null && entry.uploaded > 0) ||
    (entry.deleted != null && entry.deleted > 0) ||
    (entry.unchanged != null && entry.unchanged > 0) ||
    (entry.errors && entry.errors.length > 0);

  return (
    <div className="group">
      <button
        onClick={() => hasDetails && setExpanded(!expanded)}
        className={`w-full px-3 py-2.5 flex items-start gap-2.5 text-left transition-colors ${
          hasDetails ? 'hover:bg-muted/50 cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="mt-0.5 shrink-0">{getLogIcon(entry.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-foreground leading-snug">{entry.message}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {formatRelativeTime(entry.timestamp)}
            <span className="mx-1 opacity-30">·</span>
            {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        {hasDetails && (
          <ChevronDown className={`w-3 h-3 text-muted-foreground/50 mt-1 shrink-0 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`} />
        )}
      </button>
      {expanded && hasDetails && (
        <div className="px-3 pb-2.5 pl-9 space-y-1">
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
            {entry.uploaded != null && entry.uploaded > 0 && (
              <span className="flex items-center gap-1">
                <Upload className="w-2.5 h-2.5 text-emerald-500" />
                {entry.uploaded} uploaded
              </span>
            )}
            {entry.deleted != null && entry.deleted > 0 && (
              <span className="flex items-center gap-1">
                <Trash className="w-2.5 h-2.5 text-amber-500" />
                {entry.deleted} deleted
              </span>
            )}
            {entry.unchanged != null && entry.unchanged > 0 && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-muted-foreground" />
                {entry.unchanged} unchanged
              </span>
            )}
          </div>
          {entry.errors && entry.errors.length > 0 && (
            <div className="space-y-0.5">
              {entry.errors.slice(0, 3).map((err, i) => (
                <p key={i} className="text-[10px] text-destructive/80 leading-tight">
                  {err}
                </p>
              ))}
              {entry.errors.length > 3 && (
                <p className="text-[10px] text-muted-foreground">
                  +{entry.errors.length - 3} more error(s)
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SettingsBackup() {
  const { userId } = useMomentum();
  const { user } = useAuth();
  useEffect(() => { setBackupUserId(userId); }, [userId]);
  const [activityLog, setActivityLog] = useState<BackupLogEntry[]>(() => getLog());
  const [logExpanded, setLogExpanded] = useState(false);
  const [connected, setConnected] = useState(() => localBackup.isConnected());
  const [folderName, setFolderName] = useState(() => localBackup.getFolderName());
  const [backing, setBacking] = useState(false);
  const [progress, setProgress] = useState<BackupProgress | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastBackup, setLastBackup] = useState<string | null>(() => {
    const s = localBackup.getBackupState();
    return s?.lastBackupAt || null;
  });
  const [apiSupported] = useState(() => localBackup.isFileSystemAccessSupported());

  // Listen for connection changes
  useEffect(() => {
    setConnected(localBackup.isConnected());
    setFolderName(localBackup.getFolderName());

    const unsub = localBackup.onConnectionChange((isConnected) => {
      setConnected(isConnected);
      setFolderName(localBackup.getFolderName());
    });

    return unsub;
  }, []);

  // Listen for activity log changes
  useEffect(() => {
    const unsub = onLogChange(() => setActivityLog(getLog()));
    return unsub;
  }, []);

  // Track pending backup count
  useEffect(() => {
    if (!connected) {
      setPendingCount(0);
      return;
    }
    setPendingCount(getPendingCount());
    const unsub = onGlobalBackupStatusChange(() => {
      setPendingCount(getPendingCount());
    });
    return unsub;
  }, [connected]);

  const handlePickFolder = async () => {
    try {
      const ok = await localBackup.pickFolder();
      if (ok) {
        setConnected(true);
        setFolderName(localBackup.getFolderName());
        setAutoBackupEnabled(true, userId);
        logConnection(true);
        toast.success('Backup folder selected', {
          description: `Files will be backed up to: ${localBackup.getFolderName()}`,
        });
      }
    } catch (err) {
      toast.error('Failed to select folder', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  const handleDisconnect = () => {
    localBackup.disconnect();
    setAutoBackupEnabled(false);
    setConnected(false);
    setFolderName('');
    setLastBackup(null);
    setPendingCount(0);
    logConnection(false);
    toast.success('Backup folder disconnected');
  };

  const handleBackup = async (full = false) => {
    setBacking(true);
    setProgress(null);
    try {
      const result = full
        ? await runFullBackup((p) => setProgress(p))
        : await runBackup((p) => setProgress(p));
      const s = localBackup.getBackupState();
      setLastBackup(s?.lastBackupAt || null);
      logManualBackup(result.uploaded, result.deleted, result.unchanged, result.errors, full);
      if (result.errors.length > 0) {
        toast.warning(`Backup completed with ${result.errors.length} error(s)`, {
          description: `Written: ${result.uploaded}, Deleted: ${result.deleted}, Unchanged: ${result.unchanged}`,
        });
      } else {
        toast.success('Backup complete', {
          description: `Written: ${result.uploaded}, Deleted: ${result.deleted}, Unchanged: ${result.unchanged}`,
        });
      }
    } catch (err) {
      toast.error('Backup failed', { description: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setBacking(false);
      setTimeout(() => setProgress(null), 3000);
    }
  };

  const backedUpFileCount = (() => {
    const s = localBackup.getBackupState();
    return s?.files ? Object.keys(s.files).length : 0;
  })();

  return (
    <div className="space-y-6">
      {/* Browser support warning */}
      {!apiSupported && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Browser Not Supported</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Local folder backup requires the File System Access API, which is supported in Chrome, Edge, and Opera.
                Firefox and Safari do not support this feature yet.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status Card */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Backup Folder</h4>
        <div className={`rounded-lg border p-4 ${
          connected
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-border bg-card'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              connected
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-muted text-muted-foreground'
            }`}>
              {connected ? <CheckCircle2 className="w-5 h-5" /> : <FolderClosed className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {connected ? folderName : 'No Folder Selected'}
                </h3>
                {connected && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                )}
              </div>
              {connected ? (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Auto-backup is enabled. Changes are written to your local folder automatically.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose a local folder to enable automatic one-way backup of your notes and tasks.
                </p>
              )}
            </div>
          </div>

          {/* Connected details */}
          {connected && (
            <div className="mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{backedUpFileCount}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Files backed up</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{pendingCount}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {lastBackup ? new Date(lastBackup).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '\u2014'}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Last backup</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Folder Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Configuration</h4>
        <div className="flex gap-2">
          {!connected ? (
            <Button variant="default" onClick={handlePickFolder} disabled={!apiSupported}>
              <FolderOpen className="w-4 h-4 mr-2" /> Choose Folder
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handlePickFolder}>
                <FolderOpen className="w-4 h-4 mr-2" /> Change Folder
              </Button>
              <Button variant="outline" onClick={handleDisconnect} className="text-destructive hover:text-destructive">
                <Unplug className="w-4 h-4 mr-2" /> Disconnect
              </Button>
            </>
          )}
        </div>
        {connected && (
          <p className="text-xs text-muted-foreground">
            Files are organized as: <code className="bg-muted px-1 rounded">{folderName}/ListName/ItemTitle.md</code>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Backup is <strong>one-way</strong>: changes in the app are written to the folder. Editing files in the folder will not affect the app.
        </p>
      </div>

      {/* Manual Backup Actions */}
      {connected && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Manual Backup</h4>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Button variant="default" onClick={() => handleBackup(false)} disabled={backing}>
                {backing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <HardDrive className="w-4 h-4 mr-2" />}
                {backing ? 'Backing up...' : 'Backup Now'}
              </Button>
              <Button variant="outline" onClick={() => handleBackup(true)} disabled={backing}>
                <RefreshCw className="w-4 h-4 mr-2" /> Full Backup
              </Button>
            </div>
            {progress && progress.phase !== 'done' && (
              <div className="space-y-2">
                <Progress value={progress.total > 0 ? (progress.current / progress.total) * 100 : 0} className="h-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> {progress.message}
                  </div>
                  {progress.total > 0 && <span>{Math.round((progress.current / progress.total) * 100)}%</span>}
                </div>
              </div>
            )}
            {progress?.phase === 'done' && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" /> {progress.message}
              </p>
            )}
            {lastBackup && !backing && !progress && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Last backup: {new Date(lastBackup).toLocaleString()}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              <strong>Backup Now</strong> writes only new and changed files (delta sync). <strong>Full Backup</strong> re-writes everything.
            </p>
          </div>
        </div>
      )}

      {/* Auto-backup info */}
      {connected && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Auto-Backup</h4>
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Automatic background backup</p>
                <p className="text-xs text-muted-foreground">
                  Items are automatically backed up to your local folder when you make changes. Backups trigger after 10 seconds of inactivity, when you switch items, when the tab loses focus, or after 60 seconds of idle time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Activity Log</h4>
          <div className="flex items-center gap-2">
            {activityLog.length > 0 && (
              <button
                onClick={() => { clearLog(); setActivityLog([]); }}
                className="text-[10px] text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            {activityLog.length > 5 && (
              <button
                onClick={() => setLogExpanded(!logExpanded)}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5 uppercase tracking-wider"
              >
                {logExpanded ? <><ChevronUp className="w-3 h-3" /> Less</> : <><ChevronDown className="w-3 h-3" /> More</>}
              </button>
            )}
          </div>
        </div>

        {activityLog.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-card/50 p-6 text-center">
            <ScrollText className="w-5 h-5 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No backup activity yet.</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Activity will appear here after your first backup.</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="divide-y divide-border">
              {(logExpanded ? activityLog : activityLog.slice(0, 5)).map((entry) => (
                <BackupLogRow key={entry.id} entry={entry} />
              ))}
            </div>
            {!logExpanded && activityLog.length > 5 && (
              <div className="px-3 py-2 bg-muted/30 text-center">
                <button
                  onClick={() => setLogExpanded(true)}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Show {activityLog.length - 5} more entries
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTION: Developer
 * ───────────────────────────────────────────── */

function TestDataGenerator() {
  const { refreshData, userId } = useMomentum();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [taskCount, setTaskCount] = useState(20);
  const [noteCount, setNoteCount] = useState(15);
  const [clearExisting, setClearExisting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearConfirmText, setClearConfirmText] = useState('');

  const handleGenerate = async () => {
    const { generateTestData } = await import('@/lib/testDataGenerator');
    setIsGenerating(true);
    setElapsedSeconds(0); setProgress(0); setProgressMessage('Starting...');
    timerRef.current = setInterval(() => setElapsedSeconds(prev => prev + 1), 1000);
    try {
      const result = await generateTestData({
        taskCount,
        noteCount,
        clearExisting,
        userId,
        onProgress: (pct, msg) => { setProgress(pct); setProgressMessage(msg); },
      });
      if (timerRef.current) clearInterval(timerRef.current);
      toast.success('Test data generated', {
        description: `Created ${result.tasks} tasks, ${result.notes} notes, ${result.lists} lists, ${result.tags} tags, ${result.itemTags} tag associations`,
      });
      refreshData();
    } catch (err: any) {
      if (timerRef.current) clearInterval(timerRef.current);
      toast.error('Failed to generate test data', { description: err.message });
    } finally { setIsGenerating(false); setProgress(0); setProgressMessage(''); }
  };

  const handleClear = async () => {
    const { clearAllData } = await import('@/lib/testDataGenerator');
    setIsClearing(true);
    setShowClearConfirm(false);
    setClearConfirmText('');
    try {
      const result = await clearAllData(userId);
      toast.success('All data cleared', { description: `Deleted ${result.items} items, ${result.lists} lists, ${result.tags} tags` });
      refreshData();
    } catch (err: any) {
      toast.error('Failed to clear data', { description: err.message });
    } finally { setIsClearing(false); }
  };

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Generate realistic test data including tasks with code snippets, notes with rich markdown, lists, tags, and tag associations.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="taskCount" className="text-sm">Tasks</Label>
          <Input
            id="taskCount"
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(Math.max(0, Math.min(1000, Number(e.target.value))))}
            min={0}
            max={1000}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="noteCount" className="text-sm">Notes</Label>
          <Input
            id="noteCount"
            type="number"
            value={noteCount}
            onChange={(e) => setNoteCount(Math.max(0, Math.min(1000, Number(e.target.value))))}
            min={0}
            max={1000}
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="clearExisting" checked={clearExisting} onCheckedChange={setClearExisting} />
        <Label htmlFor="clearExisting" className="text-sm cursor-pointer">Clear existing data before generating</Label>
      </div>
      {isGenerating && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{progressMessage}</div>
            <span>{elapsedSeconds}s</span>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <Button onClick={handleGenerate} disabled={isGenerating || isClearing}>
          {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Beaker className="w-4 h-4 mr-2" />}
          Generate Test Data
        </Button>
        <AlertDialog open={showClearConfirm} onOpenChange={(open) => { setShowClearConfirm(open); if (!open) setClearConfirmText(''); }}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isGenerating || isClearing}>
              {isClearing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Clear All Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Delete all data permanently?
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <span className="block">This will permanently delete <strong>all items, lists, and tags</strong> from your account. This action cannot be undone.</span>
                <span className="block text-sm">Type <strong className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">DELETE</strong> below to confirm:</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={clearConfirmText}
              onChange={(e) => setClearConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="font-mono"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter' && clearConfirmText === 'DELETE') handleClear(); }}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClear}
                disabled={clearConfirmText !== 'DELETE'}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTION: AI Assistant
 * ───────────────────────────────────────────── */

const AI_ACTIONS_INFO = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar', icon: '✏️', description: 'Corrects typos and grammatical errors while preserving meaning.' },
  { id: 'rephrase', label: 'Rephrase', icon: '🔄', description: 'Rewrites text for better clarity and flow.' },
  { id: 'shorten', label: 'Shorten', icon: '📐', description: 'Condenses text while keeping key information.' },
  { id: 'elaborate', label: 'Elaborate', icon: '📝', description: 'Expands text with more detail and examples.' },
  { id: 'summarize', label: 'Summarize', icon: '📋', description: 'Creates a concise summary of the document.' },
  { id: 'custom', label: 'Custom prompt', icon: '💬', description: 'Modify text using your own instructions.' },
];

export function SettingsAI() {
  const [status, setStatus] = useState<{ available: boolean; provider: string; model: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    fetch('/api/ai/status')
      .then(r => r.json())
      .then(data => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => {
        setStatus({ available: false, provider: 'Unknown', model: 'Unknown' });
        setLoading(false);
      });
  }, []);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/ai/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ actionId: 'fix-grammar', text: 'Helo wrold' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          setTestResult('success');
          toast.success('AI is working correctly!');
        } else {
          setTestResult('error');
          toast.error('AI returned empty response');
        }
      } else {
        setTestResult('error');
        toast.error('AI test failed');
      }
    } catch {
      setTestResult('error');
      toast.error('Could not connect to AI service');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Checking AI status…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Built-in AI</h4>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              status?.available ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
            }`}>
              {status?.available ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {status?.available ? 'AI Assistant is active' : 'AI Assistant is unavailable'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {status?.available
                  ? 'No API key needed — AI is powered by the built-in language model.'
                  : 'The built-in AI service is not configured for this deployment.'
                }
              </p>
              {status?.available && (
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {status.provider}
                  </span>
                  <span className="flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    {status.model}
                  </span>
                </div>
              )}
            </div>
            {status?.available && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleTest}
                disabled={testing}
                className="shrink-0"
              >
                {testing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : testResult === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : testResult === 'error' ? (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                <span className="ml-1.5">{testing ? 'Testing…' : 'Test'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* How to use */}
      {status?.available && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">How to Use</h4>
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Select text in the editor and click the <Sparkles className="w-3.5 h-3.5 inline text-primary" /> sparkles icon
              to access AI actions. You can also use AI on the entire document.
            </p>
          </div>
        </div>
      )}

      {/* Available Actions */}
      {status?.available && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Available Actions</h4>
          <div className="rounded-lg border bg-card divide-y divide-border/40">
            {AI_ACTIONS_INFO.map((action) => (
              <div key={action.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-base shrink-0">{action.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrphanTagPruner() {
  const { state, deleteTag, getTagCounts } = useMomentum();
  const [isPruning, setIsPruning] = useState(false);
  const [orphanTags, setOrphanTags] = useState<{ id: string; name: string }[]>([]);
  const [scanned, setScanned] = useState(false);

  const scanForOrphans = useCallback(() => {
    const tagCounts = getTagCounts();
    const orphans = state.tags
      .filter((tag) => !tagCounts.has(tag.id) || tagCounts.get(tag.id) === 0)
      .map((tag) => ({ id: tag.id, name: tag.name }));
    setOrphanTags(orphans);
    setScanned(true);
  }, [state.tags, getTagCounts]);

  const handlePrune = async () => {
    if (orphanTags.length === 0) return;
    setIsPruning(true);
    let deleted = 0;
    for (const tag of orphanTags) {
      try {
        deleteTag(tag.id);
        deleted++;
      } catch (err) {
        console.error(`Failed to delete orphan tag "${tag.name}":`, err);
      }
    }
    setIsPruning(false);
    setOrphanTags([]);
    setScanned(false);
    toast.success(`Pruned ${deleted} orphan tag${deleted !== 1 ? 's' : ''}`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Prune Orphan Tags</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Find and remove tags that have no associated items.
          </p>
        </div>
        {!scanned ? (
          <Button variant="outline" size="sm" onClick={scanForOrphans}>
            Scan
          </Button>
        ) : orphanTags.length === 0 ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            No orphan tags found
          </div>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={handlePrune}
            disabled={isPruning}
          >
            {isPruning ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            )}
            Prune {orphanTags.length} tag{orphanTags.length !== 1 ? 's' : ''}
          </Button>
        )}
      </div>
      {scanned && orphanTags.length > 0 && (
        <div className="rounded-md border border-border/50 bg-muted/30 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Orphan tags to be removed:</p>
          <div className="flex flex-wrap gap-1.5">
            {orphanTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SettingsDeveloper() {
  return (
    <div className="space-y-6">
      {/* Data Maintenance */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Data Maintenance</h4>
        <OrphanTagPruner />
      </div>

      {/* Test Data */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Test Data</h4>
        <TestDataGenerator />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Legacy: SettingsContent (renders all sections)
 * ───────────────────────────────────────────── */

export function SettingsContent() {
  return (
    <div className="space-y-8">
      <SettingsGeneral />
      <SettingsEditor />
      <SettingsAI />
      <SettingsData />
      <SettingsBackup />
      <SettingsDeveloper />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Full-page Settings route
 * ───────────────────────────────────────────── */

export default function Settings() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 border-b border-border/50 flex items-center px-4 gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setLocation('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">Settings</span>
        </div>
      </header>
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <SettingsContent />
      </main>
    </div>
  );
}
