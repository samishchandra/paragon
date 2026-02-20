/**
 * Settings Dialog - Modal wrapper for Settings content
 * 2-column layout: left nav sidebar + right content panel
 */

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMobile';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Settings,
  Type,
  Database,
  HardDrive,
  Code2,
  Sparkles,
  ChevronLeft,
  Keyboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsGeneral, SettingsEditor, SettingsData, SettingsBackup, SettingsAI, SettingsDeveloper } from '@/pages/Settings';
import { useAuth } from '@/contexts/AuthContext';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { isConnected as isLocalBackupConnected } from '@/lib/localBackup';
import { MFASettings } from '@/components/MFASettings';
import { shortcutCategories, ShortcutKeys } from '@/components/KeyboardShortcutsDialog';

export type SettingsSection = 'general' | 'editor' | 'data' | 'backup' | 'ai' | 'developer' | 'account' | 'keyboard';

const SECTIONS: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'general', label: 'General', icon: Settings },
  { id: 'editor', label: 'Editor', icon: Type },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'backup', label: 'Backup', icon: HardDrive },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  { id: 'developer', label: 'Developer', icon: Code2 },
  { id: 'keyboard', label: 'Keyboard Shortcuts', icon: Keyboard },
];

/* ─────────────────────────────────────────────
 * SECTION: Keyboard Shortcuts
 * ───────────────────────────────────────────── */

function SettingsKeyboardShortcuts() {
  return (
    <div className="space-y-6">
      {shortcutCategories.map((category) => (
        <div key={category.title}>
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {category.title}
          </h4>
          <div className="rounded-lg border bg-card">
            {category.shortcuts.map((shortcut, idx) => (
              <div
                key={shortcut.keys}
                className={cn(
                  'flex items-center justify-between px-4 py-2.5',
                  idx < category.shortcuts.length - 1 && 'border-b border-border/40'
                )}
              >
                <span className="text-sm text-foreground">{shortcut.description}</span>
                <ShortcutKeys keys={shortcut.keys} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSection?: SettingsSection;
}

/* ─────────────────────────────────────────────
 * SECTION: Account
 * ───────────────────────────────────────────── */

function SettingsAccount({ user, signOut }: { user: any; signOut: () => Promise<void> }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || user?.email?.split('@')[0] || 'User';
  const email = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url;
  const provider = user?.app_metadata?.provider || 'email';
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Profile</h4>
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="text-xl font-semibold">
                  {displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">{displayName}</h3>
              <p className="text-sm text-muted-foreground truncate">{email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">{provider}</span>
                {createdAt && <span className="text-xs text-muted-foreground">Joined {createdAt}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Account Details</h4>
        <div className="rounded-lg border divide-y">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-foreground">{email}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Sign-in method</span>
            <span className="text-sm font-medium text-foreground capitalize">{provider}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">User ID</span>
            <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">{user?.id || ''}</span>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <MFASettings provider={provider} />

      {/* Sign Out */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Session</h4>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Sign out of your account on this device. Your data will remain safe and synced.
          </p>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDialog({ open, onOpenChange, initialSection }: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');

  // Navigate to a specific section when the dialog opens with initialSection
  useEffect(() => {
    if (open && initialSection) {
      setActiveSection(initialSection);
      setShowContent(true);
    }
  }, [open, initialSection]);
  const [showContent, setShowContent] = useState(false); // mobile: toggle between nav and content
  const [backupConnected, setBackupConnected] = useState(isLocalBackupConnected());

  // Poll local backup connection status so sidebar indicator updates in real-time
  useEffect(() => {
    if (!open) return;
    const check = () => setBackupConnected(isLocalBackupConnected());
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, [open]);

  const handleSectionClick = (id: SettingsSection) => {
    setActiveSection(id);
    setShowContent(true);
  };

  const handleBack = () => {
    setShowContent(false);
  };

  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return <SettingsGeneral />;
      case 'editor': return <SettingsEditor />;
      case 'data': return <SettingsData />;
      case 'backup': return <SettingsBackup />;
      case 'ai': return <SettingsAI />;
      case 'developer': return <SettingsDeveloper />;
      case 'account': return <SettingsAccount user={user} signOut={signOut} />;
      case 'keyboard': return <SettingsKeyboardShortcuts />;
      default: return <SettingsGeneral />;
    }
  };

  const activeSectionInfo = SECTIONS.find(s => s.id === activeSection);

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setShowContent(false); }}>
      <DialogContent className="!max-w-[95vw] sm:!max-w-[680px] md:!max-w-[760px] lg:!max-w-[840px] max-h-[70vh] p-0 gap-0 overflow-hidden">
        <VisuallyHidden><DialogTitle>Settings</DialogTitle></VisuallyHidden>
        <VisuallyHidden><DialogDescription>Application settings and preferences</DialogDescription></VisuallyHidden>
        <div className="flex h-[65vh] max-h-[65vh]">
          {/* Left Nav Sidebar */}
          <nav className={cn(
            "shrink-0 border-r border-border/50 bg-sidebar flex-col",
            isMobile ? "w-full" : "w-56",
            // Mobile: hide nav when content is showing
            isMobile && showContent ? "hidden" : "flex"
          )}>
            <div className="px-5 py-4 border-b border-border/50">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Settings</h2>
            </div>
            <ScrollArea className="flex-1">
            <div className="py-2 px-2 space-y-0.5">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const showConnectedDot = section.id === 'backup' && backupConnected;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{section.label}</span>
                    {showConnectedDot && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Local folder connected" />
                    )}
                  </button>
                );
              })}
            </div>
            </ScrollArea>
            <div className="px-5 py-3 border-t border-border/50 shrink-0 flex items-center gap-2">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/KHHydNOzBeFQwwce.png" alt="" className="w-4 h-4" />
              <p className="text-xs text-muted-foreground">Momentum Notes</p>
            </div>
          </nav>

          {/* Right Content Panel */}
          <div className={cn(
            "flex-1 flex-col min-w-0 overflow-hidden",
            // Mobile: hide content when nav is showing
            isMobile && !showContent ? "hidden" : "flex"
          )}>
            {/* Content Header */}
            <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3 shrink-0">
              {/* Mobile back button */}
              <button
                onClick={handleBack}
                className={cn("p-1 -ml-1 rounded-md hover:bg-accent/50 text-muted-foreground", !isMobile && "hidden")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {activeSectionInfo && (
                <>
                  <activeSectionInfo.icon className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="text-base font-semibold text-foreground">{activeSectionInfo.label}</h3>
                  {activeSection === 'backup' && backupConnected && (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Connected
                    </span>
                  )}
                </>
              )}
            </div>
            {/* Content Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
