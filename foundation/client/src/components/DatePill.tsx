/**
 * DatePill Component
 * 
 * A unified date pill component using the shared Pill styling.
 * Displays due dates with color-coded status (overdue, today, upcoming).
 */

import { useState, memo } from 'react';
import { format, isPast, isToday, isTomorrow, parseISO, startOfDay } from 'date-fns';
import { Calendar, Plus } from 'lucide-react';
import { Pill, PillButton } from '@/components/ui/pill';
import { DatePickerPopover } from '@/components/DatePickerPopover';
import { cn } from '@/lib/utils';

interface DatePillProps {
  dueDate?: string;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  showPlaceholder?: boolean;
}

// Date status colors
const DATE_COLORS = {
  overdue: '#EF4444', // Red for overdue
  today: '#F59E0B',   // Amber for today
  tomorrow: '#3B82F6', // Blue for tomorrow
  upcoming: '#6B7280', // Gray for future dates
} as const;

function getDateStatus(dueDate: string): { color: string; label: string } {
  const date = parseISO(dueDate);
  const today = startOfDay(new Date());
  const dateOnly = startOfDay(date);

  if (isPast(dateOnly) && !isToday(date)) {
    return { color: DATE_COLORS.overdue, label: format(date, 'MMM d') };
  }
  if (isToday(date)) {
    return { color: DATE_COLORS.today, label: 'Today' };
  }
  if (isTomorrow(date)) {
    return { color: DATE_COLORS.tomorrow, label: 'Tomorrow' };
  }
  return { color: DATE_COLORS.upcoming, label: format(date, 'MMM d') };
}

export const DatePill = memo(function DatePill({ 
  dueDate, 
  onDateChange, 
  className, 
  size = 'default',
  showPlaceholder = true 
}: DatePillProps) {
  const [open, setOpen] = useState(false);

  const handleDateChange = (date: Date | undefined) => {
    onDateChange(date);
    setOpen(false);
  };

  // No due date - show placeholder
  if (!dueDate) {
    if (!showPlaceholder) return null;
    
    return (
      <DatePickerPopover
        selectedDate={undefined}
        onDateChange={handleDateChange}
        align="start"
      >
        <PillButton
          variant="placeholder"
          size={size}
          className={className}
          onClick={(e) => e.stopPropagation()}
          title="Add due date"
        >
          <Calendar className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
          Date
        </PillButton>
      </DatePickerPopover>
    );
  }

  // Has due date - show colored pill
  const { color, label } = getDateStatus(dueDate);
  const date = parseISO(dueDate);

  return (
    <DatePickerPopover
      selectedDate={date}
      onDateChange={handleDateChange}
      align="start"
    >
      <Pill
        variant="filled"
        size={size}
        color={color}
        className={cn('group/date', className)}
        onClick={(e) => e.stopPropagation()}
        title="Click to change due date"
      >
        <Calendar className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
        {label}
      </Pill>
    </DatePickerPopover>
  );
});
