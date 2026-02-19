// @ts-nocheck
/**
 * MFA Settings Component
 * 
 * Allows email/password users to enroll, verify, and unenroll TOTP-based MFA.
 * Hidden for OAuth users since their provider handles 2FA.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ShieldCheck, ShieldAlert, Loader2, Copy, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type MFAState = 'loading' | 'not-enrolled' | 'enrolling' | 'verifying' | 'enrolled';

interface MFAFactor {
  id: string;
  friendlyName: string | null;
  createdAt: string;
}

export function MFASettings({ provider }: { provider: string }) {
  const [mfaState, setMfaState] = useState<MFAState>('loading');
  const [enrolledFactor, setEnrolledFactor] = useState<MFAFactor | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [pendingFactorId, setPendingFactorId] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUnenrolling, setIsUnenrolling] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const isOAuth = provider !== 'email';

  // Check current MFA status
  const checkMFAStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;

      const verifiedFactors = data.totp.filter(f => f.status === 'verified');
      if (verifiedFactors.length > 0) {
        setEnrolledFactor({
          id: verifiedFactors[0].id,
          friendlyName: verifiedFactors[0].friendly_name ?? null,
          createdAt: verifiedFactors[0].created_at,
        });
        setMfaState('enrolled');
      } else {
        // Clean up any unverified factors
        const unverifiedFactors = data.totp.filter(f => f.status !== 'verified');
        for (const f of unverifiedFactors) {
          try {
            await supabase.auth.mfa.unenroll({ factorId: f.id });
          } catch (unenrollErr) {
            console.warn('Failed to clean up unverified factor:', f.id, unenrollErr);
          }
        }
        setMfaState('not-enrolled');
      }
    } catch (err) {
      console.error('Failed to check MFA status:', err);
      // Fallback: also check AAL to detect enrolled MFA even if listFactors fails
      try {
        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalData?.currentLevel === 'aal2' || aalData?.nextLevel === 'aal2') {
          setMfaState('enrolled');
          setEnrolledFactor({ id: 'unknown', friendlyName: 'Authenticator', createdAt: new Date().toISOString() });
          return;
        }
      } catch {}
      setMfaState('not-enrolled');
    }
  }, []);

  useEffect(() => {
    if (!isOAuth) {
      checkMFAStatus();
    }
  }, [isOAuth, checkMFAStatus]);

  // Start enrollment - generate QR code
  const handleEnroll = async () => {
    setMfaState('enrolling');
    try {
      // First, clean up any existing unverified factors that might block enrollment
      const { data: existingFactors } = await supabase.auth.mfa.listFactors();
      if (existingFactors?.totp) {
        // If there's already a verified factor, just show enrolled state
        const verified = existingFactors.totp.filter(f => f.status === 'verified');
        if (verified.length > 0) {
          setEnrolledFactor({
            id: verified[0].id,
            friendlyName: verified[0].friendly_name ?? null,
            createdAt: verified[0].created_at,
          });
          setMfaState('enrolled');
          toast.info('Two-factor authentication is already enabled');
          return;
        }
        // Clean up unverified factors before re-enrolling
        const unverified = existingFactors.totp.filter(f => f.status !== 'verified');
        for (const f of unverified) {
          try {
            await supabase.auth.mfa.unenroll({ factorId: f.id });
          } catch (cleanupErr) {
            console.warn('Failed to clean up stale factor:', f.id, cleanupErr);
          }
        }
      }

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Momentum Notes Authenticator',
      });
      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setPendingFactorId(data.id);
      setMfaState('verifying');
    } catch (err: any) {
      console.error('MFA enrollment error:', err);
      const msg = err.message || 'Unknown error';
      // If factor already exists, re-check status — it might actually be enrolled
      if (msg.includes('already exists')) {
        toast.info('Refreshing MFA status...');
        await checkMFAStatus();
      } else {
        toast.error('Failed to start MFA enrollment: ' + msg);
        setMfaState('not-enrolled');
      }
    }
  };

  // Verify the TOTP code to complete enrollment
  const handleVerify = async () => {
    if (verifyCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: pendingFactorId,
      });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: pendingFactorId,
        challengeId: challenge.id,
        code: verifyCode,
      });
      if (verifyError) throw verifyError;

      toast.success('Two-factor authentication enabled successfully');
      setVerifyCode('');
      setQrCode('');
      setSecret('');
      setPendingFactorId('');
      await checkMFAStatus();
    } catch (err: any) {
      console.error('MFA verify error:', err);
      toast.error('Verification failed: ' + (err.message || 'Invalid code'));
    } finally {
      setIsVerifying(false);
    }
  };

  // Cancel enrollment
  const handleCancelEnroll = async () => {
    if (pendingFactorId) {
      try {
        await supabase.auth.mfa.unenroll({ factorId: pendingFactorId });
      } catch {}
    }
    setQrCode('');
    setSecret('');
    setPendingFactorId('');
    setVerifyCode('');
    setMfaState('not-enrolled');
  };

  // Unenroll (disable MFA)
  const handleUnenroll = async () => {
    if (!enrolledFactor) return;
    setIsUnenrolling(true);
    try {
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: enrolledFactor.id,
      });
      if (error) throw error;

      toast.success('Two-factor authentication disabled');
      setEnrolledFactor(null);
      setMfaState('not-enrolled');
    } catch (err: any) {
      console.error('MFA unenroll error:', err);
      toast.error('Failed to disable MFA: ' + (err.message || 'Unknown error'));
    } finally {
      setIsUnenrolling(false);
    }
  };

  // Copy secret to clipboard
  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  // OAuth users - show info message
  if (isOAuth) {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-foreground font-medium">Managed by {provider.charAt(0).toUpperCase() + provider.slice(1)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                You signed in with {provider.charAt(0).toUpperCase() + provider.slice(1)} OAuth. Two-factor authentication is managed by your {provider.charAt(0).toUpperCase() + provider.slice(1)} account settings, not by this app.
              </p>
              {provider === 'github' && (
                <a
                  href="https://github.com/settings/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  Manage 2FA on GitHub →
                </a>
              )}
              {provider === 'google' && (
                <a
                  href="https://myaccount.google.com/signinoptions/two-step-verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  Manage 2FA on Google →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (mfaState === 'loading') {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
        <div className="rounded-lg border bg-card p-4 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Checking MFA status...</span>
        </div>
      </div>
    );
  }

  // Enrolled state
  if (mfaState === 'enrolled' && enrolledFactor) {
    const enrolledDate = new Date(enrolledFactor.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">Enabled</p>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Authenticator app configured since {enrolledDate}.
                {enrolledFactor.friendlyName && (
                  <span className="text-xs text-muted-foreground/70"> ({enrolledFactor.friendlyName})</span>
                )}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUnenroll}
                disabled={isUnenrolling}
                className="mt-3 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                {isUnenrolling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                {isUnenrolling ? 'Disabling...' : 'Disable 2FA'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verifying state (QR code shown, waiting for code)
  if (mfaState === 'verifying') {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
        <div className="rounded-lg border bg-card p-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Set up authenticator app</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan the QR code below with your authenticator app (Google Authenticator, Authy, 1Password, etc.), then enter the 6-digit code to verify.
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-2">
              <div className="bg-white p-3 rounded-lg shadow-sm border">
                <img
                  src={qrCode}
                  alt="MFA QR Code"
                  className="w-48 h-48"
                />
              </div>
            </div>

            {/* Manual secret */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Can't scan? Enter this key manually:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs font-mono bg-muted px-3 py-2 rounded-md break-all select-all">
                  {secret}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopySecret}
                  className="shrink-0 h-8 w-8 p-0"
                >
                  {copiedSecret ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Verification code input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Verification code</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && verifyCode.length === 6) {
                      handleVerify();
                    }
                  }}
                  className="font-mono text-center text-lg tracking-[0.5em] max-w-[200px]"
                  autoFocus
                />
                <Button
                  onClick={handleVerify}
                  disabled={verifyCode.length !== 6 || isVerifying}
                  className="gap-2"
                >
                  {isVerifying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>

            {/* Cancel */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEnroll}
              className="text-muted-foreground"
            >
              Cancel setup
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Not enrolled state
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Two-Factor Authentication</h4>
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Not enabled</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add an extra layer of security to your account by requiring a verification code from an authenticator app when you sign in.
            </p>
            <Button
              onClick={handleEnroll}
              size="sm"
              className="mt-3 gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Enable 2FA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
