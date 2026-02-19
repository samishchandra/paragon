/**
 * linkifyTitle - Detects markdown links [text](url) and raw URLs in title strings
 * and returns React elements with clickable <a> tags.
 *
 * Supports:
 * - Markdown links: [link text](https://example.com)
 * - Raw URLs: https://example.com, http://example.com
 *
 * Performance: Single regex pass on short strings. Memoize with useMemo in components.
 */

import React from 'react';

// Markdown link: [text](url)
const MD_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

// Raw URL (not already inside a markdown link)
const RAW_URL_PATTERN = /https?:\/\/[^\s<>)\]]+/g;

// Combined pattern: match markdown links first, then raw URLs
// Markdown links take priority (matched first in the combined regex)
const COMBINED_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>)\]]+/g;

export interface LinkifyResult {
  /** Whether the title contains any links */
  hasLinks: boolean;
  /** The rendered React elements (or plain string if no links) */
  elements: React.ReactNode;
  /** Plain text version with markdown links resolved to just their display text */
  plainText: string;
}

/**
 * Parse a title string and return React elements with clickable links.
 * Returns a LinkifyResult with hasLinks flag, rendered elements, and plain text.
 */
export function linkifyTitle(title: string): LinkifyResult {
  if (!title) {
    return { hasLinks: false, elements: title, plainText: title };
  }

  // Quick check: does the title contain any URL-like content?
  if (!title.includes('http://') && !title.includes('https://')) {
    return { hasLinks: false, elements: title, plainText: title };
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let hasLinks = false;
  let plainText = '';

  // Reset regex state
  COMBINED_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = COMBINED_PATTERN.exec(title)) !== null) {
    hasLinks = true;
    const matchStart = match.index;
    const fullMatch = match[0];

    // Add text before this match
    if (matchStart > lastIndex) {
      const textBefore = title.slice(lastIndex, matchStart);
      parts.push(textBefore);
      plainText += textBefore;
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      // Markdown link: [text](url)
      const linkText = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {linkText}
        </a>
      );
      plainText += linkText;
    } else {
      // Raw URL
      const url = fullMatch;
      parts.push(
        <a
          key={`url-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {url}
        </a>
      );
      plainText += url;
    }

    lastIndex = matchStart + fullMatch.length;
  }

  // Add remaining text after last match
  if (lastIndex < title.length) {
    const remaining = title.slice(lastIndex);
    parts.push(remaining);
    plainText += remaining;
  }

  if (!hasLinks) {
    return { hasLinks: false, elements: title, plainText: title };
  }

  return {
    hasLinks: true,
    elements: <>{parts}</>,
    plainText,
  };
}

/**
 * Get plain text from a title, resolving markdown links to their display text.
 * Useful for search, sorting, and non-rendered contexts.
 */
export function getTitlePlainText(title: string): string {
  if (!title) return title;
  if (!title.includes('http://') && !title.includes('https://')) return title;

  // Replace markdown links with just their display text
  let result = title.replace(MD_LINK_PATTERN, '$1');
  return result;
}

export interface FirstLineLink {
  /** The display text for the link */
  text: string;
  /** The URL */
  url: string;
  /** Whether it was a markdown link or raw URL */
  isMarkdown: boolean;
}

/**
 * Extract a link from the first line of item content.
 * Returns the link info if the first line is or contains a link, null otherwise.
 *
 * Content may be HTML (from rich text editor) or plain text.
 * Strips HTML tags before checking.
 */
export function extractFirstLineLink(content: string | null | undefined): FirstLineLink | null {
  if (!content) return null;

  // Strip HTML tags to get plain text
  const plainContent = content.replace(/<[^>]*>/g, '');

  // Get the first non-empty line
  const firstLine = plainContent.split(/\n|\r/)
    .map(line => line.trim())
    .find(line => line.length > 0);

  if (!firstLine) return null;

  // Quick check: does the first line contain any URL-like content?
  if (!firstLine.includes('http://') && !firstLine.includes('https://')) return null;

  // Check for markdown link first: [text](url) as entire line
  const mdMatch = firstLine.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
  if (mdMatch) {
    return { text: mdMatch[1], url: mdMatch[2], isMarkdown: true };
  }

  // Check if the entire first line is a raw URL
  const urlMatch = firstLine.match(/^(https?:\/\/[^\s<>)\]]+)$/);
  if (urlMatch) {
    return { text: urlMatch[1], url: urlMatch[1], isMarkdown: false };
  }

  // Check if the first line contains a markdown link (inline)
  const inlineMdMatch = firstLine.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
  if (inlineMdMatch) {
    return { text: inlineMdMatch[1], url: inlineMdMatch[2], isMarkdown: true };
  }

  // Check if the first line contains a raw URL (inline)
  const inlineUrlMatch = firstLine.match(/(https?:\/\/[^\s<>)\]]+)/);
  if (inlineUrlMatch) {
    return { text: inlineUrlMatch[1], url: inlineUrlMatch[1], isMarkdown: false };
  }

  return null;
}

/** Truncate a URL for display, keeping domain and path start */
function truncateUrl(url: string, maxLen: number): string {
  if (url.length <= maxLen) return url;
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname;
    const pathStart = parsed.pathname.slice(0, 20);
    return `${domain}${pathStart}...`;
  } catch {
    return url.slice(0, maxLen) + '...';
  }
}

/**
 * Render a first-line link as a clickable React element.
 * Shows a compact link with truncated URL display.
 */
export function renderFirstLineLink(link: FirstLineLink): React.ReactNode {
  const displayText = link.isMarkdown
    ? link.text
    : truncateUrl(link.url, 50);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-primary/70 hover:text-primary hover:underline cursor-pointer truncate block"
      onClick={(e) => e.stopPropagation()}
      title={link.url}
    >
      {displayText}
    </a>
  );
}
