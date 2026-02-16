import { MarkdownEditor } from '@/components/editor';
import { useState, useCallback } from 'react';
import { FileText, Keyboard, Palette, Zap, Code2, Table, CheckSquare, Quote, Image, Sparkles, X, Maximize2, Moon, Sun, Search, Calendar, ListTree, BookOpen, Shield, ArrowUpDown, FileCode2, Wand2, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/SiteHeader';

/*
 * DESIGN: Dark Mode Craftsman
 * Professional markdown editor showcase page
 * Multi-layer dark theme with depth through layering
 * Vibrant cyan accent for interactive elements
 */

const DEMO_CONTENT = `
<h1>Welcome to Paragon Editor</h1>
<p>A <strong>professional</strong>, feature-rich markdown editor designed as a drop-in component for note-taking applications. Built with <a href="https://tiptap.dev">TipTap</a> and <strong>React</strong>.</p>

<h2>Text Formatting</h2>
<p>Paragon supports all standard formatting options:</p>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><s>Strikethrough</s> for corrections</li>
  <li><code>inline code</code> for technical terms</li>
  <li><mark>Highlighted text</mark> for important notes</li>
  <li><u>Underlined text</u> for additional emphasis</li>
</ul>

<h2>Task Lists</h2>
<p>Interactive checkboxes with auto-reorder — completed items automatically move to the bottom:</p>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true">Set up the development environment</li>
  <li data-type="taskItem" data-checked="false">Implement core features</li>
  <li data-type="taskItem" data-checked="false">Write documentation</li>
  <li data-type="taskItem" data-checked="false">Deploy to production</li>
</ul>

<h2>Code Blocks</h2>
<p>Syntax highlighting for 20+ languages with copy-to-clipboard:</p>
<pre><code class="language-typescript">// Using Paragon Editor in your app
import { MarkdownEditor } from '@paragon/editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      showToolbar={true}
      showWordCount={true}
      autoReorderChecklist={true}
    />
  );
}</code></pre>

<h2>Date Pills</h2>
<p>Inline date tracking with smart detection. Type <code>@today</code>, <code>@tomorrow</code>, or <code>@Feb 15, 2026@</code>:</p>
<p>Meeting scheduled for <span data-type="date-pill" data-date="${new Date().toISOString().split('T')[0]}" class="date-pill date-today"><span class="date-icon">📅</span><span class="date-text">Today</span></span> &mdash; Deadline: <span data-type="date-pill" data-date="${(() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]; })()}" class="date-pill"><span class="date-icon">📅</span><span class="date-text">Next week</span></span></p>

<h2>Tables</h2>
<p>Full table support with resizable columns:</p>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>WYSIWYG + Raw Mode</td>
      <td>✅</td>
      <td>Toggle between visual and markdown editing</td>
    </tr>
    <tr>
      <td>AI Writing Assistant</td>
      <td>✅</td>
      <td>Provider-agnostic, streaming support</td>
    </tr>
    <tr>
      <td>Find &amp; Replace</td>
      <td>✅</td>
      <td>Works in both WYSIWYG and raw mode</td>
    </tr>
    <tr>
      <td>Date Pills</td>
      <td>✅</td>
      <td>Inline date tracking with smart detection</td>
    </tr>
    <tr>
      <td>Table of Contents</td>
      <td>✅</td>
      <td>Auto-generated sidebar with scroll sync</td>
    </tr>
  </tbody>
</table>

<h2>Blockquotes</h2>
<blockquote>
  <p>"The best way to predict the future is to invent it."</p>
  <p>— Alan Kay</p>
</blockquote>

<h2>Callouts</h2>
<p>Five callout types for structured notes. Type <code>/callout</code> or use <code>Ctrl+Shift+C</code>:</p>
<div data-callout="true" data-type="info"><p>This is an <strong>info</strong> callout — great for tips and helpful context.</p></div>
<div data-callout="true" data-type="todo"><p>This is a <strong>todo</strong> callout — use it for action items and reminders.</p></div>

<hr>

<h2>Keyboard Shortcuts</h2>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Shortcut</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Bold</td><td>Ctrl+B</td></tr>
    <tr><td>Italic</td><td>Ctrl+I</td></tr>
    <tr><td>Underline</td><td>Ctrl+U</td></tr>
    <tr><td>Inline Code</td><td>Ctrl+E</td></tr>
    <tr><td>Link</td><td>Ctrl+K</td></tr>
    <tr><td>Find &amp; Replace</td><td>Ctrl+H</td></tr>
    <tr><td>Date Pill</td><td>Ctrl+Shift+D</td></tr>
    <tr><td>Callout</td><td>Ctrl+Shift+C</td></tr>
  </tbody>
</table>

<hr>

<p>Try typing <code>/</code> to open the command palette, or switch to raw markdown mode using the toolbar toggle!</p>
`;

const MODAL_DEMO_CONTENT = `
<h1>Full-Screen Writing Experience</h1>
<p>This is a <strong>focused writing environment</strong> with the complete Paragon feature set. The editor supports rich text formatting, tables, images, code blocks, AI assistance, and much more.</p>

<h2>Quick Tips</h2>
<ul>
  <li>Type <code>/</code> to open the <strong>command palette</strong> for quick actions</li>
  <li>Select text to see the <strong>floating toolbar</strong> with formatting options</li>
  <li>Use <code>Ctrl+H</code> to open <strong>Find &amp; Replace</strong></li>
  <li>Type <code>@today</code> to insert a <strong>date pill</strong></li>
  <li>Press <code>Tab</code> to indent list items and <code>Shift+Tab</code> to outdent</li>
  <li>Toggle between <strong>WYSIWYG</strong> and <strong>raw markdown</strong> mode in the toolbar</li>
</ul>

<h2>Rich Content Examples</h2>

<h3>Mixed Lists</h3>
<p>Bullet items and task items can live together in the same list:</p>
<ul>
  <li>Project planning overview</li>
  <li data-type="taskItem" data-checked="true">Define project scope</li>
  <li data-type="taskItem" data-checked="true">Set up repository</li>
  <li>Development milestones</li>
  <li data-type="taskItem" data-checked="false">Build authentication module</li>
  <li data-type="taskItem" data-checked="false">Implement API endpoints</li>
  <li data-type="taskItem" data-checked="true">Write unit tests</li>
</ul>

<h3>Collapsible Lists</h3>
<p>Click the chevron icon to collapse/expand nested items:</p>
<ul>
  <li>Frontend Architecture
    <ul>
      <li>React Components
        <ul>
          <li>Layout components (Header, Sidebar, Footer)</li>
          <li>Form components (Input, Select, DatePicker)</li>
          <li>Data display (Table, Card, Chart)</li>
        </ul>
      </li>
      <li>State Management
        <ul>
          <li>Context API for theme and auth</li>
          <li>React Query for server state</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Backend Services
    <ul>
      <li>API Layer
        <ul>
          <li>REST endpoints</li>
          <li>WebSocket connections</li>
        </ul>
      </li>
      <li>Database
        <ul>
          <li>PostgreSQL for relational data</li>
          <li>Redis for caching</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h3>Data Table</h3>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rich Text</td>
      <td>✅ Complete</td>
      <td>Bold, italic, underline, strikethrough, highlight</td>
    </tr>
    <tr>
      <td>Tables</td>
      <td>✅ Complete</td>
      <td>Resizable columns, sortable headers, row drag</td>
    </tr>
    <tr>
      <td>Images</td>
      <td>✅ Complete</td>
      <td>Drag to resize, alignment options, width persistence</td>
    </tr>
    <tr>
      <td>Code Blocks</td>
      <td>✅ Complete</td>
      <td>20+ languages with syntax highlighting</td>
    </tr>
    <tr>
      <td>AI Assistant</td>
      <td>✅ Complete</td>
      <td>Provider-agnostic with streaming support</td>
    </tr>
  </tbody>
</table>

<h3>Images</h3>
<p>Images can be inserted and resized by dragging the corners. Width persists across mode switches:</p>
<img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80" alt="Writing workspace with laptop and coffee" width="600" />
<p><em>A clean workspace inspires great writing. Photo from Unsplash.</em></p>

<h3>Callouts</h3>
<p>Five types of callouts for structured notes:</p>
<div data-callout="true" data-type="info"><p><strong>Info:</strong> Useful tips and helpful context for the reader.</p></div>
<div data-callout="true" data-type="note"><p><strong>Note:</strong> Important information worth remembering.</p></div>
<div data-callout="true" data-type="todo"><p><strong>Todo:</strong> Action items and tasks to complete.</p></div>

<h3>Date Pills</h3>
<p>Track deadlines and dates inline. Click any date pill to change it:</p>
<p>Project kickoff: <span data-type="date-pill" data-date="2026-02-11"></span></p>
<p>First milestone: <span data-type="date-pill" data-date="2026-02-18"></span></p>
<p>Sprint review: <span data-type="date-pill" data-date="2026-02-25"></span></p>

<h3>Code Block</h3>
<pre><code class="language-typescript">// Using Paragon with AI integration
import { MarkdownEditor, type AIActionDefinition } from '@paragon/editor';

const aiActions: AIActionDefinition[] = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar', scope: 'selection' },
  { id: 'summarize', label: 'Summarize', scope: 'selection' },
  { id: 'expand', label: 'Expand on this', scope: 'selection' },
];

function App() {
  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      aiActions={aiActions}
      onAIAction={async (action, text) => {
        const response = await callYourAIProvider(action, text);
        return response; // string or AsyncIterable&lt;string&gt;
      }}
      showTableOfContents={true}
      autoReorderChecklist={true}
    />
  );
}</code></pre>

<hr>

<p>Start editing above to see the editor in action. Happy writing!</p>
`;

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Auto-Detection',
    description: 'Type # for headings, - for lists, ``` for code blocks',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Syntax Highlighting',
    description: 'Code blocks with 20+ languages and copy button',
  },
  {
    icon: <FileCode2 className="w-5 h-5" />,
    title: 'Dual Mode',
    description: 'WYSIWYG and raw markdown with real-time sync',
  },
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: 'AI Assistant',
    description: 'Provider-agnostic AI with streaming support',
  },
  {
    icon: <Table className="w-5 h-5" />,
    title: 'Tables',
    description: 'Resizable columns, sortable headers, row drag',
  },
  {
    icon: <CheckSquare className="w-5 h-5" />,
    title: 'Task Lists',
    description: 'Interactive checkboxes with auto-reorder',
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: 'Date Pills',
    description: 'Inline date tracking with smart detection',
  },
  {
    icon: <Quote className="w-5 h-5" />,
    title: 'Callouts',
    description: 'Info, note, prompt, resources, and todo types',
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: 'Resizable Images',
    description: 'Drag-to-resize with width persistence',
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: 'Find & Replace',
    description: 'Search in both WYSIWYG and raw markdown',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Table of Contents',
    description: 'Auto-generated sidebar with scroll sync',
  },
  {
    icon: <ListTree className="w-5 h-5" />,
    title: 'Collapsible Lists',
    description: 'Nested lists with expand/collapse toggles',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Customizable Theme',
    description: 'CSS variables with dark and light modes',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Error Boundary',
    description: 'Crash recovery with retry and content clear',
  },
  {
    icon: <ArrowUpDown className="w-5 h-5" />,
    title: 'Auto-Reorder',
    description: 'Completed tasks auto-sort to bottom',
  },
  {
    icon: <Keyboard className="w-5 h-5" />,
    title: 'Keyboard First',
    description: 'Comprehensive shortcuts and slash commands',
  },
];

export default function Home() {
  const [content, setContent] = useState(DEMO_CONTENT);
  const [modalContent, setModalContent] = useState(MODAL_DEMO_CONTENT);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalTheme, setModalTheme] = useState<'light' | 'dark'>('light');
  const [showModalProfiler, setShowModalProfiler] = useState(false);
  const [showInlineProfiler, setShowInlineProfiler] = useState(false);
  const handleModalProfilerClose = useCallback(() => setShowModalProfiler(false), []);
  const handleInlineProfilerClose = useCallback(() => setShowInlineProfiler(false), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader actions={
        <>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Try Full Screen</span>
                <span className="sm:hidden">Try</span>
              </Button>
            </DialogTrigger>
                <DialogContent className={`max-w-[98vw] sm:max-w-[95vw] w-full sm:w-[1200px] h-[95vh] sm:h-[90vh] p-0 gap-0 border-border overflow-hidden ${modalTheme === 'light' ? 'bg-white' : 'bg-background'}`} data-theme={modalTheme}>
                  <DialogHeader className="px-6 py-4 border-b border-border bg-card/50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <DialogTitle className="text-base font-semibold">Paragon Editor</DialogTitle>
                          <p className="text-xs text-muted-foreground">Full-screen editing experience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setModalTheme(modalTheme === 'dark' ? 'light' : 'dark')}
                          className="gap-1.5 h-8"
                        >
                          {modalTheme === 'dark' ? (
                            <><Sun className="w-4 h-4" /> Light</>
                          ) : (
                            <><Moon className="w-4 h-4" /> Dark</>
                          )}
                        </Button>
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          Focus Mode
                        </span>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden" style={{ height: 'calc(90vh - 80px)' }}>
                    <MarkdownEditor
                      content={modalContent}
                      onChange={setModalContent}
                      placeholder="Start writing... Use '/' for commands"
                      showToolbar={true}
                      showWordCount={true}
                      autofocus={true}
                      showTableOfContents={true}
                      tocMaxLevel={4}
                      theme={modalTheme}
                      showPerformanceProfiler={showModalProfiler}
                      onPerformanceProfilerClose={handleModalProfilerClose}
                      autoReorderChecklist={true}
                    />
                  </div>
                </DialogContent>
          </Dialog>
        </>
      } />

      {/* Hero Section */}
      <section className="py-8 sm:py-12 border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-6 text-xs font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="w-3 h-3" />
              Built with TipTap & React &mdash; Now with AI
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              The Best Markdown Editor for Your App
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              A professional, feature-rich markdown editor component with AI writing assistant, 
              dual WYSIWYG/raw mode, date pills, Find &amp; Replace, and 30+ features &mdash; 
              designed as a drop-in for Taskmate, Momentum, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="/editor">
                  <Maximize2 className="w-5 h-5" />
                  Try the Editor
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#demo">View Demo Below</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Editor Demo */}
      <section id="demo" className="py-6 sm:py-8 border-b border-border">
        <div className="container">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Try the Editor</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Start typing below. Use <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded">Ctrl+B</kbd> for bold, 
                <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded mx-1">Ctrl+I</kbd> for italic, 
                <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded mx-1">Ctrl+H</kbd> for Find &amp; Replace,
                or type <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded">/</kbd> for commands.
              </p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                  <Maximize2 className="w-4 h-4" />
                  Open Full Screen
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          
          <div className="h-[600px] sm:h-[800px] rounded-lg overflow-hidden border border-border shadow-2xl shadow-black/20">
            <MarkdownEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing... Use '/' for commands"
              showToolbar={true}
              showWordCount={true}
              autofocus={false}
              showTableOfContents={true}
              tocMaxLevel={4}
              theme="light"
              showPerformanceProfiler={showInlineProfiler}
              onPerformanceProfilerClose={handleInlineProfilerClose}
              autoReorderChecklist={true}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-6 sm:py-8 border-b border-border bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-sm sm:text-base font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-8 sm:py-12 border-t border-border bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Quick Start</h3>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-secondary/50 border-b border-border">
                <span className="text-xs font-mono text-muted-foreground">Basic Usage</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">{`import { MarkdownEditor } from '@/components/editor';

function MyApp() {
  const [content, setContent] = useState('');

  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      showToolbar={true}
      showWordCount={true}
      showTableOfContents={true}
      autoReorderChecklist={true}
    />
  );
}`}</code>
              </pre>
            </div>

            <div className="mt-6 bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-secondary/50 border-b border-border">
                <span className="text-xs font-mono text-muted-foreground">With AI Integration</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">{`import { MarkdownEditor, type AIActionDefinition } from '@/components/editor';

const aiActions: AIActionDefinition[] = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar', scope: 'selection' },
  { id: 'summarize', label: 'Summarize', scope: 'selection' },
  { id: 'expand', label: 'Expand on this', scope: 'selection' },
  { id: 'custom', label: 'Custom prompt...', scope: 'both', showCustomPrompt: true },
];

function MyApp() {
  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      aiActions={aiActions}
      onAIAction={async (action, text, customPrompt) => {
        // Call your AI provider — return string or AsyncIterable<string>
        return await callYourAIProvider(action, text, customPrompt);
      }}
    />
  );
}`}</code>
              </pre>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-foreground mb-3">Key Props</h4>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2 text-left font-medium text-foreground">Prop</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Type</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Default</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">content</td>
                      <td className="px-4 py-2 text-muted-foreground">string</td>
                      <td className="px-4 py-2 text-muted-foreground">''</td>
                      <td className="px-4 py-2 text-muted-foreground">Initial HTML content</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onChange</td>
                      <td className="px-4 py-2 text-muted-foreground">function</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">Callback when HTML content changes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onMarkdownChange</td>
                      <td className="px-4 py-2 text-muted-foreground">function</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">Callback when raw markdown changes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">theme</td>
                      <td className="px-4 py-2 text-muted-foreground">'dark' | 'light'</td>
                      <td className="px-4 py-2 text-muted-foreground">'dark'</td>
                      <td className="px-4 py-2 text-muted-foreground">Theme mode</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">showToolbar</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show top toolbar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">showTableOfContents</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">false</td>
                      <td className="px-4 py-2 text-muted-foreground">Show TOC sidebar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">autoReorderChecklist</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">false</td>
                      <td className="px-4 py-2 text-muted-foreground">Auto-sort completed tasks to bottom</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">aiActions</td>
                      <td className="px-4 py-2 text-muted-foreground">AIActionDefinition[]</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">AI actions for sparkles menu</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onAIAction</td>
                      <td className="px-4 py-2 text-muted-foreground">AIActionHandler</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">Handler for AI actions (streaming or sync)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onImageUpload</td>
                      <td className="px-4 py-2 text-muted-foreground">function</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">External image upload handler</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onEditorError</td>
                      <td className="px-4 py-2 text-muted-foreground">function</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">Error boundary crash callback</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">disabledFeatures</td>
                      <td className="px-4 py-2 text-muted-foreground">object</td>
                      <td className="px-4 py-2 text-muted-foreground">{'{}'}</td>
                      <td className="px-4 py-2 text-muted-foreground">Disable specific features selectively</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-foreground mb-2">Standalone Editor Route</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Access a full-page, distraction-free editor at <code className="px-1.5 py-0.5 rounded bg-secondary text-primary font-mono text-xs">/editor</code>. Configure it via URL query parameters:
              </p>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2 text-left font-medium text-foreground">Parameter</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Values</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Default</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">theme</td>
                      <td className="px-4 py-2 text-muted-foreground">dark | light</td>
                      <td className="px-4 py-2 text-muted-foreground">light</td>
                      <td className="px-4 py-2 text-muted-foreground">Editor color theme</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">toc</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show table of contents sidebar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">tocMaxLevel</td>
                      <td className="px-4 py-2 text-muted-foreground">1–6</td>
                      <td className="px-4 py-2 text-muted-foreground">4</td>
                      <td className="px-4 py-2 text-muted-foreground">Max heading depth in ToC</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">toolbar</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show the top toolbar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">wordcount</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show word count in footer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">autofocus</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Auto-focus on page load</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">reorder</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Auto-sort completed tasks to bottom</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">editable</td>
                      <td className="px-4 py-2 text-muted-foreground">true | false</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Allow content editing</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">placeholder</td>
                      <td className="px-4 py-2 text-muted-foreground">any text</td>
                      <td className="px-4 py-2 text-muted-foreground">Start writing...</td>
                      <td className="px-4 py-2 text-muted-foreground">Custom placeholder text</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">Example:</p>
                <code className="block px-3 py-2 rounded bg-secondary text-primary font-mono text-xs">/editor?theme=dark&amp;toc=false&amp;toolbar=true</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Built with TipTap, React, and TypeScript</p>
            <p>Designed for Taskmate, Momentum, and more</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
