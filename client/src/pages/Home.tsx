import { MarkdownEditor } from '@/components/editor';
import { useState } from 'react';
import { FileText, Keyboard, Palette, Zap, Code2, Table, CheckSquare, Quote, Image, Sparkles } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Professional markdown editor showcase page
 * Multi-layer dark theme with depth through layering
 * Vibrant cyan accent for interactive elements
 */

const DEMO_CONTENT = `
<h1>Welcome to Manus Markdown Editor</h1>
<p>A <strong>professional</strong>, feature-rich markdown editor designed as a drop-in component for note-taking applications.</p>

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

<p>Try typing <code>/</code> to open the command palette!</p>
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
    description: 'Info, warning, error, and success callouts',
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: 'Resizable Images',
    description: 'Drag to resize inline images',
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Manus Markdown Editor</h1>
                <p className="text-xs text-muted-foreground">Drop-in editor for note-taking apps</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-primary/10 text-primary rounded-full">
              <Sparkles className="w-3 h-3" />
              Built with TipTap & React
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Best Markdown Editor for Your App
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A professional, feature-rich markdown editor component designed as a drop-in for 
              note-taking applications like Taskmate, Momentum, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 border-b border-border bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Demo */}
      <section className="py-8">
        <div className="container">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Try the Editor</h3>
            <p className="text-sm text-muted-foreground">
              Start typing below. Use <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded">Ctrl+B</kbd> for bold, 
              <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded mx-1">Ctrl+I</kbd> for italic, 
              or type <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded">/</kbd> to open the command palette.
            </p>
          </div>
          
          <div className="h-[600px] rounded-lg overflow-hidden shadow-2xl shadow-black/20">
            <MarkdownEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing... Use '/' for commands"
              showToolbar={true}
              showWordCount={true}
              autofocus={false}
            />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-12 border-t border-border bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">Quick Start</h3>
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
