/**
 * AI Provider Abstraction Layer — Types
 * 
 * Defines the core interfaces for AI provider integration.
 * All providers (Gemini, OpenAI, Anthropic, custom) implement the same interface.
 * The design is stream-first since all modern LLM APIs support streaming.
 */

// ─── Provider Configuration ───────────────────────────────────────────────────

export type AIProviderType = 'gemini' | 'openai' | 'anthropic' | 'custom';

export interface AIProviderConfig {
  provider: AIProviderType;
  apiKey: string;
  model?: string;        // e.g. "gemini-2.0-flash", "gpt-4o-mini"
  baseUrl?: string;      // for custom/self-hosted endpoints
  temperature?: number;  // 0.0–2.0, default 0.7
}

// ─── Streaming Types ──────────────────────────────────────────────────────────

export interface AIStreamChunk {
  text: string;          // incremental text delta
  done: boolean;         // true on final chunk
}

// ─── Provider Interface ───────────────────────────────────────────────────────

export interface AIProvider {
  /** Human-readable name for UI display */
  readonly name: string;

  /** Stream a completion. Returns an async iterator of text chunks. */
  stream(prompt: string, systemPrompt?: string): AsyncIterable<AIStreamChunk>;

  /** Non-streaming completion (convenience wrapper). */
  complete(prompt: string, systemPrompt?: string): Promise<string>;

  /** Abort any in-flight request. */
  abort(): void;

  /** Validate that the API key works (lightweight ping). */
  validate(): Promise<boolean>;
}

// ─── AI Action Types (shared with Paragon) ────────────────────────────────────

/**
 * Defines an AI action that appears in the editor's sparkles menu.
 * This type is defined here (Momentum side) and also re-exported from Paragon
 * so the editor can render the menu without knowing about providers.
 */
export interface AIActionDefinition {
  /** Unique action identifier, e.g. 'fix-grammar' */
  id: string;
  /** Display label, e.g. 'Fix spelling & grammar' */
  label: string;
  /** Lucide icon name, e.g. 'SpellCheck' */
  icon?: string;
  /** Where this action appears: selection-only, document-only, or both */
  scope: 'selection' | 'document' | 'both';
  /** Whether this action shows a custom prompt input */
  showCustomPrompt?: boolean;
}

// ─── Default Actions ──────────────────────────────────────────────────────────

export const DEFAULT_AI_ACTIONS: AIActionDefinition[] = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar', icon: 'SpellCheck', scope: 'selection' },
  { id: 'rephrase', label: 'Rephrase', icon: 'RefreshCw', scope: 'selection' },
  { id: 'shorten', label: 'Shorten', icon: 'Minimize2', scope: 'selection' },
  { id: 'elaborate', label: 'Elaborate', icon: 'Maximize2', scope: 'selection' },
  { id: 'summarize', label: 'Summarize', icon: 'FileText', scope: 'both' },
  { id: 'custom', label: 'Modify with prompt', icon: 'MessageSquare', scope: 'both', showCustomPrompt: true },
];

// ─── Provider Model Options ───────────────────────────────────────────────────

export interface AIModelOption {
  id: string;
  label: string;
  description?: string;
}

export const PROVIDER_MODELS: Record<AIProviderType, AIModelOption[]> = {
  gemini: [
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'Latest, fast and capable' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', description: 'Best quality' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', description: 'Fast and capable' },
    { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite', description: 'Fastest, most cost-effective' },
  ],
  openai: [
    { id: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Fast and affordable' },
    { id: 'gpt-4o', label: 'GPT-4o', description: 'Best quality' },
  ],
  anthropic: [
    { id: 'claude-3-5-haiku-latest', label: 'Claude 3.5 Haiku', description: 'Fast and affordable' },
    { id: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet', description: 'Best quality' },
  ],
  custom: [
    { id: 'custom', label: 'Custom Model', description: 'Specify in base URL' },
  ],
};
