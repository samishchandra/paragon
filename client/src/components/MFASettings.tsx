/**
 * MFA Settings Component (Stub)
 *
 * MFA is handled by the Manus OAuth provider, so this component
 * is a no-op placeholder.
 */
import { Shield } from 'lucide-react';

export function MFASettings({ provider }: { provider: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium">Managed by Manus</p>
            <p className="text-sm text-muted-foreground mt-1">
              Two-factor authentication is managed by your Manus account settings, not by this app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
