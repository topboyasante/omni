<script lang="ts" module>
	export const getAccordionItemContext = () => getContext<() => AccordionItemData>('accordionItem');
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
	setContext('accordionItem', () => accordionItemData);
</script>

<div class="border-b" data-state={isOpen ? 'open' : 'closed'}>
	{@render children()}
</div>
