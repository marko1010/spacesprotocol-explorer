import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch, locals, params }) => {
    const space = await fetch(`/api/spaces/${params.id}`).then(x => x.json());
    return space;
};