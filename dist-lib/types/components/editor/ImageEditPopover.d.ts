interface ImageEditPopoverProps {
    /**
     * Current image source URL
     */
    src: string;
    /**
     * Current alt text
     */
    alt: string;
    /**
     * Position of the popover (viewport coordinates from getBoundingClientRect)
     */
    position: {
        x: number;
        y: number;
    };
    /**
     * Callback when save is clicked
     */
    onSave: (src: string, alt: string) => void;
    /**
     * Callback when delete is clicked
     */
    onDelete: () => void;
    /**
     * Callback when popover is closed
     */
    onClose: () => void;
}
export declare function ImageEditPopover({ src, alt, position, onSave, onDelete, onClose, }: ImageEditPopoverProps): import("react").ReactPortal;
export {};
