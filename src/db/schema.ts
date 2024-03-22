import {
  serial,
  text,
  json,
  timestamp,
  pgTable,
  integer,
} from 'drizzle-orm/pg-core';

export const Monster = pgTable('monster', {
  id: serial('id'),
  name: text('name').notNull(),
  description: text('description').notNull(),
  dex_number: integer('dex_number').notNull(),
  size: integer('size').notNull(),
  hp: integer('hp').notNull(),
  attacks: json('attacks').$type<string[]>().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertMonster = typeof Monster.$inferInsert;
export type SelectMonster = typeof Monster.$inferSelect;