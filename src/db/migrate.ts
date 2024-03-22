import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

import config from '../../drizzle.config';

const client = postgres(config.dbCredentials.connectionString, { max: 1 });
const db = drizzle(client);

await migrate(db, { migrationsFolder: config.out });
await client.end();
