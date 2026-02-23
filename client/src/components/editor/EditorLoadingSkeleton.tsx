/**
 * EditorLoadingSkeleton — Shown while the TipTap editor instance is initializing.
 *
 * Renders animated pulse bars that mimic document content.
 */

export interface EditorLoadingSkeletonProps {
  className?: string;
  theme?: string;
}

export function EditorLoadingSkeleton({ className = '', theme }: EditorLoadingSkeletonProps) {
  const barStyle = (width: string): React.CSSProperties => ({
    height: '1rem',
    width,
    borderRadius: '0.25rem',
    background: 'var(--color-muted, #e5e7eb)',
    opacity: 0.5,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  });

  return (
    <div className={`markdown-editor-container ${className}`} data-theme={theme}>
      <div
        className="editor-loading"
        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        <div style={barStyle('100%')} />
        <div style={barStyle('83%')} />
        <div style={barStyle('66%')} />
        <div style={{ height: '0.75rem' }} />
        <div style={barStyle('100%')} />
        <div style={barStyle('75%')} />
      </div>
    </div>
  );
}
