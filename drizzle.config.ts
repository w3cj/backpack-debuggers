import type { Config } from 'drizzle-kit';

import env from './src/env';

export default {
  driver: 'pg',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
