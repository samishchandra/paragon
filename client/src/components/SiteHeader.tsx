import { Link } from 'wouter';
import { FileText, Github } from 'lucide-react';

/**
 * Shared site header bar used on both the Home page and the /editor page.
 * Element order (left to right): Paragon title | GitHub | actions | v2.0.0
 * The Paragon Editor title component navigates to the home page.
 * Right-side actions can be customized via the `actions` render prop.
 */
export default function SiteHeader({ actions }: { actions?: React.ReactNode }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 no-underline hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate">Paragon Editor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Drop-in markdown editor for note-taking apps</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* 1. GitHub link */}
            <a
              href="https://github.com/samishchandra/paragon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            {/* 2. Page-specific actions */}
            {actions}
            {/* 3. Version badge (always last) */}
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hidden sm:inline">
              v2.0.0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
