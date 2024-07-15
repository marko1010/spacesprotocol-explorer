import db from '$lib/db';
import { error, json } from '@sveltejs/kit';
import { type RequestHandler } from '@sveltejs/kit';
//import { sql, desc } from 'drizzle-orm';
import { spaces, spacesHistory } from '$lib/schema';

export const GET: RequestHandler = async function ({ request, url }) {
    const spacesDb = await db.query.spaces.findMany({
        orderBy: spaces.id,
        with: {
            history: {
                columns: { id: true, action: true, bid_amount: true },
                with: {
                    transaction: {
                        columns: { id: true, txid: true },
                        with: {
                            block: { columns: { time: true } }
                        }
                    }
                },
                orderBy: (history) => history.id,
            },
        }
    });

    return json(spacesDb);
}