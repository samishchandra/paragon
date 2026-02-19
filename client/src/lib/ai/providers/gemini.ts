/**
 * Gemini AI Provider
 * 
 * Calls the Gemini REST API directly using fetch with SSE streaming.
 * No SDK dependency — keeps the bundle small and the implementation transparent.
 */

import type { AIProvider, AIStreamChunk } from '../types';

export class GeminiProvider implements AIProvider {
  readonly name = 'Gemini';
  private controller: AbortController | null = null;
  private apiKey: string;
  private model: string;
  private temperature: number;

  constructor(config: { apiKey: string; model?: string; temperature?: number }) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-2.5-flash';
    this.temperature = config.temperature ?? 0.7;
  }

  async *stream(prompt: string, systemPrompt?: string): AsyncIterable<AIStreamChunk> {
    this.controller = new AbortController();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const body: Record<string, unknown> = {
      contents: [{ parts: [{ text: prompt }], role: 'user' }],
      generationConfig: { temperature: this.temperature },
    };

    if (systemPrompt) {
      body.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: this.controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Gemini API error (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch {
        // Use the raw text if not JSON
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
            try {
              const json = JSON.parse(line.slice(6));
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text) {
                yield { text, done: false };
              }
            } catch {
              // Skip malformed JSON lines
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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}?key=${this.apiKey}`;
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  }
}
