/**
 * ToastContainer — Displays toast notifications with CSS animations.
 * Uses CSS @keyframes instead of motion/react for lighter bundle.
 */
import { useState, useEffect, useCallback } from 'react';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { subscribeToToasts, dismissToast, Toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handleToastsUpdate = useCallback((newToasts: Toast[]) => {
    setToasts([...newToasts]);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToToasts(handleToastsUpdate);
    return () => unsubscribe();
  }, [handleToastsUpdate]);

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-2 pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[280px] max-w-[400px]",
            "animate-in fade-in slide-in-from-bottom-12 zoom-in-90 duration-200",
            toast.type === 'success' && "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-100",
            toast.type === 'error' && "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
            toast.type === 'info' && "bg-primary/5 border-primary/20 text-primary dark:bg-primary/10 dark:border-primary/30 dark:text-primary",
            toast.type === 'warning' && "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100"
          )}
        >
          {/* Icon */}
          <div className={cn(
            "shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
            toast.type === 'success' && "bg-emerald-500",
            toast.type === 'error' && "bg-red-500",
            toast.type === 'info' && "bg-primary",
            toast.type === 'warning' && "bg-amber-500"
          )}>
            {toast.type === 'success' && <Check className="w-3 h-3 text-white" />}
            {toast.type === 'error' && <AlertCircle className="w-3 h-3 text-white" />}
            {toast.type === 'info' && <Info className="w-3 h-3 text-white" />}
            {toast.type === 'warning' && <AlertTriangle className="w-3 h-3 text-white" />}
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <span className="text-sm font-medium">{toast.message}</span>
            {toast.description && (
              <p className="text-xs opacity-80 mt-0.5">{toast.description}</p>
            )}
          </div>
          
          {/* Action button */}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                dismissToast(toast.id);
              }}
              className={cn(
                "px-3 py-1.5 text-sm font-semibold rounded-md transition-colors",
                toast.type === 'success' && "bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900 dark:hover:bg-emerald-800 dark:text-emerald-300",
                toast.type === 'error' && "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300",
                toast.type === 'info' && "bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30 dark:text-primary",
                toast.type === 'warning' && "bg-amber-100 hover:bg-amber-200 text-amber-700 dark:bg-amber-900 dark:hover:bg-amber-800 dark:text-amber-300"
              )}
            >
              {toast.action.label}
            </button>
          )}
          
          {/* Close button */}
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
