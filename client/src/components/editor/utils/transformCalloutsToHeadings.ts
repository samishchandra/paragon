/**
 * Transform callout code blocks into H4 headings followed by the callout content.
 * Used for full-document copy/export (not partial selections).
 *
 * Example: ```ad-resources\nSome content\n``` becomes #### Resources\nSome content
 */

/** Map callout type slugs to display labels for copy-as-markdown heading prefixes */
const CALLOUT_LABELS: Record<string, string> = {
  info: 'Info',
  note: 'Note',
  prompt: 'Prompt',
  resources: 'Resources',
  todo: 'Todo',
  summary: 'Summary',
};

export function transformCalloutsToHeadings(md: string): string {
  return md.replace(
    /```ad-(\w+)\n([\s\S]*?)```/g,
    (_match: string, type: string, content: string) => {
      const label = CALLOUT_LABELS[type] || type.charAt(0).toUpperCase() + type.slice(1);
      const trimmedContent = content.trim();
      return `#### ${label}\n\n${trimmedContent}`;
    }
  );
}
