import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely format any error value into a readable string.
 * Handles Error instances, { message } objects (from Supabase/apiQuery),
 * plain strings, and arbitrary objects that would otherwise log as [object Object].
 */
export function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    if ('message' in err && typeof (err as any).message === 'string') {
      return (err as any).message;
    }
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
  return String(err);
}
