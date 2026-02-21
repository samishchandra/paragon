/**
 * main.tsx — Entry point for momentum-foundation.
 *
 * Configures the adapter registry with foundation defaults
 * (NoAuth, BrowserDB, DisabledAI, NoBackup, Foundation theme),
 * then renders the React app.
 *
 * Embedding repos override this file to register their own adapters.
 */
import { createRoot } from "react-dom/client";
import { configureAdapters } from "./adapters/registry";
import { NoAuthAdapter } from "./adapters/auth/noAuth";
import { BrowserDatabaseAdapter } from "./adapters/database/browser";
import { DisabledAIAdapter } from "./adapters/ai/disabled";
import { NoBackupAdapter } from "./adapters/backup/none";
import { foundationTheme } from "./adapters/theme/foundation";
import { applyTheme } from "./lib/themeInit";
import App from "./App";
import "./index.css";

// ── Configure adapters with foundation defaults ──
const browserDb = new BrowserDatabaseAdapter();

configureAdapters({
  auth: new NoAuthAdapter(),
  database: browserDb,
  ai: new DisabledAIAdapter(),
  backup: new NoBackupAdapter(),
  theme: foundationTheme,
});

// Apply theme CSS variables
applyTheme();

// Initialize the database before rendering
browserDb.initialize().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  // Render anyway — the app can show error states
  createRoot(document.getElementById("root")!).render(<App />);
});
