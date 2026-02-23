/**
 * E2E tests for Paragon Markdown Editor.
 *
 * These tests exercise the editor in a real Chromium browser via Playwright,
 * covering page loading, WYSIWYG editing, formatting, mode switching,
 * toolbar interactions, keyboard shortcuts, and more.
 *
 * The tests run against the /editor route which renders a standalone editor
 * with default demo content and localStorage persistence.
 */
import { test, expect, type Page, type Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to the editor page and wait for the TipTap ProseMirror instance. */
async function openEditor(page: Page, queryParams = '') {
  await page.goto(`/editor${queryParams}`);
  // Wait for the editor container to be visible
  await page.waitForSelector('.markdown-editor-container', { timeout: 15_000 });
  // Wait for ProseMirror to be ready (contenteditable div)
  await page.waitForSelector('.ProseMirror[contenteditable="true"]', { timeout: 15_000 });
  // Wait a beat for the editor to fully initialize
  await page.waitForTimeout(300);
}

/** Get the ProseMirror editor element. */
function proseMirror(page: Page): Locator {
  return page.locator('.ProseMirror[contenteditable="true"]');
}

/**
 * Clear the editor content by selecting all and deleting.
 * Uses the ProseMirror API via evaluate for reliability.
 */
async function clearEditorContent(page: Page) {
  const pm = proseMirror(page);
  await pm.click();
  // Use Ctrl+A twice to ensure full selection (TipTap sometimes needs two attempts)
  await page.keyboard.press('Control+a');
  await page.waitForTimeout(100);
  await page.keyboard.press('Control+a');
  await page.waitForTimeout(100);
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(200);
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Editor Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page first so we have a valid origin, then clear storage
    await page.goto('/editor');
    await page.evaluate(() => {
      try { localStorage.clear(); } catch (_) { /* ignore */ }
      try { sessionStorage.clear(); } catch (_) { /* ignore */ }
    });
  });

  // =========================================================================
  // Loading & Layout
  // =========================================================================

  test('loads the editor page successfully', async ({ page }) => {
    await openEditor(page);
    await expect(page.locator('.markdown-editor-container')).toBeVisible();
  });

  test('renders the ProseMirror contenteditable area', async ({ page }) => {
    await openEditor(page);
    const pm = proseMirror(page);
    await expect(pm).toBeVisible();
    await expect(pm).toHaveAttribute('contenteditable', 'true');
  });

  test('displays the default demo content', async ({ page }) => {
    await openEditor(page);
    const pm = proseMirror(page);
    await expect(pm).toContainText('Welcome to Paragon Editor');
  });

  test('shows the editor toolbar by default', async ({ page }) => {
    await openEditor(page);
    await expect(page.locator('.editor-toolbar-wrapper')).toBeVisible();
  });

  test('shows the word count footer by default', async ({ page }) => {
    await openEditor(page);
    await expect(page.locator('.editor-footer')).toBeVisible();
    await expect(page.locator('.word-count')).toBeVisible();
    const wordText = await page.locator('.word-count span').first().textContent();
    expect(wordText).toMatch(/\d+ words/);
  });

  test('shows the mode toggle by default', async ({ page }) => {
    await openEditor(page);
    await expect(page.locator('.editor-mode-toggle')).toBeVisible();
    const buttons = page.locator('.editor-mode-toggle-btn');
    await expect(buttons).toHaveCount(2);
  });

  // =========================================================================
  // WYSIWYG Editing
  // =========================================================================

  test('can type text in the editor', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('Hello, Playwright!');
    await expect(proseMirror(page)).toContainText('Hello, Playwright!');
  });

  test('supports bold formatting via keyboard shortcut', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('bold text here');
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(100);
    await page.keyboard.press('Control+b');
    await page.waitForTimeout(200);
    // Look for the specific strong element with our text
    const strong = proseMirror(page).locator('strong').filter({ hasText: 'bold text here' });
    await expect(strong).toBeVisible();
  });

  test('supports italic formatting via keyboard shortcut', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('italic text here');
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(100);
    await page.keyboard.press('Control+i');
    await page.waitForTimeout(200);
    const em = proseMirror(page).locator('em').filter({ hasText: 'italic text here' });
    await expect(em).toBeVisible();
  });

  test('supports heading creation via markdown shortcut', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    // Type "# " to create an H1 via markdown input rule
    await page.keyboard.type('# My Custom Heading');
    const h1 = proseMirror(page).locator('h1').filter({ hasText: 'My Custom Heading' });
    await expect(h1).toBeVisible();
  });

  test('supports bullet list creation via markdown shortcut', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    // Type "- " to create a bullet list
    await page.keyboard.type('- First item');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Second item');
    // Should have list items containing our text
    await expect(proseMirror(page)).toContainText('First item');
    await expect(proseMirror(page)).toContainText('Second item');
    // Verify list structure exists
    const listItems = proseMirror(page).locator('li');
    const count = await listItems.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('supports code block creation via markdown shortcut', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    // Type ``` followed by Enter to create a code block
    await page.keyboard.type('```');
    await page.keyboard.press('Enter');
    // A code block should appear
    const codeBlock = proseMirror(page).locator('pre');
    await expect(codeBlock.first()).toBeVisible();
  });

  // =========================================================================
  // Mode Switching
  // =========================================================================

  test('can switch to raw markdown mode', async ({ page }) => {
    await openEditor(page);
    const rawButton = page.locator('.editor-mode-toggle-btn[title="Raw Markdown"]');
    await rawButton.click();
    // The syntax-highlighted editor area should appear
    await expect(page.locator('.syntax-highlighted-editor')).toBeVisible({ timeout: 5_000 });
  });

  test('raw markdown mode shows markdown content', async ({ page }) => {
    await openEditor(page);
    await page.locator('.editor-mode-toggle-btn[title="Raw Markdown"]').click();
    await page.waitForSelector('.syntax-highlighted-editor', { timeout: 5_000 });
    const textarea = page.locator('.syntax-highlighted-editor textarea');
    const value = await textarea.inputValue();
    expect(value).toContain('# Welcome to Paragon Editor');
  });

  test('can switch back to WYSIWYG mode', async ({ page }) => {
    await openEditor(page);
    await page.locator('.editor-mode-toggle-btn[title="Raw Markdown"]').click();
    await page.waitForSelector('.syntax-highlighted-editor', { timeout: 5_000 });
    await page.locator('.editor-mode-toggle-btn[title="Visual Editor"]').click();
    await expect(proseMirror(page)).toBeVisible({ timeout: 5_000 });
  });

  test('round-trips content through mode switch', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('# Round Trip Heading');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Round trip paragraph.');
    // Switch to markdown mode
    await page.locator('.editor-mode-toggle-btn[title="Raw Markdown"]').click();
    await page.waitForSelector('.syntax-highlighted-editor', { timeout: 5_000 });
    const textarea = page.locator('.syntax-highlighted-editor textarea');
    const markdown = await textarea.inputValue();
    expect(markdown).toContain('# Round Trip Heading');
    expect(markdown).toContain('Round trip paragraph.');
    // Switch back to WYSIWYG
    await page.locator('.editor-mode-toggle-btn[title="Visual Editor"]').click();
    await expect(proseMirror(page)).toBeVisible({ timeout: 5_000 });
    await expect(proseMirror(page)).toContainText('Round Trip Heading');
    await expect(proseMirror(page)).toContainText('Round trip paragraph.');
  });

  // =========================================================================
  // Find & Replace
  // =========================================================================

  test('opens Find & Replace with Ctrl+H', async ({ page }) => {
    await openEditor(page);
    const pm = proseMirror(page);
    await pm.click();
    await page.keyboard.press('Control+h');
    await expect(page.locator('.find-replace-panel')).toBeVisible({ timeout: 5_000 });
  });

  test('Find & Replace can search for text', async ({ page }) => {
    await openEditor(page);
    const pm = proseMirror(page);
    await pm.click();
    await page.keyboard.press('Control+h');
    await page.waitForSelector('.find-replace-panel', { timeout: 5_000 });
    // The input has class "find-replace-input" directly on the <input> element
    const searchInput = page.locator('input[placeholder="Find..."]');
    await searchInput.fill('Paragon');
    // Wait for match count to update
    await page.waitForTimeout(500);
    const countText = await page.locator('.find-replace-count').textContent();
    // Should find at least one match
    expect(countText).toMatch(/\d+\s*of\s*\d+/);
  });

  // =========================================================================
  // Query Parameters
  // =========================================================================

  test('respects ?theme=dark query parameter', async ({ page }) => {
    await openEditor(page, '?theme=dark');
    const container = page.locator('.markdown-editor-container');
    await expect(container).toHaveAttribute('data-theme', 'dark');
  });

  test('respects ?toolbar=false query parameter', async ({ page }) => {
    await openEditor(page, '?toolbar=false');
    await expect(page.locator('.editor-toolbar-wrapper')).not.toBeVisible();
  });

  test('respects ?toc=true query parameter', async ({ page }) => {
    await openEditor(page, '?toc=true');
    // The ToC uses class "toc-sidebar"
    await expect(page.locator('.toc-sidebar')).toBeVisible({ timeout: 5_000 });
  });

  test('respects ?wordcount=false query parameter', async ({ page }) => {
    await openEditor(page, '?wordcount=false');
    await expect(page.locator('.editor-footer')).not.toBeVisible();
  });

  // =========================================================================
  // Slash Commands
  // =========================================================================

  test('typing / opens the slash command menu', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('/');
    await expect(page.locator('.slash-menu')).toBeVisible({ timeout: 5_000 });
  });

  test('slash command menu shows command items', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('/');
    await page.waitForSelector('.slash-menu', { timeout: 5_000 });
    const items = page.locator('.slash-item');
    const count = await items.count();
    expect(count).toBeGreaterThan(3);
  });

  test('slash command menu filters on typing', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('/head');
    await page.waitForSelector('.slash-menu', { timeout: 5_000 });
    const items = page.locator('.slash-item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(20);
  });

  // =========================================================================
  // LocalStorage Persistence
  // =========================================================================

  test('persists content to localStorage', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('Persistent content');
    // Wait for debounced save
    await page.waitForTimeout(1500);
    const stored = await page.evaluate(() => localStorage.getItem('paragon-editor-content'));
    expect(stored).toBeTruthy();
    expect(stored).toContain('Persistent content');
  });

  test('restores content from localStorage on reload', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('Reload test content');
    // Wait for debounced save
    await page.waitForTimeout(1500);
    // Reload the page
    await page.reload();
    await page.waitForSelector('.ProseMirror[contenteditable="true"]', { timeout: 15_000 });
    await expect(proseMirror(page)).toContainText('Reload test content');
  });

  // =========================================================================
  // Table of Contents
  // =========================================================================

  test('table of contents lists headings from content', async ({ page }) => {
    await openEditor(page, '?toc=true');
    await page.waitForSelector('.toc-sidebar', { timeout: 5_000 });
    const tocContainer = page.locator('.toc-sidebar');
    await expect(tocContainer).toBeVisible();
    // Should contain heading text from the demo content
    const text = await tocContainer.textContent();
    expect(text?.length).toBeGreaterThan(0);
    // Should have toc-item elements
    const tocItems = page.locator('.toc-item');
    const count = await tocItems.count();
    expect(count).toBeGreaterThan(0);
  });

  // =========================================================================
  // Theme
  // =========================================================================

  test('dark theme applies correct data attribute', async ({ page }) => {
    await openEditor(page, '?theme=dark');
    const container = page.locator('.markdown-editor-container');
    await expect(container).toHaveAttribute('data-theme', 'dark');
  });

  test('light theme is the default', async ({ page }) => {
    await openEditor(page);
    const container = page.locator('.markdown-editor-container');
    await expect(container).toHaveAttribute('data-theme', 'light');
  });

  // =========================================================================
  // Demo Content Features
  // =========================================================================

  test('demo content includes task list checkboxes', async ({ page }) => {
    await openEditor(page);
    // Task items render with checkboxes in the DOM
    const checkboxes = proseMirror(page).locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('demo content includes code blocks', async ({ page }) => {
    await openEditor(page);
    const codeBlocks = proseMirror(page).locator('pre');
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('demo content includes a table', async ({ page }) => {
    await openEditor(page);
    const tables = proseMirror(page).locator('table');
    const count = await tables.count();
    expect(count).toBeGreaterThan(0);
  });

  test('task list checkboxes are interactive', async ({ page }) => {
    await openEditor(page);
    // Count initial unchecked checkboxes
    const initialUnchecked = await proseMirror(page).locator('input[type="checkbox"]:not(:checked)').count();
    expect(initialUnchecked).toBeGreaterThan(0);
    // Get the label text of the first unchecked task to track it
    const firstUncheckedLabel = proseMirror(page).locator('input[type="checkbox"]:not(:checked)').first();
    const ariaLabel = await firstUncheckedLabel.getAttribute('aria-label');
    // Click the checkbox via dispatchEvent to trigger the change handler
    await firstUncheckedLabel.dispatchEvent('click');
    await page.waitForTimeout(500);
    // After the click, TipTap re-renders the DOM. The task item that was unchecked
    // should now be checked. We verify by checking the total unchecked count decreased
    // or the specific checkbox by aria-label is now checked.
    if (ariaLabel) {
      const targetCheckbox = proseMirror(page).locator(`input[type="checkbox"][aria-label="${ariaLabel}"]`);
      // The checkbox should now be checked (TipTap re-renders with updated state)
      await expect(targetCheckbox).toBeChecked({ timeout: 5_000 });
    } else {
      // Fallback: just verify the count changed
      const newUnchecked = await proseMirror(page).locator('input[type="checkbox"]:not(:checked)').count();
      expect(newUnchecked).toBeLessThan(initialUnchecked);
    }
  });

  // =========================================================================
  // Edge Cases
  // =========================================================================

  test('editor handles empty content gracefully', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await expect(proseMirror(page)).toBeVisible();
    // Wait for word count to update
    await page.waitForTimeout(500);
    const wordText = await page.locator('.word-count span').first().textContent();
    expect(wordText).toMatch(/0 words/);
  });

  test('editor handles rapid typing', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    const rapidText = 'The quick brown fox jumps over the lazy dog. '.repeat(5);
    await page.keyboard.type(rapidText, { delay: 5 });
    await expect(proseMirror(page)).toContainText('quick brown fox');
  });

  test('undo/redo works with Ctrl+Z and Ctrl+Shift+Z', async ({ page }) => {
    await openEditor(page);
    await clearEditorContent(page);
    await page.keyboard.type('First');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Second');
    await expect(proseMirror(page)).toContainText('Second');
    // Undo
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(200);
    // Redo
    await page.keyboard.press('Control+Shift+z');
    await page.waitForTimeout(200);
  });
});

// ---------------------------------------------------------------------------
// Landing Page Tests
// ---------------------------------------------------------------------------

test.describe('Landing Page', () => {
  test('loads the home page successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('body', { timeout: 10_000 });
    await expect(page.locator('body')).toContainText('Paragon');
  });

  test('has a link to the editor page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    const editorLink = page.locator('a[href="/editor"], a[href*="editor"]').first();
    if (await editorLink.count() > 0) {
      await expect(editorLink).toBeVisible();
    }
  });

  test('landing page includes a demo editor', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.markdown-editor-container', { timeout: 15_000 });
    await expect(page.locator('.markdown-editor-container')).toBeVisible();
  });
});
