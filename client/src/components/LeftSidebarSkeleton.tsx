/**
 * Left Sidebar Skeleton
 * Shown during initial data loading to prevent layout shift
 * Matches the structure of LeftSidebar: header, nav items, sections
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

export function LeftSidebarSkeleton() {
  return (
    <div className="h-full bg-sidebar flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border/50 items-center justify-between hidden md:flex">
        <div className="flex items-center gap-2 h-8">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-medium text-sidebar-foreground leading-7">Momentum</span>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="flex-1 p-3 space-y-6">
        {/* Views Section - 6 nav items */}
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-md">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className="h-4 flex-1 rounded" style={{ maxWidth: `${70 + (i % 3) * 20}px` }} />
              <Skeleton className="h-3 w-5 rounded ml-auto" />
            </div>
          ))}
        </div>

        {/* Lists Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-md">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className="h-4 rounded" style={{ width: `${60 + (i % 2) * 30}px` }} />
              <Skeleton className="h-3 w-4 rounded ml-auto" />
            </div>
          ))}
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-3 w-10 rounded" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-md">
              <Skeleton className="h-4 w-4 rounded-full shrink-0" />
              <Skeleton className="h-4 rounded" style={{ width: `${50 + (i % 3) * 25}px` }} />
              <Skeleton className="h-3 w-4 rounded ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
