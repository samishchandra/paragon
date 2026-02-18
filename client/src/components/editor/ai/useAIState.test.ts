/**
 * Unit Tests for AI State Management
 * 
 * Tests the AI state reducer logic and the useAIState hook behavior.
 * The AI feature is opt-in and provider-agnostic — these tests verify
 * the state machine transitions work correctly.
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAIState } from './useAIState';
import type { AIActionHandler } from './types';

describe('useAIState', () => {
  it('should start with idle state', () => {
    const { result } = renderHook(() => useAIState());
    expect(result.current.state).toEqual({ status: 'idle' });
  });

  it('should not execute action when no handler is provided', async () => {
    const { result } = renderHook(() => useAIState(undefined));

    await act(async () => {
      await result.current.executeAction('test', 'Test', 'hello', { from: 0, to: 5 });
    });

    expect(result.current.state.status).toBe('idle');
  });

  it('should handle non-streaming (Promise) action', async () => {
    const handler: AIActionHandler = vi.fn(async () => 'AI response text');

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('fix-grammar', 'Fix Grammar', 'hello world', { from: 0, to: 11 });
    });

    expect(result.current.state.status).toBe('complete');
    if (result.current.state.status === 'complete') {
      expect(result.current.state.result).toBe('AI response text');
      expect(result.current.state.action).toBe('fix-grammar');
      expect(result.current.state.actionLabel).toBe('Fix Grammar');
      expect(result.current.state.inputText).toBe('hello world');
      expect(result.current.state.selectionRange).toEqual({ from: 0, to: 11 });
    }
  });

  it('should handle streaming (AsyncIterable) action', async () => {
    const handler: AIActionHandler = vi.fn(async function* () {
      yield 'Hello';
      yield ' ';
      yield 'World';
    });

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('summarize', 'Summarize', 'long text', { from: 0, to: 9 });
    });

    expect(result.current.state.status).toBe('complete');
    if (result.current.state.status === 'complete') {
      expect(result.current.state.result).toBe('Hello World');
    }
  });

  it('should handle errors gracefully', async () => {
    const handler: AIActionHandler = vi.fn(async () => {
      throw new Error('API rate limit exceeded');
    });

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('test', 'Test', 'text', { from: 0, to: 4 });
    });

    expect(result.current.state.status).toBe('error');
    if (result.current.state.status === 'error') {
      expect(result.current.state.message).toBe('API rate limit exceeded');
    }
  });

  it('should handle AbortError by resetting to idle', async () => {
    const handler: AIActionHandler = vi.fn(async () => {
      const error = new DOMException('Aborted', 'AbortError');
      throw error;
    });

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('test', 'Test', 'text', { from: 0, to: 4 });
    });

    expect(result.current.state.status).toBe('idle');
  });

  it('should reset state to idle', async () => {
    const handler: AIActionHandler = vi.fn(async () => 'result');

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('test', 'Test', 'text', { from: 0, to: 4 });
    });

    expect(result.current.state.status).toBe('complete');

    act(() => {
      result.current.reset();
    });

    expect(result.current.state.status).toBe('idle');
  });

  it('should abort and reset to idle', async () => {
    const handler: AIActionHandler = vi.fn(async () => 'result');

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('test', 'Test', 'text', { from: 0, to: 4 });
    });

    act(() => {
      result.current.abort();
    });

    expect(result.current.state.status).toBe('idle');
  });

  it('should pass custom prompt to handler', async () => {
    const handler: AIActionHandler = vi.fn(async () => 'result');

    const { result } = renderHook(() => useAIState(handler));

    await act(async () => {
      await result.current.executeAction('custom', 'Custom', 'text', { from: 0, to: 4 }, 'Make it formal');
    });

    expect(handler).toHaveBeenCalledWith('custom', 'text', 'Make it formal');
  });
});
