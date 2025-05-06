<script lang="ts" module>
	// Use a unique key for your context names.
	// https://youtu.be/XBVujg6Fn3A?t=450
	export const accordionItemContextKey = Symbol('accordionItem');

	export const getAccordionItemContext = () =>
		getContext<() => AccordionItemData>(accordionItemContextKey);
</script>

<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	import { getAccordionContext } from './accordion.svelte';
	import type { AccordionItemData } from './types';

	type AccordionItemProps = {
		value: string;
		children: Snippet;
	};

	const { value, children }: AccordionItemProps = $props();
	const { openValues } = $derived(getAccordionContext()());

	let isOpen = $derived(openValues.has(value));

	let accordionItemData = $state({
		value
	});
	setContext(accordionItemContextKey, () => accordionItemData);
</script>

<div class="border-b" data-state={isOpen ? 'open' : 'closed'}>
	{@render children()}
</div>
