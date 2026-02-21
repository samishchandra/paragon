/**
 * Editor Panel Skeleton
 * Shown during initial data loading for the right editor panel
 * Matches the structure of EditorV2: title area, toolbar, content area, footer
 */

import { Skeleton } from '@/components/ui/skeleton';

export function EditorPanelSkeleton() {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header - Title area */}
      <div className="border-b border-border/50 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded shrink-0" />
          <Skeleton className="h-6 w-48 rounded" />
        </div>
        {/* Meta info row */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="border-b border-border/50 px-3 py-1.5 flex items-center gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-7 rounded" />
        ))}
        <Skeleton className="h-5 w-px mx-1" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`g2-${i}`} className="h-7 w-7 rounded" />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 space-y-4">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
        <div className="h-3" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <div className="h-3" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="h-8 border-t border-border/50 flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-8 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  );
}
