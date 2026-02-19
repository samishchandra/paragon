import React from 'react';
import { cn } from '@/lib/utils';

interface TagIconProps {
  className?: string;
  color?: string;
  filled?: boolean;
}

/**
 * Custom tag icon that matches the reference design:
 * - Filled tag shape with a small circle/hole
 * - Can be colored with the tag's color
 */
export function TagIcon({ className, color, filled = false }: TagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-4 h-4', className)}
    >
      {filled ? (
        <>
          {/* Filled tag shape */}
          <path
            d="M4.5 3A1.5 1.5 0 003 4.5v6.086a1.5 1.5 0 00.44 1.06l8.914 8.915a1.5 1.5 0 002.121 0l6.086-6.086a1.5 1.5 0 000-2.121L11.646 3.44A1.5 1.5 0 0010.586 3H4.5z"
            fill={color || 'currentColor'}
          />
          {/* Small circle/hole */}
          <circle
            cx="7.5"
            cy="7.5"
            r="1.5"
            fill={color ? 'white' : 'var(--background)'}
          />
        </>
      ) : (
        <>
          {/* Outline tag shape */}
          <path
            d="M4.5 3A1.5 1.5 0 003 4.5v6.086a1.5 1.5 0 00.44 1.06l8.914 8.915a1.5 1.5 0 002.121 0l6.086-6.086a1.5 1.5 0 000-2.121L11.646 3.44A1.5 1.5 0 0010.586 3H4.5z"
            stroke={color || 'currentColor'}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Small circle/hole */}
          <circle
            cx="7.5"
            cy="7.5"
            r="1.5"
            fill={color || 'currentColor'}
          />
        </>
      )}
    </svg>
  );
}

export default TagIcon;
