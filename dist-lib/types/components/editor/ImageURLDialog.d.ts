interface ImageURLDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (url: string, alt: string) => void;
    position?: {
        top: number;
        left: number;
    };
}
export declare function ImageURLDialog({ isOpen, onClose, onInsert, position }: ImageURLDialogProps): import("react").JSX.Element | null;
export default ImageURLDialog;
