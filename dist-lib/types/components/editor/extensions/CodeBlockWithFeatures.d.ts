declare const lowlight: {
    highlight: (language: string, value: string, options?: Readonly<import("lowlight").Options> | null | undefined) => import("hast").Root;
    highlightAuto: (value: string, options?: Readonly<import("lowlight").AutoOptions> | null | undefined) => import("hast").Root;
    listLanguages: () => Array<string>;
    register: {
        (grammars: Readonly<Record<string, import("highlight.js").LanguageFn>>): undefined;
        (name: string, grammar: import("highlight.js").LanguageFn): undefined;
    };
    registerAlias: {
        (aliases: Readonly<Record<string, ReadonlyArray<string> | string>>): undefined;
        (language: string, alias: ReadonlyArray<string> | string): undefined;
    };
    registered: (aliasOrName: string) => boolean;
};
/**
 * Attempt to lazy-load a language if it's in the extended tier.
 * Returns a promise that resolves to true if the language was loaded,
 * false if it's not in the lazy registry.
 */
declare function loadLanguageIfNeeded(lang: string): Promise<boolean>;
export { lowlight, loadLanguageIfNeeded };
export declare const CodeBlockWithFeatures: import("@tiptap/core").Node<import("@tiptap/extension-code-block-lowlight").CodeBlockLowlightOptions, any>;
/**
 * Helper: toggle code block for multi-block selections.
 *
 * When the selection spans multiple blocks (paragraphs, headings, etc.),
 * the default TipTap `toggleCodeBlock` converts each block individually,
 * producing multiple code blocks. This helper instead collects all text
 * from the selected blocks, joins with newlines, and replaces the range
 * with a single code block.
 *
 * For single-block or collapsed selections, it falls back to the default
 * `toggleCodeBlock` command.
 */
export declare function toggleCodeBlockMerged(editor: any): boolean;
