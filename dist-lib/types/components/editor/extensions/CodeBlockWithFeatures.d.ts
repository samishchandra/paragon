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
