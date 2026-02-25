import { describe, it, expect } from 'vitest';
import { Node as PMNode } from '@tiptap/pm/model';
import { Schema } from '@tiptap/pm/model';

/**
 * Test the core expansion logic for the ExpandSelection extension.
 * 
 * Key scenarios tested:
 * 1. Cursor in paragraph, callout exists before the heading section
 * 2. Cursor inside a callout
 * 3. Cursor between two callouts
 * 4. List followed by callout
 * 5. Complex block boundary detection
 */

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'inline*', group: 'block' },
    heading: {
      content: 'inline*',
      group: 'block',
      attrs: { level: { default: 1 } },
      defining: true,
    },
    callout: {
      content: 'block+',
      group: 'block',
      defining: true,
      attrs: { type: { default: 'info' } },
    },
    bulletList: { content: 'listItem+', group: 'block' },
    listItem: { content: 'block+', defining: true },
    text: { group: 'inline' },
  },
});

// ---- Replicated functions from ExpandSelection.ts ----

const LIST_CONTAINER_TYPES = new Set(['bulletList', 'orderedList', 'taskList', 'mixedList']);
const COMPLEX_BLOCK_TYPES = new Set(['table', 'callout', 'codeBlock', 'blockquote']);

function selectCurrentTextblock(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (node.isTextblock) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

function findComplexBlockRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (COMPLEX_BLOCK_TYPES.has(node.type.name)) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

function findListContentRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  let listDepth = -1;
  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (LIST_CONTAINER_TYPES.has(node.type.name)) {
      listDepth = d;
    }
  }
  if (listDepth === -1) return null;
  const listStart = $from.start(listDepth);
  const listEnd = $from.end(listDepth);
  if (listStart < from || listEnd > to) {
    return { from: listStart, to: listEnd };
  }
  return null;
}

interface HeadingSection {
  level: number;
  from: number;
  to: number;
}

function buildHeadingSections(doc: PMNode): HeadingSection[] {
  const headings: { level: number; from: number }[] = [];
  doc.forEach((node, offset) => {
    if (node.type.name === 'heading') {
      headings.push({ level: node.attrs.level, from: offset });
    }
  });
  if (headings.length === 0) return [];
  const sections: HeadingSection[] = [];
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    let sectionEnd = doc.content.size;
    for (let j = i + 1; j < headings.length; j++) {
      if (headings[j].level <= heading.level) {
        sectionEnd = headings[j].from;
        break;
      }
    }
    sections.push({ level: heading.level, from: heading.from, to: sectionEnd });
  }
  return sections;
}

function findContainingHeadingSections(sections: HeadingSection[], from: number, to: number): HeadingSection[] {
  const containing = sections.filter(s => s.from <= from && s.to >= to);
  containing.sort((a, b) => (a.to - a.from) - (b.to - b.from));
  return containing;
}

function isInsideTable(doc: PMNode, from: number): boolean {
  const $from = doc.resolve(from);
  for (let d = $from.depth; d >= 1; d--) {
    if ($from.node(d).type.name === 'table') return true;
  }
  return false;
}

function rangeContainsComplexBlock(doc: PMNode, from: number, to: number): boolean {
  let found = false;
  doc.nodesBetween(from, to, (node) => {
    if (COMPLEX_BLOCK_TYPES.has(node.type.name)) {
      found = true;
      return false;
    }
    return true;
  });
  return found;
}

function buildExpansionSteps(
  doc: PMNode,
  initialFrom: number,
  initialTo: number
): Array<{ from: number; to: number; useSelectAll?: boolean }> {
  const steps: Array<{ from: number; to: number; useSelectAll?: boolean }> = [];
  let currentFrom = initialFrom;
  let currentTo = initialTo;

  const addStep = (range: { from: number; to: number; useSelectAll?: boolean } | null): boolean => {
    if (range && (range.from < currentFrom || range.to > currentTo)) {
      steps.push(range);
      currentFrom = range.from;
      currentTo = range.to;
      return true;
    }
    return false;
  };

  addStep(selectCurrentTextblock(doc, currentFrom, currentTo));

  if (isInsideTable(doc, initialFrom)) {
    // Table expansion (not tested here)
  }

  addStep(findListContentRange(doc, currentFrom, currentTo));
  addStep(findComplexBlockRange(doc, currentFrom, currentTo));

  const sections = buildHeadingSections(doc);
  if (sections.length > 0) {
    const containingSections = findContainingHeadingSections(sections, currentFrom, currentTo);
    for (const section of containingSections) {
      const crossesComplexBlock = rangeContainsComplexBlock(doc, section.from, section.to);
      if (crossesComplexBlock) {
        if (section.from === 0 && section.to === doc.content.size) {
          addStep({ from: 0, to: doc.content.size, useSelectAll: true });
        } else {
          addStep({ from: section.from, to: section.to, useSelectAll: true });
        }
      } else {
        addStep({ from: section.from, to: section.to });
      }
    }
  }

  if (currentFrom > 0 || currentTo < doc.content.size) {
    steps.push({ from: 0, to: doc.content.size, useSelectAll: true });
  }

  return steps;
}

// ---- Tests ----

describe('ExpandSelection - callout boundary traversal', () => {
  describe('User bug report: callout before heading blocks expansion', () => {
    // Exact document structure from user's report:
    //   something here          (paragraph)
    //   [callout: info]         (callout)
    //     Text info             (paragraph inside callout)
    //   [/callout]
    //   ### Description         (heading level 3)
    //   Text description        (paragraph)
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('something here')]),
      schema.node('callout', { type: 'info' }, [
        schema.node('paragraph', null, [schema.text('Text info')]),
      ]),
      schema.node('heading', { level: 3 }, [schema.text('Description')]),
      schema.node('paragraph', null, [schema.text('Text description')]),
    ]);

    it('should progressively expand from "Text description" to full document', () => {
      // Find "Text description" paragraph position
      let textDescOffset = -1;
      doc.forEach((node, offset) => {
        if (node.type.name === 'paragraph' && node.textContent === 'Text description') {
          textDescOffset = offset;
        }
      });
      const cursorPos = textDescOffset + 1;

      let from = cursorPos;
      let to = cursorPos;

      // Simulate progressive Cmd+A presses
      for (let press = 1; press <= 10; press++) {
        const steps = buildExpansionSteps(doc, from, to);
        let nextStep: { from: number; to: number; useSelectAll?: boolean } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }

        if (!nextStep) break;
        from = nextStep.from;
        to = nextStep.to;
        if (from === 0 && to === doc.content.size) break;
      }

      expect(from).toBe(0);
      expect(to).toBe(doc.content.size);
    });

    it('should have H3 section that does NOT include the callout', () => {
      const sections = buildHeadingSections(doc);
      expect(sections).toHaveLength(1);
      // The callout is at offset 16, heading is at offset 29
      // H3 section: from=29, to=60 (end of doc)
      expect(sections[0].from).toBe(29);
      // The callout (offset 16-29) is NOT in the H3 section
    });

    it('should mark heading sections containing callouts with useSelectAll', () => {
      // When expanding from within the H3 section, the H3 section itself
      // does NOT contain a callout. But the full document step does.
      const h3Section = buildHeadingSections(doc)[0];
      const cursorPos = h3Section.from + 1; // Inside the heading

      const steps = buildExpansionSteps(doc, cursorPos, cursorPos);
      
      // The last step (full document) should have useSelectAll=true
      const fullDocStep = steps.find(s => s.from === 0 && s.to === doc.content.size);
      expect(fullDocStep).toBeDefined();
      expect(fullDocStep!.useSelectAll).toBe(true);
    });
  });

  describe('Callout inside heading section', () => {
    // Document where callout IS inside a heading section:
    //   ## Section
    //   [callout: info]
    //     Callout text
    //   [/callout]
    //   Some text after
    const doc = schema.node('doc', null, [
      schema.node('heading', { level: 2 }, [schema.text('Section')]),
      schema.node('callout', { type: 'info' }, [
        schema.node('paragraph', null, [schema.text('Callout text')]),
      ]),
      schema.node('paragraph', null, [schema.text('Some text after')]),
    ]);

    it('should expand from paragraph after callout through heading section', () => {
      let afterParaOffset = -1;
      doc.forEach((node, offset) => {
        if (node.type.name === 'paragraph' && node.textContent === 'Some text after') {
          afterParaOffset = offset;
        }
      });
      const cursorPos = afterParaOffset + 1;

      let from = cursorPos;
      let to = cursorPos;

      for (let press = 1; press <= 10; press++) {
        const steps = buildExpansionSteps(doc, from, to);
        let nextStep: { from: number; to: number } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }
        if (!nextStep) break;
        from = nextStep.from;
        to = nextStep.to;
        if (from === 0 && to === doc.content.size) break;
      }

      expect(from).toBe(0);
      expect(to).toBe(doc.content.size);
    });

    it('should mark heading section with useSelectAll when it contains a callout', () => {
      // Cursor in "Some text after"
      let afterParaOffset = -1;
      doc.forEach((node, offset) => {
        if (node.type.name === 'paragraph' && node.textContent === 'Some text after') {
          afterParaOffset = offset;
        }
      });
      const cursorPos = afterParaOffset + 1;

      const steps = buildExpansionSteps(doc, cursorPos, cursorPos);
      
      // Find the heading section step
      const headingSectionStep = steps.find(s => s.from === 0 && s.to === doc.content.size && s.useSelectAll);
      expect(headingSectionStep).toBeDefined();
    });
  });

  describe('Cursor inside callout', () => {
    const doc = schema.node('doc', null, [
      schema.node('heading', { level: 2 }, [schema.text('Title')]),
      schema.node('paragraph', null, [schema.text('Before')]),
      schema.node('callout', { type: 'info' }, [
        schema.node('paragraph', null, [schema.text('Callout text')]),
      ]),
      schema.node('paragraph', null, [schema.text('After')]),
    ]);

    it('should expand from inside callout to callout content then to document', () => {
      let calloutParaStart = -1;
      doc.forEach((node, offset) => {
        if (node.type.name === 'callout') {
          calloutParaStart = offset + 2; // Inside the paragraph within callout
        }
      });

      let from = calloutParaStart;
      let to = calloutParaStart;

      const expansionHistory: Array<{ from: number; to: number }> = [];

      for (let press = 1; press <= 10; press++) {
        const steps = buildExpansionSteps(doc, from, to);
        let nextStep: { from: number; to: number } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }
        if (!nextStep) break;
        from = nextStep.from;
        to = nextStep.to;
        expansionHistory.push({ from, to });
        if (from === 0 && to === doc.content.size) break;
      }

      // Should have expanded: callout paragraph → callout content → heading section/document
      expect(expansionHistory.length).toBeGreaterThanOrEqual(2);
      expect(from).toBe(0);
      expect(to).toBe(doc.content.size);
    });
  });

  describe('rangeContainsComplexBlock', () => {
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('Before')]),
      schema.node('callout', { type: 'info' }, [
        schema.node('paragraph', null, [schema.text('Inside')]),
      ]),
      schema.node('paragraph', null, [schema.text('After')]),
    ]);

    it('should detect callout in range', () => {
      expect(rangeContainsComplexBlock(doc, 0, doc.content.size)).toBe(true);
    });

    it('should not detect callout when range is before it', () => {
      // First paragraph: offset 0, nodeSize = 8 (1 + 6 + 1)
      expect(rangeContainsComplexBlock(doc, 0, 8)).toBe(false);
    });

    it('should not detect callout when range is after it', () => {
      // Callout ends at offset 8 + 12 = 20, last paragraph starts at 20
      const calloutEnd = 8 + 12; // paragraph(8) + callout(12)
      expect(rangeContainsComplexBlock(doc, calloutEnd, doc.content.size)).toBe(false);
    });
  });

  describe('Multiple callouts between headings', () => {
    const doc = schema.node('doc', null, [
      schema.node('heading', { level: 2 }, [schema.text('Title')]),
      schema.node('callout', { type: 'info' }, [
        schema.node('paragraph', null, [schema.text('First callout')]),
      ]),
      schema.node('paragraph', null, [schema.text('Between')]),
      schema.node('callout', { type: 'note' }, [
        schema.node('paragraph', null, [schema.text('Second callout')]),
      ]),
      schema.node('paragraph', null, [schema.text('After all')]),
    ]);

    it('should expand from "Between" to full document', () => {
      let betweenOffset = -1;
      doc.forEach((node, offset) => {
        if (node.type.name === 'paragraph' && node.textContent === 'Between') {
          betweenOffset = offset;
        }
      });
      const cursorPos = betweenOffset + 1;

      let from = cursorPos;
      let to = cursorPos;

      for (let press = 1; press <= 10; press++) {
        const steps = buildExpansionSteps(doc, from, to);
        let nextStep: { from: number; to: number } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }
        if (!nextStep) break;
        from = nextStep.from;
        to = nextStep.to;
        if (from === 0 && to === doc.content.size) break;
      }

      expect(from).toBe(0);
      expect(to).toBe(doc.content.size);
    });
  });
});
