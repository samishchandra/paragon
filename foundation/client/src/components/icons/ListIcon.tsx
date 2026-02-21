/**
 * ListIcon Component
 * Renders a Lucide icon based on the icon name from ListIconName type
 */

import {
  Folder,
  FolderOpen,
  Briefcase,
  Home,
  Heart,
  Star,
  Bookmark,
  Flag,
  Target,
  Lightbulb,
  Rocket,
  Gift,
  ShoppingCart,
  Music,
  Camera,
  BookOpen,
  GraduationCap,
  Archive,
  Zap,
  Trophy,
  CreditCard,
  Calendar,
  Clock,
  AlarmClock,
  Sun,
  Moon,
  Users,
  User,
  Building,
  Stethoscope,
  Plane,
  Car,
  Bike,
  MapPin,
  Globe,
  Ban,
  Film,
  Tv,
  Gamepad2,
  MessageCircle,
  Code,
  Terminal,
  Database,
  Server,
  Cpu,
  Smartphone,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Rss,
  Clipboard,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { ListIconName } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<ListIconName, LucideIcon> = {
  'folder': Folder,
  'folder-open': FolderOpen,
  'briefcase': Briefcase,
  'home': Home,
  'heart': Heart,
  'star': Star,
  'bookmark': Bookmark,
  'flag': Flag,
  'target': Target,
  'lightbulb': Lightbulb,
  'rocket': Rocket,
  'gift': Gift,
  'shopping-cart': ShoppingCart,
  'music': Music,
  'camera': Camera,
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  'archive': Archive,
  'zap': Zap,
  'trophy': Trophy,
  'credit-card': CreditCard,
  'calendar': Calendar,
  'clock': Clock,
  'alarm-clock': AlarmClock,
  'sun': Sun,
  'moon': Moon,
  'users': Users,
  'user': User,
  'building': Building,
  'stethoscope': Stethoscope,
  'plane': Plane,
  'car': Car,
  'bike': Bike,
  'map-pin': MapPin,
  'globe': Globe,
  'ban': Ban,
  'film': Film,
  'tv': Tv,
  'gamepad': Gamepad2,
  'message-circle': MessageCircle,
  'code': Code,
  'terminal': Terminal,
  'database': Database,
  'server': Server,
  'cpu': Cpu,
  'smartphone': Smartphone,
  'mail': Mail,
  'phone': Phone,
  'message-square': MessageSquare,
  'send': Send,
  'rss': Rss,
  'clipboard': Clipboard,
  'file-text': FileText,
};

interface ListIconProps {
  name: ListIconName;
  className?: string;
  color?: string;
}

export function ListIcon({ name, className, color }: ListIconProps) {
  const Icon = iconMap[name] || Folder;
  
  return (
    <Icon 
      className={cn('w-4 h-4', className)} 
      style={color ? { color } : undefined}
    />
  );
}
