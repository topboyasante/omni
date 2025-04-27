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

<button
	class={cn(
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
		isActive
			? 'bg-background text-foreground shadow-sm'
			: 'hover:bg-accent hover:text-accent-foreground',
		className
	)}
	role="tab"
	aria-selected={isActive}
	onclick={() => onChange(value)}
>
	{@render children()}
</button>
