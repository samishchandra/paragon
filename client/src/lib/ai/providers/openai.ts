/**
 * OpenAI AI Provider
 * 
 * Calls the OpenAI-compatible chat completions API with streaming.
 * Works with OpenAI, Azure OpenAI, and any OpenAI-compatible endpoint.
 */

import type { AIProvider, AIStreamChunk } from '../types';

export class OpenAIProvider implements AIProvider {
  readonly name = 'OpenAI';
  private controller: AbortController | null = null;
  private apiKey: string;
  private model: string;
  private temperature: number;
  private baseUrl: string;

  constructor(config: { apiKey: string; model?: string; temperature?: number; baseUrl?: string }) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gpt-4o-mini';
    this.temperature = config.temperature ?? 0.7;
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
  }

  async *stream(prompt: string, systemPrompt?: string): AsyncIterable<AIStreamChunk> {
    this.controller = new AbortController();
    const url = `${this.baseUrl}/chat/completions`;

    const messages: Array<{ role: string; content: string }> = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: this.temperature,
        stream: true,
      }),
      signal: this.controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `OpenAI API error (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch {
        if (errorText.length < 200) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          yield { text: '', done: true };
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              yield { text: '', done: true };
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.choices?.[0]?.delta?.content || '';
              if (text) {
                yield { text, done: false };
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    let result = '';
    for await (const chunk of this.stream(prompt, systemPrompt)) {
      if (!chunk.done) {
        result += chunk.text;
      }
    }
    return result;
  }

  abort(): void {
    this.controller?.abort();
    this.controller = null;
  }

  async validate(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/models`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
