import { drizzle } from 'drizzle-orm/mysql2';
import { sql, eq, and } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

// First check what's in the DB
const before = await db.execute(sql`SELECT id, title, LEFT(content, 50) as content, userId FROM items WHERE id = '8fa65a29-4e03-4400-af30-4b8fe077016c'`);
console.log('Before:', JSON.stringify(before[0], null, 2));

// Now try a direct update
const updateResult = await db.execute(sql`UPDATE items SET content = 'DIRECT UPDATE TEST' WHERE id = '8fa65a29-4e03-4400-af30-4b8fe077016c' AND userId = 1`);
console.log('Update result:', JSON.stringify(updateResult, null, 2));

// Check after
const after = await db.execute(sql`SELECT id, title, LEFT(content, 50) as content, userId FROM items WHERE id = '8fa65a29-4e03-4400-af30-4b8fe077016c'`);
console.log('After:', JSON.stringify(after[0], null, 2));

process.exit(0);
