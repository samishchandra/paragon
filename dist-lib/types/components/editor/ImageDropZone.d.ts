interface ImageDropZoneProps {
    /**
     * Reference to the container element to attach drag events to
     */
    containerRef: React.RefObject<HTMLElement | null>;
    /**
     * Whether the drop zone is enabled
     */
    enabled?: boolean;
}
/**
 * Visual overlay that appears when dragging images over the editor
 * Provides visual feedback for drag-and-drop image upload
 */
export declare function ImageDropZone({ containerRef, enabled }: ImageDropZoneProps): import("react").JSX.Element | null;
export default ImageDropZone;
