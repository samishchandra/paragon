import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (message: string, options?: { type?: Toast['type']; action?: Toast['action']; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((
    message: string, 
    options?: { type?: Toast['type']; action?: Toast['action']; duration?: number }
  ) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = {
      id,
      message,
      type: options?.type || 'success',
      action: options?.action,
    };

    setToasts(prev => [...prev, toast]);

    // Auto-dismiss after duration
    setTimeout(() => {
      removeToast(id);
    }, options?.duration || 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border",
              "bg-background text-foreground",
              "animate-in slide-in-from-right-full duration-300",
              toast.type === 'success' && "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30",
              toast.type === 'error' && "border-red-500/30 bg-red-50 dark:bg-red-950/30",
              toast.type === 'info' && "border-blue-500/30 bg-blue-50 dark:bg-blue-950/30"
            )}
          >
            {toast.type === 'success' && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            
            <span className="text-sm font-medium">{toast.message}</span>
            
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
                className="ml-2 px-2 py-1 text-sm font-medium text-primary hover:bg-accent rounded transition-colors"
              >
                {toast.action.label}
              </button>
            )}
            
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto flex-shrink-0 p-1 hover:bg-accent rounded transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
