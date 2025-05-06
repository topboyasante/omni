<script lang="ts" module>
	// Use a unique key for your context names.
	// https://youtu.be/XBVujg6Fn3A?t=450
	export const accordionContextKey = Symbol('accordion');
	export const getAccordionContext = () => getContext<() => AccordionData>(accordionContextKey);
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { getContext, setContext, type Snippet } from 'svelte';
	import type { AccordionData } from './types';

	type AccordionProps = {
		type?: 'single' | 'multiple'; //this allows the accordion to open one or many sections at a time
		collapsible?: boolean;
		defaultValue?: string;
		children: Snippet;
		class?: string;
	};

	const {
		type = 'single',
		children,
		class: className,
		collapsible = true,
		defaultValue = ''
	}: AccordionProps = $props();

	//  A JavaScript Set is a collection of unique values. Each value can only occur once in a Set.
	let accordionData = $state({
		// if the accordion type is single and there's a default value, openValues should be a set with the default value
		openValues: type === 'single' && defaultValue ? new Set([defaultValue]) : new Set(),
		type,
		collapsible,
		toggleValue(value: string) {
			if (type === 'single') {
				if (accordionData.openValues.has(value) && collapsible) {
					accordionData.openValues.clear();
				} else {
					accordionData.openValues.clear();
					accordionData.openValues.add(value);
				}
			} else {
				if (accordionData.openValues.has(value)) {
					accordionData.openValues.delete(value);
				} else {
					accordionData.openValues.add(value);
				}
			}
			accordionData.openValues = new Set(accordionData.openValues);
		}
	});

	setContext(accordionContextKey, () => accordionData);
</script>

<div class={cn('flex flex-col', className)} role="region">
	{@render children()}
</div>
