import { serial, pgTable } from 'drizzle-orm/pg-core';

export const zones = pgTable('spaces', {
	id: serial('id').primaryKey(),
});

