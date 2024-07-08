import { serial, pgTable } from 'drizzle-orm/pg-core';

export const spaces = pgTable('spaces', {
	id: serial('id').primaryKey(),
});

