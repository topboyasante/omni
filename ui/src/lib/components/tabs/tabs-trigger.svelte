<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import { getTabContext } from './tabs.svelte';

	type TabProps = {
		value: string;
		children: Snippet;
		class?: string;
		onClick?: () => void;
	};

	const { value, children, class: className, onClick }: TabProps = $props();

	const { currentValue, onChange } = $derived(getTabContext()());

	let isActive = $derived(currentValue === value);
</script>

<button
	class={cn(
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
		isActive ? 'border-b-[1.5px] border-primary text-primary' : 'hover:text-primary/80',
		className
	)}
	role="tab"
	aria-selected={isActive}
	onclick={() => {
		onChange(value);

		// in case you need to do other stuff after switching a tab
		if (onClick) {
			onClick();
		}
	}}
>
	{@render children()}
</button>
