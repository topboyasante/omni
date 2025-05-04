import type { ComponentItem } from './types';

export const COMPONENT_LIST: ComponentItem[] = [
	{
		name: 'Theme Toggle',
		description: 'A toggle switch to change the theme of the application.',
		component: import('../theme-switcher/usage.svelte'),
		code: import('../theme-switcher/usage.svelte?raw')
	},
	{
		name: 'Button',
		description: 'A customizable button component.',
		component: import('../button/usage.svelte'),
		code: import('../button/usage.svelte?raw')
	},
	{
		name: 'Tabs',
		description: 'A customizable tabs component.',
		component: import('../tabs/usage.svelte'),
		code: import('../tabs/usage.svelte?raw')
	},
	{
		name: 'Accordion',
		description: 'A customizable tabs component.',
		component: import('../accordion/usage.svelte'),
		code: import('../accordion/usage.svelte?raw')
	}
] as const;
