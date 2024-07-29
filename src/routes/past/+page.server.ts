import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch, locals, url }) => {
    url.searchParams.set('status', 'registered');

    if (!url.searchParams.get('sort')) {
        url.searchParams.set('sort', 'register_date');
        url.searchParams.set('direction', 'desc');
    }

    const [spaces, blockStats] = await Promise.all([
        fetch(`/api/spaces?${url.searchParams.toString()}`).then(x => x.json()),
        fetch('/api/blocks/stats').then(x => x.json())
    ]);
    return { spaces, blockStats };
};