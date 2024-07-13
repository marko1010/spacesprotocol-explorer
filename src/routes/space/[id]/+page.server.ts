import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { object, string } from 'zod';

export const load: ServerLoad = async ({ fetch, locals, params }) => {
    console.log('params:', params.id);
    const space = await fetch(`/api/spaces/${params.id}`).then(x => x.json());
    return space;
};