/**
 * Middle Panel Skeleton
 * Shown during initial data loading to prevent layout shift
 * Matches the structure of MiddlePanel: header with search, section headers, item cards
 */

import { Skeleton } from '@/components/ui/skeleton';

function ItemCardSkeleton({ hasCheckbox = false }: { hasCheckbox?: boolean }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg">
      {hasCheckbox && <Skeleton className="h-4 w-4 rounded-sm shrink-0 mt-0.5" />}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
      <Skeleton className="h-3 w-10 rounded shrink-0 mt-1" />
    </div>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center py-1.5 pl-3 pr-3 gap-2">
      <Skeleton className="h-4 w-4 rounded shrink-0" />
      <Skeleton className="h-4 w-16 rounded" />
      <Skeleton className="h-3 w-4 rounded ml-auto" />
    </div>
  );
}

export function MiddlePanelSkeleton() {
  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-border/50">
      {/* Header Section */}
      <div className="p-3 border-b border-border/50 space-y-2">
        {/* Actions Bar */}
        <div className="hidden md:flex items-center h-8">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Skeleton className="h-7 w-7 rounded" />
            <Skeleton className="h-7 w-7 rounded" />
            <Skeleton className="h-7 w-7 rounded" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>

      {/* Item List Skeleton */}
      <div className="flex-1 overflow-hidden p-3 space-y-4">
        {/* Section 1 - e.g. "Now" or "Pinned" */}
        <div className="space-y-1">
          <SectionHeaderSkeleton />
          <ItemCardSkeleton hasCheckbox />
          <ItemCardSkeleton hasCheckbox />
          <ItemCardSkeleton hasCheckbox />
        </div>

        {/* Section 2 - e.g. "Do" */}
        <div className="space-y-1">
          <SectionHeaderSkeleton />
          <ItemCardSkeleton hasCheckbox />
          <ItemCardSkeleton hasCheckbox />
        </div>

        {/* Section 3 - e.g. "Later" */}
        <div className="space-y-1">
          <SectionHeaderSkeleton />
          <ItemCardSkeleton />
          <ItemCardSkeleton />
          <ItemCardSkeleton />
        </div>
      </div>
    </div>
  );
}
