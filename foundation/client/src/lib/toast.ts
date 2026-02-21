// Global toast state management
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  type?: ToastType;
  action?: ToastAction;
  duration?: number;
  description?: string; // Optional description for additional context
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  action?: ToastAction;
  description?: string;
}

// Subscribers to toast state changes
type ToastSubscriber = (toasts: Toast[]) => void;
const subscribers: Set<ToastSubscriber> = new Set();

// Current toasts
let toasts: Toast[] = [];

// Notify all subscribers
function notifySubscribers() {
  subscribers.forEach(fn => fn([...toasts]));
}

// Subscribe to toast changes
export function subscribeToToasts(callback: ToastSubscriber): () => void {
  subscribers.add(callback);
  // Immediately call with current state
  callback([...toasts]);
  // Return unsubscribe function
  return () => {
    subscribers.delete(callback);
  };
}

// Remove a toast
export function dismissToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  notifySubscribers();
}

// Show a toast
export function showToast(message: string, options?: ToastOptions) {
  const id = Math.random().toString(36).substring(7);
  const toast: Toast = {
    id,
    message,
    type: options?.type || 'success',
    action: options?.action,
    description: options?.description,
  };

  toasts = [...toasts, toast];
  notifySubscribers();

  // Auto-dismiss after duration
  setTimeout(() => {
    dismissToast(id);
  }, options?.duration || 5000);

  return id;
}

// Convenience methods
export const toast = {
  success: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'success' }),
  error: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'error' }),
  info: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'info' }),
  warning: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'warning' }),
  dismiss: dismissToast,
};

export type { Toast, ToastAction, ToastOptions, ToastType };
