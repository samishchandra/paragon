/**
 * useDropboxBackup — Stub hook for backward compatibility.
 *
 * In momentum-foundation, cloud backup is disabled by default.
 * Embedding repos can override this with their own backup hook.
 */
export function useDropboxBackup(_userId: string): void {
  // No-op in foundation
}
