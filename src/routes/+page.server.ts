import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { object, string } from 'zod';

export const load: ServerLoad = async ({ fetch, locals }) => {
    const spaces = await fetch('/api/spaces').then(x => x.json());
    return { spaces };
};