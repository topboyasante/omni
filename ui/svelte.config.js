import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import MDSVEX_CONFIG from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(MDSVEX_CONFIG)],

	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
