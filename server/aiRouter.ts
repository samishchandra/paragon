/**
 * AI Router — Server-side AI processing using built-in LLM
 *
 * Provides both:
 * 1. A tRPC mutation for non-streaming AI completions
 * 2. An Express SSE endpoint for streaming AI responses (used by the editor)
 *
 * No user API keys needed — uses the platform's built-in Forge LLM.
 */

import { Router } from "express";
import { ENV } from "./_core/env";
import { sdk } from "./_core/sdk";

// ─── Prompt Templates ───────────────────────────────────────────────────────

interface PromptTemplate {
  system: string;
  user: (text: string, instruction?: string) => string;
}

const AI_PROMPTS: Record<string, PromptTemplate> = {
  "fix-grammar": {
    system:
      "You are a precise proofreader. Fix only spelling and grammar errors. Preserve the original meaning, tone, and formatting (including markdown). Return only the corrected text with no explanations.",
    user: (text: string) =>
      `Fix the spelling and grammar in this text:\n\n${text}`,
  },
  rephrase: {
    system:
      "You are a skilled writer. Rephrase the text to improve clarity and flow while preserving the original meaning. Maintain the same formatting (including markdown). Return only the rephrased text.",
    user: (text: string) => `Rephrase this text:\n\n${text}`,
  },
  shorten: {
    system:
      "You are a concise editor. Shorten the text while preserving all key information. Maintain the same formatting style. Return only the shortened text.",
    user: (text: string) => `Shorten this text:\n\n${text}`,
  },
  elaborate: {
    system:
      "You are a thorough writer. Expand the text with more detail, examples, or explanation while maintaining the original tone. Preserve formatting. Return only the expanded text.",
    user: (text: string) => `Elaborate on this text:\n\n${text}`,
  },
  summarize: {
    system:
      "You are an expert summarizer. Create a concise summary that captures the key points. Return only the summary.",
    user: (text: string) => `Summarize this document:\n\n${text}`,
  },
  custom: {
    system:
      "You are a helpful writing assistant. Follow the user's instruction precisely. Return only the modified text with no explanations or preamble.",
    user: (text: string, instruction?: string) =>
      `${instruction || "Improve this text"}\n\nText:\n${text}`,
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function resolveApiUrl(): string {
  return ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0
    ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`
    : "https://forge.manus.im/v1/chat/completions";
}

// ─── Express Router (SSE streaming) ─────────────────────────────────────────

const aiRouter = Router();

/**
 * POST /api/ai/stream
 * Body: { actionId: string, text: string, customPrompt?: string }
 * Response: SSE stream of text chunks
 *
 * Requires authentication via session cookie.
 */
aiRouter.post("/stream", async (req, res) => {
  // Authenticate
  let user;
  try {
    user = await sdk.authenticateRequest(req);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { actionId, text, customPrompt } = req.body;

  if (!actionId || !text) {
    res.status(400).json({ error: "actionId and text are required" });
    return;
  }

  const prompt = AI_PROMPTS[actionId];
  if (!prompt) {
    res.status(400).json({ error: `Unknown AI action: ${actionId}` });
    return;
  }

  if (!ENV.forgeApiKey) {
    res.status(500).json({ error: "AI service not configured" });
    return;
  }

  // Set up SSE headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  const systemPrompt = prompt.system;
  const userPrompt = prompt.user(text, customPrompt);

  try {
    const response = await fetch(resolveApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.write(
        `data: ${JSON.stringify({ error: `LLM error: ${response.status} ${errorText}` })}\n\n`
      );
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.write("data: [DONE]\n\n");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              res.write("data: [DONE]\n\n");
              break;
            }
            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content || "";
              if (content) {
                res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
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
  } catch (err: any) {
    console.error("[AI Stream Error]", err);
    res.write(
      `data: ${JSON.stringify({ error: err.message || "AI processing failed" })}\n\n`
    );
    res.write("data: [DONE]\n\n");
  }

  res.end();
});

/**
 * POST /api/ai/complete
 * Body: { actionId: string, text: string, customPrompt?: string }
 * Response: { result: string }
 *
 * Non-streaming completion for simpler use cases.
 */
aiRouter.post("/complete", async (req, res) => {
  // Authenticate
  let user;
  try {
    user = await sdk.authenticateRequest(req);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { actionId, text, customPrompt } = req.body;

  if (!actionId || !text) {
    res.status(400).json({ error: "actionId and text are required" });
    return;
  }

  const prompt = AI_PROMPTS[actionId];
  if (!prompt) {
    res.status(400).json({ error: `Unknown AI action: ${actionId}` });
    return;
  }

  if (!ENV.forgeApiKey) {
    res.status(500).json({ error: "AI service not configured" });
    return;
  }

  const systemPrompt = prompt.system;
  const userPrompt = prompt.user(text, customPrompt);

  try {
    const response = await fetch(resolveApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(500).json({
        error: `LLM error: ${response.status} ${errorText}`,
      });
      return;
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";
    res.json({ result: content });
  } catch (err: any) {
    console.error("[AI Complete Error]", err);
    res.status(500).json({ error: err.message || "AI processing failed" });
  }
});

/**
 * GET /api/ai/status
 * Returns whether AI is available (built-in LLM configured).
 */
aiRouter.get("/status", (_req, res) => {
  res.json({
    available: !!ENV.forgeApiKey,
    provider: "Built-in AI",
    model: "gemini-2.5-flash",
  });
});

export default aiRouter;
