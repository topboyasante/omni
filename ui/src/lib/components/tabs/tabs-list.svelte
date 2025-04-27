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
		'flex h-auto items-center justify-start text-muted-foreground border-b',
		className
	)}
	role="tablist"
>
	{@render children()}
</div>
