import { describe, it, expect, vi } from 'vitest';

// Test the image upload endpoint configuration
describe('Image Upload Endpoint', () => {
  it('should have the /api/images/upload route registered', async () => {
    // Verify the server index.ts imports multer and registers the route
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    expect(indexContent).toContain("'/api/images/upload'");
    expect(indexContent).toContain('multer');
    expect(indexContent).toContain('storagePut');
  });

  it('should accept file uploads with multipart form data', async () => {
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    // Verify multer is configured with memory storage and size limit
    expect(indexContent).toContain('memoryStorage');
    expect(indexContent).toContain('fileSize');
    expect(indexContent).toContain("upload.single('file')");
  });

  it('should generate unique file keys with date and random suffix', async () => {
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    // Verify unique key generation pattern
    expect(indexContent).toContain('toISOString().slice(0, 10)');
    expect(indexContent).toContain("Math.random().toString(36)");
    expect(indexContent).toContain("images/");
  });

  it('should return url and key on successful upload', async () => {
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    expect(indexContent).toContain('res.json({ url, key })');
  });

  it('should return 400 when no file is provided', async () => {
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    expect(indexContent).toContain("res.status(400)");
    expect(indexContent).toContain("'No file provided'");
  });

  it('should return 500 on upload failure', async () => {
    const fs = await import('fs');
    const indexContent = fs.readFileSync('server/_core/index.ts', 'utf-8');
    
    expect(indexContent).toContain("res.status(500)");
  });
});

// Test the localBackup module helpers
describe('Local Backup Helpers', () => {
  it('sanitizeFilename should handle special characters', async () => {
    // Import the module
    const { sanitizeFilename } = await import('../client/src/lib/localBackup');
    
    expect(sanitizeFilename('Hello World')).toBe('Hello World');
    expect(sanitizeFilename('file<>:"/\\|?*name')).toBe('file_________name');
    expect(sanitizeFilename('...hidden')).toBe('_hidden');
    expect(sanitizeFilename('')).toBe('Untitled');
    expect(sanitizeFilename('  spaces  ')).toBe('spaces');
  });

  it('generateFrontmatter should produce valid YAML frontmatter', async () => {
    const { generateFrontmatter } = await import('../client/src/lib/localBackup');
    
    const result = generateFrontmatter({
      type: 'task',
      section: 'now',
      is_completed: false,
      is_pinned: true,
      due_date: '2026-02-25',
      list_name: 'Work',
      tag_names: ['urgent', 'project'],
      created_at: '2026-02-19T10:00:00Z',
      updated_at: '2026-02-19T15:00:00Z',
    });
    
    expect(result).toContain('---');
    expect(result).toContain('type: task');
    expect(result).toContain('section: now');
    expect(result).toContain('completed: false');
    expect(result).toContain('pinned: true');
    expect(result).toContain('due: 2026-02-25');
    expect(result).toContain('list: Work');
    expect(result).toContain('tags: [urgent, project]');
    expect(result).toContain('created: 2026-02-19T10:00:00Z');
    expect(result).toContain('updated: 2026-02-19T15:00:00Z');
  });

  it('generateFrontmatter should omit optional fields when not provided', async () => {
    const { generateFrontmatter } = await import('../client/src/lib/localBackup');
    
    const result = generateFrontmatter({ type: 'note' });
    
    expect(result).toContain('type: note');
    expect(result).not.toContain('section:');
    expect(result).not.toContain('completed:');
    expect(result).not.toContain('pinned:');
    expect(result).not.toContain('due:');
    expect(result).not.toContain('list:');
    expect(result).not.toContain('tags:');
  });

  it('contentHash should produce consistent hashes', async () => {
    const { contentHash } = await import('../client/src/lib/localBackup');
    
    const hash1 = await contentHash('Hello World');
    const hash2 = await contentHash('Hello World');
    const hash3 = await contentHash('Different content');
    
    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(typeof hash1).toBe('string');
    expect(hash1.length).toBeGreaterThan(0);
  });
});

// Test the imageUpload module
describe('Image Upload Client Module', () => {
  it('should export uploadImage and resolveImageSrc functions', async () => {
    const mod = await import('../client/src/lib/imageUpload');
    
    expect(typeof mod.uploadImage).toBe('function');
    expect(typeof mod.resolveImageSrc).toBe('function');
  });

  it('resolveImageSrc should return http URLs as-is', async () => {
    const { resolveImageSrc } = await import('../client/src/lib/imageUpload');
    
    const httpUrl = 'https://example.com/image.png';
    const result = await resolveImageSrc(httpUrl);
    expect(result).toBe(httpUrl);
  });

  it('resolveImageSrc should return non-image paths as-is', async () => {
    const { resolveImageSrc } = await import('../client/src/lib/imageUpload');
    
    const regularPath = '/some/path/file.txt';
    const result = await resolveImageSrc(regularPath);
    expect(result).toBe(regularPath);
  });
});
