import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import { Fragment } from '@tiptap/pm/model';

/**
 * CalloutInputRule Extension
 * 
 * Auto-detects callout syntax when user types:
 * ```info (followed by Enter)
 * ```warning (followed by Enter)
 * ```error (followed by Enter)
 * ```success (followed by Enter)
 * ```note (followed by Enter)
 * 
 * This converts the code block fence into a callout block.
 */

const CALLOUT_TYPES = ['info', 'note', 'prompt', 'resources', 'todo'] as const;
type CalloutType = typeof CALLOUT_TYPES[number];

export const CalloutInputRule = Extension.create({
  name: 'calloutInputRule',

  addProseMirrorPlugins() {
    const editor = this.editor;
    
    return [
      new Plugin({
        key: new PluginKey('calloutInputRule'),
        props: {
          handleKeyDown(view, event) {
            // Only handle Enter key
            if (event.key !== 'Enter') return false;
            
            const { state } = view;
            const { selection, doc } = state;
            const { $from } = selection;
            
            // Get the current line text
            const lineStart = $from.start();
            const lineEnd = $from.end();
            const lineText = doc.textBetween(lineStart, $from.pos, '');
            
            // Check if line matches callout pattern
            const trimmedLine = lineText.trim();
            
            for (const type of CALLOUT_TYPES) {
              if (trimmedLine === `\`\`\`${type}`) {
                event.preventDefault();
                
                // Delete the typed pattern and insert callout
                const tr = state.tr;
                
                // Find the actual start of the pattern in the line
                const patternStart = lineStart + lineText.indexOf('```');
                
                // Delete from pattern start to current position
                tr.delete(patternStart, $from.pos);
                
                // Create callout node with empty paragraph
                const calloutType = editor.schema.nodes.callout;
                const paragraphType = editor.schema.nodes.paragraph;
                
                if (calloutType && paragraphType) {
                  const paragraph = paragraphType.create();
                  const callout = calloutType.create({ type }, Fragment.from(paragraph));
                  
                  tr.insert(patternStart, callout);
                  
                  // Position cursor inside the callout paragraph
                  const newPos = tr.doc.resolve(patternStart + 2);
                  tr.setSelection(TextSelection.near(newPos));
                  
                  view.dispatch(tr);
                }
                
                return true;
              }
            }
            
            return false;
          },
        },
      }),
    ];
  },
});

export default CalloutInputRule;
