<script lang="ts">
	import { type Snippet } from 'svelte';
	import { getAccordionItemContext } from './accordion-item.svelte';
	import { getAccordionContext } from './accordion.svelte';
	import { slide } from 'svelte/transition';

	type AccordionItemProps = {
		children: Snippet;
	};

	const { children }: AccordionItemProps = $props();

	const { value } = $derived(getAccordionItemContext()());
	const { openValues } = $derived(getAccordionContext()());

	let isOpen = $derived(openValues.has(value));
</script>

<div class="border-b overflow-hidden" data-state={isOpen ? 'open' : 'closed'}>
	{#if isOpen}
		<div transition:slide={{ duration: 300, easing: (t) => t * (2 - t) }}>
			{@render children()}
		</div>
	{/if}
</div>
