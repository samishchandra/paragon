import { useState, useEffect, useRef, useCallback } from 'react';
import { Editor } from '@tiptap/react';

/**
 * useWordCount Hook
 * 
 * Provides debounced word and character count calculation for performance.
 * Only recalculates after a delay to avoid blocking the main thread during typing.
 */

export interface WordCountResult {
  words: number;
  characters: number;
  charactersWithSpaces: number;
  paragraphs: number;
  sentences: number;
  readingTime: number; // in minutes
  isCalculating: boolean;
}

export interface UseWordCountOptions {
  /** Debounce delay in milliseconds (default: 500) */
  debounceMs?: number;
  /** Whether to calculate extended stats like sentences (default: false for performance) */
  extendedStats?: boolean;
  /** Whether the hook is enabled (default: true) */
  enabled?: boolean;
}

const DEFAULT_READING_SPEED = 200; // words per minute

export function useWordCount(
  editor: Editor | null,
  options: UseWordCountOptions = {}
): WordCountResult {
  const {
    debounceMs = 500,
    extendedStats = false,
    enabled = true,
  } = options;

  const [result, setResult] = useState<WordCountResult>({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: false,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTextRef = useRef<string>('');

  // Calculate word count
  const calculateWordCount = useCallback((text: string): WordCountResult => {
    // Basic counts (fast)
    const trimmedText = text.trim();
    const words = trimmedText.length > 0 
      ? trimmedText.split(/\s+/).filter(word => word.length > 0).length 
      : 0;
    const characters = trimmedText.replace(/\s/g, '').length;
    const charactersWithSpaces = text.length;

    // Extended stats (slower, optional)
    let paragraphs = 0;
    let sentences = 0;

    if (extendedStats) {
      // Count paragraphs (separated by double newlines or more)
      paragraphs = trimmedText.length > 0 
        ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length 
        : 0;
      
      // Count sentences (ends with . ! ?)
      sentences = trimmedText.length > 0 
        ? (trimmedText.match(/[.!?]+/g) || []).length 
        : 0;
    }

    // Calculate reading time
    const readingTime = Math.max(1, Math.ceil(words / DEFAULT_READING_SPEED));

    return {
      words,
      characters,
      charactersWithSpaces,
      paragraphs,
      sentences,
      readingTime,
      isCalculating: false,
    };
  }, [extendedStats]);

  // Debounced update
  useEffect(() => {
    if (!editor || !enabled) return;

    const handleUpdate = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Mark as calculating
      setResult(prev => ({ ...prev, isCalculating: true }));

      // Debounce the calculation
      timeoutRef.current = setTimeout(() => {
        try {
          const text = editor.getText();
          
          // Skip if text hasn't changed
          if (text === lastTextRef.current) {
            setResult(prev => ({ ...prev, isCalculating: false }));
            return;
          }
          
          lastTextRef.current = text;
          const newResult = calculateWordCount(text);
          setResult(newResult);
        } catch (error) {
          console.warn('useWordCount: Error calculating word count', error);
          setResult(prev => ({ ...prev, isCalculating: false }));
        }
      }, debounceMs);
    };

    // Initial calculation
    handleUpdate();

    // Listen for updates
    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [editor, debounceMs, enabled, calculateWordCount]);

  return result;
}

export default useWordCount;
