// @ts-nocheck
/**
 * MFA Challenge Screen
 * 
 * Shown after successful email/password login when the user has
 * TOTP MFA enrolled. Prompts for the 6-digit authenticator code.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Loader2, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface MFAChallengeProps {
  onVerified: () => void;
  onSignOut: () => void;
}

export function MFAChallenge({ onVerified, onSignOut }: MFAChallengeProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the user's TOTP factor
  const loadFactor = useCallback(async () => {
    try {
      const { data, error: listError } = await supabase.auth.mfa.listFactors();
      if (listError) throw listError;

      const verifiedFactors = data.totp.filter(f => f.status === 'verified');
      if (verifiedFactors.length > 0) {
        setFactorId(verifiedFactors[0].id);
      } else {
        // No MFA factors — shouldn't be here, proceed
        onVerified();
      }
    } catch (err) {
      console.error('Failed to load MFA factors:', err);
      setError('Failed to load authentication factors');
    } finally {
      setIsLoading(false);
    }
  }, [onVerified]);

  useEffect(() => {
    loadFactor();
  }, [loadFactor]);

  const handleVerify = async () => {
    if (!factorId || code.length !== 6) return;

    setIsVerifying(true);
    setError(null);

    try {
      // Create a challenge
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
      });
      if (challengeError) throw challengeError;

      // Verify the code
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code,
      });
      if (verifyError) throw verifyError;

      toast.success('Verified successfully');
      onVerified();
    } catch (err: any) {
      console.error('MFA verification error:', err);
      setError('Invalid code. Please try again.');
      setCode('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      onSignOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#94a3b8' }} />
          <p className="text-sm" style={{ color: '#64748b' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f8fafc' }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-sky-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Two-Factor Verification</h1>
            <p className="text-sm text-gray-500 mt-2">
              Enter the 6-digit code from your authenticator app to continue.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Code input */}
          <div className="space-y-4">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && code.length === 6) {
                  handleVerify();
                }
              }}
              className="font-mono text-center text-2xl tracking-[0.5em] h-14 border-gray-200"
              autoFocus
            />

            <Button
              onClick={handleVerify}
              disabled={code.length !== 6 || isVerifying}
              className="w-full h-11 gap-2 bg-sky-600 hover:bg-sky-700"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </div>

          {/* Sign out link */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out and use a different account
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Open your authenticator app (Google Authenticator, Authy, 1Password, etc.) to find your verification code.
        </p>
      </div>
    </div>
  );
}
