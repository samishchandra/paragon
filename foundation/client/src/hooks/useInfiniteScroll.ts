/**
 * useInfiniteScroll - Hook for infinite scroll pagination
 * 
 * Detects when user scrolls near the bottom of a container and triggers
 * loading of more items.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  /** Distance from bottom (in pixels) to trigger loading */
  threshold?: number;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Whether currently loading */
  isLoading: boolean;
  /** Callback to load more items */
  onLoadMore: () => void;
  /** Optional root element (defaults to window) */
  root?: HTMLElement | null;
}

interface UseInfiniteScrollReturn {
  /** Ref to attach to the scrollable container */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Ref to attach to the sentinel element at the bottom */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Whether currently loading more items */
  isLoadingMore: boolean;
}

export function useInfiniteScroll({
  threshold = 200,
  hasMore,
  isLoading,
  onLoadMore,
  root = null,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Use Intersection Observer for efficient scroll detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          setIsLoadingMore(true);
          onLoadMore();
        }
      },
      {
        root: root || containerRef.current,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, isLoadingMore, onLoadMore, root, threshold]);

  // Reset loading state when loading completes
  useEffect(() => {
    if (!isLoading && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore]);

  return {
    containerRef,
    sentinelRef,
    isLoadingMore,
  };
}

/**
 * Hook for scroll-based infinite loading (alternative to Intersection Observer)
 * Useful when you need more control over scroll position
 */
export function useScrollInfiniteLoad({
  threshold = 200,
  hasMore,
  isLoading,
  onLoadMore,
}: Omit<UseInfiniteScrollOptions, 'root'>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !hasMore || isLoading || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < threshold) {
      setIsLoadingMore(true);
      onLoadMore();
    }
  }, [hasMore, isLoading, isLoadingMore, onLoadMore, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Reset loading state when loading completes
  useEffect(() => {
    if (!isLoading && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore]);

  return {
    containerRef,
    isLoadingMore,
  };
}
