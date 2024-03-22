import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import config from '../../drizzle.config';
import { Monster } from './schema';

export const client = postgres(config.dbCredentials.connectionString);
export const db = drizzle(client, {
  schema: {
    Monster,
  },
});
