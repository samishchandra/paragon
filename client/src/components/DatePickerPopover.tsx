// DatePickerPopover v3 - Calendar FIRST, quick dates SECOND
import { useState } from 'react';
import { addDays, startOfWeek, addWeeks } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DatePickerPopoverProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  showClearButton?: boolean;
}

export function DatePickerPopover({
  selectedDate,
  onDateChange,
  children,
  align = 'end',
  showClearButton = true,
}: DatePickerPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    onDateChange(date);
    setOpen(false);
  };

  const handleQuickDate = (date: Date) => {
    onDateChange(date);
    setOpen(false);
  };

  const handleClear = () => {
    onDateChange(undefined);
    setOpen(false);
  };

  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align} data-version="v3-calendar-first">
        <div className="flex flex-col" data-layout="calendar-top">
          {/* SECTION 1: Calendar at the very top */}
          <div className="flex justify-center" data-section="calendar">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              initialFocus
            />
          </div>
          
          {/* SECTION 2: Divider after calendar */}
          <div className="border-t border-border" data-section="divider-1" />
          
          {/* SECTION 3: Quick date buttons BELOW calendar */}
          <div className="flex items-center justify-center gap-2 px-3 py-3" data-section="quick-dates">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'rounded-full text-xs',
                selectedDate && 
                selectedDate.toDateString() === today.toDateString() && 
                'ring-2 ring-primary'
              )}
              onClick={() => handleQuickDate(today)}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'rounded-full text-xs',
                selectedDate && 
                selectedDate.toDateString() === tomorrow.toDateString() && 
                'ring-2 ring-primary'
              )}
              onClick={() => handleQuickDate(tomorrow)}
            >
              Tomorrow
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'rounded-full text-xs',
                selectedDate && 
                selectedDate.toDateString() === nextWeek.toDateString() && 
                'ring-2 ring-primary'
              )}
              onClick={() => handleQuickDate(nextWeek)}
            >
              Next Week
            </Button>
          </div>
          
          {/* SECTION 4: Divider before clear button */}
          {showClearButton && <div className="border-t border-border" data-section="divider-2" />}
          
          {/* SECTION 5: Clear due date button at the bottom */}
          {showClearButton && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              data-section="clear-button"
            >
              Clear due date
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
