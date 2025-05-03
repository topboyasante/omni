<script lang="ts">
	import { type Snippet } from 'svelte';
	import { getAccordionItemContext } from './accordion-item.svelte';
	import { getAccordionContext } from './accordion.svelte';
	import { ChevronDown } from '@lucide/svelte';

	type AccordionItemProps = {
		children: Snippet;
	};

	const { children }: AccordionItemProps = $props();

	const { value } = $derived(getAccordionItemContext()());
	const { toggleValue, openValues } = $derived(getAccordionContext()());

	// Determine if this accordion item is open
	let isOpen = $derived(openValues.has(value));
</script>

<button
	class="flex w-full items-center justify-between text-left"
	type="button"
	aria-expanded={isOpen}
	onclick={() => {
		toggleValue(value);
	}}
>
	<span>
		{@render children()}
	</span>

	<ChevronDown
		class="h-4 w-4 shrink-0 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
	/>
</button>
