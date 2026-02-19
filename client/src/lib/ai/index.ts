/**
 * AI Provider Factory & Public API
 * 
 * Entry point for the AI provider layer. Creates provider instances
 * based on configuration and exposes the useAIProvider hook.
 */

export { type AIProvider, type AIProviderConfig, type AIProviderType, type AIStreamChunk, type AIActionDefinition, type AIModelOption, DEFAULT_AI_ACTIONS, PROVIDER_MODELS } from './types';
export { AI_PROMPTS, type PromptTemplate } from './prompts';
export { getAIConfig, saveAIConfig, clearAIConfig, getDefaultConfig } from './config';

import type { AIProvider, AIProviderConfig } from './types';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/openai';

/**
 * Create an AI provider instance from configuration.
 * Throws if the provider type is unknown.
 */
export function createAIProvider(config: AIProviderConfig): AIProvider {
  switch (config.provider) {
    case 'gemini':
      return new GeminiProvider(config);
    case 'openai':
    case 'custom':
      // Custom providers use the OpenAI-compatible API format
      return new OpenAIProvider(config);
    case 'anthropic':
      // Anthropic uses the same streaming pattern as OpenAI but with different headers
      // For now, use OpenAI-compatible format (works with Anthropic proxy endpoints)
      return new OpenAIProvider({
        ...config,
        baseUrl: config.baseUrl || 'https://api.anthropic.com/v1',
      });
    default:
      throw new Error(`Unknown AI provider: ${(config as AIProviderConfig).provider}`);
  }
}
