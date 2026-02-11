import React from 'react';
export interface AutoSaveIndicatorProps {
    status: 'idle' | 'saving' | 'saved' | 'error';
    lastSaved: Date | null;
    className?: string;
}
export declare function AutoSaveIndicator({ status, lastSaved, className }: AutoSaveIndicatorProps): React.JSX.Element;
export default AutoSaveIndicator;
