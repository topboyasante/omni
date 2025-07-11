<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = HTMLLabelAttributes & {
		children?: Snippet;
		class?: string;
		for?: string;
		variant?: 'default' | 'error' | 'success' | 'warning';
		size?: 'sm' | 'default' | 'lg';
		required?: boolean;
	};

	const labelVariants = {
		default: 'text-neutral-900',
		error: 'text-red-600',
		success: 'text-green-600',
		warning: 'text-amber-600'
	};

	const labelSizes = {
		sm: 'text-sm',
		default: 'text-base',
		lg: 'text-lg'
	};

	let {
		class: className,
		for: htmlFor,
		variant = 'default',
		size = 'default',
		required = false,
		children,
		...props
	}: Props = $props();
</script>

<label
	for={htmlFor}
	class={twMerge('block font-medium', labelVariants[variant], labelSizes[size], className)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
	{#if required}
		<span class="text-red-600 ml-1">*</span>
	{/if}
</label>
