/**
 * AI Configuration Storage
 * 
 * Stores AI provider config in IndexedDB for offline access and fast reads.
 * Syncs to Supabase user_settings for cross-device persistence.
 * 
 * Reactivity: Dispatches a custom 'ai-config-changed' event on window
 * whenever the config is saved, so consumers (like ParagonEditorAdapter)
 * can react immediately without a page reload.
 */

import { useState, useEffect, useCallback } from 'react';
import type { AIProviderConfig, AIProviderType } from './types';
import { apiQuery } from '../db';

// ─── Constants ───────────────────────────────────────────────────────────────

const DB_NAME = 'momentum-ai-config';
const DB_VERSION = 1;
const STORE_NAME = 'config';
const CONFIG_KEY = 'ai-provider-config';
const CONFIG_CHANGED_EVENT = 'ai-config-changed';

// ─── IndexedDB Helpers ───────────────────────────────────────────────────────

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ─── Local (IndexedDB) Operations ────────────────────────────────────────────

async function getLocalConfig(): Promise<AIProviderConfig | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(CONFIG_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

async function setLocalConfig(config: AIProviderConfig): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(config, CONFIG_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function deleteLocalConfig(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(CONFIG_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ─── Server Sync ────────────────────────────────────────────────────────────

async function syncToSupabase(config: AIProviderConfig): Promise<void> {
  try {
    const { data: existing } = await apiQuery({
      table: 'user_settings',
      select: 'user_id',
      filters: {},
      limit: 1,
      single: true,
    });

    const updates = {
      ai_provider: config.provider,
      ai_api_key: config.apiKey,
      ai_model: config.model || null,
      ai_temperature: config.temperature ?? 0.7,
      ai_base_url: config.baseUrl || null,
      updated_at: new Date().toISOString(),
    };

    if (existing?.user_id) {
      await apiQuery({ action: 'update', table: 'user_settings', data: updates, filters: { user_id: existing.user_id } });
    }
    // If no user_settings row exists, we don't create one just for AI config
    // (the row is created during initial app setup)
  } catch (err) {
    console.warn('Failed to sync AI config to server:', err);
  }
}

async function clearSupabaseConfig(): Promise<void> {
  try {
    const { data: existing } = await apiQuery({
      table: 'user_settings',
      select: 'user_id',
      filters: {},
      limit: 1,
      single: true,
    });

    if (existing?.user_id) {
      await apiQuery({
        action: 'update',
        table: 'user_settings',
        data: {
          ai_provider: null,
          ai_api_key: null,
          ai_model: null,
          ai_temperature: 0.7,
          ai_base_url: null,
          updated_at: new Date().toISOString(),
        },
        filters: { user_id: existing.user_id },
      });
    }
  } catch (err) {
    console.warn('Failed to clear AI config from server:', err);
  }
}

async function loadFromSupabase(): Promise<AIProviderConfig | null> {
  try {
    const { data } = await apiQuery({
      table: 'user_settings',
      select: 'ai_provider, ai_api_key, ai_model, ai_temperature, ai_base_url',
      filters: {},
      limit: 1,
      single: true,
    });

    if (!data?.ai_provider || !data?.ai_api_key) {
      return null;
    }

    return {
      provider: data.ai_provider as AIProviderType,
      apiKey: data.ai_api_key,
      model: data.ai_model || undefined,
      temperature: data.ai_temperature ?? 0.7,
      baseUrl: data.ai_base_url || undefined,
    };
  } catch {
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Get the AI config. Reads from IndexedDB first (fast), then checks Supabase
 * for cross-device sync if local is empty.
 */
export async function getAIConfig(): Promise<AIProviderConfig | null> {
  // Try local first (instant)
  const local = await getLocalConfig();
  if (local && local.apiKey) {
    return local;
  }

  // Fall back to Supabase (cross-device sync)
  const remote = await loadFromSupabase();
  if (remote) {
    // Cache locally for next time
    await setLocalConfig(remote);
    return remote;
  }

  return null;
}

/**
 * Save AI config to both IndexedDB and Supabase.
 * Dispatches a 'ai-config-changed' event for live reactivity.
 */
export async function saveAIConfig(config: AIProviderConfig): Promise<void> {
  // Save locally (instant)
  await setLocalConfig(config);

  // Notify all listeners (ParagonEditorAdapter, etc.)
  window.dispatchEvent(new CustomEvent(CONFIG_CHANGED_EVENT, { detail: config }));

  // Sync to Supabase (async, non-blocking)
  syncToSupabase(config).catch(() => {});
}

/**
 * Clear AI config from both IndexedDB and Supabase.
 * Dispatches a 'ai-config-changed' event with null.
 */
export async function clearAIConfig(): Promise<void> {
  await deleteLocalConfig();
  window.dispatchEvent(new CustomEvent(CONFIG_CHANGED_EVENT, { detail: null }));
  clearSupabaseConfig().catch(() => {});
}

// ─── Default Config ──────────────────────────────────────────────────────────

export function getDefaultConfig(provider: AIProviderType = 'gemini'): AIProviderConfig {
  return {
    provider,
    apiKey: '',
    model: provider === 'gemini' ? 'gemini-2.5-flash' : provider === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-haiku-latest',
    temperature: 0.7,
  };
}

// ─── React Hook ──────────────────────────────────────────────────────────────

/**
 * React hook that provides live AI config state.
 * Automatically updates when config changes (no reload needed).
 */
export function useAIConfig() {
  const [config, setConfig] = useState<AIProviderConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    getAIConfig().then((c) => {
      setConfig(c);
      setLoading(false);
    });

    // Listen for changes from Settings or other tabs
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConfig(detail || null);
    };
    window.addEventListener(CONFIG_CHANGED_EVENT, handler);
    return () => window.removeEventListener(CONFIG_CHANGED_EVENT, handler);
  }, []);

  const save = useCallback(async (newConfig: AIProviderConfig) => {
    setConfig(newConfig);
    await saveAIConfig(newConfig);
  }, []);

  const clear = useCallback(async () => {
    setConfig(null);
    await clearAIConfig();
  }, []);

  return { config, loading, save, clear };
}
