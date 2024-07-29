import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {},
		https: {
		  key: fs.readFileSync('/etc/letsencrypt/live/explorer.spacesprotocol.org/privkey.pem'),
		  cert: fs.readFileSync('/etc/letsencrypt/live/explorer.spacesprotocol.org/fullchain.pem')
		}
	}
});
