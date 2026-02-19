/**
 * Dropbox one-way backup logic.
 * Generates markdown files with frontmatter from Supabase items,
 * computes delta against previous backup, and uploads/deletes only changes.
 */

import { supabase } from './supabaseClient';
import {
  uploadFile,
  deleteFile,
  createFolder,
  deleteFolder,
  listFolder,
  getBackupFolder,
  getBackupState,
  setBackupState,
  contentHash,
  generateFrontmatter,
  sanitizeFilename,
  type BackupState,
  type BackupFileState,
} from './dropbox';


export interface BackupProgress {
  phase: 'fetching' | 'computing' | 'uploading' | 'deleting' | 'cleanup' | 'done';
  current: number;
  total: number;
  message: string;
}

export interface BackupResult {
  uploaded: number;
  deleted: number;
  unchanged: number;
  errors: string[];
}

type ProgressCallback = (progress: BackupProgress) => void;

// Fetch all items with their tags and list names
let _backupUserId = '';

export function setBackupUserId(userId: string) {
  _backupUserId = userId;
}

async function fetchAllItems() {
  // Fetch all non-deleted items
  const { data: items, error: itemsErr } = await supabase
    .from('items')
    .select('id, type, title, content, section, is_completed, is_pinned, due_date, list_id, created_at, updated_at, deleted_at')
    .eq('user_id', _backupUserId)
    .is('deleted_at', null)
    .order('sort_order', { ascending: true });

  if (itemsErr) throw new Error(`Failed to fetch items: ${itemsErr.message}`);

  // Fetch all lists
  const { data: lists } = await supabase.from('lists').select('id, name').eq('user_id', _backupUserId);
  const listMap = new Map<string, string>();
  (lists || []).forEach((l: any) => listMap.set(l.id, l.name));

  // Fetch all tags
  const { data: tags } = await supabase.from('tags').select('id, name').eq('user_id', _backupUserId);
  const tagMap = new Map<string, string>();
  (tags || []).forEach((t: any) => tagMap.set(t.id, t.name));

  // Fetch all item_tags
  const { data: itemTags } = await supabase.from('item_tags').select('item_id, tag_id');
  const itemTagMap = new Map<string, string[]>();
  (itemTags || []).forEach((it: any) => {
    const arr = itemTagMap.get(it.item_id) || [];
    const tagName = tagMap.get(it.tag_id);
    if (tagName) arr.push(tagName);
    itemTagMap.set(it.item_id, arr);
  });

  return (items || []).map((item: any) => ({
    ...item,
    list_name: item.list_id ? listMap.get(item.list_id) || null : null,
    tag_names: itemTagMap.get(item.id) || [],
  }));
}

// Generate the full markdown content for an item
function generateMarkdown(item: any): string {
  const frontmatter = generateFrontmatter({
    type: item.type,
    section: item.section,
    is_completed: item.is_completed,
    is_pinned: item.is_pinned,
    due_date: item.due_date,
    list_name: item.list_name,
    tag_names: item.tag_names,
    created_at: item.created_at,
    updated_at: item.updated_at,
  });

  const title = item.title || 'Untitled';
  const content = item.content || '';

  return `${frontmatter}\n\n# ${title}\n\n${content}\n`;
}

// Determine the Dropbox path for an item
function getItemPath(item: any, backupFolder: string): string {
  const folderName = item.list_name || 'Miscellaneous';
  const fileName = sanitizeFilename(item.title || 'Untitled') + '.md';
  return `${backupFolder}/${sanitizeFilename(folderName)}/${fileName}`;
}

// Handle duplicate filenames by appending item ID suffix
function deduplicatePaths(
  items: any[],
  backupFolder: string
): Map<string, string> {
  const pathCount = new Map<string, number>();
  const itemPaths = new Map<string, string>();

  // First pass: count paths
  for (const item of items) {
    const path = getItemPath(item, backupFolder);
    pathCount.set(path, (pathCount.get(path) || 0) + 1);
  }

  // Second pass: assign unique paths
  const pathUsed = new Map<string, number>();
  for (const item of items) {
    let path = getItemPath(item, backupFolder);
    const count = pathCount.get(path) || 1;
    if (count > 1) {
      const used = pathUsed.get(path) || 0;
      if (used > 0) {
        // Append short ID to disambiguate
        const shortId = item.id.slice(0, 8);
        path = path.replace('.md', `-${shortId}.md`);
      }
      pathUsed.set(getItemPath(item, backupFolder), used + 1);
    }
    itemPaths.set(item.id, path);
  }

  return itemPaths;
}

/**
 * Run a one-way backup to Dropbox with delta sync.
 */
export async function runBackup(onProgress?: ProgressCallback): Promise<BackupResult> {
  const backupFolder = getBackupFolder();
  const previousState = getBackupState();
  const result: BackupResult = { uploaded: 0, deleted: 0, unchanged: 0, errors: [] };

  // Phase 1: Fetch all items
  onProgress?.({ phase: 'fetching', current: 0, total: 0, message: 'Fetching items from database...' });
  const items = await fetchAllItems();

  // Phase 2: Compute delta
  onProgress?.({ phase: 'computing', current: 0, total: items.length, message: 'Computing changes...' });
  const itemPaths = deduplicatePaths(items, backupFolder);
  const newState: BackupState = {
    lastBackupAt: new Date().toISOString(),
    files: {},
  };

  const toUpload: { item: any; path: string; markdown: string; hash: string }[] = [];
  const toDelete: string[] = []; // paths to delete

  // Determine which items need uploading
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const path = itemPaths.get(item.id)!;
    const markdown = generateMarkdown(item);
    const hash = await contentHash(markdown);

    onProgress?.({ phase: 'computing', current: i + 1, total: items.length, message: `Analyzing ${i + 1} of ${items.length}...` });

    const prev = previousState?.files[item.id];
    if (prev && prev.contentHash === hash && prev.path === path) {
      // Unchanged
      result.unchanged++;
      newState.files[item.id] = prev;
    } else {
      // New or updated (content changed or path changed)
      toUpload.push({ item, path, markdown, hash });
      // If path changed, delete old path
      if (prev && prev.path !== path) {
        toDelete.push(prev.path);
      }
    }
  }

  // Determine which old items were deleted
  if (previousState) {
    const currentIds = new Set(items.map((i: any) => i.id));
    for (const [itemId, fileState] of Object.entries(previousState.files)) {
      if (!currentIds.has(itemId)) {
        toDelete.push(fileState.path);
      }
    }
  }

  const totalOps = toUpload.length + toDelete.length;
  if (totalOps === 0) {
    onProgress?.({ phase: 'done', current: 0, total: 0, message: 'Everything is up to date!' });
    // Still update the timestamp
    newState.files = previousState?.files || {};
    setBackupState(newState);
    return result;
  }

  // Phase 3: Ensure backup folder structure exists
  // Collect unique folder paths
  const folderPaths = new Set<string>();
  for (const { path } of toUpload) {
    const parts = path.split('/');
    parts.pop(); // remove filename
    folderPaths.add(parts.join('/'));
  }
  for (const fp of Array.from(folderPaths)) {
    try {
      await createFolder(fp);
    } catch {
      // Ignore - folder may already exist
    }
  }

  // Phase 4: Upload changed files
  let opsDone = 0;
  for (const { item, path, markdown, hash } of toUpload) {
    onProgress?.({
      phase: 'uploading',
      current: opsDone + 1,
      total: totalOps,
      message: `Uploading ${opsDone + 1} of ${totalOps}: ${item.title || 'Untitled'}`,
    });

    try {
      await uploadFile(path, markdown);
      newState.files[item.id] = { path, updatedAt: item.updated_at, contentHash: hash };
      result.uploaded++;
    } catch (err) {
      result.errors.push(`Upload failed for "${item.title}": ${err instanceof Error ? err.message : String(err)}`);
    }
    opsDone++;
  }

  // Phase 5: Delete removed files
  for (const path of toDelete) {
    onProgress?.({
      phase: 'deleting',
      current: opsDone + 1,
      total: totalOps,
      message: `Deleting ${result.deleted + 1} removed file(s)...`,
    });

    try {
      await deleteFile(path);
      result.deleted++;
    } catch (err) {
      result.errors.push(`Delete failed for "${path}": ${err instanceof Error ? err.message : String(err)}`);
    }
    opsDone++;
  }

  // Phase 6: Cleanup empty folders
  onProgress?.({ phase: 'cleanup', current: totalOps, total: totalOps, message: 'Cleaning up...' });

  // Save new state
  setBackupState(newState);

  onProgress?.({ phase: 'done', current: totalOps, total: totalOps, message: 'Backup complete!' });
  return result;
}

/**
 * Full backup - clears previous state and uploads everything.
 */
export async function runFullBackup(onProgress?: ProgressCallback): Promise<BackupResult> {
  clearBackupState();
  return runBackup(onProgress);
}

function clearBackupState() {
  localStorage.removeItem('momentum_dropbox_backup_state');
}
