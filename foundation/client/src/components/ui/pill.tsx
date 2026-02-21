/**
 * Pill Component
 * 
 * A unified pill component for consistent styling across tags, lists, and other pill-shaped elements.
 * Supports filled pills (with color), placeholder pills (dashed border), and various sizes.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const pillVariants = cva(
  // Base styles with animation support
  'inline-flex items-center justify-center rounded-full font-medium cursor-pointer ' +
  // Smooth transitions for all properties
  'transition-all duration-200 ease-out ' +
  // Animation classes for enter/exit (use with AnimatePresence or CSS)
  'animate-in fade-in-0 zoom-in-95 ' +
  // Hover scale effect
  'hover:scale-[1.02] active:scale-[0.98]',
  {
    variants: {
      variant: {
        // Filled pill with background color
        filled: 'hover:ring-1 hover:ring-[var(--pill-ring-color)] hover:shadow-sm',
        // Placeholder pill with dashed border (for "+ Add" buttons)
        placeholder: 'text-muted-foreground/70 hover:bg-accent/50 hover:text-muted-foreground border border-dashed border-muted-foreground/30 hover:border-muted-foreground/50',
        // Outline pill with solid border
        outline: 'border hover:ring-1 hover:ring-[var(--pill-ring-color)] hover:shadow-sm',
      },
      size: {
        // Default size for editor header pills
        default: 'h-7 px-2.5 text-xs gap-1.5',
        // Smaller size for list item cards
        sm: 'h-5 px-2 text-[10px] gap-1',
        // Larger size for emphasized pills
        lg: 'h-8 px-3 text-sm gap-2',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  /** The pill color (for filled and outline variants) */
  color?: string;
  /** Whether the pill is interactive (clickable) */
  asChild?: boolean;
}

const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, size, color, style, children, ...props }, ref) => {
    // Generate color-based styles for filled and outline variants
    const colorStyles: React.CSSProperties = {
      ...(color && {
        backgroundColor: variant === 'filled' ? `${color}15` : undefined,
        color: color,
        borderColor: variant === 'outline' ? `${color}40` : undefined,
        '--pill-ring-color': `${color}30`,
      } as React.CSSProperties),
      // Fallback ring color when no pill color is set
      ...(!color && { '--pill-ring-color': 'var(--primary)' } as React.CSSProperties),
      ...style,
    };

    return (
      <span
        ref={ref}
        className={cn(pillVariants({ variant, size }), className)}
        style={colorStyles}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Pill.displayName = 'Pill';

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillVariants> {
  /** The pill color (for filled and outline variants) */
  color?: string;
}

const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, variant, size, color, style, children, ...props }, ref) => {
    // Generate color-based styles for filled and outline variants
    const colorStyles: React.CSSProperties = {
      ...(color && {
        backgroundColor: variant === 'filled' ? `${color}15` : undefined,
        color: color,
        borderColor: variant === 'outline' ? `${color}40` : undefined,
        '--pill-ring-color': `${color}30`,
      } as React.CSSProperties),
      // Fallback ring color when no pill color is set
      ...(!color && { '--pill-ring-color': 'var(--primary)' } as React.CSSProperties),
      ...style,
    };

    return (
      <button
        ref={ref}
        className={cn(pillVariants({ variant, size }), className)}
        style={colorStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PillButton.displayName = 'PillButton';

export { Pill, PillButton, pillVariants };
