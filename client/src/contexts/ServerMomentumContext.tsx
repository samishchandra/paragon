/**
 * ServerMomentumContext — Supabase-powered data management.
 *
 * The provider is a pure render wrapper: all state orchestration lives in
 * useProviderState, and all business logic lives in the extracted hooks
 * under contexts/hooks/.
 */

import { createContext, useContext, type ReactNode } from 'react';
import { useProviderState } from '@/contexts/hooks/useProviderState';
import type { ServerMomentumContextValue } from '@/types/context';

const ServerMomentumContext = createContext<ServerMomentumContextValue | null>(null);

// ---- Provider ----
export function ServerMomentumProvider({ children, userId }: { children: ReactNode; userId: string }) {
  const contextValue = useProviderState(userId);
  return <ServerMomentumContext.Provider value={contextValue}>{children}</ServerMomentumContext.Provider>;
}

export function useServerMomentum() {
  const context = useContext(ServerMomentumContext);
  if (!context) {
    throw new Error('useServerMomentum must be used within a ServerMomentumProvider');
  }
  return context;
}

// Re-export as useMomentum for compatibility
export { useServerMomentum as useMomentum };

