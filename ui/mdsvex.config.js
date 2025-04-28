import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';
import { addCopyButton } from 'shiki-transformer-copy-button';

const highlighter = await createHighlighter({
	themes: ['vitesse-black', 'vitesse-light'],
	langs: ['javascript', 'typescript']
});

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const path_to_layout = join(__dirname, './src/lib/layouts/docs.svelte');

const MDSVEX_CONFIG = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		_: path_to_layout
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes: {
						light: 'vitesse-light',
						dark: 'vitesse-black'
					},
					transformers: [addCopyButton()]
				})
			);
			return `{@html \`${html}\` }`;
		}
	}
});

export default MDSVEX_CONFIG;
