import React from 'react';

/**
 * Highlights matching search terms in text
 * @param text - The text to search within
 * @param query - The search query to highlight
 * @param highlightClass - Optional custom class for highlight styling
 * @returns React elements with highlighted matches
 */
export function highlightText(
  text: string,
  query: string,
  highlightClass: string = 'bg-yellow-200 dark:bg-yellow-700/80 text-foreground rounded px-0.5'
): React.ReactNode {
  if (!query || !text) {
    return text;
  }

  // Split query into individual terms for multi-word highlighting
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  
  if (terms.length === 0) {
    return text;
  }

  // Create a regex pattern that matches any of the search terms
  // Escape special regex characters in the search terms
  const escapedTerms = terms.map(term => 
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

  // Split text by the pattern, keeping the matched parts
  const parts = text.split(pattern);

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches any of the search terms
        const isMatch = terms.some(term => 
          part.toLowerCase() === term.toLowerCase()
        );
        
        if (isMatch) {
          return (
            <mark key={index} className={highlightClass}>
              {part}
            </mark>
          );
        }
        return part;
      })}
    </>
  );
}

/**
 * Gets a snippet of text around the first match
 * @param text - The full text content
 * @param query - The search query
 * @param maxLength - Maximum length of the snippet
 * @returns A snippet with the match in context
 */
export function getMatchSnippet(
  text: string,
  query: string,
  maxLength: number = 100
): string {
  if (!query || !text) {
    return text.slice(0, maxLength);
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lowerText = text.toLowerCase();
  
  // Find the first matching term position
  let firstMatchIndex = -1;
  for (const term of terms) {
    const index = lowerText.indexOf(term);
    if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
      firstMatchIndex = index;
    }
  }

  if (firstMatchIndex === -1) {
    return text.slice(0, maxLength);
  }

  // Calculate start position to show context before the match
  const contextBefore = 30;
  let start = Math.max(0, firstMatchIndex - contextBefore);
  
  // Adjust to not cut words
  if (start > 0) {
    const spaceIndex = text.indexOf(' ', start);
    if (spaceIndex !== -1 && spaceIndex < firstMatchIndex) {
      start = spaceIndex + 1;
    }
  }

  let snippet = text.slice(start, start + maxLength);
  
  // Add ellipsis if we're not at the start
  if (start > 0) {
    snippet = '...' + snippet;
  }
  
  // Add ellipsis if there's more text
  if (start + maxLength < text.length) {
    // Try to cut at a word boundary
    const lastSpace = snippet.lastIndexOf(' ');
    if (lastSpace > snippet.length - 20) {
      snippet = snippet.slice(0, lastSpace);
    }
    snippet = snippet + '...';
  }

  return snippet;
}
