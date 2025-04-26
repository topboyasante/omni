import type { Component } from 'svelte';

export interface ComponentItem {
	name: string;
	description: string;
	// In Svelte, dynamic imports return a module object where the component is the default export.
	// You need to access the default property to get the actual component.
	component: Promise<{ default: Component }>;
	code: Promise<{ default: string }>;
}
