/**
 * Login Page — Momentum Notes
 * 
 * Clean, minimal login page with:
 * - "Sign in with GitHub" button (primary)
 * - Email/password sign-in and sign-up
 * - Forgot password / reset password flow
 * - Password recovery handler (when user clicks reset link in email)
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getThemeConfig } from '@/adapters/registry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Github, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | 'forgot' | 'reset';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signInWithGithub, signInWithEmail, signUpWithEmail, resetPassword, updatePassword, isPasswordRecovery, clearPasswordRecovery } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // When the user arrives via a password reset link, switch to reset mode
  useEffect(() => {
    if (isPasswordRecovery) {
      setMode('reset');
      setError(null);
      setSuccessMessage(null);
    }
  }, [isPasswordRecovery]);

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    setError(null);
    try {
      await signInWithGithub();
    } catch {
      setError('Failed to initiate GitHub sign-in. Please try again.');
      setIsGithubLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsEmailLoading(true);

    try {
      if (mode === 'signin') {
        const result = await signInWithEmail(email, password);
        if (result.error) {
          setError(result.error);
        }
      } else if (mode === 'signup') {
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setIsEmailLoading(false);
          return;
        }
        const result = await signUpWithEmail(email, password, name || undefined);
        if (result.error) {
          setError(result.error);
        } else if (result.needsConfirmation) {
          setSuccessMessage('Check your email for a confirmation link to complete sign-up.');
          setEmail('');
          setPassword('');
          setName('');
        }
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          setError('Please enter your email address.');
          setIsEmailLoading(false);
          return;
        }
        const result = await resetPassword(email);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccessMessage('Password reset email sent. Check your inbox for a link to reset your password.');
          setEmail('');
        }
      } else if (mode === 'reset') {
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setIsEmailLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setIsEmailLoading(false);
          return;
        }
        const result = await updatePassword(password);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccessMessage('Password updated successfully! You are now signed in.');
          setPassword('');
          setConfirmPassword('');
          clearPasswordRecovery();
          // The user is already authenticated after password update, 
          // the AuthGate will redirect them to the app
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMessage(null);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signin': return 'Sign in to your account';
      case 'signup': return 'Create a new account';
      case 'forgot': return 'Reset your password';
      case 'reset': return 'Choose a new password';
    }
  };

  const getSubmitLabel = () => {
    switch (mode) {
      case 'signin': return 'Sign in';
      case 'signup': return 'Create account';
      case 'forgot': return 'Send reset link';
      case 'reset': return 'Update password';
    }
  };

  const getSubmitIcon = () => {
    switch (mode) {
      case 'forgot': return <Mail className="w-4 h-4" />;
      case 'reset': return <KeyRound className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src={getThemeConfig().appIconLargeUrl || getThemeConfig().appIconUrl} alt={getThemeConfig().appName} className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">{getThemeConfig().appName}</h1>
          <p className="text-sm text-muted-foreground mt-1.5">{getSubtitle()}</p>
        </div>

        {/* GitHub Sign-In — only show on signin/signup modes */}
        {(mode === 'signin' || mode === 'signup') && (
          <>
            <Button
              variant="outline"
              className="w-full h-11 text-sm font-medium gap-2.5 mb-6"
              onClick={handleGithubSignIn}
              disabled={isGithubLoading || isEmailLoading}
            >
              {isGithubLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              Continue with GitHub
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground uppercase tracking-wider">or</span>
              </div>
            </div>
          </>
        )}

        {/* Back button for forgot/reset modes */}
        {mode === 'forgot' && (
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </button>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                Name <span className="text-muted-foreground/60">(optional)</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isEmailLoading}
                className="h-10"
                autoComplete="name"
              />
            </div>
          )}

          {/* Email field — shown on signin, signup, forgot */}
          {mode !== 'reset' && (
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isEmailLoading}
                className="h-10"
                autoComplete="email"
                autoFocus={mode === 'forgot'}
              />
            </div>
          )}

          {/* Password field — shown on signin, signup, reset */}
          {mode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                  {mode === 'reset' ? 'New password' : 'Password'}
                </Label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : mode === 'reset' ? 'At least 6 characters' : 'Your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isEmailLoading}
                  className="h-10 pr-10"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  autoFocus={mode === 'reset'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm password — only on reset mode */}
          {mode === 'reset' && (
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
                Confirm new password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isEmailLoading}
                  className="h-10 pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Forgot password hint */}
          {mode === 'forgot' && (
            <p className="text-xs text-muted-foreground">
              Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
            </p>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-sm font-medium gap-2"
            disabled={isEmailLoading || isGithubLoading}
          >
            {isEmailLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {getSubmitIcon()}
                {getSubmitLabel()}
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </>
            )}
          </Button>
        </form>

        {/* Toggle Mode — signin/signup */}
        {(mode === 'signin' || mode === 'signup') && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        )}

        {/* Back to sign in — after forgot password success */}
        {mode === 'forgot' && successMessage && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="text-primary hover:underline font-medium"
            >
              Back to sign in
            </button>
          </p>
        )}

      </div>
    </div>
  );
}
