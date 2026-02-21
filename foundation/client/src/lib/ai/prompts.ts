/**
 * AI Prompt Templates
 * 
 * Each AI action has a system prompt (sets behavior) and a user prompt template.
 * These are tuned for concise, direct output — no explanations, just the result.
 */

export interface PromptTemplate {
  system: string;
  user: (text: string, instruction?: string) => string;
}

export const AI_PROMPTS: Record<string, PromptTemplate> = {
  'fix-grammar': {
    system: 'You are a precise proofreader. Fix only spelling and grammar errors. Preserve the original meaning, tone, and formatting (including markdown). Return only the corrected text with no explanations.',
    user: (text: string) => `Fix the spelling and grammar in this text:\n\n${text}`,
  },
  'rephrase': {
    system: 'You are a skilled writer. Rephrase the text to improve clarity and flow while preserving the original meaning. Maintain the same formatting (including markdown). Return only the rephrased text.',
    user: (text: string) => `Rephrase this text:\n\n${text}`,
  },
  'shorten': {
    system: 'You are a concise editor. Shorten the text while preserving all key information. Maintain the same formatting style. Return only the shortened text.',
    user: (text: string) => `Shorten this text:\n\n${text}`,
  },
  'elaborate': {
    system: 'You are a thorough writer. Expand the text with more detail, examples, or explanation while maintaining the original tone. Preserve formatting. Return only the expanded text.',
    user: (text: string) => `Elaborate on this text:\n\n${text}`,
  },
  'summarize': {
    system: 'You are an expert summarizer. Create a concise summary that captures the key points. Return only the summary.',
    user: (text: string) => `Summarize this document:\n\n${text}`,
  },
  'custom': {
    system: 'You are a helpful writing assistant. Follow the user\'s instruction precisely. Return only the modified text with no explanations or preamble.',
    user: (text: string, instruction?: string) => `${instruction || 'Improve this text'}\n\nText:\n${text}`,
  },
};
