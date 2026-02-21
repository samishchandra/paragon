export type ItemType = 'task' | 'note';

// Storage section types (what's stored in the database)
export type SectionType = 'now' | 'later' | 'completed';

// Display section types (what's shown in the UI for tasks)
export type DisplaySectionType = 'pinned' | 'unpinned' | 'now' | 'do' | 'later' | 'completed';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

// List type - can contain either tasks or notes
export type ListType = 'task' | 'note';

// Available icons for lists
export type ListIconName = 
  | 'folder'
  | 'briefcase'
  | 'home'
  | 'book-open'
  | 'folder-open'
  | 'archive'
  | 'star'
  | 'heart'
  | 'bookmark'
  | 'flag'
  | 'target'
  | 'zap'
  | 'lightbulb'
  | 'trophy'
  | 'gift'
  | 'shopping-cart'
  | 'credit-card'
  | 'calendar'
  | 'clock'
  | 'alarm-clock'
  | 'sun'
  | 'moon'
  | 'users'
  | 'user'
  | 'building'
  | 'graduation-cap'
  | 'stethoscope'
  | 'plane'
  | 'car'
  | 'bike'
  | 'map-pin'
  | 'globe'
  | 'ban'
  | 'music'
  | 'camera'
  | 'film'
  | 'tv'
  | 'gamepad'
  | 'message-circle'
  | 'code'
  | 'terminal'
  | 'database'
  | 'server'
  | 'cpu'
  | 'smartphone'
  | 'mail'
  | 'phone'
  | 'message-square'
  | 'send'
  | 'rss'
  | 'clipboard'
  | 'file-text'
  | 'rocket'
  // Finance & Money
  | 'wallet'
  | 'dollar-sign'
  | 'circle-dollar-sign'
  | 'piggy-bank'
  | 'receipt'
  | 'percent'
  | 'calculator'
  | 'trending-up'
  | 'bar-chart-3'
  // Security & Privacy
  | 'lock'
  | 'unlock'
  | 'key'
  | 'shield'
  | 'shield-check'
  | 'eye'
  // Tools & Creative
  | 'settings'
  | 'wrench'
  | 'hammer'
  | 'paintbrush'
  | 'palette'
  | 'pen'
  | 'scissors'
  // Food & Drink
  | 'coffee'
  | 'wine'
  | 'utensils-crossed'
  | 'pizza'
  | 'apple'
  // Nature & Weather
  | 'leaf'
  | 'tree-pine'
  | 'flower'
  | 'flame'
  | 'snowflake'
  | 'mountain'
  | 'waves'
  | 'cloud'
  | 'umbrella'
  // Fitness & Health
  | 'dumbbell'
  | 'activity'
  | 'heart-pulse'
  | 'pill'
  | 'brain'
  // Science & Education
  | 'atom'
  | 'flask-conical'
  | 'microscope'
  // Social & Events
  | 'crown'
  | 'diamond'
  | 'sparkles'
  | 'party-popper'
  | 'cake'
  | 'baby'
  // Audio & Media
  | 'headphones'
  | 'podcast'
  | 'megaphone'
  | 'bell'
  // Organization
  | 'tag'
  | 'hash'
  | 'paperclip'
  | 'layers'
  | 'kanban'
  | 'list-todo'
  | 'anchor'
  | 'compass';

export interface List {
  id: string;
  name: string;
  icon: ListIconName;
  color: string;
  type: ListType; // 'task' or 'note' - determines what items can be in this list
  createdAt: string;
  updatedAt: string;
  order: number; // For drag-and-drop reordering
}

export type SortOrder = 'custom' | 'modified' | 'dueDate';
export type SortDirection = 'asc' | 'desc';

export interface BaseItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  order: number;
  deletedAt?: string; // ISO date string - when item was soft deleted
  listId?: string; // Optional - which list this item belongs to (undefined = no list)
}

export interface Task extends BaseItem {
  type: 'task';
  isCompleted: boolean;
  section: SectionType;
  dueDate?: string; // ISO date string
}

export interface Note extends BaseItem {
  type: 'note';
  section: Exclude<SectionType, 'completed'>;
}

export type Item = Task | Note;

export interface AppState {
  items: Item[];
  tags: Tag[];
  lists: List[];
  selectedItemId: string | null;
  activeFilter: FilterType;
  searchQuery: string;
  sortOrder: SortOrder;
  sortDirection: SortDirection;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
}

export type FilterType = 
  | { type: 'all' }
  | { type: 'tasks' }
  | { type: 'notes' }
  | { type: 'todo' }
  | { type: 'miscellaneous' }
  | { type: 'tag'; tagId: string }
  | { type: 'list'; listId: string }
  | { type: 'pinned' }
  | { type: 'completed' }
  | { type: 'trash' };

export interface Section {
  id: SectionType;
  title: string;
  isCollapsed: boolean;
}

export const DEFAULT_TAGS: Tag[] = [
  { id: 'work', name: 'Work', color: '#22D3EE' },
  { id: 'personal', name: 'Personal', color: '#A78BFA' },
  { id: 'ideas', name: 'Ideas', color: '#34D399' },
  { id: 'urgent', name: 'Urgent', color: '#F87171' },
];

export const DEFAULT_SECTIONS: Section[] = [
  { id: 'now', title: 'Now', isCollapsed: false },
  { id: 'later', title: 'Later', isCollapsed: false },
  { id: 'completed', title: 'Completed', isCollapsed: true },
];

// List icon options for the picker - organized in rows of 8
export const LIST_ICONS: { name: ListIconName; label: string }[] = [
  // Row 1: Folders & Storage
  { name: 'briefcase', label: 'Briefcase' },
  { name: 'home', label: 'Home' },
  { name: 'book-open', label: 'Book' },
  { name: 'folder', label: 'Folder' },
  { name: 'folder-open', label: 'Folder Open' },
  { name: 'archive', label: 'Archive' },
  { name: 'star', label: 'Star' },
  { name: 'heart', label: 'Heart' },
  // Row 2: Markers & Goals
  { name: 'bookmark', label: 'Bookmark' },
  { name: 'flag', label: 'Flag' },
  { name: 'target', label: 'Target' },
  { name: 'zap', label: 'Zap' },
  { name: 'lightbulb', label: 'Lightbulb' },
  { name: 'trophy', label: 'Trophy' },
  { name: 'rocket', label: 'Rocket' },
  { name: 'gift', label: 'Gift' },
  // Row 3: Shopping & Time
  { name: 'shopping-cart', label: 'Shopping Cart' },
  { name: 'credit-card', label: 'Credit Card' },
  { name: 'calendar', label: 'Calendar' },
  { name: 'clock', label: 'Clock' },
  { name: 'alarm-clock', label: 'Alarm Clock' },
  { name: 'sun', label: 'Sun' },
  { name: 'moon', label: 'Moon' },
  // Row 4: People & Places
  { name: 'users', label: 'Users' },
  { name: 'user', label: 'User' },
  { name: 'building', label: 'Building' },
  { name: 'graduation-cap', label: 'Graduation' },
  { name: 'stethoscope', label: 'Medical' },
  { name: 'plane', label: 'Plane' },
  { name: 'car', label: 'Car' },
  // Row 5: Travel & Media
  { name: 'bike', label: 'Bike' },
  { name: 'map-pin', label: 'Location' },
  { name: 'globe', label: 'Globe' },
  { name: 'ban', label: 'Ban' },
  { name: 'music', label: 'Music' },
  { name: 'camera', label: 'Camera' },
  { name: 'film', label: 'Film' },
  { name: 'tv', label: 'TV' },
  // Row 6: Tech & Gaming
  { name: 'gamepad', label: 'Gaming' },
  { name: 'message-circle', label: 'Chat' },
  { name: 'code', label: 'Code' },
  { name: 'terminal', label: 'Terminal' },
  { name: 'database', label: 'Database' },
  { name: 'server', label: 'Server' },
  { name: 'cpu', label: 'CPU' },
  { name: 'smartphone', label: 'Phone' },
  // Row 7: Communication
  { name: 'mail', label: 'Mail' },
  { name: 'phone', label: 'Call' },
  { name: 'message-square', label: 'Message' },
  { name: 'send', label: 'Send' },
  { name: 'rss', label: 'RSS' },
  { name: 'clipboard', label: 'Clipboard' },
  { name: 'file-text', label: 'Document' },
  // Row 8: Finance & Money
  { name: 'wallet', label: 'Wallet' },
  { name: 'dollar-sign', label: 'Dollar' },
  { name: 'circle-dollar-sign', label: 'Money' },
  { name: 'piggy-bank', label: 'Savings' },
  { name: 'receipt', label: 'Receipt' },
  { name: 'percent', label: 'Percent' },
  { name: 'calculator', label: 'Calculator' },
  { name: 'trending-up', label: 'Trending' },
  // Row 9: Security & Tools
  { name: 'bar-chart-3', label: 'Chart' },
  { name: 'lock', label: 'Lock' },
  { name: 'unlock', label: 'Unlock' },
  { name: 'key', label: 'Key' },
  { name: 'shield', label: 'Shield' },
  { name: 'shield-check', label: 'Verified' },
  { name: 'eye', label: 'Eye' },
  { name: 'settings', label: 'Settings' },
  // Row 10: Tools & Creative
  { name: 'wrench', label: 'Wrench' },
  { name: 'hammer', label: 'Hammer' },
  { name: 'paintbrush', label: 'Paintbrush' },
  { name: 'palette', label: 'Palette' },
  { name: 'pen', label: 'Pen' },
  { name: 'scissors', label: 'Scissors' },
  { name: 'coffee', label: 'Coffee' },
  { name: 'wine', label: 'Wine' },
  // Row 11: Food & Nature
  { name: 'utensils-crossed', label: 'Dining' },
  { name: 'pizza', label: 'Pizza' },
  { name: 'apple', label: 'Apple' },
  { name: 'leaf', label: 'Leaf' },
  { name: 'tree-pine', label: 'Tree' },
  { name: 'flower', label: 'Flower' },
  { name: 'flame', label: 'Flame' },
  { name: 'snowflake', label: 'Snowflake' },
  // Row 12: Nature & Weather
  { name: 'mountain', label: 'Mountain' },
  { name: 'waves', label: 'Waves' },
  { name: 'cloud', label: 'Cloud' },
  { name: 'umbrella', label: 'Umbrella' },
  { name: 'dumbbell', label: 'Fitness' },
  { name: 'activity', label: 'Activity' },
  { name: 'heart-pulse', label: 'Health' },
  { name: 'pill', label: 'Pill' },
  // Row 13: Science & Social
  { name: 'brain', label: 'Brain' },
  { name: 'atom', label: 'Atom' },
  { name: 'flask-conical', label: 'Science' },
  { name: 'microscope', label: 'Research' },
  { name: 'crown', label: 'Crown' },
  { name: 'diamond', label: 'Diamond' },
  { name: 'sparkles', label: 'Sparkles' },
  { name: 'party-popper', label: 'Party' },
  // Row 14: Events & Media
  { name: 'cake', label: 'Cake' },
  { name: 'baby', label: 'Baby' },
  { name: 'headphones', label: 'Headphones' },
  { name: 'podcast', label: 'Podcast' },
  { name: 'megaphone', label: 'Announce' },
  { name: 'bell', label: 'Bell' },
  { name: 'tag', label: 'Tag' },
  { name: 'hash', label: 'Hash' },
  // Row 15: Organization
  { name: 'paperclip', label: 'Paperclip' },
  { name: 'layers', label: 'Layers' },
  { name: 'kanban', label: 'Kanban' },
  { name: 'list-todo', label: 'Todo List' },
  { name: 'anchor', label: 'Anchor' },
  { name: 'compass', label: 'Compass' },
];
