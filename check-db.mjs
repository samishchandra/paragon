import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);
const result = await db.execute(sql`SELECT id, title, LEFT(content, 80) as content, userId FROM items ORDER BY updatedAt DESC`);
console.log(JSON.stringify(result[0], null, 2));
process.exit(0);
