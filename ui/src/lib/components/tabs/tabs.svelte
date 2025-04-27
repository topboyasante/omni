<script lang="ts" module>
	export const getTabContext = () => getContext<() => TabData>('tabs');
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { getContext, setContext, type Snippet } from 'svelte';
	import type { TabData } from './types';

	type TabProps = {
		defaultValue: string;
		children: Snippet;
		class?: string;
	};

	const { defaultValue, children, class: className }: TabProps = $props();

	let tabData = $state({
		defaultValue,
		currentValue: defaultValue
	});

	function handleTabChange(tab: string) {
		tabData.currentValue = tab;
	}

	setContext('tabs', () => ({
		defaultValue: tabData.defaultValue,
		currentValue: tabData.currentValue,
		onChange: handleTabChange
	}));
</script>

<div class={cn('flex flex-col', className)} role="tablist">
	{@render children()}
</div>
