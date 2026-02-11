export interface ResizableImageOptions {
    HTMLAttributes: Record<string, unknown>;
    allowBase64: boolean;
    onImageClick?: (attrs: {
        src: string;
        alt: string;
        pos: number;
        rect: DOMRect;
    }) => void;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        resizableImage: {
            setImage: (options: {
                src: string;
                alt?: string;
                title?: string;
                width?: number;
            }) => ReturnType;
            updateImage: (options: {
                src?: string;
                alt?: string;
                width?: number;
                align?: string;
            }) => ReturnType;
            setImageAlign: (align: 'left' | 'center' | 'right') => ReturnType;
        };
    }
}
export declare const ResizableImage: import("@tiptap/core").Node<ResizableImageOptions, any>;
export default ResizableImage;
