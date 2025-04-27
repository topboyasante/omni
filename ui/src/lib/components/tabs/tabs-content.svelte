<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import { getTabContext } from './tabs.svelte';

	type TabProps = {
		value: string;
		children: Snippet;
		class?: string;
	};

	const { value, children, class: className }: TabProps = $props();

	const { currentValue, onChange } = $derived(getTabContext()());

	let isActive = $derived(currentValue === value);
</script>

{#if isActive}
	<div
		class={cn(
			'tabs-content',
			'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			className
		)}
		role="tabpanel"
	>
		{@render children()}
	</div>
{/if}
