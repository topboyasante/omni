import type { ComponentItem } from './types';

export const COMPONENT_LIST: ComponentItem[] = [
	{
		name: 'Theme Toggle',
		description: 'A toggle switch to change the theme of the application.',
		component: import('../theme-switcher/theme-switcher.svelte'),
		code: import('../theme-switcher/usage.svelte?raw')
	}
] as const;
