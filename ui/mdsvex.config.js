import { join } from 'path';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const path_to_layout = join(__dirname, './src/lib/layouts/docs.svelte');

const MDSVEX_CONFIG = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		_: path_to_layout
	}
});

export default MDSVEX_CONFIG;
