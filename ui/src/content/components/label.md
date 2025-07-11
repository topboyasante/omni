<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Label

A customizable label component for your SvelteKit app.

<br/>

<ComponentPreview name="Label"/>

## Setting Up

This component is standalone and does not require additional dependencies. You can directly copy and use it in your project.

<br/>

Copy the `<Label/>` component:

```ts
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
```

## Usage Example

Here’s how you can use the `<Label/>` component in your project:

```ts
<script>
	import Label from './label.svelte';
</script>

<Label required>This is a label</Label>
```
