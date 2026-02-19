/**
 * Dropbox API client for one-way backup.
 * Uses OAuth 2.0 PKCE flow (no backend needed).
 * Supports: upload, delete, list folder, create folder.
 * 
 * Credentials are stored in localStorage for fast access and
 * synced to Supabase user_settings for cross-device persistence.
 */

import { supabase } from './supabaseClient';

const AUTH_URL = 'https://www.dropbox.com/oauth2/authorize';
const TOKEN_URL = 'https://api.dropboxapi.com/oauth2/token';
const API_URL = 'https://api.dropboxapi.com/2';
const CONTENT_URL = 'https://content.dropboxapi.com/2';

const STORAGE_KEYS = {
  appKey: 'momentum_dropbox_app_key',
  accessToken: 'momentum_dropbox_access_token',
  refreshToken: 'momentum_dropbox_refresh_token',
  tokenExpiry: 'momentum_dropbox_token_expiry',
  codeVerifier: 'momentum_dropbox_code_verifier',
  backupState: 'momentum_dropbox_backup_state',
  backupFolder: 'momentum_dropbox_backup_folder',
};

// ── Connection change listeners ──
type ConnectionChangeListener = (connected: boolean) => void;
const connectionListeners = new Set<ConnectionChangeListener>();

export function onConnectionChange(listener: ConnectionChangeListener): () => void {
  connectionListeners.add(listener);
  return () => { connectionListeners.delete(listener); };
}

function notifyConnectionChange(connected: boolean) {
  Array.from(connectionListeners).forEach(listener => {
    try { listener(connected); } catch { /* ignore */ }
  });
}

// --- PKCE Helpers ---

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => chars[v % chars.length]).join('');
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest('SHA-256', encoder.encode(plain));
}

function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// --- Storage ---

export function getAppKey(): string {
  return localStorage.getItem(STORAGE_KEYS.appKey) || '';
}

export function setAppKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.appKey, key.trim());
}

/**
 * Generate a user-specific default backup folder name.
 * Uses the user's display name, GitHub username, or email prefix.
 */
export function generateDefaultBackupFolder(user?: { email?: string; user_metadata?: { full_name?: string; user_name?: string } } | null): string {
  if (!user) return '/MomentumBackup';
  const name = user.user_metadata?.user_name
    || user.user_metadata?.full_name
    || user.email?.split('@')[0]
    || '';
  if (!name) return '/MomentumBackup';
  // Sanitize: replace spaces/special chars with underscores, keep it clean
  const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
  return `/MomentumBackup_${sanitized}`;
}

export function getBackupFolder(): string {
  return localStorage.getItem(STORAGE_KEYS.backupFolder) || '/MomentumBackup';
}

export function setBackupFolder(folder: string): void {
  const normalized = folder.startsWith('/') ? folder : '/' + folder;
  localStorage.setItem(STORAGE_KEYS.backupFolder, normalized);
}

export function isConnected(): boolean {
  return !!(localStorage.getItem(STORAGE_KEYS.accessToken) && localStorage.getItem(STORAGE_KEYS.refreshToken));
}

export function disconnect(): void {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.tokenExpiry);
  localStorage.removeItem(STORAGE_KEYS.codeVerifier);
  notifyConnectionChange(false);
}

// --- Supabase Sync ---

/**
 * Save Dropbox credentials to Supabase user_settings for cross-device persistence.
 * Called after successful OAuth callback and after token refresh.
 */
export async function syncCredentialsToSupabase(): Promise<void> {
  try {
    const appKey = getAppKey();
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
    const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    const tokenExpiry = localStorage.getItem(STORAGE_KEYS.tokenExpiry);
    const backupFolder = getBackupFolder();

    if (!appKey || !refreshToken) return;

    const updates: Record<string, any> = {
      dropbox_app_key: appKey,
      dropbox_refresh_token: refreshToken,
      dropbox_access_token: accessToken || null,
      dropbox_token_expiry: tokenExpiry ? Number(tokenExpiry) : null,
      dropbox_backup_folder: backupFolder,
    };

    // Try update first, then insert if no row exists
    const { data: existing } = await supabase
      .from('user_settings')
      .select('user_id')
      .limit(1)
      .single();

    if (existing?.user_id) {
      await supabase.from('user_settings').update(updates).eq('user_id', existing.user_id);
    } else {
      await supabase.from('user_settings').insert(updates);
    }
  } catch (err) {
    console.warn('Failed to sync Dropbox credentials to Supabase:', err);
  }
}

/**
 * Clear Dropbox credentials from Supabase (on disconnect).
 */
export async function clearCredentialsFromSupabase(): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('user_settings')
      .select('user_id')
      .limit(1)
      .single();

    if (existing?.user_id) {
      await supabase.from('user_settings').update({
        dropbox_app_key: null,
        dropbox_refresh_token: null,
        dropbox_access_token: null,
        dropbox_token_expiry: null,
        dropbox_backup_folder: null,
      }).eq('user_id', existing.user_id);
    }
  } catch (err) {
    console.warn('Failed to clear Dropbox credentials from Supabase:', err);
  }
}

/**
 * Load Dropbox credentials from Supabase into localStorage.
 * Called on app startup to restore credentials on new devices.
 * Returns true if credentials were loaded and Dropbox is now connected.
 */
export async function loadCredentialsFromSupabase(): Promise<boolean> {
  try {
    // If already connected locally, no need to load from Supabase
    if (isConnected()) return true;

    const { data } = await supabase
      .from('user_settings')
      .select('dropbox_app_key, dropbox_refresh_token, dropbox_access_token, dropbox_token_expiry, dropbox_backup_folder')
      .limit(1)
      .single();

    if (!data?.dropbox_app_key || !data?.dropbox_refresh_token) {
      return false;
    }

    // Restore credentials to localStorage
    localStorage.setItem(STORAGE_KEYS.appKey, data.dropbox_app_key);
    localStorage.setItem(STORAGE_KEYS.refreshToken, data.dropbox_refresh_token);
    if (data.dropbox_access_token) {
      localStorage.setItem(STORAGE_KEYS.accessToken, data.dropbox_access_token);
    }
    if (data.dropbox_token_expiry) {
      localStorage.setItem(STORAGE_KEYS.tokenExpiry, String(data.dropbox_token_expiry));
    }
    if (data.dropbox_backup_folder) {
      localStorage.setItem(STORAGE_KEYS.backupFolder, data.dropbox_backup_folder);
    }

    // Verify the refresh token still works by refreshing the access token
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Sync the refreshed token back to Supabase
      await syncCredentialsToSupabase();
      notifyConnectionChange(true);
      return true;
    } else {
      // Token is invalid, clear everything
      disconnect();
      await clearCredentialsFromSupabase();
      return false;
    }
  } catch (err) {
    console.warn('Failed to load Dropbox credentials from Supabase:', err);
    return false;
  }
}

// --- Backup State (delta tracking) ---

export interface BackupFileState {
  path: string;
  updatedAt: string; // ISO string of item's updated_at
  contentHash: string; // simple hash of the generated markdown
}

export interface BackupState {
  lastBackupAt: string;
  files: Record<string, BackupFileState>; // keyed by item ID
}

export function getBackupState(): BackupState | null {
  const raw = localStorage.getItem(STORAGE_KEYS.backupState);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setBackupState(state: BackupState): void {
  localStorage.setItem(STORAGE_KEYS.backupState, JSON.stringify(state));
}

export function clearBackupState(): void {
  localStorage.removeItem(STORAGE_KEYS.backupState);
}

// Simple content hash for delta comparison (not Dropbox's content_hash, just for local diff)
export async function contentHash(text: string): Promise<string> {
  const buffer = await sha256(text);
  return base64urlEncode(buffer);
}

// --- OAuth PKCE Flow ---

export async function startAuth(): Promise<void> {
  const appKey = getAppKey();
  if (!appKey) throw new Error('Dropbox App Key is not configured');

  const codeVerifier = generateRandomString(64);
  localStorage.setItem(STORAGE_KEYS.codeVerifier, codeVerifier);

  const challengeBuffer = await sha256(codeVerifier);
  const codeChallenge = base64urlEncode(challengeBuffer);

  const redirectUri = window.location.origin;

  const params = new URLSearchParams({
    client_id: appKey,
    redirect_uri: redirectUri,
    response_type: 'code',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    token_access_type: 'offline',
  });

  window.location.href = `${AUTH_URL}?${params.toString()}`;
}

export async function handleAuthCallback(code: string): Promise<boolean> {
  const appKey = getAppKey();
  const codeVerifier = localStorage.getItem(STORAGE_KEYS.codeVerifier);
  if (!appKey || !codeVerifier) return false;

  const redirectUri = window.location.origin;

  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
    client_id: appKey,
    redirect_uri: redirectUri,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) return false;

  const data = await res.json();
  localStorage.setItem(STORAGE_KEYS.accessToken, data.access_token);
  if (data.refresh_token) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, data.refresh_token);
  }
  const expiry = Date.now() + (data.expires_in || 14400) * 1000;
  localStorage.setItem(STORAGE_KEYS.tokenExpiry, String(expiry));
  localStorage.removeItem(STORAGE_KEYS.codeVerifier);

  // Sync credentials to Supabase for cross-device persistence
  await syncCredentialsToSupabase();
  notifyConnectionChange(true);

  return true;
}

async function refreshAccessToken(): Promise<string | null> {
  const appKey = getAppKey();
  const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
  if (!appKey || !refreshToken) return null;

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: appKey,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) return null;

  const data = await res.json();
  localStorage.setItem(STORAGE_KEYS.accessToken, data.access_token);
  const expiry = Date.now() + (data.expires_in || 14400) * 1000;
  localStorage.setItem(STORAGE_KEYS.tokenExpiry, String(expiry));

  // Sync refreshed token to Supabase
  syncCredentialsToSupabase().catch(() => { /* best-effort */ });

  return data.access_token;
}

export async function getValidToken(): Promise<string> {
  const expiry = Number(localStorage.getItem(STORAGE_KEYS.tokenExpiry) || '0');
  let token = localStorage.getItem(STORAGE_KEYS.accessToken);

  // Refresh if token expires within 5 minutes
  if (!token || Date.now() > expiry - 300_000) {
    token = await refreshAccessToken();
    if (!token) throw new Error('Dropbox session expired. Please reconnect.');
  }
  return token;
}

// --- Dropbox API Calls ---

/**
 * Encode a JSON object for the Dropbox-API-Arg header.
 * Non-ASCII characters are escaped as \uXXXX to comply with HTTP header ISO-8859-1 requirement.
 */
export function dropboxApiArgEncode(obj: Record<string, unknown>): string {
  const json = JSON.stringify(obj);
  return json.replace(/[\u0080-\uffff]/g, (ch) => {
    return '\\u' + ('0000' + ch.charCodeAt(0).toString(16)).slice(-4);
  });
}

export async function uploadFile(path: string, content: string): Promise<void> {
  const token = await getValidToken();
  const res = await fetch(`${CONTENT_URL}/files/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': dropboxApiArgEncode({
        path,
        mode: 'overwrite',
        autorename: false,
        mute: true,
      }),
    },
    body: new TextEncoder().encode(content),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }
}

export async function deleteFile(path: string): Promise<void> {
  const token = await getValidToken();
  const res = await fetch(`${API_URL}/files/delete_v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  });

  if (!res.ok) {
    const text = await res.text();
    // Ignore "not found" errors (file already deleted)
    if (text.includes('path_lookup/not_found')) return;
    throw new Error(`Delete failed: ${text}`);
  }
}

export async function createFolder(path: string): Promise<void> {
  const token = await getValidToken();
  const res = await fetch(`${API_URL}/files/create_folder_v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, autorename: false }),
  });

  if (!res.ok) {
    const text = await res.text();
    // Ignore "conflict" (folder already exists)
    if (text.includes('path/conflict')) return;
    throw new Error(`Create folder failed: ${text}`);
  }
}

/**
 * Move/rename a folder in Dropbox using the move_v2 API.
 * Returns true if the move succeeded, false if the source doesn't exist.
 */
export async function moveFolder(fromPath: string, toPath: string): Promise<boolean> {
  const token = await getValidToken();
  const res = await fetch(`${API_URL}/files/move_v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from_path: fromPath,
      to_path: toPath,
      autorename: false,
      allow_ownership_transfer: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    // If source doesn't exist, return false (nothing to move)
    if (text.includes('not_found')) return false;
    // If destination already exists, that's also acceptable
    if (text.includes('path/conflict')) return false;
    throw new Error(`Move folder failed: ${text}`);
  }
  return true;
}

export async function listFolder(path: string): Promise<{ name: string; path: string; isFolder: boolean }[]> {
  const token = await getValidToken();
  const entries: { name: string; path: string; isFolder: boolean }[] = [];

  let cursor: string | null = null;
  let hasMore = true;

  // Initial request
  const firstRes = await fetch(`${API_URL}/files/list_folder`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, recursive: true, include_deleted: false }),
  });

  if (!firstRes.ok) {
    const text = await firstRes.text();
    if (text.includes('path/not_found')) return [];
    throw new Error(`List folder failed: ${text}`);
  }

  let data = await firstRes.json();
  for (const entry of data.entries) {
    entries.push({
      name: entry.name,
      path: entry.path_display || entry.path_lower,
      isFolder: entry['.tag'] === 'folder',
    });
  }
  hasMore = data.has_more;
  cursor = data.cursor;

  // Continue if paginated
  while (hasMore && cursor) {
    const contRes = await fetch(`${API_URL}/files/list_folder/continue`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cursor }),
    });
    if (!contRes.ok) break;
    data = await contRes.json();
    for (const entry of data.entries) {
      entries.push({
        name: entry.name,
        path: entry.path_display || entry.path_lower,
        isFolder: entry['.tag'] === 'folder',
      });
    }
    hasMore = data.has_more;
    cursor = data.cursor;
  }

  return entries;
}

// Delete a folder and all its contents
export async function deleteFolder(path: string): Promise<void> {
  // Dropbox delete_v2 on a folder deletes recursively
  await deleteFile(path);
}

// --- Frontmatter Generation ---

export function generateFrontmatter(item: {
  type: string;
  section?: string;
  is_completed?: boolean;
  is_pinned?: boolean;
  due_date?: string | null;
  list_name?: string | null;
  tag_names?: string[];
  created_at?: string;
  updated_at?: string;
}): string {
  const lines: string[] = ['---'];
  lines.push(`type: ${item.type}`);
  if (item.section) lines.push(`section: ${item.section}`);
  if (item.is_completed) lines.push(`completed: true`);
  if (item.is_pinned) lines.push(`pinned: true`);
  if (item.due_date) lines.push(`due: ${item.due_date}`);
  if (item.list_name) lines.push(`list: ${item.list_name}`);
  if (item.tag_names && item.tag_names.length > 0) {
    lines.push(`tags: [${item.tag_names.map(t => t.startsWith('#') ? t : `#${t}`).join(', ')}]`);
  }
  if (item.created_at) lines.push(`created: ${item.created_at}`);
  if (item.updated_at) lines.push(`updated: ${item.updated_at}`);
  lines.push('---');
  return lines.join('\n');
}

// Sanitize a filename (remove invalid chars)
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200) || 'Untitled';
}
