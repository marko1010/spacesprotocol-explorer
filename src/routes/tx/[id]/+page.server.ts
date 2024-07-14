import { error, type Actions, type ServerLoad } from '@sveltejs/kit';
import { object, string } from 'zod';

export const load: ServerLoad = async ({ fetch, locals, params }) => {
    console.log('params:', params.id);
    const transaction = await fetch(`/api/transactions/${params.id}`);
    if (transaction.status != 200) {
        error(transaction.status, { message: 'Transaction not found'});
    }
    console.log('transaction:', transaction.status);
    return transaction.json();
};