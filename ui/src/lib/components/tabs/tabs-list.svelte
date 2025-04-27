<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	type TabProps = {
		children: Snippet;
		class?: string;
	};

	const { children, class: className }: TabProps = $props();
</script>

<div
	class={cn(
		'flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
		className
	)}
	role="tablist"
>
	{@render children()}
</div>
