/**
 * Disabled AI Adapter — Default AI adapter for momentum-foundation.
 *
 * AI features are completely disabled. UI elements that depend on AI
 * should check isAvailable() and hide themselves.
 */
import type { AIAdapter, AIProviderConfig, AIStreamChunk } from '../types';

export class DisabledAIAdapter implements AIAdapter {
  readonly type = 'disabled';
  readonly supportsConfiguration = false;

  isAvailable(): boolean {
    return false;
  }

  async *stream(): AsyncIterable<AIStreamChunk> {
    throw new Error('AI is not available in this configuration.');
  }

  async complete(): Promise<string> {
    throw new Error('AI is not available in this configuration.');
  }

  async getStatus(): Promise<{ available: boolean; provider?: string; model?: string }> {
    return { available: false };
  }

  async getConfig(): Promise<AIProviderConfig | null> {
    return null;
  }

  async saveConfig(): Promise<void> {
    // No-op
  }

  async clearConfig(): Promise<void> {
    // No-op
  }
}
