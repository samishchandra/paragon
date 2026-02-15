import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
export interface MarkdownPasteOptions {
    enableMarkdownPaste: boolean;
}
export declare const markdownPastePluginKey: PluginKey<any>;
export declare const MarkdownPaste: Extension<MarkdownPasteOptions, any>;
export default MarkdownPaste;
