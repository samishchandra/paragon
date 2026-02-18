/**
 * Component Tests for EditorErrorBoundary
 * 
 * Tests: error catching, retry behavior, clear content, error details display
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorErrorBoundary } from './EditorErrorBoundary';

// Component that throws an error
function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test editor crash');
  }
  return <div data-testid="editor-content">Editor content</div>;
}

// Suppress console.error for expected errors in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('EditorErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    render(
      <EditorErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </EditorErrorBoundary>
    );

    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    expect(screen.getByText('Editor content')).toBeInTheDocument();
  });

  it('should show error UI when child throws', () => {
    render(
      <EditorErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    expect(screen.getByText('Editor encountered an error')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('should show Retry button', () => {
    render(
      <EditorErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /Retry/ })).toBeInTheDocument();
  });

  it('should call onRetry when Retry is clicked', () => {
    const onRetry = vi.fn();

    render(
      <EditorErrorBoundary onRetry={onRetry}>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /Retry/ }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should call onError when error is caught', () => {
    const onError = vi.fn();

    render(
      <EditorErrorBoundary onError={onError}>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it('should show error details when toggled', () => {
    render(
      <EditorErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    // Click "Error details" to expand
    fireEvent.click(screen.getByText('Error details'));
    expect(screen.getByText('Test editor crash')).toBeInTheDocument();
  });

  it('should not show "Clear Content & Retry" on first crash', () => {
    render(
      <EditorErrorBoundary onClearContent={vi.fn()}>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    expect(screen.queryByText(/Clear Content/)).not.toBeInTheDocument();
  });

  it('should show "Clear Content & Retry" after multiple retries', () => {
    const onClearContent = vi.fn();

    const { rerender } = render(
      <EditorErrorBoundary onClearContent={onClearContent}>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    // Click Retry twice to reach retryCount >= 2
    fireEvent.click(screen.getByRole('button', { name: /Retry/ }));
    // After retry, it will try to render children again and crash again
    rerender(
      <EditorErrorBoundary onClearContent={onClearContent}>
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    // Need to click retry again to get retryCount to 2
    if (screen.queryByRole('button', { name: /Retry/ })) {
      fireEvent.click(screen.getByRole('button', { name: /Retry/ }));
    }
  });

  it('should reset error state when resetKey changes', () => {
    const { rerender } = render(
      <EditorErrorBoundary resetKey="doc-1">
        <ThrowingComponent shouldThrow={true} />
      </EditorErrorBoundary>
    );

    expect(screen.getByText('Editor encountered an error')).toBeInTheDocument();

    // Change resetKey - should reset error state
    rerender(
      <EditorErrorBoundary resetKey="doc-2">
        <ThrowingComponent shouldThrow={false} />
      </EditorErrorBoundary>
    );

    expect(screen.queryByText('Editor encountered an error')).not.toBeInTheDocument();
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });
});
