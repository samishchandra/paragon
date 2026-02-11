import { MarkdownEditor } from '@/components/editor';
import { useState, useCallback } from 'react';
import { FileText, Keyboard, Palette, Zap, Code2, Table, CheckSquare, Quote, Image, Sparkles, X, Maximize2, Moon, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/*
 * DESIGN: Dark Mode Craftsman
 * Professional markdown editor showcase page
 * Multi-layer dark theme with depth through layering
 * Vibrant cyan accent for interactive elements
 */

const DEMO_CONTENT = `
<h1>Welcome to Manus Markdown Editor</h1>
<p>A <strong>professional</strong>, feature-rich markdown editor designed as a drop-in component for note-taking applications. Visit <a href="https://github.com/tiptap/tiptap">TipTap on GitHub</a> for more details.</p>

<h2>Features at a Glance</h2>
<p>This editor supports all the markdown features you need:</p>

<h3>Text Formatting</h3>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><s>Strikethrough</s> for corrections</li>
  <li><code>inline code</code> for technical terms</li>
  <li><mark>Highlighted text</mark> for important notes</li>
</ul>

<h3>Lists and Tasks</h3>

<h4>Bullet List</h4>
<ul>
  <li>First item</li>
  <li>Second item
    <ul>
      <li>Nested item</li>
      <li>Another nested item</li>
    </ul>
  </li>
  <li>Third item</li>
</ul>

<h4>Task List</h4>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Plan the project</li>
  <li data-type="taskItem" data-checked="true">Set up the development environment</li>
  <li data-type="taskItem" data-checked="false">Implement core features</li>
  <li data-type="taskItem" data-checked="false">Write documentation</li>
</ul>

<h3>Code Blocks</h3>
<pre><code class="language-javascript">// Syntax highlighted code blocks
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { message: 'Welcome to the editor' };
}

greet('Developer');</code></pre>

<h3>Blockquotes</h3>
<blockquote>
  <p>"The best way to predict the future is to invent it."</p>
  <p>— Alan Kay</p>
</blockquote>

<hr>

<h2>Keyboard Shortcuts</h2>
<p>Use these shortcuts for faster editing:</p>

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Shortcut</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bold</td>
      <td>Ctrl+B</td>
    </tr>
    <tr>
      <td>Italic</td>
      <td>Ctrl+I</td>
    </tr>
    <tr>
      <td>Underline</td>
      <td>Ctrl+U</td>
    </tr>
    <tr>
      <td>Code</td>
      <td>Ctrl+E</td>
    </tr>
    <tr>
      <td>Link</td>
      <td>Ctrl+K</td>
    </tr>
    <tr>
      <td>Undo</td>
      <td>Ctrl+Z</td>
    </tr>
    <tr>
      <td>Redo</td>
      <td>Ctrl+Shift+Z</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Date Pills</h2>
<p>Insert date pills for task tracking. Type <code>@today</code>, <code>@tomorrow</code>, or <code>@Jan15</code> followed by a space:</p>
<p>Meeting scheduled for <span data-type="date-pill" data-date="${new Date().toISOString().split('T')[0]}" class="date-pill date-today"><span class="date-icon">📅</span><span class="date-text">Today</span></span></p>
<p>Deadline: <span data-type="date-pill" data-date="${(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })()}" class="date-pill date-upcoming"><span class="date-icon">📅</span><span class="date-text">Tomorrow</span></span></p>

<hr>

<p>Try typing <code>/</code> to open the command palette, or <code>@today</code> to insert a date!</p>
`;

const MODAL_DEMO_CONTENT = `
<h1>Start Writing Here</h1>
<p>This is a <strong>focused writing environment</strong> designed for distraction-free writing. The editor supports rich text formatting, tables, images, code blocks, and much more. Try out all the features below!</p>

<h2>Quick Tips</h2>
<p>Getting started is easy. Here are some helpful shortcuts and features to boost your productivity:</p>
<ul>
  <li>Type <code>/</code> to open the command palette for quick actions</li>
  <li>Use <code>Ctrl+B</code> for <strong>bold</strong> and <code>Ctrl+I</code> for <em>italic</em></li>
  <li>Select text to see the floating toolbar with formatting options</li>
  <li>Press <code>Tab</code> to indent list items and <code>Shift+Tab</code> to outdent</li>
</ul>

<h2>Rich Content Examples</h2>

<h3>Paragraph Text</h3>
<p>The Manus Markdown Editor is built with <strong>TipTap</strong> and <strong>React</strong>, providing a seamless editing experience. It supports all standard markdown features while offering a <em>WYSIWYG interface</em> that makes writing intuitive and enjoyable.</p>
<p>Whether you're writing documentation, taking notes, or drafting blog posts, this editor adapts to your workflow. The clean interface keeps you focused on what matters most: <mark>your content</mark>.</p>

<h3>Data Table</h3>
<p>Tables are fully supported with resizable columns and sortable headers:</p>
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
      <td>Drag to resize, alignment options</td>
    </tr>
    <tr>
      <td>Code Blocks</td>
      <td>✅ Complete</td>
      <td>20+ languages with syntax highlighting</td>
    </tr>
    <tr>
      <td>Task Lists</td>
      <td>✅ Complete</td>
      <td>Interactive checkboxes with nesting</td>
    </tr>
  </tbody>
</table>

<h3>Images</h3>
<p>Images can be inserted and resized by dragging the corners:</p>
<img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80" alt="Writing workspace with laptop and coffee" width="600" />
<p><em>A clean workspace inspires great writing. Photo from Unsplash.</em></p>

<h3>Task Lists</h3>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true">Set up the editor environment</li>
  <li data-type="taskItem" data-checked="true">Learn the keyboard shortcuts</li>
  <li data-type="taskItem" data-checked="false">Create a new heading</li>
  <li data-type="taskItem" data-checked="false">Add a code block</li>
  <li data-type="taskItem" data-checked="false">Insert a table</li>
  <li data-type="taskItem" data-checked="false">Try a callout</li>
</ul>

<h3>Code Block</h3>
<pre><code class="language-typescript">// Example: Using the Manus Markdown Editor
import { MarkdownEditor } from '@manus/editor';

function App() {
  const [content, setContent] = useState('');
  
  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      showToolbar={true}
      showWordCount={true}
    />
  );
}

export default App;</code></pre>

<h3>Mixed Lists</h3>
<p>Lists can mix different item types — bullet items and task items can live together in the same list:</p>
<ul>
  <li>Project planning overview</li>
  <li data-type="taskItem" data-checked="true">Define project scope</li>
  <li data-type="taskItem" data-checked="true">Set up repository</li>
  <li>Development milestones</li>
  <li data-type="taskItem" data-checked="false">Build authentication module</li>
  <li data-type="taskItem" data-checked="false">Implement API endpoints</li>
  <li data-type="taskItem" data-checked="true">Write unit tests</li>
  <li>Deployment checklist</li>
  <li data-type="taskItem" data-checked="false">Configure CI/CD pipeline</li>
  <li data-type="taskItem" data-checked="false">Set up monitoring</li>
</ul>

<h3>Collapsible Lists</h3>
<p>List items with nested children can be collapsed and expanded by clicking the chevron icon. Try clicking the arrows next to the items below:</p>
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
      <li>Styling
        <ul>
          <li>Tailwind CSS utility classes</li>
          <li>CSS variables for theming</li>
          <li>Responsive breakpoints</li>
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
          <li>Authentication middleware</li>
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
  <li>DevOps & Infrastructure
    <ul>
      <li>Docker containerization</li>
      <li>Kubernetes orchestration</li>
      <li>Terraform for infrastructure as code</li>
    </ul>
  </li>
</ul>

<h3>Callout</h3>
<blockquote>
  <p>💡 <strong>Pro Tip:</strong> Press <code>Escape</code> or click outside to close this modal. Your content is automatically saved to local storage, so you won't lose your work!</p>
</blockquote>

<hr>

<p>Start editing above to see the editor in action. Happy writing! ✨</p>
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
    description: 'Beautiful code blocks with 20+ language support',
  },
  {
    icon: <Table className="w-5 h-5" />,
    title: 'Tables',
    description: 'Full table support with resizable columns',
  },
  {
    icon: <CheckSquare className="w-5 h-5" />,
    title: 'Task Lists',
    description: 'Interactive checkboxes for todo items',
  },
  {
    icon: <Quote className="w-5 h-5" />,
    title: 'Callouts',
    description: 'Info, note, prompt, resources, and todo callouts',
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: 'Image Upload',
    description: 'Drag-drop or paste images directly',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Customizable Theme',
    description: 'CSS variables for easy theming',
  },
  {
    icon: <Keyboard className="w-5 h-5" />,
    title: 'Keyboard First',
    description: 'Comprehensive keyboard shortcuts',
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate">Manus Markdown Editor</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Drop-in editor for note-taking apps</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
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
                          <DialogTitle className="text-base font-semibold">Manus Markdown Editor</DialogTitle>
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
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hidden sm:inline">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-6 text-xs font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="w-3 h-3" />
              Built with TipTap & React
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              The Best Markdown Editor for Your App
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              A professional, feature-rich markdown editor component designed as a drop-in for 
              note-taking applications like Taskmate, Momentum, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Maximize2 className="w-5 h-5" />
                    Try the Editor
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button variant="outline" size="lg" asChild>
                <a href="#demo">View Demo Below</a>
              </Button>
            </div>
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

      {/* Editor Demo */}
      <section id="demo" className="py-6 sm:py-8">
        <div className="container">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Try the Editor</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Start typing below. Use <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded">Ctrl+B</kbd> for bold, 
                <kbd className="px-1 sm:px-1.5 py-0.5 text-xs bg-secondary rounded mx-1">Ctrl+I</kbd> for italic, 
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
          
          <div className="h-[400px] sm:h-[600px] rounded-lg overflow-hidden border border-border shadow-2xl shadow-black/20">
            <MarkdownEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing... Use '/' for commands"
              showToolbar={true}
              showWordCount={true}
              autofocus={false}
              showTableOfContents={true}
              tocMaxLevel={4}
              showPerformanceProfiler={showInlineProfiler}
              onPerformanceProfilerClose={handleInlineProfilerClose}
            />
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
                <span className="text-xs font-mono text-muted-foreground">Usage Example</span>
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
    />
  );
}`}</code>
              </pre>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-foreground mb-3">Available Props</h4>
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
                      <td className="px-4 py-2 text-muted-foreground">Callback when content changes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">placeholder</td>
                      <td className="px-4 py-2 text-muted-foreground">string</td>
                      <td className="px-4 py-2 text-muted-foreground">'Start writing...'</td>
                      <td className="px-4 py-2 text-muted-foreground">Placeholder text</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">showToolbar</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show top toolbar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">showWordCount</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Show word count footer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">editable</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">true</td>
                      <td className="px-4 py-2 text-muted-foreground">Enable editing</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">autofocus</td>
                      <td className="px-4 py-2 text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-muted-foreground">false</td>
                      <td className="px-4 py-2 text-muted-foreground">Auto-focus on mount</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">maxImageSize</td>
                      <td className="px-4 py-2 text-muted-foreground">number</td>
                      <td className="px-4 py-2 text-muted-foreground">5MB</td>
                      <td className="px-4 py-2 text-muted-foreground">Max image upload size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-primary">onImageUploadError</td>
                      <td className="px-4 py-2 text-muted-foreground">function</td>
                      <td className="px-4 py-2 text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-muted-foreground">Callback on upload error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Built with TipTap, React, and Tailwind CSS</p>
            <p>Designed for Taskmate, Momentum, and more</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
