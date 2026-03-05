import { Extension } from '@tiptap/core';
export interface LinkValidationOptions {
    validateUrl?: (url: string) => boolean | Promise<boolean>;
    invalidLinkClass?: string;
    validateOnChange?: boolean;
}
export declare const LinkValidation: Extension<LinkValidationOptions, any>;
export default LinkValidation;
