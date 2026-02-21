/**
 * UserAvatar - Displays the user's profile picture or initials fallback
 */

import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';

interface UserAvatarProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function UserAvatar({ size = 32, className = '', onClick }: UserAvatarProps) {
  const { user } = useAuth();

  const avatarUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || user?.email;
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={fullName || 'User avatar'}
        width={size}
        height={size}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {initials !== '?' ? (
        <span className="text-xs font-medium" style={{ fontSize: size * 0.38 }}>
          {initials}
        </span>
      ) : (
        <User style={{ width: size * 0.5, height: size * 0.5 }} />
      )}
    </div>
  );
}
