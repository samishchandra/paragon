import React from 'react';
export interface RecoveryBannerProps {
    onRecover: () => void;
    onDismiss: () => void;
    className?: string;
}
export declare function RecoveryBanner({ onRecover, onDismiss, className }: RecoveryBannerProps): React.JSX.Element;
export default RecoveryBanner;
