import db from '$lib/db';
import { error, json } from '@sveltejs/kit';
import { type RequestHandler } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { spaces, spacesHistory } from '$lib/schema';

export const GET: RequestHandler = async function ({ request, url, params }) {
    console.log('params api:', params);
    const spacesDb = await db.query.spaces.findFirst({ 
        orderBy: spaces.id,
        where: sql`${spaces.name} = ${params.name}`,
        with: { 
            history: { 
                columns: { id: true, action: true, bid_amount: true, txid: true, createdAt: true },
                orderBy: (history, {desc}) => desc(history.id),
            },
        } 
    });

    return json(spacesDb);
};