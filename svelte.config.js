import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({ runtime: 'edge' })
	},
	preprocess: [
		mdsvex({ extensions: ['.md'] }),
		vitePreprocess()
	]
};

export default config;
