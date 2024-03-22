import { db, client } from './drizzle';
import { Monster } from './schema';

import monsters from './seeds/monsters.json';

await db.insert(Monster).values(monsters);
await client.end();
